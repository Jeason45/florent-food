import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { subscriberId } = await request.json();

    if (!subscriberId) {
      return NextResponse.json({ active: false });
    }

    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { id: subscriberId },
      select: { status: true }
    });

    if (!subscriber || subscriber.status !== 'ACTIVE') {
      return NextResponse.json({ active: false });
    }

    return NextResponse.json({ active: true });

  } catch (error) {
    console.error('Error verifying subscriber:', error);
    return NextResponse.json({ active: false });
  }
}
