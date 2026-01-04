/**
 * Email Utilities for Florent Food
 * Handles email sending with Resend (primary) and Nodemailer/Gmail (fallback)
 *
 * Quota Management:
 * - Resend free plan: 100 emails/day
 * - If quota reached: emails are queued for next day
 * - Gmail is only used as fallback for technical errors (not for quota)
 */

import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { prisma } from '@/lib/prisma';
import { EmailQueueStatus } from '@prisma/client';

// Resend Configuration (Primary)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const RESEND_FROM_EMAIL = 'Florent Food <contact@florentfood.fr>';

// Quota Configuration
const RESEND_DAILY_LIMIT = 100;

// Gmail SMTP Configuration (Fallback)
const SMTP_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.GMAIL_USER || '',
    pass: process.env.GMAIL_APP_PASSWORD || ''
  }
};

// Create reusable transporter for Gmail fallback
let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport(SMTP_CONFIG);
  }
  return transporter;
}

// ==================================
// QUOTA MANAGEMENT
// ==================================

/**
 * Get the start of today in UTC
 */
function getTodayStart(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
}

/**
 * Get the start of tomorrow in UTC
 */
function getTomorrowStart(): Date {
  const today = getTodayStart();
  return new Date(today.getTime() + 24 * 60 * 60 * 1000);
}

/**
 * Get the next queue processing time (tomorrow at 8:30 UTC = 9:30 Paris time)
 * This matches the cron schedule: "30 8 * * *"
 */
function getNextQueueProcessingTime(): Date {
  const now = new Date();
  const tomorrow = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
    8,  // 8 hours UTC
    30, // 30 minutes
    0,
    0
  ));
  return tomorrow;
}

/**
 * Count emails sent via Resend today
 */
export async function getResendEmailsSentToday(): Promise<number> {
  const todayStart = getTodayStart();
  const tomorrowStart = getTomorrowStart();

  const count = await prisma.mailLog.count({
    where: {
      provider: 'resend',
      status: 'sent',
      sentAt: {
        gte: todayStart,
        lt: tomorrowStart,
      },
    },
  });

  return count;
}

/**
 * Get remaining Resend quota for today
 */
export async function getResendQuotaRemaining(): Promise<number> {
  const sentToday = await getResendEmailsSentToday();
  return Math.max(0, RESEND_DAILY_LIMIT - sentToday);
}

/**
 * Check if we have enough quota to send a batch of emails
 */
export async function hasEnoughQuota(emailCount: number): Promise<boolean> {
  const remaining = await getResendQuotaRemaining();
  return remaining >= emailCount;
}

/**
 * Add email to queue for later sending
 */
export async function queueEmail(params: {
  to: string;
  subject: string;
  htmlContent?: string;
  textContent?: string;
  type: string;
  subscriberId?: string;
  newsletterId?: string;
  priority?: number;
  scheduledFor?: Date;
  sentBy?: string;
}): Promise<{ queued: true; queueId: string }> {
  const scheduledFor = params.scheduledFor || getNextQueueProcessingTime();

  const queueEntry = await prisma.emailQueue.create({
    data: {
      to: params.to,
      subject: params.subject,
      htmlContent: params.htmlContent,
      textContent: params.textContent,
      type: params.type,
      subscriberId: params.subscriberId,
      newsletterId: params.newsletterId,
      priority: params.priority || 0,
      scheduledFor,
      sentBy: params.sentBy,
      status: EmailQueueStatus.PENDING,
    },
  });

  console.log(`📬 Email queued for ${scheduledFor.toISOString()} (9:30 Paris time): ${params.to} - ${params.subject}`);

  return { queued: true, queueId: queueEntry.id };
}

export interface SendEmailParams {
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  htmlContent?: string;
  textContent?: string;
  attachments?: Array<
    | { filename: string; path: string }  // Local file
    | { filename: string; href: string }   // Remote file (URL)
  >;
  subscriberId?: string;
  newsletterId?: string;
  type: 'newsletter_welcome' | 'newsletter_weekly' | 'newsletter_premium' | 'newsletter_confirmation' | 'newsletter_unsubscribe' | 'custom';
  sentBy?: string;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  mailLogId?: string;
  queueId?: string;
  queued?: boolean;
  error?: string;
  provider?: 'resend' | 'gmail' | 'queued';
}

/**
 * Send email via Resend (primary) or Gmail (fallback)
 */
async function sendViaResend(params: {
  to: string | string[];
  subject: string;
  htmlContent?: string;
  textContent?: string;
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
  if (!resend) {
    return { success: false, error: 'Resend not configured' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: Array.isArray(params.to) ? params.to : [params.to],
      subject: params.subject,
      html: params.htmlContent || '',
      text: params.textContent,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, messageId: data?.id };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Resend error' };
  }
}

/**
 * Send email via Gmail SMTP (fallback)
 */
async function sendViaGmail(params: {
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  htmlContent?: string;
  textContent?: string;
  attachments?: Array<{ filename: string; path?: string; href?: string }>;
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
  if (!SMTP_CONFIG.auth.user || !SMTP_CONFIG.auth.pass) {
    return { success: false, error: 'Gmail SMTP not configured' };
  }

  try {
    const transporter = getTransporter();
    const info = await transporter.sendMail({
      from: `Florent Food <${SMTP_CONFIG.auth.user}>`,
      to: Array.isArray(params.to) ? params.to.join(', ') : params.to,
      cc: params.cc ? (Array.isArray(params.cc) ? params.cc.join(', ') : params.cc) : undefined,
      bcc: params.bcc ? (Array.isArray(params.bcc) ? params.bcc.join(', ') : params.bcc) : undefined,
      subject: params.subject,
      html: params.htmlContent,
      text: params.textContent,
      attachments: params.attachments
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Gmail error' };
  }
}

/**
 * Send email and log to database
 * Uses Resend as primary with quota management
 * - If quota available: send via Resend
 * - If quota exhausted: queue for tomorrow
 * - Gmail only used for technical failures (not quota)
 */
export async function sendEmail(params: SendEmailParams & { forceQueue?: boolean }): Promise<SendEmailResult> {
  try {
    const {
      to,
      cc,
      bcc,
      subject,
      htmlContent,
      textContent,
      attachments,
      subscriberId,
      newsletterId,
      type,
      sentBy,
      forceQueue = false
    } = params;

    // Check if we should queue this email (quota management)
    if (resend && !forceQueue) {
      const quotaRemaining = await getResendQuotaRemaining();

      if (quotaRemaining < 1) {
        console.log(`📬 Quota exhausted (${quotaRemaining} remaining), queuing email for tomorrow...`);

        const queueResult = await queueEmail({
          to: Array.isArray(to) ? to[0] : to, // Queue only supports single recipient
          subject,
          htmlContent,
          textContent,
          type,
          subscriberId,
          newsletterId,
          sentBy,
        });

        return {
          success: true,
          queued: true,
          queueId: queueResult.queueId,
          provider: 'queued',
        };
      }

      console.log(`📧 Quota OK (${quotaRemaining} remaining), sending via Resend...`);
    }

    let result: { success: boolean; messageId?: string; error?: string };
    let provider: 'resend' | 'gmail' = 'resend';

    // Try Resend first (primary)
    if (resend) {
      result = await sendViaResend({ to, subject, htmlContent, textContent });

      // If Resend fails with a TECHNICAL error (not quota), try Gmail as fallback
      // Quota errors are handled above, so this is for API errors, network issues, etc.
      if (!result.success) {
        const isQuotaError = result.error?.toLowerCase().includes('rate limit') ||
                            result.error?.toLowerCase().includes('quota') ||
                            result.error?.toLowerCase().includes('limit exceeded');

        if (isQuotaError) {
          // Queue instead of falling back to Gmail
          console.log(`📬 Resend quota error detected, queuing email...`);
          const queueResult = await queueEmail({
            to: Array.isArray(to) ? to[0] : to,
            subject,
            htmlContent,
            textContent,
            type,
            subscriberId,
            newsletterId,
            sentBy,
          });

          return {
            success: true,
            queued: true,
            queueId: queueResult.queueId,
            provider: 'queued',
          };
        }

        // Technical error: try Gmail fallback
        if (SMTP_CONFIG.auth.user && SMTP_CONFIG.auth.pass) {
          console.log('⚠️ Resend technical error, trying Gmail fallback...');
          provider = 'gmail';
          result = await sendViaGmail({ to, cc, bcc, subject, htmlContent, textContent, attachments });
        }
      }
    } else if (SMTP_CONFIG.auth.user && SMTP_CONFIG.auth.pass) {
      // No Resend configured, use Gmail directly
      console.log('📧 Sending via Gmail (no Resend configured)...');
      provider = 'gmail';
      result = await sendViaGmail({ to, cc, bcc, subject, htmlContent, textContent, attachments });
    } else {
      // No email service configured
      console.warn('⚠️ No email service configured');
      const mailLog = await prisma.mailLog.create({
        data: {
          type,
          subject,
          to: Array.isArray(to) ? to.join(', ') : to,
          cc: cc ? (Array.isArray(cc) ? cc.join(', ') : cc) : null,
          bcc: bcc ? (Array.isArray(bcc) ? bcc.join(', ') : bcc) : null,
          htmlContent,
          textContent,
          attachments: attachments || [],
          subscriberId,
          newsletterId,
          status: 'failed',
          provider: 'resend',
          error: 'No email service configured',
          sentBy
        }
      });

      return {
        success: false,
        error: 'No email service configured',
        mailLogId: mailLog.id
      };
    }

    // Log to database
    const mailLog = await prisma.mailLog.create({
      data: {
        type,
        subject,
        to: Array.isArray(to) ? to.join(', ') : to,
        cc: cc ? (Array.isArray(cc) ? cc.join(', ') : cc) : null,
        bcc: bcc ? (Array.isArray(bcc) ? bcc.join(', ') : bcc) : null,
        htmlContent,
        textContent,
        attachments: attachments || [],
        subscriberId,
        newsletterId,
        status: result.success ? 'sent' : 'failed',
        provider,
        error: result.error || null,
        sentBy
      }
    });

    // Log newsletter delivery for tracking (anti-doublon)
    if (result.success && subscriberId && newsletterId && type.includes('newsletter')) {
      try {
        await prisma.newsletterSubscriberDelivery.create({
          data: {
            subscriberId,
            newsletterId,
            status: 'SENT',
            mailLogId: mailLog.id,
            provider,
          }
        });
        console.log(`📬 Newsletter delivery logged: ${newsletterId} → ${subscriberId}`);
      } catch (deliveryError) {
        // Si erreur (doublon par exemple), on log mais on n'échoue pas l'envoi
        console.warn('⚠️ Failed to log newsletter delivery (may be duplicate):', deliveryError);
      }
    }

    if (result.success) {
      console.log(`✅ Email sent via ${provider}:`, result.messageId);
    } else {
      console.error(`❌ Email failed via ${provider}:`, result.error);
    }

    return {
      success: result.success,
      messageId: result.messageId,
      mailLogId: mailLog.id,
      provider,
      error: result.error
    };
  } catch (error) {
    console.error('❌ Error sending email:', error);

    // Try to log failure to database
    try {
      const mailLog = await prisma.mailLog.create({
        data: {
          type: params.type,
          subject: params.subject,
          to: Array.isArray(params.to) ? params.to.join(', ') : params.to,
          cc: params.cc ? (Array.isArray(params.cc) ? params.cc.join(', ') : params.cc) : null,
          bcc: params.bcc ? (Array.isArray(params.bcc) ? params.bcc.join(', ') : params.bcc) : null,
          htmlContent: params.htmlContent,
          textContent: params.textContent,
          attachments: params.attachments || [],
          subscriberId: params.subscriberId,
          newsletterId: params.newsletterId,
          status: 'failed',
          provider: 'resend',
          error: error instanceof Error ? error.message : 'Unknown error',
          sentBy: params.sentBy
        }
      });

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        mailLogId: mailLog.id
      };
    } catch (dbError) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

/**
 * Test SMTP connection
 */
export async function testEmailConnection(): Promise<boolean> {
  try {
    await getTransporter().verify();
    console.log('✅ SMTP connection successful');
    return true;
  } catch (error) {
    console.error('❌ SMTP connection failed:', error);
    return false;
  }
}

// ==================================
// QUEUE PROCESSING
// ==================================

/**
 * Process pending emails from the queue
 * Called by cron job daily
 */
export async function processEmailQueue(): Promise<{
  processed: number;
  sent: number;
  failed: number;
  remaining: number;
}> {
  const now = new Date();

  // Get pending emails that are scheduled for now or earlier
  const pendingEmails = await prisma.emailQueue.findMany({
    where: {
      status: EmailQueueStatus.PENDING,
      scheduledFor: {
        lte: now,
      },
    },
    orderBy: [
      { priority: 'desc' },
      { createdAt: 'asc' },
    ],
  });

  console.log(`📬 Processing email queue: ${pendingEmails.length} emails pending`);

  let processed = 0;
  let sent = 0;
  let failed = 0;

  for (const queuedEmail of pendingEmails) {
    // Check quota before each send
    const quotaRemaining = await getResendQuotaRemaining();

    if (quotaRemaining < 1) {
      console.log(`📬 Quota exhausted, stopping queue processing. ${pendingEmails.length - processed} emails remaining.`);
      break;
    }

    // Mark as processing
    await prisma.emailQueue.update({
      where: { id: queuedEmail.id },
      data: {
        status: EmailQueueStatus.PROCESSING,
        lastAttempt: now,
        attempts: { increment: 1 },
      },
    });

    try {
      // Send the email (with internal flag to prevent re-queueing)
      const result = await sendViaResend({
        to: queuedEmail.to,
        subject: queuedEmail.subject,
        htmlContent: queuedEmail.htmlContent || undefined,
        textContent: queuedEmail.textContent || undefined,
      });

      if (result.success) {
        // Mark as sent and log to MailLog
        await prisma.emailQueue.update({
          where: { id: queuedEmail.id },
          data: {
            status: EmailQueueStatus.SENT,
            processedAt: new Date(),
          },
        });

        // Create MailLog entry
        const mailLog = await prisma.mailLog.create({
          data: {
            type: queuedEmail.type,
            subject: queuedEmail.subject,
            to: queuedEmail.to,
            htmlContent: queuedEmail.htmlContent,
            textContent: queuedEmail.textContent,
            subscriberId: queuedEmail.subscriberId,
            newsletterId: queuedEmail.newsletterId,
            status: 'sent',
            provider: 'resend',
            sentBy: queuedEmail.sentBy,
          },
        });

        // Log newsletter delivery for tracking (anti-doublon)
        if (queuedEmail.subscriberId && queuedEmail.newsletterId && queuedEmail.type.includes('newsletter')) {
          try {
            await prisma.newsletterSubscriberDelivery.create({
              data: {
                subscriberId: queuedEmail.subscriberId,
                newsletterId: queuedEmail.newsletterId,
                status: 'SENT',
                mailLogId: mailLog.id,
                provider: 'resend',
              }
            });
            console.log(`📬 Queue: Newsletter delivery logged: ${queuedEmail.newsletterId} → ${queuedEmail.subscriberId}`);
          } catch (deliveryError) {
            console.warn('⚠️ Queue: Failed to log newsletter delivery (may be duplicate):', deliveryError);
          }
        }

        sent++;
        console.log(`✅ Queue: Sent to ${queuedEmail.to}`);
      } else {
        // Check if it's a quota error (reschedule) or other error (fail)
        const isQuotaError = result.error?.toLowerCase().includes('rate limit') ||
                            result.error?.toLowerCase().includes('quota');

        if (isQuotaError) {
          // Reschedule for tomorrow at 9:30 Paris time
          await prisma.emailQueue.update({
            where: { id: queuedEmail.id },
            data: {
              status: EmailQueueStatus.PENDING,
              scheduledFor: getNextQueueProcessingTime(),
              error: result.error,
            },
          });
          console.log(`📬 Queue: Rescheduled ${queuedEmail.to} for tomorrow at 9:30 Paris time (quota)`);
        } else if (queuedEmail.attempts >= 3) {
          // Max attempts reached, mark as failed
          await prisma.emailQueue.update({
            where: { id: queuedEmail.id },
            data: {
              status: EmailQueueStatus.FAILED,
              error: result.error,
              processedAt: new Date(),
            },
          });
          failed++;
          console.error(`❌ Queue: Failed permanently for ${queuedEmail.to} after 3 attempts`);
        } else {
          // Retry later
          await prisma.emailQueue.update({
            where: { id: queuedEmail.id },
            data: {
              status: EmailQueueStatus.PENDING,
              scheduledFor: new Date(now.getTime() + 60 * 60 * 1000), // Retry in 1 hour
              error: result.error,
            },
          });
          console.log(`🔄 Queue: Will retry ${queuedEmail.to} in 1 hour`);
        }
      }
    } catch (error) {
      // Unexpected error
      await prisma.emailQueue.update({
        where: { id: queuedEmail.id },
        data: {
          status: EmailQueueStatus.PENDING,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });
      console.error(`❌ Queue: Error processing ${queuedEmail.to}:`, error);
    }

    processed++;
  }

  // Count remaining
  const remaining = await prisma.emailQueue.count({
    where: {
      status: EmailQueueStatus.PENDING,
    },
  });

  console.log(`📬 Queue processing complete: ${sent} sent, ${failed} failed, ${remaining} remaining`);

  return { processed, sent, failed, remaining };
}

/**
 * Get queue statistics
 */
export async function getQueueStats(): Promise<{
  pending: number;
  processing: number;
  sent: number;
  failed: number;
  quotaRemaining: number;
  quotaUsedToday: number;
}> {
  const [pending, processing, sentToday, failed, quotaUsedToday] = await Promise.all([
    prisma.emailQueue.count({ where: { status: EmailQueueStatus.PENDING } }),
    prisma.emailQueue.count({ where: { status: EmailQueueStatus.PROCESSING } }),
    prisma.emailQueue.count({
      where: {
        status: EmailQueueStatus.SENT,
        processedAt: { gte: getTodayStart() },
      },
    }),
    prisma.emailQueue.count({ where: { status: EmailQueueStatus.FAILED } }),
    getResendEmailsSentToday(),
  ]);

  return {
    pending,
    processing,
    sent: sentToday,
    failed,
    quotaRemaining: Math.max(0, RESEND_DAILY_LIMIT - quotaUsedToday),
    quotaUsedToday,
  };
}
