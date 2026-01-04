import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/admin/newsletter/management
 *
 * Récupère les données de gestion pour toutes les newsletters :
 * - Abonnés qui ont reçu la newsletter
 * - Abonnés dans la file d'attente
 * - Doublons détectés (même email reçu plusieurs fois)
 */
export async function GET(request: NextRequest) {
  try {
    // Récupérer toutes les newsletters
    const newsletters = await prisma.newsletter.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        subject: true,
        status: true,
        sentAt: true,
        createdAt: true,
      }
    });

    // Pour chaque newsletter, récupérer les données de gestion
    const managementData = await Promise.all(
      newsletters.map(async (newsletter) => {
        // 1. Abonnés qui ont reçu la newsletter (depuis mailLogs)
        const receivedLogs = await prisma.mailLog.findMany({
          where: {
            newsletterId: newsletter.id,
            type: 'newsletter_weekly',
            status: 'sent'
          },
          include: {
            subscriber: {
              select: {
                id: true,
                email: true,
                firstName: true,
                status: true,
              }
            }
          },
          orderBy: {
            sentAt: 'desc'
          }
        });

        // 2. Abonnés dans la file d'attente
        const queuedEmails = await prisma.emailQueue.findMany({
          where: {
            newsletterId: newsletter.id,
            status: 'PENDING'
          },
          orderBy: {
            scheduledFor: 'asc'
          }
        });

        // Récupérer les données des abonnés pour les emails en file d'attente
        const queuedSubscriberIds = queuedEmails
          .map(q => q.subscriberId)
          .filter((id): id is string => id !== null);

        const queuedSubscribers = await prisma.newsletterSubscriber.findMany({
          where: {
            id: { in: queuedSubscriberIds }
          },
          select: {
            id: true,
            email: true,
            firstName: true,
            status: true,
          }
        });

        // Créer un Map pour un accès rapide aux données des abonnés
        const subscriberMap = new Map(
          queuedSubscribers.map(sub => [sub.id, sub])
        );

        // 3. Détecter les doublons (même subscriberId avec plusieurs envois)
        const emailsBySubscriber = new Map<string, typeof receivedLogs>();
        const duplicates: Array<{
          subscriberId: string;
          email: string;
          firstName: string | null;
          count: number;
          sendDates: string[];
        }> = [];

        receivedLogs.forEach(log => {
          if (log.subscriberId) {
            const existing = emailsBySubscriber.get(log.subscriberId) || [];
            existing.push(log);
            emailsBySubscriber.set(log.subscriberId, existing);
          }
        });

        // Identifier les doublons (plus d'un envoi)
        emailsBySubscriber.forEach((logs, subscriberId) => {
          if (logs.length > 1 && logs[0].subscriber) {
            duplicates.push({
              subscriberId,
              email: logs[0].subscriber.email,
              firstName: logs[0].subscriber.firstName,
              count: logs.length,
              sendDates: logs.map(l => l.sentAt.toISOString())
            });
          }
        });

        return {
          newsletter: {
            id: newsletter.id,
            subject: newsletter.subject,
            status: newsletter.status,
            sentAt: newsletter.sentAt,
            createdAt: newsletter.createdAt,
          },
          received: receivedLogs.map(log => ({
            id: log.id,
            subscriberId: log.subscriberId,
            email: log.subscriber?.email || log.to,
            firstName: log.subscriber?.firstName,
            subscriberStatus: log.subscriber?.status,
            sentAt: log.sentAt,
            openedAt: log.openedAt,
            clickedAt: log.clickedAt,
            provider: log.provider,
          })),
          queued: queuedEmails.map(q => {
            const subscriber = q.subscriberId ? subscriberMap.get(q.subscriberId) : null;
            return {
              id: q.id,
              subscriberId: q.subscriberId,
              email: subscriber?.email || q.to,
              firstName: subscriber?.firstName,
              subscriberStatus: subscriber?.status,
              scheduledFor: q.scheduledFor,
              attempts: q.attempts,
              priority: q.priority,
            };
          }),
          duplicates,
          stats: {
            totalReceived: receivedLogs.length,
            totalQueued: queuedEmails.length,
            totalDuplicates: duplicates.length,
            uniqueRecipients: emailsBySubscriber.size,
          }
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: managementData
    });

  } catch (error) {
    console.error('❌ Error fetching newsletter management data:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données de gestion' },
      { status: 500 }
    );
  }
}
