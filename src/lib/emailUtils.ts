/**
 * Email Utilities for Florent Food
 * Handles email sending with Resend (primary) and Nodemailer/Gmail (fallback)
 */

import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { prisma } from '@/lib/prisma';

// Resend Configuration (Primary)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const RESEND_FROM_EMAIL = 'Florent Food <contact@florentfood.fr>';

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
  error?: string;
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
 * Uses Resend as primary, Gmail as fallback
 */
export async function sendEmail(params: SendEmailParams): Promise<SendEmailResult> {
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
      sentBy
    } = params;

    let result: { success: boolean; messageId?: string; error?: string };
    let provider = 'resend';

    // Try Resend first (primary)
    if (resend) {
      console.log('📧 Sending via Resend...');
      result = await sendViaResend({ to, subject, htmlContent, textContent });

      // If Resend fails, try Gmail as fallback
      if (!result.success && SMTP_CONFIG.auth.user && SMTP_CONFIG.auth.pass) {
        console.log('⚠️ Resend failed, trying Gmail fallback...');
        provider = 'gmail';
        result = await sendViaGmail({ to, cc, bcc, subject, htmlContent, textContent, attachments });
      }
    } else if (SMTP_CONFIG.auth.user && SMTP_CONFIG.auth.pass) {
      // No Resend, use Gmail directly
      console.log('📧 Sending via Gmail...');
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
        error: result.error || null,
        sentBy
      }
    });

    if (result.success) {
      console.log(`✅ Email sent via ${provider}:`, result.messageId);
    } else {
      console.error(`❌ Email failed via ${provider}:`, result.error);
    }

    return {
      success: result.success,
      messageId: result.messageId,
      mailLogId: mailLog.id,
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
