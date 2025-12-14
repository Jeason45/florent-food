import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const newsletters = await prisma.newsletter.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        subject: true,
        status: true,
        type: true,
        recipientsCount: true,
        opensCount: true,
        clicksCount: true,
        scheduledAt: true,
        sentAt: true,
        createdAt: true,
        content: true,
        startDate: true,
        endDate: true,
        weekNumber: true,
        isVisibleOnSite: true,
        isActiveForNewSubscribers: true
      }
    });

    return NextResponse.json({
      success: true,
      newsletters: newsletters.map(n => ({
        id: n.id,
        subject: n.subject,
        status: n.status,
        type: n.type,
        sendTo: typeof n.content === 'object' && n.content !== null && 'sendTo' in n.content
          ? (n.content as any).sendTo
          : 'ALL',
        totalSent: n.recipientsCount,
        totalOpens: n.opensCount,
        totalClicks: n.clicksCount,
        scheduledFor: n.scheduledAt,
        sentAt: n.sentAt,
        createdAt: n.createdAt,
        startDate: n.startDate,
        endDate: n.endDate,
        weekNumber: n.weekNumber,
        isVisibleOnSite: n.isVisibleOnSite,
        isActiveForNewSubscribers: n.isActiveForNewSubscribers
      }))
    });
  } catch (error) {
    console.error('❌ Error fetching newsletters:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération' },
      { status: 500 }
    );
  }
}
