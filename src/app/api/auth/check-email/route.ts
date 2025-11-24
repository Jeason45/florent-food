import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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

    // Vérifier si l'email existe dans les abonnés actifs
    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!subscriber) {
      return NextResponse.json({
        exists: false,
        message: 'Email non trouvé'
      });
    }

    // Vérifier le statut
    if (subscriber.status === 'ACTIVE') {
      return NextResponse.json({
        exists: true,
        status: 'active',
        subscriberId: subscriber.id
      });
    } else if (subscriber.status === 'PENDING') {
      return NextResponse.json({
        exists: true,
        status: 'pending',
        message: 'Inscription en attente de confirmation'
      });
    } else if (subscriber.status === 'UNSUBSCRIBED') {
      return NextResponse.json({
        exists: true,
        status: 'unsubscribed',
        message: 'Abonnement résilié'
      });
    }

    return NextResponse.json({
      exists: false
    });

  } catch (error) {
    console.error('❌ Error checking email:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la vérification' },
      { status: 500 }
    );
  }
}
