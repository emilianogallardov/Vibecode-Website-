import { Resend } from 'resend';

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

export type EmailResult = {
  ok: true;
} | {
  ok: false;
  error: string;
};

interface EmailProvider {
  send(opts: EmailOptions): Promise<EmailResult>;
}

class ConsoleEmailProvider implements EmailProvider {
  async send(opts: EmailOptions): Promise<EmailResult> {
    console.info('📧 [Console Email Provider] Email would be sent:');
    console.info(JSON.stringify({
      to: opts.to,
      subject: opts.subject,
      html: opts.html.substring(0, 200) + '...',
      replyTo: opts.replyTo,
    }, null, 2));
    return { ok: true };
  }
}

class ResendEmailProvider implements EmailProvider {
  private resend: Resend;

  constructor(apiKey: string) {
    this.resend = new Resend(apiKey);
  }

  async send(opts: EmailOptions): Promise<EmailResult> {
    if (!process.env.EMAIL_FROM) {
      return { ok: false, error: 'EMAIL_FROM environment variable is missing' };
    }

    try {
      const { data, error } = await this.resend.emails.send({
        from: process.env.EMAIL_FROM,
        to: opts.to,
        subject: opts.subject,
        html: opts.html,
        replyTo: opts.replyTo,
      });

      if (error) {
        console.error('Resend API error:', error);
        return { ok: false, error: String(error.message || error) };
      }

      return { ok: true };
    } catch (e: any) {
      console.error('Email send failed:', e);
      return { ok: false, error: e?.message ?? 'send failed' };
    }
  }
}

// Choose provider based on environment
const emailProvider: EmailProvider =
  process.env.RESEND_API_KEY && process.env.EMAIL_FROM
    ? new ResendEmailProvider(process.env.RESEND_API_KEY)
    : new ConsoleEmailProvider();

/**
 * Validate email address to prevent header injection
 */
function validateEmail(email: string): boolean {
  // Prevent email header injection
  const dangerousChars = /[\r\n\0]/;
  if (dangerousChars.test(email)) {
    return false;
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate and sanitize subject line
 */
function sanitizeSubject(subject: string): string {
  // Remove any newline characters that could be used for header injection
  return subject.replace(/[\r\n]/g, ' ').substring(0, 998); // RFC 5322 limit
}

export async function sendEmail(opts: EmailOptions): Promise<EmailResult> {
  // Validate all email addresses
  const emails = Array.isArray(opts.to) ? opts.to : [opts.to];
  for (const email of emails) {
    if (!validateEmail(email)) {
      return { ok: false, error: 'Invalid email address detected' };
    }
  }

  if (opts.replyTo && !validateEmail(opts.replyTo)) {
    return { ok: false, error: 'Invalid reply-to email address' };
  }

  // Sanitize subject
  const sanitizedOpts: EmailOptions = {
    ...opts,
    subject: sanitizeSubject(opts.subject),
  };

  return emailProvider.send(sanitizedOpts);
}