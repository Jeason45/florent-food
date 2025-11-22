import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/emailUtils';
import { welcomeEmail } from '@/lib/email/templates';

export async function POST(request: NextRequest) {
  try {
    const { email, source } = await request.json();

    // Validation
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    // Vérifier si l'email existe déjà
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existing) {
      // Si déjà abonné et actif
      if (existing.status === 'ACTIVE') {
        return NextResponse.json(
          { error: 'Cet email est déjà inscrit !' },
          { status: 400 }
        );
      }

      // Si désabonné ou en attente, on réactive directement
      if (existing.status === 'UNSUBSCRIBED' || existing.status === 'PENDING') {
        await prisma.newsletterSubscriber.update({
          where: { id: existing.id },
          data: {
            status: 'ACTIVE',
            subscribedAt: new Date()
          }
        });

        // Envoyer l'email de bienvenue
        const emailHtml = welcomeEmail();

        await sendEmail({
          to: email.toLowerCase(),
          subject: '🎉 Bienvenue chez Florent Food !',
          htmlContent: emailHtml,
          type: 'welcome',
          subscriberId: existing.id
        });

        return NextResponse.json({
          success: true,
          message: 'Inscription confirmée !'
        });
      }
    }

    // Créer un nouveau subscriber - directement ACTIVE
    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email: email.toLowerCase(),
        status: 'ACTIVE',
        subscriptionType: 'FREE',
        source: source || 'website',
        subscribedAt: new Date()
      }
    });

    console.log('✅ New subscriber created and activated:', email);

    // Envoyer l'email de bienvenue
    const emailHtml = welcomeEmail();

    const emailResult = await sendEmail({
      to: email.toLowerCase(),
      subject: '🎉 Bienvenue chez Florent Food !',
      htmlContent: emailHtml,
      type: 'welcome',
      subscriberId: subscriber.id
    });

    if (!emailResult.success) {
      console.warn('⚠️ Email not sent, but subscriber created:', emailResult.error);
    }

    return NextResponse.json({
      success: true,
      message: 'Inscription confirmée !',
      subscriberId: subscriber.id
    });

  } catch (error) {
    console.error('❌ Error subscribing to newsletter:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l inscription' },
      { status: 500 }
    );
  }
}
