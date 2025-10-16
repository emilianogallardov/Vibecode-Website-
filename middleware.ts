import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { generateNonce, buildCSP } from './src/lib/csp';
import { auth } from './auth';

export default auth((request) => {
  // Generate a unique nonce for this request
  const nonce = generateNonce();

  // Build CSP with the nonce
  const csp = buildCSP(nonce);

  // Clone the request headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  // Create response with CSP header
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Set CSP header
  response.headers.set('Content-Security-Policy', csp);

  // Set comprehensive security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '0'); // Disabled in favor of CSP
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()');

  // HSTS: Force HTTPS for 2 years (including subdomains)
  // Only set in production, not in development
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=63072000; includeSubDomains; preload'
    );
  }

  // Prevent MIME type sniffing
  response.headers.set('X-Download-Options', 'noopen');
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');

  return response;
})

// Apply middleware to all routes except static files and API routes that don't need CSP
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
