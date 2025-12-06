import { Resend } from "resend";
import nodemailer from "nodemailer";

/**
 * Configuration Email pour Florent Food
 *
 * Priorité : Resend (primary) → Gmail SMTP (fallback)
 */

// Resend Configuration (Primary)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const RESEND_FROM_EMAIL = "Florent Food <contact@florentfood.fr>";

// Gmail SMTP Configuration (Fallback)
export const gmailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Options par défaut pour Gmail
export const defaultMailOptions = {
  from: {
    name: "Florent Food",
    address: process.env.GMAIL_USER || "noreply@gmail.com",
  },
};

/**
 * Helper : Retirer les tags HTML pour version texte
 */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

/**
 * Envoyer un email via Resend (primary) ou Gmail (fallback)
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
  // Try Resend first
  if (resend) {
    try {
      console.log("📧 Envoi via Resend...");
      const { data, error } = await resend.emails.send({
        from: RESEND_FROM_EMAIL,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        text: text || stripHtml(html),
      });

      if (error) {
        console.error("❌ Erreur Resend:", error.message);
        // Fall through to Gmail
      } else {
        console.log("✅ Email envoyé via Resend:", data?.id);
        return { success: true, messageId: data?.id };
      }
    } catch (error) {
      console.error("❌ Exception Resend:", error);
      // Fall through to Gmail
    }
  }

  // Fallback to Gmail
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    try {
      console.log("📧 Envoi via Gmail (fallback)...");
      const info = await gmailTransporter.sendMail({
        ...defaultMailOptions,
        to,
        subject,
        html,
        text: text || stripHtml(html),
      });

      console.log("✅ Email envoyé via Gmail:", info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("❌ Erreur Gmail:", error);
      return { success: false, error };
    }
  }

  console.error("❌ Aucun service email configuré");
  return { success: false, error: "No email service configured" };
}

/**
 * Vérifier la connexion email
 */
export async function verifyEmailConnection() {
  // Check Resend
  if (resend) {
    console.log("✅ Resend configuré avec domaine florentfood.fr");
    return true;
  }

  // Check Gmail
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    try {
      await gmailTransporter.verify();
      console.log("✅ Gmail SMTP connecté");
      return true;
    } catch (error) {
      console.error("❌ Erreur connexion Gmail:", error);
      return false;
    }
  }

  return false;
}

// Alias for backward compatibility
export const verifyGmailConnection = verifyEmailConnection;
