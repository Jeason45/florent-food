/**
 * Script d'analyse complète du système de quota d'emails
 * Pour comprendre pourquoi 79 emails au lieu de 100
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fonction pour obtenir le début de la journée en UTC
function getTodayStart() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
}

function getTomorrowStart() {
  const today = getTodayStart();
  return new Date(today.getTime() + 24 * 60 * 60 * 1000);
}

async function analyzeEmailQuota() {
  try {
    console.log('═══════════════════════════════════════════════════════════');
    console.log('📊 ANALYSE COMPLÈTE DU SYSTÈME DE QUOTA D\'EMAILS');
    console.log('═══════════════════════════════════════════════════════════\n');

    const now = new Date();
    const todayStart = getTodayStart();
    const tomorrowStart = getTomorrowStart();

    console.log('🕐 INFORMATIONS TEMPORELLES:');
    console.log(`   Maintenant (locale): ${now.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}`);
    console.log(`   Maintenant (UTC): ${now.toISOString()}`);
    console.log(`   Début journée UTC: ${todayStart.toISOString()}`);
    console.log(`   Fin journée UTC: ${tomorrowStart.toISOString()}`);
    console.log('');

    // 1. TOUS LES EMAILS RESEND ENVOYÉS AUJOURD'HUI
    console.log('═══════════════════════════════════════════════════════════');
    console.log('1️⃣  EMAILS RESEND ENVOYÉS AUJOURD\'HUI (UTC)');
    console.log('═══════════════════════════════════════════════════════════\n');

    const resendEmailsToday = await prisma.mailLog.findMany({
      where: {
        provider: 'resend',
        status: 'sent',
        sentAt: {
          gte: todayStart,
          lt: tomorrowStart,
        },
      },
      select: {
        id: true,
        type: true,
        to: true,
        subject: true,
        sentAt: true,
        newsletterId: true,
      },
      orderBy: {
        sentAt: 'asc'
      }
    });

    console.log(`📧 Total Resend envoyés aujourd'hui: ${resendEmailsToday.length}/100\n`);

    // Grouper par type
    const byType = {};
    resendEmailsToday.forEach(email => {
      if (!byType[email.type]) {
        byType[email.type] = [];
      }
      byType[email.type].push(email);
    });

    console.log('📊 RÉPARTITION PAR TYPE:');
    Object.keys(byType).sort().forEach(type => {
      console.log(`   ${type}: ${byType[type].length} emails`);
    });
    console.log('');

    // Grouper par newsletter
    const byNewsletter = {};
    resendEmailsToday.forEach(email => {
      if (email.newsletterId) {
        if (!byNewsletter[email.newsletterId]) {
          byNewsletter[email.newsletterId] = [];
        }
        byNewsletter[email.newsletterId].push(email);
      }
    });

    if (Object.keys(byNewsletter).length > 0) {
      console.log('📰 RÉPARTITION PAR NEWSLETTER:');
      for (const [newsletterId, emails] of Object.entries(byNewsletter)) {
        const newsletter = await prisma.newsletter.findUnique({
          where: { id: newsletterId },
          select: { subject: true }
        });
        console.log(`   "${newsletter?.subject || 'Unknown'}": ${emails.length} emails`);
      }
      console.log('');
    }

    // Afficher les premiers et derniers envois
    if (resendEmailsToday.length > 0) {
      console.log('⏰ CHRONOLOGIE:');
      const first = resendEmailsToday[0];
      const last = resendEmailsToday[resendEmailsToday.length - 1];

      console.log(`   Premier envoi: ${first.sentAt.toISOString()} (${first.to})`);
      console.log(`   Dernier envoi: ${last.sentAt.toISOString()} (${last.to})`);

      const duration = (last.sentAt.getTime() - first.sentAt.getTime()) / 1000;
      console.log(`   Durée totale: ${Math.floor(duration / 60)}min ${Math.floor(duration % 60)}s`);
      console.log('');
    }

    // 2. QUOTA DISPONIBLE AU MOMENT DE L'ARRÊT
    console.log('═══════════════════════════════════════════════════════════');
    console.log('2️⃣  ANALYSE DU QUOTA');
    console.log('═══════════════════════════════════════════════════════════\n');

    const quotaUsed = resendEmailsToday.length;
    const quotaRemaining = Math.max(0, 100 - quotaUsed);

    console.log(`   Quota utilisé: ${quotaUsed}/100`);
    console.log(`   Quota restant: ${quotaRemaining}/100`);
    console.log('');

    if (quotaUsed < 100) {
      console.log(`   ⚠️  Il reste ${quotaRemaining} emails disponibles aujourd'hui !`);
      console.log(`   ❓ Pourquoi l'envoi s'est arrêté à ${quotaUsed} ?`);
      console.log('');
    }

    // 3. FILE D'ATTENTE
    console.log('═══════════════════════════════════════════════════════════');
    console.log('3️⃣  FILE D\'ATTENTE');
    console.log('═══════════════════════════════════════════════════════════\n');

    const queueStats = await prisma.emailQueue.groupBy({
      by: ['status'],
      _count: true
    });

    console.log('📬 Statistiques EmailQueue:');
    if (queueStats.length === 0) {
      console.log('   Aucun email en file d\'attente');
    } else {
      queueStats.forEach(stat => {
        console.log(`   ${stat.status}: ${stat._count} emails`);
      });
    }
    console.log('');

    // Emails en attente avec détails
    const pendingEmails = await prisma.emailQueue.findMany({
      where: { status: 'PENDING' },
      select: {
        id: true,
        to: true,
        newsletterId: true,
        scheduledFor: true,
        attempts: true,
        createdAt: true
      },
      orderBy: { scheduledFor: 'asc' },
      take: 10
    });

    if (pendingEmails.length > 0) {
      console.log(`📋 Premiers emails en attente (${pendingEmails.length} total):`);
      pendingEmails.forEach((email, i) => {
        const scheduledParis = new Date(email.scheduledFor).toLocaleString('fr-FR', {
          timeZone: 'Europe/Paris',
          day: '2-digit',
          month: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        });
        console.log(`   ${i + 1}. ${email.to} - Programmé: ${scheduledParis}`);
      });
      console.log('');
    }

    // 4. VÉRIFICATION LOGIQUE DU CODE
    console.log('═══════════════════════════════════════════════════════════');
    console.log('4️⃣  VÉRIFICATION LOGIQUE');
    console.log('═══════════════════════════════════════════════════════════\n');

    console.log('🔍 Point de contrôle du quota dans le code:');
    console.log(`   if (quotaRemaining < 1) → Met en file d'attente`);
    console.log(`   Quota au moment où ça s'est arrêté: ${quotaRemaining}`);
    console.log('');

    if (quotaRemaining >= 1) {
      console.log('   ⚠️  ANOMALIE DÉTECTÉE !');
      console.log('   Le quota était encore disponible mais l\'envoi s\'est arrêté.');
      console.log('   Causes possibles:');
      console.log('   - Timeout du cron (mais peu probable avec 300s)');
      console.log('   - Erreur lors de l\'envoi qui a interrompu la boucle');
      console.log('   - Race condition dans le calcul du quota');
      console.log('');
    }

    // 5. EMAILS ÉCHOUÉS AUJOURD'HUI
    console.log('═══════════════════════════════════════════════════════════');
    console.log('5️⃣  EMAILS ÉCHOUÉS AUJOURD\'HUI');
    console.log('═══════════════════════════════════════════════════════════\n');

    const failedEmails = await prisma.mailLog.findMany({
      where: {
        status: 'failed',
        sentAt: {
          gte: todayStart,
          lt: tomorrowStart,
        },
      },
      select: {
        id: true,
        to: true,
        subject: true,
        error: true,
        provider: true,
        sentAt: true
      }
    });

    if (failedEmails.length > 0) {
      console.log(`❌ ${failedEmails.length} emails échoués aujourd'hui:`);
      failedEmails.forEach((email, i) => {
        console.log(`   ${i + 1}. ${email.to}`);
        console.log(`      Provider: ${email.provider}`);
        console.log(`      Erreur: ${email.error}`);
        console.log('');
      });
    } else {
      console.log('✅ Aucun email échoué aujourd\'hui');
      console.log('');
    }

    // 6. RÉSUMÉ ET DIAGNOSTIC
    console.log('═══════════════════════════════════════════════════════════');
    console.log('6️⃣  RÉSUMÉ ET DIAGNOSTIC');
    console.log('═══════════════════════════════════════════════════════════\n');

    console.log('📈 RÉSUMÉ:');
    console.log(`   • Emails envoyés via Resend: ${quotaUsed}/100`);
    console.log(`   • Emails en file d'attente: ${pendingEmails.length}`);
    console.log(`   • Emails échoués: ${failedEmails.length}`);
    console.log(`   • Quota restant: ${quotaRemaining}`);
    console.log('');

    if (quotaUsed < 100 && pendingEmails.length > 0) {
      console.log('🤔 DIAGNOSTIC:');
      console.log(`   Le système a envoyé ${quotaUsed} emails alors que le quota est de 100.`);
      console.log(`   Il reste ${quotaRemaining} emails disponibles aujourd'hui.`);
      console.log(`   ${pendingEmails.length} emails sont en file d'attente.`);
      console.log('');
      console.log('   Hypothèses:');
      console.log('   1. Des emails ont été envoyés AVANT le cron de newsletter (confirmation, etc.)');
      console.log('   2. Le comptage du quota inclut TOUS les types d\'emails Resend');
      console.log('   3. Normal : le système protège le quota pour éviter de dépasser');
      console.log('');
    }

    console.log('═══════════════════════════════════════════════════════════');
    console.log('✅ ANALYSE TERMINÉE');
    console.log('═══════════════════════════════════════════════════════════');

  } catch (error) {
    console.error('❌ Erreur lors de l\'analyse:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

analyzeEmailQuota();
