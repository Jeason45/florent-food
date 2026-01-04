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

    // Récupérer toutes les newsletters reçues avec tracking
    const newsletterDeliveries = await prisma.newsletterSubscriberDelivery.findMany({
      where: {
        subscriberId
      },
      include: {
        newsletter: {
          select: {
            id: true,
            subject: true,
            type: true,
            sentAt: true,
          }
        }
      },
      orderBy: {
        sentAt: 'desc'
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
      totalNewslettersReceived: newsletterDeliveries.length,
      totalEmailsSent: mailLogs.length,
      totalOpens: subscriber.totalOpens,
      totalClicks: subscriber.totalClicks,
      openRate: newsletterDeliveries.length > 0
        ? Math.round((newsletterDeliveries.filter(d => d.openedAt).length / newsletterDeliveries.length) * 100)
        : 0,
      clickRate: newsletterDeliveries.length > 0
        ? Math.round((newsletterDeliveries.filter(d => d.clickedAt).length / newsletterDeliveries.length) * 100)
        : 0,
      lastActivity: subscriber.lastOpenedAt || subscriber.subscribedAt,
    };

    return NextResponse.json({
      subscriber,
      stats,
      newsletterDeliveries: newsletterDeliveries.map(d => ({
        id: d.id,
        newsletterId: d.newsletterId,
        newsletterSubject: d.newsletter.subject,
        newsletterType: d.newsletter.type,
        status: d.status,
        sentAt: d.sentAt,
        deliveredAt: d.deliveredAt,
        openedAt: d.openedAt,
        clickedAt: d.clickedAt,
        provider: d.provider,
        error: d.error,
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
