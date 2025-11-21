import nodemailer from "nodemailer";

/**
 * Configuration Gmail SMTP pour Florent Food
 *
 * IMPORTANT : Pour utiliser Gmail SMTP, vous devez :
 * 1. Activer la validation en 2 étapes sur votre compte Gmail
 * 2. Générer un "Mot de passe d'application" (App Password)
 * 3. Utiliser ce mot de passe dans GMAIL_APP_PASSWORD (pas votre mot de passe Gmail normal)
 *
 * Guide complet : https://support.google.com/accounts/answer/185833
 */

// Créer le transporter Gmail
export const gmailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // Votre adresse Gmail (ex: florent@gmail.com)
    pass: process.env.GMAIL_APP_PASSWORD, // Mot de passe d'application (16 caractères)
  },
});

// Options par défaut pour tous les emails
export const defaultMailOptions = {
  from: {
    name: "Florent Food",
    address: process.env.GMAIL_USER || "noreply@gmail.com",
  },
};

/**
 * Envoyer un email avec Gmail
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}) {
  try {
    const info = await gmailTransporter.sendMail({
      ...defaultMailOptions,
      to,
      subject,
      html,
      text: text || stripHtml(html), // Fallback text version
    });

    console.log("✅ Email envoyé avec succès:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Erreur envoi email:", error);
    return { success: false, error };
  }
}

/**
 * Vérifier la connexion Gmail
 */
export async function verifyGmailConnection() {
  try {
    await gmailTransporter.verify();
    console.log("✅ Gmail SMTP connecté avec succès");
    return true;
  } catch (error) {
    console.error("❌ Erreur connexion Gmail SMTP:", error);
    return false;
  }
}

/**
 * Helper : Retirer les tags HTML pour version texte
 */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}
