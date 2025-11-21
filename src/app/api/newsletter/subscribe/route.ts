import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import { sendEmail } from '@/lib/emailUtils';
import { confirmSubscriptionEmail } from '@/lib/email/templates';

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, source } = await request.json();

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

      // Si désabonné, on peut réinscrire
      if (existing.status === 'UNSUBSCRIBED') {
        const confirmToken = crypto.randomBytes(32).toString('hex');
        const confirmTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

        await prisma.newsletterSubscriber.update({
          where: { id: existing.id },
          data: {
            status: 'PENDING',
            firstName: firstName || existing.firstName,
            confirmToken,
            confirmTokenExpiry,
            subscribedAt: new Date()
          }
        });

        // Envoyer l'email de confirmation
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
        const confirmationLink = `${baseUrl}/newsletter/confirm?token=${confirmToken}`;
        const emailHtml = confirmSubscriptionEmail(firstName || existing.firstName, confirmationLink);

        await sendEmail({
          to: email.toLowerCase(),
          subject: '🎉 Confirme ton inscription à Florent Food',
          htmlContent: emailHtml,
          type: 'newsletter_confirmation',
          subscriberId: existing.id
        });

        return NextResponse.json({
          success: true,
          message: 'Email de confirmation envoyé !'
        });
      }
    }

    // Créer un nouveau subscriber
    const confirmToken = crypto.randomBytes(32).toString('hex');
    const confirmTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email: email.toLowerCase(),
        firstName: firstName || null,
        status: 'PENDING',
        subscriptionType: 'FREE',
        source: source || 'website',
        confirmToken,
        confirmTokenExpiry
      }
    });

    console.log('✅ New subscriber created:', email);

    // Envoyer l'email de confirmation
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
    const confirmationLink = `${baseUrl}/newsletter/confirm?token=${confirmToken}`;
    const emailHtml = confirmSubscriptionEmail(firstName, confirmationLink);

    const emailResult = await sendEmail({
      to: email.toLowerCase(),
      subject: '🎉 Confirme ton inscription à Florent Food',
      htmlContent: emailHtml,
      type: 'newsletter_confirmation',
      subscriberId: subscriber.id
    });

    if (!emailResult.success) {
      console.warn('⚠️ Email not sent, but subscriber created:', emailResult.error);
    }

    console.log(`🔗 Confirmation link: ${confirmationLink}`);

    return NextResponse.json({
      success: true,
      message: 'Email de confirmation envoyé !',
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
