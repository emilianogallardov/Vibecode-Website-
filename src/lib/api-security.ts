/**
 * API Security Utilities
 * Shared security functions for API routes
 */

import { NextRequest, NextResponse } from 'next/server';

/**
 * Parse and validate JSON request body with size limit
 * Prevents DoS attacks via large JSON payloads
 */
export async function parseJsonBody<T = unknown>(
  request: NextRequest,
  maxSizeBytes: number = 1024 * 100 // 100KB default
): Promise<{ success: true; data: T } | { success: false; error: NextResponse }> {
  try {
    const contentLength = request.headers.get('content-length');

    // Check content-length header if present
    if (contentLength && parseInt(contentLength) > maxSizeBytes) {
      return {
        success: false,
        error: NextResponse.json(
          { error: 'Request body too large' },
          { status: 413 }
        ),
      };
    }

    const text = await request.text();

    // Check actual size
    const sizeBytes = new TextEncoder().encode(text).length;
    if (sizeBytes > maxSizeBytes) {
      return {
        success: false,
        error: NextResponse.json(
          { error: 'Request body too large' },
          { status: 413 }
        ),
      };
    }

    // Parse JSON
    const data = JSON.parse(text) as T;
    return { success: true, data };

  } catch (error) {
    return {
      success: false,
      error: NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      ),
    };
  }
}

/**
 * Extract client IP from request headers
 * Handles various proxy headers in correct priority order
 */
export function getClientIp(request: NextRequest): string {
  // Priority order: Vercel, then standard proxy headers
  const forwarded =
    request.headers.get('x-vercel-forwarded-for') ||
    request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    '';

  // x-forwarded-for can be a comma-separated list
  // First IP is the original client
  const ip = forwarded.split(',')[0]?.trim();

  return ip || '0.0.0.0';
}

/**
 * Common CORS headers for API endpoints
 */
export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400', // 24 hours
};

/**
 * Create standardized OPTIONS response
 */
export function createOptionsResponse(allowedMethods: string = 'GET, POST, OPTIONS'): NextResponse {
  return NextResponse.json(
    {},
    {
      status: 204,
      headers: {
        'Allow': allowedMethods,
        'Access-Control-Allow-Methods': allowedMethods,
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    }
  );
}

/**
 * Security response headers for API endpoints
 */
export const API_SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Cache-Control': 'no-store, must-revalidate',
  'Pragma': 'no-cache',
};

/**
 * Add security headers to a response
 */
export function addSecurityHeaders(response: NextResponse): NextResponse {
  Object.entries(API_SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}
