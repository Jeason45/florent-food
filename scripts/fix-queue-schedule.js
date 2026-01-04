/**
 * Script pour reprogrammer les emails en file d'attente à 9h30 Paris (8h30 UTC)
 * au lieu de 1h00 Paris (0h00 UTC)
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixQueueSchedule() {
  try {
    console.log('🔧 Mise à jour des horaires de la file d\'attente...\n');

    // Récupérer tous les emails en attente
    const pendingEmails = await prisma.emailQueue.findMany({
      where: {
        status: 'PENDING'
      },
      select: {
        id: true,
        to: true,
        scheduledFor: true
      }
    });

    console.log(`📊 Trouvé ${pendingEmails.length} emails en attente\n`);

    let updatedCount = 0;

    for (const email of pendingEmails) {
      const scheduledDate = new Date(email.scheduledFor);

      // Si l'heure est 00:00, 01:00, ou 02:00 UTC (minuit), on reprogramme à 08:30 UTC
      const hour = scheduledDate.getUTCHours();

      if (hour >= 0 && hour <= 2) {
        // Créer une nouvelle date avec le même jour mais à 08:30 UTC
        const newScheduledDate = new Date(Date.UTC(
          scheduledDate.getUTCFullYear(),
          scheduledDate.getUTCMonth(),
          scheduledDate.getUTCDate(),
          8,  // 8h UTC
          30, // 30 minutes
          0,
          0
        ));

        await prisma.emailQueue.update({
          where: { id: email.id },
          data: { scheduledFor: newScheduledDate }
        });

        console.log(`✅ ${email.to}`);
        console.log(`   Avant: ${scheduledDate.toISOString()}`);
        console.log(`   Après: ${newScheduledDate.toISOString()}\n`);

        updatedCount++;
      }
    }

    console.log(`\n🎉 Terminé ! ${updatedCount} emails reprogrammés à 9h30 Paris time`);

  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

fixQueueSchedule();
