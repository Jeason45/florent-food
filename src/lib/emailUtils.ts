/**
 * Email Utilities for Florent Food
 * Handles email sending with Nodemailer and logging
 */

import nodemailer from 'nodemailer';
import { prisma } from '@/lib/prisma';

// SMTP Configuration
const SMTP_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.GMAIL_USER || '',
    pass: process.env.GMAIL_APP_PASSWORD || ''
  }
};

// Create reusable transporter
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
 * Send email and log to database
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

    // Validate SMTP configuration
    if (!SMTP_CONFIG.auth.user || !SMTP_CONFIG.auth.pass) {
      console.warn('⚠️  SMTP not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD env variables.');

      // Log to database even if not sent
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
          error: 'SMTP not configured',
          sentBy
        }
      });

      return {
        success: false,
        error: 'SMTP not configured',
        mailLogId: mailLog.id
      };
    }

    const transporter = getTransporter();

    // Prepare email options
    const mailOptions: nodemailer.SendMailOptions = {
      from: `Florent Food <${SMTP_CONFIG.auth.user}>`,
      to: Array.isArray(to) ? to.join(', ') : to,
      cc: cc ? (Array.isArray(cc) ? cc.join(', ') : cc) : undefined,
      bcc: bcc ? (Array.isArray(bcc) ? bcc.join(', ') : bcc) : undefined,
      subject,
      html: htmlContent,
      text: textContent,
      attachments
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    // Log to database
    const mailLog = await prisma.mailLog.create({
      data: {
        type,
        subject,
        to: Array.isArray(to) ? to.join(', ') : to,
        cc: cc ? (Array.isArray(cc) ? cc.join(', ') : cc) : null,
        bcc: bcc ? (Array.isArray(cc) ? bcc.join(', ') : bcc) : null,
        htmlContent,
        textContent,
        attachments: attachments || [],
        subscriberId,
        newsletterId,
        status: 'sent',
        sentBy
      }
    });

    console.log('✅ Email sent successfully:', info.messageId);

    return {
      success: true,
      messageId: info.messageId,
      mailLogId: mailLog.id
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
