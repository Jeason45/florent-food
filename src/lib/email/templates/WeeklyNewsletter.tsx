interface Recipe {
  title: string;
  imageUrl: string;
  url: string;
}

export function generateWeeklyNewsletter(recipes: Recipe[]): string {
  const recipesHTML = recipes.map(recipe => `
    <div style="margin-bottom: 24px; border-radius: 12px; overflow: hidden; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <img src="${recipe.imageUrl}" alt="${recipe.title}" style="width: 100%; height: 200px; object-fit: cover;">
      <div style="padding: 20px;">
        <h3 style="margin: 0 0 12px 0; color: #D4AF37; font-size: 20px;">${recipe.title}</h3>
        <a href="${recipe.url}" style="color: #C77A4E; text-decoration: none; font-weight: 600;">
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
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 0;
      background-color: #f9f9f9;
    }
    .container {
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      margin: 20px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #D4AF37 0%, #C77A4E 100%);
      color: #000;
      padding: 40px 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    .content {
      padding: 40px 30px;
    }
    .footer {
      background: #1a1410;
      color: rgba(255,255,255,0.7);
      padding: 30px;
      text-align: center;
      font-size: 14px;
    }
    .footer a {
      color: #D4AF37;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📬 Ta newsletter hebdo</h1>
    </div>
    
    <div class="content">
      <p style="font-size: 18px; color: #D4AF37; font-weight: 600;">Hey !</p>
      
      <p>Voici mes nouvelles recettes de la semaine 🎬</p>
      
      ${recipesHTML}
      
      <div style="margin-top: 32px; padding: 24px; background: linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(199,122,78,0.1) 100%); border-radius: 12px; border: 2px solid rgba(212,175,55,0.2);">
        <h3 style="margin-top: 0; color: #D4AF37;">🌟 Passe en PREMIUM</h3>
        <p style="margin-bottom: 16px;">Accède à toutes mes recettes exclusives, vidéos HD, et bien plus encore pour seulement 12€/mois</p>
        <a href="${process.env.NEXT_PUBLIC_URL}/premium" style="background: linear-gradient(135deg, #D4AF37 0%, #C77A4E 100%); color: #000; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
          Découvrir Premium
        </a>
      </div>
      
      <p style="margin-top: 32px;"><strong>À la semaine prochaine !</strong><br>Florent</p>
    </div>
    
    <div class="footer">
      <p>Florent Food - Créateur de contenu gourmand</p>
      <p>
        <a href="${process.env.NEXT_PUBLIC_URL}/newsletter/unsubscribe">Se désinscrire</a>
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
