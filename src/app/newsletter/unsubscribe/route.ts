import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/emailUtils';
import { unsubscribeConfirmationEmail } from '@/lib/email/templates';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email manquant' },
        { status: 400 }
      );
    }

    // Chercher l'abonné
    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!subscriber) {
      return NextResponse.json(
        { error: 'Email non trouvé dans notre liste' },
        { status: 404 }
      );
    }

    // Si déjà désabonné
    if (subscriber.status === 'UNSUBSCRIBED') {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}?unsubscribed=already`
      );
    }

    // Mettre à jour le statut
    await prisma.newsletterSubscriber.update({
      where: { id: subscriber.id },
      data: {
        status: 'UNSUBSCRIBED',
        unsubscribedAt: new Date()
      }
    });

    console.log('✅ Subscriber unsubscribed:', email);

    // Envoyer l'email de confirmation de désinscription
    const emailHtml = unsubscribeConfirmationEmail(subscriber.firstName || undefined, subscriber.email);
    await sendEmail({
      to: subscriber.email,
      subject: 'Désinscription confirmée - Florent Food',
      htmlContent: emailHtml,
      type: 'newsletter_unsubscribe',
      subscriberId: subscriber.id
    });

    // Rediriger vers la page d'accueil avec message de succès
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}?unsubscribed=true`
    );
  } catch (error) {
    console.error('❌ Error unsubscribing:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la désinscription' },
      { status: 500 }
    );
  }
}
