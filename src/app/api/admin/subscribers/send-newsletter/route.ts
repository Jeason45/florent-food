import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/emailUtils';

/**
 * Envoyer manuellement la newsletter active à un abonné spécifique
 */
export async function POST(request: NextRequest) {
  try {
    const { subscriberId } = await request.json();

    if (!subscriberId) {
      return NextResponse.json(
        { success: false, error: 'subscriberId requis' },
        { status: 400 }
      );
    }

    // Récupérer l'abonné
    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { id: subscriberId }
    });

    if (!subscriber) {
      return NextResponse.json(
        { success: false, error: 'Abonné introuvable' },
        { status: 404 }
      );
    }

    // Récupérer la newsletter active pour les nouveaux inscrits
    const newsletter = await prisma.newsletter.findFirst({
      where: {
        isActiveForNewSubscribers: true
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

    if (!newsletter) {
      return NextResponse.json(
        { success: false, error: 'Aucune newsletter active pour les nouveaux inscrits. Activez une newsletter avec le bouton 🔔 Nouveaux.' },
        { status: 404 }
      );
    }

    // Récupérer ou générer le HTML
    const content = newsletter.content as {
      html?: string;
      introMessage?: string;
      tipOfWeek?: string;
    } | null;

    let newsletterHTML = content?.html;

    if (!newsletterHTML && newsletter.newsletterRecipes.length > 0) {
      // Générer le HTML à la volée
      const recipes = newsletter.newsletterRecipes.map(nr => nr.recipe);
      const featuredRecipe = recipes[0];
      const secondaryRecipes = recipes.slice(1);

      newsletterHTML = generateNewsletterHTML({
        subject: newsletter.subject,
        introMessage: content?.introMessage || '',
        featuredRecipe,
        secondaryRecipes,
        tipOfWeek: content?.tipOfWeek || '',
        recipes
      });
    }

    if (!newsletterHTML) {
      return NextResponse.json(
        { success: false, error: 'Impossible de générer le HTML de la newsletter' },
        { status: 500 }
      );
    }

    // Personnaliser le HTML avec l'email
    const personalizedHTML = newsletterHTML.replace(/\{\{EMAIL\}\}/g, encodeURIComponent(subscriber.email));

    // Envoyer l'email
    const result = await sendEmail({
      to: subscriber.email,
      subject: `📬 ${newsletter.subject}`,
      htmlContent: personalizedHTML,
      type: 'newsletter_weekly',
      subscriberId: subscriber.id,
      newsletterId: newsletter.id
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Erreur lors de l\'envoi' },
        { status: 500 }
      );
    }

    console.log(`✅ Newsletter "${newsletter.subject}" envoyée manuellement à ${subscriber.email}`);

    return NextResponse.json({
      success: true,
      message: `Newsletter envoyée à ${subscriber.email}`,
      newsletterSubject: newsletter.subject
    });

  } catch (error) {
    console.error('❌ Error sending newsletter to subscriber:', error);
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
  recipes
}: any): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://florent-food.fr';
  const dateString = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const totalRecipes = recipes?.length || (1 + (secondaryRecipes?.length || 0));
  const recipesText = totalRecipes === 1 ? 'Une Recette Exclusive' : `${totalRecipes} Recettes Exclusives`;

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
    <tr>
      <td style="padding: 8px 4px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          ${secondaryRecipesHTML}
        </table>
      </td>
    </tr>
    ` : ''}
    ${quoteHTML}
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
