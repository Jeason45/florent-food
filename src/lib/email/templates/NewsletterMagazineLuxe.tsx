interface Recipe {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  description?: string;
  difficulty?: string;
  prepTime?: number;
}

interface NewsletterData {
  subscriberFirstName?: string;
  introMessage: string;
  featuredRecipe: Recipe;
  secondaryRecipes: Recipe[];
  tipOfWeek?: string;
  dateString: string;
}

/**
 * Convertit une URL Cloudinary pour forcer le format JPEG (compatible email)
 * Les formats AVIF et WebP ne sont pas supportés par la plupart des clients email
 */
function toEmailSafeImageUrl(url: string): string {
  if (!url || !url.includes('res.cloudinary.com')) {
    return url;
  }

  // Insérer f_jpg,q_auto après /upload/ pour forcer le format JPEG
  const parts = url.split('/upload/');
  if (parts.length === 2) {
    return `${parts[0]}/upload/f_jpg,q_auto/${parts[1]}`;
  }

  return url;
}

export function generateNewsletterMagazineLuxe(data: NewsletterData, isFreeTier: boolean = true): string {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3001';

  // Générer les recettes secondaires par paires, avec la dernière en pleine largeur si seule
  const generateSecondaryRecipesHTML = () => {
    const recipes = data.secondaryRecipes;
    const isLastAlone = recipes.length % 2 === 1;
    let html = '';

    // Traiter les recettes par paires
    for (let i = 0; i < recipes.length; i += 2) {
      const recipe1 = recipes[i];
      const recipe2 = recipes[i + 1];
      const isLastRow = i + 2 >= recipes.length;
      const isFullWidth = isLastRow && isLastAlone;

      if (isFullWidth) {
        // Dernière recette seule - pleine largeur
        html += `
          <tr>
            <td colspan="2" style="padding: 1px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="position: relative;">
                    <img src="${toEmailSafeImageUrl(recipe1.imageUrl)}" alt="${recipe1.title}" style="width: 100%; height: 300px; object-fit: cover; display: block;">
                    <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 30px; background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.9) 100%);">
                      <h3 style="font-size: 24px; color: #fff; font-weight: 700; margin: 0 0 8px 0;">
                        ${recipe1.title}
                      </h3>
                      <a href="${baseUrl}/recettes/${recipe1.slug}" style="color: #D4AF37; text-decoration: none; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">
                        Découvrir →
                      </a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        `;
      } else {
        // Paire de recettes
        html += `
          <tr>
            <td width="50%" valign="top" style="padding: 1px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="position: relative;">
                    <img src="${toEmailSafeImageUrl(recipe1.imageUrl)}" alt="${recipe1.title}" style="width: 100%; height: 280px; object-fit: cover; display: block;">
                    <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 25px; background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.9) 100%);">
                      <h3 style="font-size: 20px; color: #fff; font-weight: 700; margin: 0 0 8px 0;">
                        ${recipe1.title}
                      </h3>
                      <a href="${baseUrl}/recettes/${recipe1.slug}" style="color: #D4AF37; text-decoration: none; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">
                        Découvrir →
                      </a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
            ${recipe2 ? `
            <td width="50%" valign="top" style="padding: 1px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="position: relative;">
                    <img src="${toEmailSafeImageUrl(recipe2.imageUrl)}" alt="${recipe2.title}" style="width: 100%; height: 280px; object-fit: cover; display: block;">
                    <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 25px; background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.9) 100%);">
                      <h3 style="font-size: 20px; color: #fff; font-weight: 700; margin: 0 0 8px 0;">
                        ${recipe2.title}
                      </h3>
                      <a href="${baseUrl}/recettes/${recipe2.slug}" style="color: #D4AF37; text-decoration: none; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">
                        Découvrir →
                      </a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
            ` : ''}
          </tr>
        `;
      }
    }

    return html;
  };

  const secondaryRecipesHTML = generateSecondaryRecipesHTML();

  const quoteHTML = data.tipOfWeek ? `
    <tr>
      <td style="background: #1a1a1a; padding: 80px 60px; text-align: center;">
        <div style="font-size: 60px; color: #D4AF37; margin-bottom: 30px; opacity: 0.5;">"</div>
        <p style="font-size: 28px; color: #fff; line-height: 1.5; font-weight: 300; font-style: italic; margin-bottom: 30px;">
          ${data.tipOfWeek}
        </p>
        <div style="font-size: 14px; color: #D4AF37; letter-spacing: 2px; text-transform: uppercase;">
          Conseil de Florent
        </div>
      </td>
    </tr>
  ` : '';

  const premiumCTAHTML = isFreeTier ? `
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
  <title>Newsletter Florent Food</title>
</head>
<body style="margin:0; padding:0; background:#000;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:700px; margin:0 auto; background:#000;">

    <!-- Hero -->
    <tr>
      <td style="position: relative; height: 500px; background: linear-gradient(135deg, #D4AF37 0%, #C77A4E 100%); display: flex; align-items: center; justify-content: center; text-align: center; padding: 60px 40px;">
        <div>
          <div style="font-size: 11px; letter-spacing: 3px; color: rgba(0,0,0,0.6); margin-bottom: 20px; text-transform: uppercase;">
            Édition du ${data.dateString}
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
        <p style="font-size: 20px; line-height: 1.7; color: #1a1a1a; font-weight: 300; margin: 0;">
          ${data.introMessage}
        </p>
        <div style="margin-top: 30px; font-size: 14px; color: #D4AF37; font-style: italic;">
          — Florent
        </div>
      </td>
    </tr>

    <!-- Featured Recipe -->
    <tr>
      <td style="background: #fff; margin-top: 2px; padding: 0; position: relative;">
        <img src="${toEmailSafeImageUrl(data.featuredRecipe.imageUrl)}" alt="${data.featuredRecipe.title}" style="width: 100%; height: 450px; object-fit: cover; display: block;">
        <div style="padding: 50px; background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%); position: absolute; bottom: 0; left: 0; right: 0;">
          <div style="font-size: 80px; font-weight: 900; color: #D4AF37; line-height: 1; margin-bottom: 10px; opacity: 0.3;">
            01
          </div>
          <h2 style="font-size: 38px; color: #fff; font-weight: 700; margin-bottom: 16px; text-transform: uppercase; letter-spacing: -0.5px;">
            ${data.featuredRecipe.title}
          </h2>
          <p style="font-size: 16px; color: rgba(255,255,255,0.9); line-height: 1.6; margin-bottom: 24px;">
            ${data.featuredRecipe.description || 'Une création exceptionnelle qui va éveiller vos papilles.'}
          </p>
          <a href="${baseUrl}/recettes/${data.featuredRecipe.slug}" style="display: inline-block; background: #D4AF37; color: #000; padding: 14px 32px; text-decoration: none; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700;">
            Voir la Recette
          </a>
        </div>
      </td>
    </tr>

    <!-- Grid Recipes -->
    <tr>
      <td>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #000;">
          ${secondaryRecipesHTML}
        </table>
      </td>
    </tr>

    ${quoteHTML}

    ${premiumCTAHTML}

    <!-- Footer -->
    <tr>
      <td style="background: #000; padding: 50px; text-align: center; border-top: 1px solid #333;">
        <div style="font-size: 24px; color: #D4AF37; font-weight: 900; margin-bottom: 20px; letter-spacing: 2px;">
          FLORENT FOOD
        </div>
        <p style="font-size: 11px; color: #666; line-height: 2; letter-spacing: 1px; text-transform: uppercase; margin: 0;">
          Haute Cuisine · L'Art de la Gourmandise<br>
          <a href="${baseUrl}/newsletter/unsubscribe?token={{unsubscribe_token}}" style="color: #D4AF37; text-decoration: none;">Se Désinscrire</a> ·
          <a href="${baseUrl}/newsletter/preferences?token={{preferences_token}}" style="color: #D4AF37; text-decoration: none;">Préférences</a>
        </p>
      </td>
    </tr>
  </table>

  <!-- Tracking Pixel -->
  <img src="${baseUrl}/api/newsletter/track/open?id={{newsletter_id}}&subscriber={{subscriber_id}}" width="1" height="1" style="display:none;" alt="">
</body>
</html>
  `.trim();
}
