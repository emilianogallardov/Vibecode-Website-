import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db/prisma';
import { rateLimit } from '@/lib/rate-limit';
import { auditUser, auditSecurity } from '@/lib/audit-log';

// Strong password validation
const RegisterSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().toLowerCase(),
  password: z.string()
    .min(12, 'Password must be at least 12 characters')
    .max(128, 'Password must not exceed 128 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 3 registration attempts per hour per IP
    const forwarded = request.headers.get('x-vercel-forwarded-for') ||
                     request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     '';
    const ip = forwarded.split(',')[0]?.trim() || '0.0.0.0';

    const { success, remaining } = await rateLimit.check(`register:${ip}`, {
      limit: 3,
      window: '1h',
    });

    if (!success) {
      // Audit rate limit exceeded
      await auditSecurity.rateLimitExceeded(ip, request, '/api/auth/register');

      return NextResponse.json(
        { error: 'Too many registration attempts. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': remaining.toString(),
            'Retry-After': '3600', // 1 hour in seconds
          },
        }
      );
    }

    const body = await request.json();
    const validationResult = RegisterSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, password } = validationResult.data;

    // Always hash password first to prevent timing attacks
    // This ensures consistent timing whether user exists or not
    const hashedPassword = await bcrypt.hash(password, 12);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // Don't reveal that email exists (prevents user enumeration)
      // Return same timing as successful registration
      return NextResponse.json(
        { error: 'If this email is not already registered, you will receive a confirmation email.' },
        { status: 200 }
      );
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    // Audit user creation
    await auditUser.created(user.id, user.email, request);

    return NextResponse.json(
      {
        success: true,
        user,
      },
      {
        status: 201,
        headers: {
          'Cache-Control': 'no-store, must-revalidate',
        },
      }
    );
  } catch (error) {
    console.error('Registration error:', error);
    // Don't leak implementation details in error messages
    return NextResponse.json(
      { error: 'An error occurred while creating your account. Please try again later.' },
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
