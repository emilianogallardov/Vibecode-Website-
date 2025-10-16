/**
 * Generate a cryptographically secure nonce for CSP
 * Uses Web Crypto API (available in Edge Runtime)
 */
export function generateNonce(): string {
  // Use Web Crypto API instead of Node.js crypto for Edge Runtime compatibility
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
}

/**
 * Build CSP header with nonce support
 */
export function buildCSP(nonce: string): string {
  const csp = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://www.googletagmanager.com https://www.google-analytics.com https://challenges.cloudflare.com;
    style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com;
    img-src 'self' data: blob: https:;
    font-src 'self' data: https://fonts.gstatic.com;
    connect-src 'self' https://region1.google-analytics.com https://www.google-analytics.com https://*.upstash.io;
    frame-src https://challenges.cloudflare.com https://www.youtube-nocookie.com;
    base-uri 'self';
    form-action 'self';
    object-src 'none';
  `.replace(/\s{2,}/g, ' ').trim();

  return csp;
}

/**
 * CSP directives for report-only mode (testing)
 */
export function buildCSPReportOnly(nonce: string, reportUri?: string): string {
  const csp = buildCSP(nonce);
  return reportUri ? `${csp}; report-uri ${reportUri}` : csp;
}
