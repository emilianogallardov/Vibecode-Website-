import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyTurnstile } from '@/lib/captcha';
import { rateLimit } from '@/lib/rate-limit';
import { sendEmail } from '@/lib/email';
import { escapeHtml, textToHtml } from '@/lib/sanitize';

const ContactSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().toLowerCase().trim(),
  subject: z.string().min(5).max(200).trim(),
  message: z.string().min(10).max(5000).trim(),
  token: z.string(), // Turnstile token
  honeypot: z.string().optional(), // Honeypot field (should be empty)
});

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Allow': 'POST, OPTIONS',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    }
  );
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting (handle multiple IPs from proxy chain)
    const forwarded = request.headers.get('x-vercel-forwarded-for') ||
                     request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     '';
    const ip = forwarded.split(',')[0]?.trim() || '0.0.0.0';

    // Check rate limit (5 requests per hour per IP)
    // Use prefixed identifier to prevent collisions with other endpoints
    const { success, remaining } = await rateLimit.check(`contact:${ip}`, {
      limit: 5,
      window: '1h',
    });

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': remaining.toString(),
          },
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = ContactSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Check honeypot (anti-spam)
    if (data.honeypot) {
      // Silently reject spam
      return NextResponse.json(
        { success: true },
        {
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate',
            'X-RateLimit-Remaining': String(remaining),
          }
        }
      );
    }

    // Verify Turnstile token (early exit for empty token)
    if (!data.token) {
      return NextResponse.json(
        { error: 'Captcha token is required.' },
        {
          status: 400,
          headers: {
            'Cache-Control': 'no-store',
            'X-RateLimit-Remaining': String(remaining),
          }
        }
      );
    }

    const turnstileValid = await verifyTurnstile(data.token, ip);
    if (!turnstileValid) {
      return NextResponse.json(
        { error: 'Invalid captcha. Please try again.' },
        {
          status: 400,
          headers: {
            'Cache-Control': 'no-store',
            'X-RateLimit-Remaining': String(remaining),
          }
        }
      );
    }

    // Send email with sanitized content
    const emailResult = await sendEmail({
      to: process.env.CONTACT_EMAIL || 'hello@example.com',
      subject: `Contact Form: ${escapeHtml(data.subject)}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${textToHtml(data.message)}</p>
      `,
      replyTo: data.email,
    });

    if (!emailResult.ok) {
      return NextResponse.json(
        { error: 'Failed to send message. Please try again later.' },
        {
          status: 500,
          headers: {
            'Cache-Control': 'no-store',
            'X-RateLimit-Remaining': String(remaining),
          }
        }
      );
    }

    // Send auto-reply to user (don't fail if this fails)
    try {
      await sendEmail({
        to: data.email,
        subject: 'Thank you for contacting us',
        html: `
          <h2>Thank you for your message!</h2>
          <p>Hi ${escapeHtml(data.name)},</p>
          <p>We've received your message and will get back to you within 24 business hours.</p>
          <p>Best regards,<br>The Team</p>
        `,
      });
    } catch (error) {
      // Log but don't fail the request - auto-reply is not critical
      console.error('Failed to send auto-reply email:', error);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message. We\'ll be in touch soon!',
      },
      {
        headers: {
          'Cache-Control': 'no-store',
          'X-RateLimit-Remaining': String(remaining),
        }
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
        }
      }
    );
  }
}