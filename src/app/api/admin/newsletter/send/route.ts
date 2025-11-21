import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/emailUtils';

export async function POST(request: NextRequest) {
  try {
    const {
      subject,
      introMessage,
      featuredRecipeId,
      secondaryRecipeIds,
      tipOfWeek,
      sendTo
    } = await request.json();

    // Validation
    if (!subject || !introMessage || !featuredRecipeId) {
      return NextResponse.json(
        { success: false, error: 'Champs obligatoires manquants' },
        { status: 400 }
      );
    }

    // Récupérer les recettes
    const recipeIds = [featuredRecipeId, ...secondaryRecipeIds].filter(Boolean);
    const recipes = await prisma.recipe.findMany({
      where: {
        id: { in: recipeIds }
      }
    });

    const featuredRecipe = recipes.find(r => r.id === featuredRecipeId);
    if (!featuredRecipe) {
      return NextResponse.json(
        { success: false, error: 'Recette principale introuvable' },
        { status: 404 }
      );
    }

    const secondaryRecipes = secondaryRecipeIds
      .map((id: string) => recipes.find(r => r.id === id))
      .filter(Boolean);

    // Récupérer les abonnés selon le filtre
    let subscriberFilter: any = {
      status: 'ACTIVE'
    };

    if (sendTo === 'FREE') {
      subscriberFilter.subscriptionType = 'FREE';
    } else if (sendTo === 'PREMIUM') {
      subscriberFilter.subscriptionType = 'PREMIUM';
    }

    const subscribers = await prisma.newsletterSubscriber.findMany({
      where: subscriberFilter
    });

    if (subscribers.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Aucun abonné trouvé' },
        { status: 400 }
      );
    }

    // Générer le HTML de la newsletter
    const newsletterHTML = generateNewsletterHTML({
      subject,
      introMessage,
      featuredRecipe,
      secondaryRecipes,
      tipOfWeek,
      sendTo
    });

    // Créer un enregistrement newsletter dans la DB
    const newsletter = await prisma.newsletter.create({
      data: {
        subject,
        content: {
          html: newsletterHTML,
          introMessage,
          featuredRecipeId,
          secondaryRecipeIds,
          tipOfWeek,
          sendTo
        },
        type: 'REGULAR',
        status: 'SENT',
        recipientsCount: subscribers.length,
        sentAt: new Date()
      }
    });

    // Envoyer à tous les abonnés
    let successCount = 0;
    let failureCount = 0;

    for (const subscriber of subscribers) {
      try {
        const result = await sendEmail({
          to: subscriber.email,
          subject,
          htmlContent: newsletterHTML,
          type: 'newsletter_weekly',
          subscriberId: subscriber.id,
          newsletterId: newsletter.id
        });

        if (result.success) {
          successCount++;
        } else {
          failureCount++;
        }
      } catch (error) {
        console.error(`Failed to send to ${subscriber.email}:`, error);
        failureCount++;
      }
    }

    console.log(`✅ Newsletter sent: ${successCount} success, ${failureCount} failures`);

    return NextResponse.json({
      success: true,
      recipientsCount: successCount,
      failureCount,
      newsletterId: newsletter.id
    });

  } catch (error) {
    console.error('❌ Error sending newsletter:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l\'envoi' },
      { status: 500 }
    );
  }
}

// Fonction pour générer le HTML de la newsletter
function generateNewsletterHTML({
  subject,
  introMessage,
  featuredRecipe,
  secondaryRecipes,
  tipOfWeek,
  sendTo
}: any): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
  const dateString = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const secondaryRecipesHTML = secondaryRecipes.map((recipe: any) => {
    const imageUrl = recipe?.imageUrl?.startsWith('http')
      ? recipe.imageUrl
      : `${baseUrl}${recipe?.imageUrl || ''}`;

    return `
    <td style="width: 50%; padding: 0;">
      <div style="position: relative; height: 350px; overflow: hidden;">
        <img src="${imageUrl}" alt="${recipe?.title || ''}" style="width: 100%; height: 100%; object-fit: cover; display: block;">
        <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 30px; background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.9) 100%);">
          <h3 style="font-size: 22px; color: #fff; font-weight: 700; margin-bottom: 8px;">
            ${recipe?.title || ''}
          </h3>
          <a href="${baseUrl}/recettes/${recipe?.slug || ''}" style="color: #D4AF37; text-decoration: none; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">
            Découvrir →
          </a>
        </div>
      </div>
    </td>
  `;
  }).join('');

  const quoteHTML = tipOfWeek ? `
    <tr>
      <td style="background: #1a1a1a; padding: 80px 60px; text-align: center;">
        <div style="font-size: 60px; color: #D4AF37; margin-bottom: 30px; opacity: 0.5;">"</div>
        <p style="font-size: 28px; color: #fff; line-height: 1.5; font-weight: 300; font-style: italic; margin-bottom: 30px;">
          ${tipOfWeek}
        </p>
        <div style="font-size: 14px; color: #D4AF37; letter-spacing: 2px; text-transform: uppercase;">
          Conseil de Florent
        </div>
      </td>
    </tr>
  ` : '';

  const premiumCTAHTML = sendTo !== 'PREMIUM' ? `
    <tr>
      <td style="background: linear-gradient(135deg, #D4AF37 0%, #C77A4E 100%); padding: 70px 60px; text-align: center;">
        <div style="display: inline-block; background: #000; color: #D4AF37; padding: 8px 24px; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 30px; font-weight: 700;">
          Exclusif Premium
        </div>
        <h3 style="font-size: 42px; color: #000; font-weight: 900; margin-bottom: 20px; text-transform: uppercase; letter-spacing: -1px;">
          Rejoignez<br>l'Élite Culinaire
        </h3>
        <p style="font-size: 16px; color: rgba(0,0,0,0.8); line-height: 1.6; margin-bottom: 40px; max-width: 500px; margin-left: auto; margin-right: auto;">
          Accédez à notre bibliothèque complète de recettes d'exception,
          masterclass en vidéo HD, et techniques de chef. Une expérience
          gastronomique sans compromis.
        </p>
        <a href="${baseUrl}/premium" style="display: inline-block; background: #000; color: #D4AF37; padding: 18px 50px; text-decoration: none; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700;">
          Devenir Membre Premium
        </a>
      </td>
    </tr>
  ` : '';

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin:0; padding:0; background:#000;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:700px; margin:0 auto; background:#000;">
    <!-- Hero -->
    <tr>
      <td style="position: relative; height: 500px; background: linear-gradient(135deg, #D4AF37 0%, #C77A4E 100%); display: flex; align-items: center; justify-content: center; text-align: center; padding: 60px 40px;">
        <div>
          <div style="font-size: 11px; letter-spacing: 3px; color: rgba(0,0,0,0.6); margin-bottom: 20px; text-transform: uppercase;">
            Édition du ${dateString}
          </div>
          <h1 style="font-size: 52px; color: #000; font-weight: 900; letter-spacing: -1px; line-height: 1.1; margin-bottom: 20px; text-transform: uppercase;">
            Saveurs<br>d'Exception
          </h1>
          <div style="font-size: 16px; color: rgba(0,0,0,0.7); letter-spacing: 1px;">
            Trois Recettes Exclusives
          </div>
        </div>
      </td>
    </tr>

    <!-- Intro -->
    <tr>
      <td style="background: #fff; padding: 60px 50px; border-left: 4px solid #D4AF37;">
        <p style="font-size: 20px; line-height: 1.7; color: #1a1a1a; font-weight: 300; margin: 0; white-space: pre-line;">
          ${introMessage}
        </p>
        <div style="margin-top: 30px; font-size: 14px; color: #D4AF37; font-style: italic;">
          — Florent
        </div>
      </td>
    </tr>

    <!-- Featured Recipe -->
    <tr>
      <td style="background: #000; padding: 0; position: relative;">
        <div style="position: relative;">
          <img src="${featuredRecipe.imageUrl?.startsWith('http') ? featuredRecipe.imageUrl : `${baseUrl}${featuredRecipe.imageUrl || ''}`}" alt="${featuredRecipe.title}" style="width: 100%; height: 450px; object-fit: cover; display: block;">
          <div style="padding: 50px; background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.9) 100%); position: absolute; bottom: 0; left: 0; right: 0;">
            <div style="font-size: 80px; font-weight: 900; color: #D4AF37; line-height: 1; margin-bottom: 10px; opacity: 0.3;">
              01
            </div>
            <h2 style="font-size: 38px; color: #fff; font-weight: 700; margin-bottom: 16px; text-transform: uppercase; letter-spacing: -0.5px;">
              ${featuredRecipe.title}
            </h2>
            <p style="font-size: 16px; color: rgba(255,255,255,0.9); line-height: 1.6; margin-bottom: 24px;">
              ${featuredRecipe.description || 'Une création exceptionnelle qui va éveiller vos papilles.'}
            </p>
            <a href="${baseUrl}/recettes/${featuredRecipe.slug}" style="display: inline-block; background: #D4AF37; color: #000; padding: 14px 32px; text-decoration: none; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700;">
              Voir la Recette
            </a>
          </div>
        </div>
      </td>
    </tr>

    ${secondaryRecipes.length > 0 ? `
    <!-- Grid Recipes -->
    <tr>
      <td>
        <table width="100%" cellpadding="0" cellspacing="2" border="0" style="background: #000;">
          <tr>
            ${secondaryRecipesHTML}
          </tr>
        </table>
      </td>
    </tr>
    ` : ''}

    ${quoteHTML}

    ${premiumCTAHTML}

    <!-- Footer -->
    <tr>
      <td style="background: #000; padding: 50px; text-align: center; border-top: 1px solid #333;">
        <div style="font-size: 24px; color: #D4AF37; font-weight: 900; margin-bottom: 20px; letter-spacing: 2px;">
          FLORENT FOOD
        </div>
        <p style="font-size: 11px; color: #666; line-height: 2; letter-spacing: 1px; text-transform: uppercase; margin: 0;">
          Haute Cuisine · Paris<br>
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
