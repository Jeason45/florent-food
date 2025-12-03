import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/emailUtils';
import { welcomeEmail } from '@/lib/email/templates';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret');

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Token de confirmation manquant' },
        { status: 400 }
      );
    }

    // Chercher l'abonné avec ce token
    const subscriber = await prisma.newsletterSubscriber.findFirst({
      where: {
        confirmToken: token,
        status: 'PENDING'
      }
    });

    if (!subscriber) {
      return NextResponse.json(
        { error: 'Token invalide ou déjà utilisé' },
        { status: 404 }
      );
    }

    // Vérifier l'expiration du token (24h)
    if (subscriber.confirmTokenExpiry && subscriber.confirmTokenExpiry < new Date()) {
      return NextResponse.json(
        { error: 'Ce lien de confirmation a expiré. Veuillez vous réinscrire.' },
        { status: 400 }
      );
    }

    // Activer l'abonné
    await prisma.newsletterSubscriber.update({
      where: { id: subscriber.id },
      data: {
        status: 'ACTIVE',
        confirmToken: null,
        confirmTokenExpiry: null,
        subscribedAt: new Date()
      }
    });

    console.log('✅ Subscriber confirmed:', subscriber.email);

    // Envoyer l'email de bienvenue
    const emailHtml = welcomeEmail(subscriber.firstName || undefined, subscriber.email);

    await sendEmail({
      to: subscriber.email,
      subject: '🎉 Bienvenue chez Florent Food !',
      htmlContent: emailHtml,
      type: 'newsletter_welcome',
      subscriberId: subscriber.id
    });

    // Créer un JWT token pour auto-login
    const authToken = await new SignJWT({
      subscriberId: subscriber.id,
      email: subscriber.email,
      subscriptionType: subscriber.subscriptionType
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30d')
      .sign(JWT_SECRET);

    // Rediriger vers la page d'accueil avec message de succès ET cookie d'auth
    const redirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}?confirmed=true`;
    const response = NextResponse.redirect(redirectUrl);

    // Ajouter le cookie d'authentification (auto-login)
    response.cookies.set('auth-token', authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 // 30 jours
    });

    console.log('🔐 Auto-login cookie set for:', subscriber.email);

    return response;

  } catch (error) {
    console.error('❌ Error confirming subscription:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la confirmation' },
      { status: 500 }
    );
  }
}
