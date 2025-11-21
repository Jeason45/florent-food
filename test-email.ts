// Script de test pour Gmail SMTP
// Usage: npx tsx test-email.ts

import { sendEmail, verifyGmailConnection } from "./src/lib/email/config";
import { welcomeEmail } from "./src/lib/email/templates";

async function testGmailSMTP() {
  console.log("🧪 Test de la configuration Gmail SMTP - Florent Food\n");
  console.log("=" .repeat(60));

  // 1. Vérifier la connexion
  console.log("\n1️⃣ Vérification de la connexion Gmail SMTP...");
  const isConnected = await verifyGmailConnection();

  if (!isConnected) {
    console.error("\n❌ ERREUR : Connexion échouée");
    console.error("\n📝 Vérifiez que :");
    console.error("   1. Le fichier .env.local existe");
    console.error("   2. GMAIL_USER contient votre adresse Gmail");
    console.error("   3. GMAIL_APP_PASSWORD contient le mot de passe d'application (16 caractères)");
    console.error("\n📖 Consultez GMAIL_SMTP_GUIDE.md pour plus d'aide");
    process.exit(1);
  }

  console.log("✅ Connexion réussie !");

  // 2. Envoyer un email de test simple
  console.log("\n2️⃣ Envoi d'un email de test simple...");
  const simpleResult = await sendEmail({
    to: process.env.GMAIL_USER!,
    subject: "🧪 Test Gmail SMTP - Florent Food",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #E07A5F;">Ça marche ! 🎉</h1>
        <p>Gmail SMTP est <strong>correctement configuré</strong> pour Florent Food.</p>
        <hr style="border: 1px solid #F4F1DE; margin: 20px 0;">
        <p style="color: #6B6B6B; font-size: 14px;">
          Vous pouvez maintenant envoyer des emails de newsletter.<br>
          Date du test : ${new Date().toLocaleString("fr-FR")}
        </p>
      </div>
    `,
  });

  if (!simpleResult.success) {
    console.error("\n❌ ERREUR lors de l'envoi:", simpleResult.error);
    process.exit(1);
  }

  console.log("✅ Email simple envoyé !");
  console.log(`   Message ID: ${simpleResult.messageId}`);

  // 3. Envoyer un email avec template Welcome
  console.log("\n3️⃣ Envoi d'un email avec template 'Welcome'...");
  const welcomeResult = await sendEmail({
    to: process.env.GMAIL_USER!,
    subject: "🎉 Bienvenue chez Florent Food",
    html: welcomeEmail("Test"),
  });

  if (!welcomeResult.success) {
    console.error("\n❌ ERREUR lors de l'envoi du template:", welcomeResult.error);
    process.exit(1);
  }

  console.log("✅ Email avec template envoyé !");
  console.log(`   Message ID: ${welcomeResult.messageId}`);

  // Résumé
  console.log("\n" + "=".repeat(60));
  console.log("\n🎉 SUCCÈS ! Tous les tests sont passés !\n");
  console.log("📧 Vérifiez votre boîte Gmail :", process.env.GMAIL_USER);
  console.log("   → Vous devriez avoir reçu 2 emails\n");
  console.log("✅ Gmail SMTP est prêt pour la production !");
  console.log("\n" + "=".repeat(60) + "\n");
}

// Exécuter le test
testGmailSMTP().catch((error) => {
  console.error("\n💥 Erreur inattendue:", error);
  process.exit(1);
});
