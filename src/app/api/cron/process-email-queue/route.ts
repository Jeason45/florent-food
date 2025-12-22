import { NextRequest, NextResponse } from 'next/server';
import { processEmailQueue, getQueueStats } from '@/lib/emailUtils';

/**
 * Cron Job: Process Email Queue
 *
 * Exécution: Tous les jours à 00:05 UTC (1h05 Paris heure d'hiver, 2h05 heure d'été)
 * Schedule: "5 0 * * *"
 *
 * Fonctionnalités:
 * - Traite les emails en file d'attente (quota Resend dépassé la veille)
 * - Envoie les emails en respectant le quota journalier (100/jour)
 * - Les emails non envoyés restent en file pour le lendemain
 *
 * Configuration Coolify/Vercel Cron:
 * {
 *   "crons": [{
 *     "path": "/api/cron/process-email-queue",
 *     "schedule": "5 0 * * *"
 *   }]
 * }
 */
export async function GET(request: NextRequest) {
  try {
    // Vérification de sécurité: token d'authentification
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('📬 Starting email queue processing...');

    // Get initial stats
    const statsBefore = await getQueueStats();
    console.log('📊 Queue stats before processing:', statsBefore);

    // Process the queue
    const result = await processEmailQueue();

    // Get final stats
    const statsAfter = await getQueueStats();

    const summary = {
      success: true,
      executedAt: new Date().toISOString(),
      results: {
        processed: result.processed,
        sent: result.sent,
        failed: result.failed,
        remaining: result.remaining,
      },
      quota: {
        usedToday: statsAfter.quotaUsedToday,
        remaining: statsAfter.quotaRemaining,
        limit: 100,
      },
      queue: {
        pendingBefore: statsBefore.pending,
        pendingAfter: statsAfter.pending,
      },
    };

    console.log('📊 Email queue processing complete:', summary);

    return NextResponse.json(summary);

  } catch (error) {
    console.error('❌ Error processing email queue:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error processing email queue',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Allow POST for manual triggering
export async function POST(request: NextRequest) {
  return GET(request);
}
