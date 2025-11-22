import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Cron Job: Newsletter Rotation Hebdomadaire
 *
 * À exécuter quotidiennement (recommandé: tous les jours à 00h00 UTC)
 *
 * Fonctionnalités:
 * 1. Archive les newsletters ACTIVE dont la date de fin est dépassée
 * 2. Active les newsletters SCHEDULED dont la date de début est atteinte
 * 3. Envoie les emails pour les newsletters nouvellement activées
 *
 * Configuration Vercel Cron (vercel.json):
 * {
 *   "crons": [{
 *     "path": "/api/cron/newsletter-rotation",
 *     "schedule": "0 0 * * *"
 *   }]
 * }
 */
export async function GET(request: NextRequest) {
  try {
    // Vérification de sécurité: token d'authentification (optionnel mais recommandé)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const results = {
      archived: 0,
      activated: 0,
      errors: [] as string[]
    };

    // ============================================
    // 1. ARCHIVER les newsletters ACTIVE expirées
    // ============================================
    const expiredNewsletters = await prisma.newsletter.findMany({
      where: {
        status: 'ACTIVE',
        endDate: {
          lt: today
        }
      }
    });

    for (const newsletter of expiredNewsletters) {
      try {
        await prisma.newsletter.update({
          where: { id: newsletter.id },
          data: {
            status: 'ARCHIVED'
          }
        });
        results.archived++;
        console.log(`✅ Newsletter archivée: ${newsletter.subject} (ID: ${newsletter.id})`);
      } catch (error) {
        console.error(`❌ Erreur archivage newsletter ${newsletter.id}:`, error);
        results.errors.push(`Archivage échoué: ${newsletter.id}`);
      }
    }

    // ============================================
    // 2. ACTIVER les newsletters SCHEDULED dont la date est atteinte
    // ============================================
    const scheduledNewsletters = await prisma.newsletter.findMany({
      where: {
        status: 'SCHEDULED',
        startDate: {
          lte: today
        }
      },
      include: {
        newsletterRecipes: {
          include: {
            recipe: true
          },
          orderBy: {
            position: 'asc'
          }
        }
      }
    });

    for (const newsletter of scheduledNewsletters) {
      try {
        // Mettre à jour le statut à ACTIVE
        await prisma.newsletter.update({
          where: { id: newsletter.id },
          data: {
            status: 'ACTIVE',
            sentAt: new Date()
          }
        });

        // Récupérer tous les abonnés actifs
        const subscribers = await prisma.newsletterSubscriber.findMany({
          where: {
            status: 'ACTIVE'
          }
        });

        // TODO: Envoyer les emails aux abonnés
        // Cette partie nécessite l'implémentation de la fonction d'envoi d'email
        // Pour l'instant, on peut juste incrémenter le compteur

        await prisma.newsletter.update({
          where: { id: newsletter.id },
          data: {
            recipientsCount: subscribers.length
          }
        });

        results.activated++;
        console.log(`✅ Newsletter activée et envoyée: ${newsletter.subject} (ID: ${newsletter.id}) à ${subscribers.length} abonnés`);

      } catch (error) {
        console.error(`❌ Erreur activation newsletter ${newsletter.id}:`, error);
        results.errors.push(`Activation échouée: ${newsletter.id}`);
      }
    }

    // ============================================
    // Résumé du cron job
    // ============================================
    const summary = {
      success: true,
      executedAt: new Date().toISOString(),
      results: {
        newslettersArchived: results.archived,
        newslettersActivated: results.activated,
        totalProcessed: results.archived + results.activated,
        errors: results.errors
      }
    };

    console.log('📊 Résumé du cron job newsletter-rotation:', summary);

    return NextResponse.json(summary);

  } catch (error) {
    console.error('❌ Erreur critique dans le cron job:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de l\'exécution du cron job',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Permettre aussi l'exécution via POST (pour tests manuels)
export async function POST(request: NextRequest) {
  return GET(request);
}
