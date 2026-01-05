import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/emailUtils';
import { SubscriberStatus, SubscriptionType } from '@prisma/client';

// Utilitaire pour éviter le rate limiting de Resend
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Cron Job: Newsletter Rotation Hebdomadaire
 *
 * Exécution: Tous les dimanches à 9h30 (heure de Paris)
 * Schedule: "30 8 * * 0" = 8h30 UTC = 9h30 Paris (heure d'hiver) / 10h30 Paris (heure d'été)
 *
 * Fonctionnalités:
 * 1. Archive les newsletters ACTIVE dont la date de fin est dépassée
 * 2. Active les newsletters SCHEDULED dont la date de début est atteinte
 * 3. Envoie les emails pour les newsletters nouvellement activées
 *
 * Configuration Vercel Cron (vercel.json):
 * {
 *   "crons": [{
 *     "path": "/api/cron/newsletter-rotation",
 *     "schedule": "30 8 * * 0"
 *   }]
 * }
 */
export async function GET(request: NextRequest) {
  try {
    // Vérification de sécurité: token d'authentification (optionnel mais recommandé)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const results = {
      archived: 0,
      activated: 0,
      emailsSent: 0,
      emailsQueued: 0,
      emailsFailed: 0,
      errors: [] as string[]
    };

    // ============================================
    // 1. ARCHIVER les newsletters ACTIVE expirées
    // ============================================
    const expiredNewsletters = await prisma.newsletter.findMany({
      where: {
        status: 'ACTIVE',
        endDate: {
          lt: today
        }
      }
    });

    for (const newsletter of expiredNewsletters) {
      try {
        await prisma.newsletter.update({
          where: { id: newsletter.id },
          data: {
            status: 'ARCHIVED'
          }
        });
        results.archived++;
        console.log(`✅ Newsletter archivée: ${newsletter.subject} (ID: ${newsletter.id})`);
      } catch (error) {
        console.error(`❌ Erreur archivage newsletter ${newsletter.id}:`, error);
        results.errors.push(`Archivage échoué: ${newsletter.id}`);
      }
    }

    // ============================================
    // 2. ACTIVER et ENVOYER les newsletters
    // Priorité: D'abord SCHEDULED, sinon ACTIVE (sans doublon)
    // ============================================

    // D'abord, chercher les newsletters SCHEDULED
    let newslettersToProcess = await prisma.newsletter.findMany({
      where: {
        status: 'SCHEDULED',
        startDate: {
          lte: today
        }
      },
      include: {
        newsletterRecipes: {
          include: {
            recipe: true
          },
          orderBy: {
            position: 'asc'
          }
        }
      }
    });

    // Si aucune SCHEDULED, chercher UNE newsletter ACTIVE qui n'a PAS déjà été envoyée cette semaine
    if (newslettersToProcess.length === 0) {
      // Calculer le début de la semaine (lundi)
      const startOfWeek = new Date(today);
      const dayOfWeek = startOfWeek.getDay();
      const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Si dimanche (0), on recule de 6 jours, sinon on va au lundi
      startOfWeek.setDate(startOfWeek.getDate() + diff);
      startOfWeek.setHours(0, 0, 0, 0);

      // Chercher les newsletters ACTIVE qui n'ont PAS été envoyées depuis le début de la semaine
      const activeNewsletters = await prisma.newsletter.findMany({
        where: {
          status: 'ACTIVE',
          startDate: {
            lte: today
          },
          endDate: {
            gte: today
          },
          OR: [
            // Newsletter jamais envoyée
            { sentAt: null },
            // Newsletter envoyée AVANT cette semaine
            { sentAt: { lt: startOfWeek } }
          ]
        },
        include: {
          newsletterRecipes: {
            include: {
              recipe: true
            },
            orderBy: {
              position: 'asc'
            }
          }
        },
        take: 1 // On ne prend qu'une seule newsletter à la fois
      });

      newslettersToProcess = activeNewsletters;

      if (newslettersToProcess.length > 0) {
        console.log(`📧 Aucune newsletter SCHEDULED, utilisation de 1 newsletter ACTIVE non envoyée cette semaine`);
      } else {
        console.log(`ℹ️ Aucune newsletter à envoyer (toutes les ACTIVE ont déjà été envoyées cette semaine)`);
      }
    }

    for (const newsletter of newslettersToProcess) {
      try {
        // Récupérer les données du contenu
        const content = newsletter.content as {
          introMessage?: string;
          recipeIds?: string[];
          tipOfWeek?: string;
          sendTo?: string;
          html?: string;
        } | null;

        const sendTo = content?.sendTo || 'ALL';

        // Filtrer les abonnés selon sendTo
        let subscriberFilter: any = {
          status: SubscriberStatus.ACTIVE
        };

        if (sendTo === 'FREE') {
          subscriberFilter.subscriptionType = SubscriptionType.FREE;
        } else if (sendTo === 'PREMIUM') {
          subscriberFilter.subscriptionType = SubscriptionType.PREMIUM;
        }

        // Récupérer les abonnés qui N'ONT PAS déjà reçu cette newsletter
        const alreadySentSubscriberIds = await prisma.newsletterSubscriberDelivery.findMany({
          where: {
            newsletterId: newsletter.id
          },
          select: {
            subscriberId: true
          }
        });

        const alreadySentIds = alreadySentSubscriberIds.map(d => d.subscriberId);

        const subscribers = await prisma.newsletterSubscriber.findMany({
          where: {
            ...subscriberFilter,
            id: {
              notIn: alreadySentIds // Exclure ceux qui ont déjà reçu cette newsletter
            }
          }
        });

        console.log(`📧 Newsletter ${newsletter.subject}: ${subscribers.length} nouveaux destinataires (${alreadySentIds.length} déjà reçu)`);

        // Générer le HTML de la newsletter
        const recipes = newsletter.newsletterRecipes.map(nr => nr.recipe);
        const featuredRecipe = recipes[0];
        const secondaryRecipes = recipes.slice(1);

        const newsletterHTML = generateNewsletterHTML({
          subject: newsletter.subject,
          introMessage: content?.introMessage || '',
          featuredRecipe,
          secondaryRecipes,
          tipOfWeek: content?.tipOfWeek || '',
          sendTo,
          recipes
        });

        // Mettre à jour le statut à ACTIVE (seulement si SCHEDULED)
        // Si déjà ACTIVE, on met juste à jour le HTML et sentAt
        const isScheduled = newsletter.status === 'SCHEDULED';
        await prisma.newsletter.update({
          where: { id: newsletter.id },
          data: {
            status: 'ACTIVE',
            sentAt: new Date(),
            content: {
              ...content,
              html: newsletterHTML
            }
          }
        });

        console.log(`📧 Newsletter ${isScheduled ? 'SCHEDULED → ACTIVE' : 'ACTIVE'}: ${newsletter.subject}`);

        // Envoyer les emails à tous les abonnés
        let successCount = 0;
        let queuedCount = 0;
        let failureCount = 0;

        for (const subscriber of subscribers) {
          try {
            // Remplacer le placeholder {{EMAIL}} par l'email réel
            const personalizedHTML = newsletterHTML.replace(/\{\{EMAIL\}\}/g, encodeURIComponent(subscriber.email));

            const result = await sendEmail({
              to: subscriber.email,
              subject: newsletter.subject,
              htmlContent: personalizedHTML,
              type: 'newsletter_weekly',
              subscriberId: subscriber.id,
              newsletterId: newsletter.id
            });

            if (result.success) {
              if (result.queued) {
                // Email mis en file d'attente (quota Resend atteint)
                queuedCount++;
              } else {
                // Email réellement envoyé
                successCount++;
              }
            } else {
              failureCount++;
            }

            // Délai de 800ms entre chaque envoi pour éviter le rate limiting de Resend (2 emails/sec max)
            await sleep(800);
          } catch (error) {
            console.error(`Failed to send to ${subscriber.email}:`, error);
            failureCount++;
          }
        }

        // Mettre à jour le compteur de destinataires
        await prisma.newsletter.update({
          where: { id: newsletter.id },
          data: {
            recipientsCount: successCount
          }
        });

        results.activated++;
        results.emailsSent += successCount;
        results.emailsQueued += queuedCount;
        results.emailsFailed += failureCount;

        console.log(`✅ Newsletter activée et envoyée: ${newsletter.subject} (ID: ${newsletter.id}) - ${successCount} envoyés, ${queuedCount} en file d'attente, ${failureCount} échecs`);

      } catch (error) {
        console.error(`❌ Erreur activation newsletter ${newsletter.id}:`, error);
        results.errors.push(`Activation échouée: ${newsletter.id}`);
      }
    }

    // ============================================
    // Résumé du cron job
    // ============================================
    const summary = {
      success: true,
      executedAt: new Date().toISOString(),
      results: {
        newslettersArchived: results.archived,
        newslettersActivated: results.activated,
        emailsSent: results.emailsSent,
        emailsQueued: results.emailsQueued,
        emailsFailed: results.emailsFailed,
        totalProcessed: results.archived + results.activated,
        errors: results.errors
      }
    };

    console.log('📊 Résumé du cron job newsletter-rotation:', summary);

    return NextResponse.json(summary);

  } catch (error) {
    console.error('❌ Erreur critique dans le cron job:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de l\'exécution du cron job',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Permettre aussi l'exécution via POST (pour tests manuels)
export async function POST(request: NextRequest) {
  return GET(request);
}

// ============================================
// Fonction pour générer le HTML de la newsletter
// ============================================
function generateNewsletterHTML({
  subject,
  introMessage,
  featuredRecipe,
  secondaryRecipes,
  tipOfWeek,
  sendTo,
  recipes
}: any): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://florent-food.fr';
  const dateString = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Nombre total de recettes pour le texte dynamique
  const totalRecipes = recipes?.length || (1 + (secondaryRecipes?.length || 0));
  const recipesText = totalRecipes === 1 ? 'Une Recette Exclusive' : `${totalRecipes} Recettes Exclusives`;

  // Générer les recettes secondaires en lignes de 2 (compatible tous clients email)
  let secondaryRecipesHTML = '';
  if (secondaryRecipes && secondaryRecipes.length > 0) {
    for (let i = 0; i < secondaryRecipes.length; i += 2) {
      const recipe1 = secondaryRecipes[i];
      const recipe2 = secondaryRecipes[i + 1];

      const getImageUrl = (recipe: any) => {
        if (!recipe?.imageUrl) return 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=600&q=80';
        return recipe.imageUrl.startsWith('http') ? recipe.imageUrl : `${baseUrl}${recipe.imageUrl}`;
      };

      const recipeCard = (recipe: any, index: number) => `
        <td width="50%" style="padding: 4px; vertical-align: top;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td>
                <a href="${baseUrl}/recettes/${recipe?.slug || ''}" style="text-decoration: none; display: block;">
                  <img src="${getImageUrl(recipe)}" alt="${recipe?.title || ''}" width="100%" height="200" style="width: 100%; height: 200px; object-fit: cover; display: block; border-radius: 8px 8px 0 0;">
                  <div style="background: #1a1a1a; padding: 20px; border-radius: 0 0 8px 8px;">
                    <div style="font-size: 32px; font-weight: 900; color: #D4AF37; opacity: 0.4; margin-bottom: 8px;">
                      0${index + 2}
                    </div>
                    <h3 style="font-size: 18px; color: #fff; font-weight: 700; margin: 0 0 12px 0; line-height: 1.3;">
                      ${recipe?.title || ''}
                    </h3>
                    <span style="color: #D4AF37; font-size: 11px; letter-spacing: 1px; text-transform: uppercase;">
                      Voir la recette →
                    </span>
                  </div>
                </a>
              </td>
            </tr>
          </table>
        </td>
      `;

      secondaryRecipesHTML += `
        <tr>
          ${recipeCard(recipe1, i)}
          ${recipe2 ? recipeCard(recipe2, i + 1) : '<td width="50%" style="padding: 4px;"></td>'}
        </tr>
      `;
    }
  }

  const quoteHTML = tipOfWeek ? `
    <tr>
      <td style="background: #1a1a1a; padding: 60px 40px; text-align: center;">
        <div style="font-size: 48px; color: #D4AF37; margin-bottom: 20px; opacity: 0.5;">"</div>
        <p style="font-size: 22px; color: #fff; line-height: 1.6; font-weight: 300; font-style: italic; margin: 0 0 20px 0;">
          ${tipOfWeek}
        </p>
        <div style="font-size: 12px; color: #D4AF37; letter-spacing: 2px; text-transform: uppercase;">
          Conseil de Florent
        </div>
      </td>
    </tr>
  ` : '';

  // Générer l'URL de l'image featured
  const featuredImageUrl = featuredRecipe?.imageUrl?.startsWith('http')
    ? featuredRecipe.imageUrl
    : `${baseUrl}${featuredRecipe?.imageUrl || ''}`;

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin:0; padding:0; background:#FFFBF7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:650px; margin:0 auto; background:#FFFBF7;">

    <!-- Hero Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #D4AF37 0%, #C77A4E 100%); padding: 50px 30px; text-align: center;">
        <div style="font-size: 10px; letter-spacing: 3px; color: rgba(0,0,0,0.5); margin-bottom: 15px; text-transform: uppercase;">
          Édition du ${dateString}
        </div>
        <h1 style="font-size: 42px; color: #000; font-weight: 900; letter-spacing: -1px; line-height: 1.1; margin: 0 0 15px 0; text-transform: uppercase;">
          Saveurs<br>d'Exception
        </h1>
        <div style="font-size: 14px; color: rgba(0,0,0,0.6); letter-spacing: 1px;">
          ${recipesText}
        </div>
      </td>
    </tr>

    <!-- Intro Message -->
    <tr>
      <td style="background: #fff; padding: 40px 30px; border-left: 4px solid #D4AF37;">
        <p style="font-size: 18px; line-height: 1.7; color: #1a1a1a; font-weight: 300; margin: 0; white-space: pre-line;">
          ${introMessage}
        </p>
        <div style="margin-top: 25px; font-size: 14px; color: #D4AF37; font-style: italic;">
          — Florent
        </div>
      </td>
    </tr>

    <!-- Featured Recipe (Recipe #1) -->
    ${featuredRecipe ? `
    <tr>
      <td style="padding: 0;">
        <a href="${baseUrl}/recettes/${featuredRecipe.slug}" style="text-decoration: none; display: block;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td>
                <img src="${featuredImageUrl}" alt="${featuredRecipe.title}" width="100%" height="350" style="width: 100%; height: 350px; object-fit: cover; display: block;">
              </td>
            </tr>
            <tr>
              <td style="background: #1a1a1a; padding: 30px;">
                <div style="font-size: 60px; font-weight: 900; color: #D4AF37; line-height: 1; margin-bottom: 10px; opacity: 0.3;">
                  01
                </div>
                <h2 style="font-size: 28px; color: #fff; font-weight: 700; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: -0.5px;">
                  ${featuredRecipe.title}
                </h2>
                <p style="font-size: 15px; color: rgba(255,255,255,0.8); line-height: 1.6; margin: 0 0 20px 0;">
                  ${featuredRecipe.description || 'Une création exceptionnelle qui va éveiller vos papilles.'}
                </p>
                <span style="display: inline-block; background: #D4AF37; color: #000; padding: 12px 28px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; border-radius: 4px;">
                  Voir la Recette
                </span>
              </td>
            </tr>
          </table>
        </a>
      </td>
    </tr>
    ` : ''}

    ${secondaryRecipes && secondaryRecipes.length > 0 ? `
    <!-- Other Recipes Grid (2 columns) -->
    <tr>
      <td style="padding: 8px 4px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          ${secondaryRecipesHTML}
        </table>
      </td>
    </tr>
    ` : ''}

    ${quoteHTML}

    <!-- Footer -->
    <tr>
      <td style="background: #2D2D2D; padding: 40px 30px; text-align: center;">
        <div style="font-size: 20px; color: #D4AF37; font-weight: 900; margin-bottom: 15px; letter-spacing: 2px;">
          FLORENT FOOD
        </div>
        <p style="font-size: 11px; color: rgba(255,255,255,0.5); line-height: 2; letter-spacing: 1px; text-transform: uppercase; margin: 0;">
          Haute Cuisine · L'Art de la Gourmandise<br>
          <a href="${baseUrl}/newsletter/unsubscribe?email={{EMAIL}}" style="color: #D4AF37; text-decoration: none;">Se Désinscrire</a> ·
          <a href="${baseUrl}/newsletter/preferences?email={{EMAIL}}" style="color: #D4AF37; text-decoration: none;">Préférences</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
