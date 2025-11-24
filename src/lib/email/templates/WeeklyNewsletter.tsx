interface Recipe {
  title: string;
  imageUrl: string;
  url: string;
}

export function generateWeeklyNewsletter(recipes: Recipe[]): string {
  const recipesHTML = recipes.map(recipe => `
    <div style="margin-bottom: 24px; border-radius: 12px; overflow: hidden; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <img src="${recipe.imageUrl || 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=600&q=80'}" alt="${recipe.title}" style="width: 100%; height: 200px; object-fit: cover; display: block; border: 0;">
      <div style="padding: 20px;">
        <h3 style="margin: 0 0 12px 0; color: #D4AF37; font-size: 20px; font-weight: 600;">${recipe.title}</h3>
        <a href="${recipe.url}" style="color: #C77A4E; text-decoration: none; font-weight: 600; display: inline-block;">
          Voir la recette →
        </a>
      </div>
    </div>
  `).join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f9f9f9;">
  <div style="background: #ffffff; border-radius: 12px; overflow: hidden; margin: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
    <div style="background: #D4AF37; background-image: linear-gradient(135deg, #D4AF37 0%, #C77A4E 100%); color: #000; padding: 40px 30px; text-align: center;">
      <h1 style="margin: 0; font-size: 28px; font-weight: 700;">📬 Ta newsletter hebdo</h1>
    </div>

    <div style="padding: 40px 30px;">
      <p style="font-size: 18px; color: #D4AF37; font-weight: 600; margin-top: 0;">Hey !</p>

      <p style="margin-bottom: 24px;">Voici mes nouvelles recettes de la semaine 🎬</p>
      
      ${recipesHTML}
      
      <div style="margin-top: 32px; padding: 24px; background: rgba(212,175,55,0.1); border-radius: 12px; border: 2px solid rgba(212,175,55,0.2);">
        <h3 style="margin-top: 0; color: #D4AF37; font-size: 20px; font-weight: 600;">🌟 Passe en PREMIUM</h3>
        <p style="margin-bottom: 16px; color: #333;">Accède à toutes mes recettes exclusives, vidéos HD, et bien plus encore pour seulement 12€/mois</p>
        <a href="${process.env.NEXT_PUBLIC_URL}/premium" style="background: #D4AF37; background-image: linear-gradient(135deg, #D4AF37 0%, #C77A4E 100%); color: #000; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
          Découvrir Premium
        </a>
      </div>

      <p style="margin-top: 32px; margin-bottom: 0;"><strong style="color: #333;">À la semaine prochaine !</strong><br>Florent</p>
    </div>

    <div style="background: #1a1410; color: rgba(255,255,255,0.7); padding: 30px; text-align: center; font-size: 14px;">
      <p style="margin: 0 0 10px 0;">Florent Food - Créateur de contenu gourmand</p>
      <p style="margin: 0;">
        <a href="${process.env.NEXT_PUBLIC_URL}/newsletter/unsubscribe" style="color: #D4AF37; text-decoration: none;">Se désinscrire</a>
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
