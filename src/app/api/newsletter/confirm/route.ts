import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: 'Token manquant' }, { status: 400 });
    }

    const subscriber = await prisma.newsletterSubscriber.findFirst({
      where: {
        confirmToken: token,
        confirmTokenExpiry: { gte: new Date() }
      }
    });

    if (!subscriber) {
      return NextResponse.json(
        { error: 'Token invalide ou expiré' },
        { status: 400 }
      );
    }

    await prisma.newsletterSubscriber.update({
      where: { id: subscriber.id },
      data: {
        status: 'ACTIVE',
        confirmedAt: new Date(),
        confirmToken: null,
        confirmTokenExpiry: null
      }
    });

    console.log('✅ Subscriber confirmed:', subscriber.email);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Error confirming subscription:', error);
    return NextResponse.json(
      { error: 'Erreur de confirmation' },
      { status: 500 }
    );
  }
}
