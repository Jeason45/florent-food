import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      totalSubscribers,
      freeSubscribers,
      premiumSubscribers,
      thisMonthSubscribers
    ] = await Promise.all([
      prisma.newsletterSubscriber.count({
        where: { status: 'ACTIVE' }
      }),
      prisma.newsletterSubscriber.count({
        where: { status: 'ACTIVE', subscriptionType: 'FREE' }
      }),
      prisma.newsletterSubscriber.count({
        where: { status: 'ACTIVE', subscriptionType: 'PREMIUM' }
      }),
      prisma.newsletterSubscriber.count({
        where: {
          status: 'ACTIVE',
          subscribedAt: { gte: firstDayOfMonth }
        }
      })
    ]);

    return NextResponse.json({
      totalSubscribers,
      freeSubscribers,
      premiumSubscribers,
      thisMonthSubscribers
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
