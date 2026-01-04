import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/admin/subscribers/[id]/history
 *
 * Récupère l'historique complet d'un abonné :
 * - Newsletters reçues avec statut (envoyé, ouvert, cliqué)
 * - Tous les emails envoyés (MailLog)
 * - Statistiques globales (total opens, clicks, etc.)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: subscriberId } = await params;

    // Vérifier que l'abonné existe
    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { id: subscriberId },
      select: {
        id: true,
        email: true,
        firstName: true,
        status: true,
        subscriptionType: true,
        totalOpens: true,
        totalClicks: true,
        subscribedAt: true,
        unsubscribedAt: true,
        lastOpenedAt: true,
      }
    });

    if (!subscriber) {
      return NextResponse.json(
        { error: 'Abonné introuvable' },
        { status: 404 }
      );
    }

    // Récupérer toutes les newsletters envoyées (depuis mailLogs pour avoir l'historique complet)
    const newsletterMailLogs = await prisma.mailLog.findMany({
      where: {
        subscriberId,
        type: 'newsletter_weekly',
        status: 'sent'
      },
      orderBy: {
        sentAt: 'desc'
      },
      select: {
        id: true,
        type: true,
        subject: true,
        status: true,
        sentAt: true,
        deliveredAt: true,
        openedAt: true,
        clickedAt: true,
        provider: true,
        error: true,
        newsletterId: true,
      }
    });

    // Récupérer tous les emails envoyés (MailLog)
    const mailLogs = await prisma.mailLog.findMany({
      where: {
        subscriberId
      },
      orderBy: {
        sentAt: 'desc'
      },
      select: {
        id: true,
        type: true,
        subject: true,
        status: true,
        sentAt: true,
        deliveredAt: true,
        openedAt: true,
        clickedAt: true,
        provider: true,
        error: true,
        newsletterId: true,
      }
    });

    // Récupérer les événements de newsletter (opens, clicks)
    const events = await prisma.newsletterEvent.findMany({
      where: {
        subscriberId
      },
      include: {
        newsletter: {
          select: {
            id: true,
            subject: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 100 // Limiter à 100 derniers événements
    });

    // Calculer des statistiques
    const stats = {
      totalNewslettersReceived: newsletterMailLogs.length,
      totalEmailsSent: mailLogs.length,
      totalOpens: subscriber.totalOpens,
      totalClicks: subscriber.totalClicks,
      openRate: newsletterMailLogs.length > 0
        ? Math.round((newsletterMailLogs.filter(d => d.openedAt).length / newsletterMailLogs.length) * 100)
        : 0,
      clickRate: newsletterMailLogs.length > 0
        ? Math.round((newsletterMailLogs.filter(d => d.clickedAt).length / newsletterMailLogs.length) * 100)
        : 0,
      lastActivity: subscriber.lastOpenedAt || subscriber.subscribedAt,
    };

    return NextResponse.json({
      subscriber,
      stats,
      newsletterDeliveries: newsletterMailLogs.map(log => ({
        id: log.id,
        newsletterId: log.newsletterId || '',
        newsletterSubject: log.subject,
        newsletterType: log.type,
        status: log.status,
        sentAt: log.sentAt,
        deliveredAt: log.deliveredAt,
        openedAt: log.openedAt,
        clickedAt: log.clickedAt,
        provider: log.provider,
        error: log.error,
      })),
      mailLogs: mailLogs.map(log => ({
        id: log.id,
        type: log.type,
        subject: log.subject,
        status: log.status,
        sentAt: log.sentAt,
        deliveredAt: log.deliveredAt,
        openedAt: log.openedAt,
        clickedAt: log.clickedAt,
        provider: log.provider,
        error: log.error,
        newsletterId: log.newsletterId,
      })),
      recentEvents: events.map(e => ({
        id: e.id,
        eventType: e.eventType,
        newsletterId: e.newsletterId,
        newsletterSubject: e.newsletter?.subject,
        metadata: e.metadata,
        createdAt: e.createdAt,
      }))
    });

  } catch (error) {
    console.error('❌ Error fetching subscriber history:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de l\'historique' },
      { status: 500 }
    );
  }
}
