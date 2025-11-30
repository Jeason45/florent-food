import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/emailUtils';
import { welcomeEmail } from '@/lib/email/templates';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/rateLimit';
import crypto from 'crypto';

// Template email de confirmation avec bouton compatible tous clients
function generateConfirmationEmail(confirmUrl: string): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmez votre inscription</title>
</head>
<body style="margin:0; padding:0; background-color:#F4F1DE; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; margin:0 auto; background-color:#FFFFFF;">
    <!-- Header -->
    <tr>
      <td style="background-color:#D4AF37; padding:40px 20px; text-align:center;" bgcolor="#D4AF37">
        <h1 style="color:#FFFFFF; font-size:28px; margin:0; font-family: Georgia, serif;">Florent Food</h1>
        <p style="color:rgba(255,255,255,0.9); font-size:14px; margin:8px 0 0 0;">Cuisine & Pâtisserie</p>
      </td>
    </tr>

    <!-- Content -->
    <tr>
      <td style="padding:40px 30px;">
        <h2 style="color:#2D2D2D; font-size:24px; margin:0 0 20px 0;">Confirmez votre inscription</h2>
        <p style="color:#2D2D2D; font-size:16px; line-height:1.6; margin:0 0 20px 0;">
          Merci de votre intérêt pour la newsletter Florent Food !
        </p>
        <p style="color:#2D2D2D; font-size:16px; line-height:1.6; margin:0 0 30px 0;">
          Pour finaliser votre inscription et recevoir chaque semaine une newsletter avec mes meilleures recettes, cliquez sur le bouton ci-dessous :
        </p>

        <!-- Bouton avec bgcolor -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center">
              <table cellpadding="0" cellspacing="0" border="0" style="background:#D4AF37; border-radius:8px;">
                <tr>
                  <td style="padding:16px 40px; background:#D4AF37; border-radius:8px;" bgcolor="#D4AF37">
                    <a href="${confirmUrl}" target="_blank" style="color:#000000; font-size:16px; font-weight:bold; text-decoration:none; font-family:Arial,sans-serif; display:block;">
                      Confirmer mon inscription
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <p style="color:#666666; font-size:14px; margin:30px 0 0 0;">
          Ce lien est valide pendant 24 heures.
        </p>
        <p style="color:#666666; font-size:14px; margin:10px 0 0 0;">
          Si vous n'avez pas demandé cette inscription, ignorez cet email.
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color:#2D2D2D; padding:30px; text-align:center;" bgcolor="#2D2D2D">
        <p style="color:rgba(255,255,255,0.7); font-size:14px; margin:0;">
          © ${new Date().getFullYear()} Florent Food. Tous droits réservés.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export async function POST(request: NextRequest) {
  try {
    const { email, source } = await request.json();

    // Rate limiting basé sur l'IP
    const identifier = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rateLimitResult = checkRateLimit(`subscribe:${identifier}`, {
      windowMs: 60 * 1000, // 1 minute
      maxRequests: 3 // 3 inscriptions max par minute par IP
    });

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Trop de tentatives. Veuillez réessayer dans quelques instants.' },
        {
          status: 429,
          headers: getRateLimitHeaders(rateLimitResult)
        }
      );
    }

    // Validation email (RFC 5322 compliant)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    // Vérifier si l'email existe déjà
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existing) {
      // Si déjà abonné et actif
      if (existing.status === 'ACTIVE') {
        return NextResponse.json(
          { error: 'Cet email est déjà inscrit !' },
          { status: 400 }
        );
      }

      // Si désabonné ou en attente, on réenvoie l'email de confirmation
      if (existing.status === 'UNSUBSCRIBED' || existing.status === 'PENDING') {
        // Générer nouveau token
        const confirmToken = crypto.randomBytes(32).toString('hex');
        const confirmTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

        await prisma.newsletterSubscriber.update({
          where: { id: existing.id },
          data: {
            status: 'PENDING',
            confirmToken,
            confirmTokenExpiry
          }
        });

        // Envoyer l'email de confirmation
        const confirmUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/newsletter/confirm?token=${confirmToken}`;

        await sendEmail({
          to: email.toLowerCase(),
          subject: '✉️ Confirmez votre inscription à Florent Food',
          htmlContent: generateConfirmationEmail(confirmUrl),
          type: 'newsletter_confirmation',
          subscriberId: existing.id
        });

        return NextResponse.json({
          success: true,
          message: 'Un email de confirmation vous a été envoyé. Vérifiez votre boîte de réception !'
        });
      }
    }

    // Générer token de confirmation
    const confirmToken = crypto.randomBytes(32).toString('hex');
    const confirmTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    // Créer un nouveau subscriber en PENDING
    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email: email.toLowerCase(),
        status: 'PENDING',
        subscriptionType: 'FREE',
        source: source || 'website',
        confirmToken,
        confirmTokenExpiry
      }
    });

    console.log('✅ New subscriber created (pending confirmation):', email);

    // Envoyer l'email de confirmation
    const confirmUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/newsletter/confirm?token=${confirmToken}`;

    const emailResult = await sendEmail({
      to: email.toLowerCase(),
      subject: '✉️ Confirmez votre inscription à Florent Food',
      htmlContent: generateConfirmationEmail(confirmUrl),
      type: 'newsletter_confirmation',
      subscriberId: subscriber.id
    });

    if (!emailResult.success) {
      console.warn('⚠️ Confirmation email not sent:', emailResult.error);
      // On garde quand même le subscriber en PENDING
    }

    return NextResponse.json({
      success: true,
      message: 'Un email de confirmation vous a été envoyé. Vérifiez votre boîte de réception !',
      subscriberId: subscriber.id
    });

  } catch (error) {
    console.error('❌ Error subscribing to newsletter:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l inscription' },
      { status: 500 }
    );
  }
}
