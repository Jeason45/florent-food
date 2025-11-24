import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SignJWT } from 'jose';

// 🔒 SÉCURITÉ: JWT_SECRET est obligatoire
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required for authentication');
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validation email (RFC 5322 compliant)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    // Vérifier si l'abonné existe et est actif
    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!subscriber) {
      return NextResponse.json(
        { error: 'Aucun abonnement trouvé pour cet email' },
        { status: 404 }
      );
    }

    if (subscriber.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Abonnement non actif' },
        { status: 403 }
      );
    }

    // Créer un JWT token
    const token = await new SignJWT({
      subscriberId: subscriber.id,
      email: subscriber.email,
      subscriptionType: subscriber.subscriptionType
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30d') // Token valide 30 jours
      .sign(JWT_SECRET);

    // Créer la réponse avec le cookie
    const response = NextResponse.json({
      success: true,
      message: 'Connexion réussie',
      subscriber: {
        id: subscriber.id,
        email: subscriber.email,
        firstName: subscriber.firstName,
        subscriptionType: subscriber.subscriptionType
      }
    });

    // Ajouter le cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 // 30 jours en secondes
    });

    return response;

  } catch (error) {
    console.error('❌ Error logging in:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la connexion' },
      { status: 500 }
    );
  }
}
