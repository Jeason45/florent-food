export function generateWelcomeEmail(firstName?: string): string {
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
      font-size: 32px;
      font-weight: 700;
    }
    .content {
      padding: 40px 30px;
    }
    .content h2 {
      color: #D4AF37;
      font-size: 24px;
      margin-top: 0;
    }
    .content p {
      margin: 16px 0;
      font-size: 16px;
    }
    .cta {
      text-align: center;
      margin: 32px 0;
    }
    .cta a {
      background: linear-gradient(135deg, #D4AF37 0%, #C77A4E 100%);
      color: #000;
      padding: 16px 32px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      display: inline-block;
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
      <h1>🎉 Bienvenue chez Florent Food !</h1>
    </div>
    
    <div class="content">
      <h2>Salut ${firstName || 'toi'} !</h2>
      
      <p>Merci de rejoindre la communauté Florent Food ! 🎬</p>
      
      <p>Tu vas maintenant recevoir chaque semaine :</p>
      <ul>
        <li>📧 Mes meilleures recettes faciles</li>
        <li>🎥 Des tips et astuces en cuisine</li>
        <li>✨ Du contenu exclusif avant tout le monde</li>
      </ul>
      
      <p>En attendant, voici 3 recettes gratuites pour commencer :</p>
      
      <div class="cta">
        <a href="${process.env.NEXT_PUBLIC_URL || 'http://localhost:3001'}/recettes">
          Découvrir les recettes
        </a>
      </div>
      
      <p><strong>À très vite !</strong><br>Florent</p>
    </div>
    
    <div class="footer">
      <p>Florent Food - Créateur de contenu gourmand</p>
      <p>
        <a href="${process.env.NEXT_PUBLIC_URL || 'http://localhost:3001'}/newsletter/unsubscribe">Se désinscrire</a>
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
