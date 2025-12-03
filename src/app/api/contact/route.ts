import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/config";
import { prisma } from "@/lib/prisma";

const SUBJECTS_MAP: Record<string, string> = {
  question: "Question sur une recette",
  suggestion: "Suggestion de recette",
  collaboration: "Proposition de collaboration",
  bug: "Problème technique",
  autre: "Autre demande",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont obligatoires" },
        { status: 400 }
      );
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Adresse email invalide" },
        { status: 400 }
      );
    }

    const subjectText = SUBJECTS_MAP[subject] || subject;

    // Sauvegarder le message en BDD
    await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject: subjectText,
        message,
      },
    });

    // Envoyer l'email à Florent (2 adresses)
    const result = await sendEmail({
      to: ["contact.florentfood@gmail.com", "florentcmtpro@gmail.com"],
      subject: `[Florent Food] ${subjectText} - de ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body style="font-family: Georgia, serif; background: #FFFBF7; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">

            <!-- Header -->
            <div style="background: #1a1a1a; padding: 30px; text-align: center;">
              <h1 style="color: #D4AF37; font-size: 24px; font-weight: 400; margin: 0;">
                Nouveau message
              </h1>
            </div>

            <!-- Content -->
            <div style="padding: 40px;">
              <div style="margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #E8E3D5;">
                <p style="font-size: 12px; color: #8B7355; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 8px 0;">Nom</p>
                <p style="font-size: 16px; color: #0F0F0F; margin: 0;">${name}</p>
              </div>

              <div style="margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #E8E3D5;">
                <p style="font-size: 12px; color: #8B7355; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 8px 0;">Email</p>
                <a href="mailto:${email}" style="font-size: 16px; color: #D4AF37; text-decoration: none;">${email}</a>
              </div>

              <div style="margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #E8E3D5;">
                <p style="font-size: 12px; color: #8B7355; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 8px 0;">Sujet</p>
                <p style="font-size: 16px; color: #0F0F0F; margin: 0;">${subjectText}</p>
              </div>

              <div>
                <p style="font-size: 12px; color: #8B7355; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 16px 0;">Message</p>
                <div style="background: #FFFBF7; padding: 20px; border-radius: 8px; border-left: 3px solid #D4AF37;">
                  <p style="font-size: 15px; color: #2A2A2A; line-height: 1.8; margin: 0; white-space: pre-wrap;">${message}</p>
                </div>
              </div>

              <!-- Reply button -->
              <div style="margin-top: 32px; text-align: center;">
                <a href="mailto:${email}?subject=Re: ${subjectText}" style="display: inline-block; background: #1a1a1a; color: #fff; padding: 16px 32px; text-decoration: none; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                  Répondre
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: #F8F6F3; padding: 20px; text-align: center;">
              <p style="font-size: 12px; color: #8B7355; margin: 0;">
                Message envoyé depuis le formulaire de contact Florent Food
              </p>
            </div>

          </div>
        </body>
        </html>
      `,
    });

    if (!result.success) {
      throw new Error("Erreur lors de l'envoi de l'email");
    }

    return NextResponse.json({
      success: true,
      message: "Message envoyé avec succès",
    });
  } catch (error) {
    console.error("Erreur API contact:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi du message" },
      { status: 500 }
    );
  }
}
