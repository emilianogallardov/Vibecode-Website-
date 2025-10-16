import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendEmail } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';
import { escapeHtml } from '@/lib/sanitize';

const NewsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address').toLowerCase(),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 3 newsletter subscriptions per hour per IP
    const forwarded = request.headers.get('x-vercel-forwarded-for') ||
                     request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     '';
    const ip = forwarded.split(',')[0]?.trim() || '0.0.0.0';

    const { success, remaining } = await rateLimit.check(`newsletter:${ip}`, {
      limit: 3,
      window: '1h',
    });

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': remaining.toString(),
            'Retry-After': '3600',
          },
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = NewsletterSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    const { email } = validationResult.data;

    // Send email notification with XSS protection
    const emailResult = await sendEmail({
      to: process.env.CONTACT_EMAIL || 'hello@example.com',
      subject: 'New Newsletter Subscription',
      html: `
        <h2>New Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p>A new user has subscribed to the newsletter.</p>
      `,
      replyTo: email,
    });

    if (!emailResult.ok) {
      console.error('Failed to send newsletter notification:', emailResult.error);
      return NextResponse.json(
        { error: 'Failed to process subscription. Please try again later.' },
        { status: 500 }
      );
    }

    // Send confirmation email to subscriber
    await sendEmail({
      to: email,
      subject: 'Welcome to our newsletter!',
      html: `
        <h2>Welcome to our newsletter!</h2>
        <p>Thank you for subscribing to our newsletter. You'll receive updates about our latest content and news.</p>
        <p>Best regards,<br>The Team</p>
      `,
    });

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed to newsletter!' },
      {
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Allow': 'POST, OPTIONS',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}