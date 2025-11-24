import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/emailUtils';
import { welcomeEmail } from '@/lib/email/templates';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/rateLimit';
import crypto from 'crypto';

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
          htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #D4AF37; text-align: center;">Florent Food</h1>
              <h2>Confirmez votre inscription</h2>
              <p>Merci de votre intérêt pour la newsletter Florent Food !</p>
              <p>Pour finaliser votre inscription, cliquez sur le bouton ci-dessous :</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${confirmUrl}" style="background: linear-gradient(to right, #D4AF37, #C77A4E); color: #000; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                  Confirmer mon inscription
                </a>
              </div>
              <p style="color: #666; font-size: 14px;">Ce lien est valide pendant 24 heures.</p>
              <p style="color: #666; font-size: 14px;">Si vous n'avez pas demandé cette inscription, ignorez cet email.</p>
            </div>
          `,
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
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #D4AF37; text-align: center;">Florent Food</h1>
          <h2>Confirmez votre inscription</h2>
          <p>Merci de votre intérêt pour la newsletter Florent Food !</p>
          <p>Pour finaliser votre inscription, cliquez sur le bouton ci-dessous :</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${confirmUrl}" style="background: linear-gradient(to right, #D4AF37, #C77A4E); color: #000; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              Confirmer mon inscription
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">Ce lien est valide pendant 24 heures.</p>
          <p style="color: #666; font-size: 14px;">Si vous n'avez pas demandé cette inscription, ignorez cet email.</p>
        </div>
      `,
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
