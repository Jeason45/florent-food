/**
 * Templates d'emails pour Florent Food
 * Version HTML simple et élégante
 */

interface EmailTemplateProps {
  firstName?: string;
  content: string;
  ctaText?: string;
  ctaLink?: string;
}

/**
 * Template de base pour tous les emails
 */
export function baseEmailTemplate({
  firstName,
  content,
  ctaText,
  ctaLink,
}: EmailTemplateProps): string {
  const greeting = firstName ? `Bonjour ${firstName},` : "Bonjour,";

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Florent Food</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background-color: #F4F1DE;
      color: #2D2D2D;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #FFFFFF;
    }
    .header {
      background: linear-gradient(135deg, #D4AF37, #C77A4E);
      padding: 40px 20px;
      text-align: center;
    }
    .logo {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 28px;
      font-weight: bold;
      color: #FFFFFF;
      margin: 0;
    }
    .subtitle {
      color: rgba(255, 255, 255, 0.9);
      font-size: 14px;
      margin: 8px 0 0 0;
    }
    .content {
      padding: 40px 30px;
      line-height: 1.7;
    }
    .greeting {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 20px;
      color: #2D2D2D;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #D4AF37, #C77A4E);
      color: #FFFFFF !important;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 50px;
      font-weight: 600;
      font-size: 16px;
      margin: 24px 0;
      transition: transform 0.2s;
    }
    .cta-button:hover {
      transform: translateY(-2px);
    }
    .footer {
      background-color: #2D2D2D;
      color: rgba(255, 255, 255, 0.7);
      padding: 30px;
      text-align: center;
      font-size: 14px;
    }
    .footer a {
      color: #D4AF37;
      text-decoration: none;
    }
    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, #D4AF37, transparent);
      margin: 30px 0;
    }
    .social-links {
      margin: 20px 0;
    }
    .social-links a {
      display: inline-block;
      margin: 0 10px;
      color: #D4AF37;
      text-decoration: none;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1 class="logo">Florent Food</h1>
      <p class="subtitle">La Haute Pâtisserie Accessible</p>
    </div>

    <!-- Content -->
    <div class="content">
      <p class="greeting">${greeting}</p>

      ${content}

      ${
        ctaText && ctaLink
          ? `
      <div style="text-align: center; margin: 30px 0;">
        <a href="${ctaLink}" class="cta-button">${ctaText}</a>
      </div>
      `
          : ""
      }

      <div class="divider"></div>

      <p style="font-size: 14px; color: #6B6B6B; margin-top: 30px;">
        À très bientôt,<br>
        <strong style="color: #2D2D2D;">Florent</strong><br>
        <span style="font-style: italic;">Créateur de gourmandises</span>
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="social-links">
        <a href="https://instagram.com/florentfood" target="_blank">Instagram</a>
        <a href="https://tiktok.com/@florentfood" target="_blank">TikTok</a>
        <a href="https://youtube.com/florentfood" target="_blank">YouTube</a>
      </div>

      <p style="margin: 20px 0 10px 0;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/newsletter/unsubscribe?email={{EMAIL}}" style="color: rgba(255, 255, 255, 0.5);">
          Se désinscrire
        </a>
      </p>

      <p style="font-size: 12px; color: rgba(255, 255, 255, 0.5); margin-top: 10px;">
        © ${new Date().getFullYear()} Florent Food. Tous droits réservés.<br>
        Fait avec ❤️ et passion pour la pâtisserie
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Email de bienvenue (inscription confirmée)
 */
export function welcomeEmail(firstName?: string): string {
  const content = `
    <p>Bienvenue dans la famille Florent Food ! 🎉</p>

    <p>
      Ton inscription est confirmée ! Je suis ravi de t'accueillir parmi les passionnés
      de cuisine et pâtisserie qui, comme toi, aiment découvrir de nouvelles recettes.
    </p>

    <p style="background-color: #FAF8F0; padding: 20px; border-radius: 8px; border-left: 4px solid #D4AF37;">
      💡 <strong>Astuce de chef :</strong> Commence toujours par lire la recette en entier
      avant de te lancer. C'est le secret des pros !
    </p>

    <p>
      <strong>Chaque semaine, tu recevras :</strong>
    </p>
    <ul style="line-height: 2;">
      <li>📖 <strong>5 recettes détaillées</strong> (pâtisserie, plats & apéros)</li>
      <li>📸 Des photos pas-à-pas pour réussir à tous les coups</li>
      <li>🎯 Mes astuces et conseils de chef</li>
      <li>🍰 Les coulisses de mes créations</li>
    </ul>

    <p>
      Tu peux aussi me suivre sur les réseaux sociaux pour encore plus de contenu :
    </p>
    <p style="text-align: center; margin: 20px 0;">
      <a href="https://instagram.com/florentfood" style="color: #D4AF37; margin: 0 10px;">📱 Instagram</a>
      <a href="https://tiktok.com/@florentfood" style="color: #D4AF37; margin: 0 10px;">🎵 TikTok</a>
      <a href="https://youtube.com/florentfood" style="color: #D4AF37; margin: 0 10px;">🎥 YouTube</a>
    </p>

    <p>
      À très vite pour ta première recette ! 👨‍🍳
    </p>
  `;

  return baseEmailTemplate({
    firstName,
    content,
    ctaText: "Découvrir toutes les recettes",
    ctaLink: `${process.env.NEXT_PUBLIC_SITE_URL}`,
  });
}

/**
 * Email confirmation d'inscription (double opt-in)
 */
export function confirmSubscriptionEmail(
  firstName: string | undefined,
  confirmationLink: string
): string {
  const content = `
    <p>Merci de ton intérêt pour Florent Food ! 🎉</p>

    <p>
      Pour finaliser ton inscription à ma newsletter et recevoir mes meilleures recettes
      chaque semaine, il te suffit de confirmer ton adresse email en cliquant sur le bouton ci-dessous.
    </p>

    <p style="background-color: #FAF8F0; padding: 20px; border-radius: 8px;">
      ⏱️ <strong>Ce lien est valide pendant 24 heures.</strong>
    </p>

    <p>
      Dès confirmation, tu recevras :
    </p>
    <ul style="line-height: 2;">
      <li>🎁 Mon e-book "10 Recettes Essentielles" (PDF gratuit)</li>
      <li>📧 Une newsletter hebdomadaire avec mes meilleures recettes</li>
      <li>🎥 Des vidéos techniques exclusives</li>
      <li>💬 Accès prioritaire à mes Lives pâtisserie</li>
    </ul>

    <p style="font-size: 14px; color: #6B6B6B; margin-top: 30px;">
      <em>Si tu n'as pas demandé à t'inscrire, tu peux ignorer cet email.</em>
    </p>
  `;

  return baseEmailTemplate({
    firstName,
    content,
    ctaText: "Confirmer mon inscription",
    ctaLink: confirmationLink,
  });
}

/**
 * Email notification admin (nouvelle inscription)
 */
export function adminNotificationEmail(
  subscriberEmail: string,
  subscriberFirstName?: string
): string {
  return `
    <h2>Nouvelle inscription newsletter</h2>
    <p><strong>Email :</strong> ${subscriberEmail}</p>
    ${subscriberFirstName ? `<p><strong>Prénom :</strong> ${subscriberFirstName}</p>` : ""}
    <p><strong>Date :</strong> ${new Date().toLocaleString("fr-FR")}</p>
    <hr>
    <p>Connectez-vous à votre <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin">CRM Admin</a> pour voir les détails.</p>
  `;
}

/**
 * Email de désinscription (confirmation)
 */
export function unsubscribeConfirmationEmail(firstName?: string): string {
  const content = `
    <p>Tu t'es désinscrit avec succès de ma newsletter.</p>

    <p>
      Je suis triste de te voir partir, mais je respecte ton choix ! 😔
    </p>

    <p style="background-color: #FAF8F0; padding: 20px; border-radius: 8px;">
      💡 <strong>Tu changeras peut-être d'avis ?</strong><br>
      Mes portes restent ouvertes si tu souhaites revenir dans la famille Florent Food.
    </p>

    <p>
      En attendant, tu peux toujours :
    </p>
    <ul style="line-height: 2;">
      <li>📱 Me suivre sur <a href="https://instagram.com/florentfood" style="color: #E07A5F;">Instagram</a> (140K followers)</li>
      <li>🎵 Regarder mes vidéos sur <a href="https://tiktok.com/@florentfood" style="color: #E07A5F;">TikTok</a> (400K followers)</li>
      <li>🍰 Découvrir mes <a href="${process.env.NEXT_PUBLIC_SITE_URL}/recettes" style="color: #E07A5F;">recettes gratuites</a></li>
    </ul>

    <p>
      Merci d'avoir fait partie de l'aventure, et à bientôt peut-être ! 🙏
    </p>
  `;

  return baseEmailTemplate({
    firstName,
    content,
  });
}
