import { describe, it, expect } from 'vitest';
import { generateNonce, buildCSP, buildCSPReportOnly } from '@/lib/csp';

describe('CSP (Content Security Policy)', () => {
  describe('generateNonce', () => {
    it('should generate a base64 nonce', () => {
      const nonce = generateNonce();
      expect(nonce).toBeTruthy();
      expect(typeof nonce).toBe('string');
      // Base64 encoded 16 bytes should be 24 characters (including padding)
      expect(nonce.length).toBeGreaterThanOrEqual(20);
    });

    it('should generate unique nonces', () => {
      const nonce1 = generateNonce();
      const nonce2 = generateNonce();
      expect(nonce1).not.toBe(nonce2);
    });

    it('should only contain valid base64 characters', () => {
      const nonce = generateNonce();
      expect(nonce).toMatch(/^[A-Za-z0-9+/=]+$/);
    });
  });

  describe('buildCSP', () => {
    it('should include nonce in script-src', () => {
      const nonce = 'test-nonce-123';
      const csp = buildCSP(nonce);
      expect(csp).toContain(`'nonce-${nonce}'`);
      expect(csp).toContain('script-src');
    });

    it('should NOT include unsafe-inline', () => {
      const nonce = generateNonce();
      const csp = buildCSP(nonce);
      expect(csp).not.toContain("'unsafe-inline'");
    });

    it('should include strict-dynamic', () => {
      const nonce = generateNonce();
      const csp = buildCSP(nonce);
      expect(csp).toContain("'strict-dynamic'");
    });

    it('should include required third-party domains', () => {
      const nonce = generateNonce();
      const csp = buildCSP(nonce);

      // Google Analytics
      expect(csp).toContain('https://www.googletagmanager.com');
      expect(csp).toContain('https://www.google-analytics.com');

      // Cloudflare Turnstile
      expect(csp).toContain('https://challenges.cloudflare.com');

      // YouTube embeds
      expect(csp).toContain('https://www.youtube-nocookie.com');
    });

    it('should include style-src with nonce', () => {
      const nonce = 'style-nonce-456';
      const csp = buildCSP(nonce);
      expect(csp).toContain('style-src');
      expect(csp).toContain(`'nonce-${nonce}'`);
    });

    it('should set object-src to none', () => {
      const nonce = generateNonce();
      const csp = buildCSP(nonce);
      expect(csp).toContain("object-src 'none'");
    });

    it('should restrict base-uri and form-action', () => {
      const nonce = generateNonce();
      const csp = buildCSP(nonce);
      expect(csp).toContain("base-uri 'self'");
      expect(csp).toContain("form-action 'self'");
    });

    it('should allow data URIs for images', () => {
      const nonce = generateNonce();
      const csp = buildCSP(nonce);
      expect(csp).toContain('img-src');
      expect(csp).toContain('data:');
      expect(csp).toContain('blob:');
    });

    it('should include Upstash for connect-src', () => {
      const nonce = generateNonce();
      const csp = buildCSP(nonce);
      expect(csp).toContain('connect-src');
      expect(csp).toContain('https://*.upstash.io');
    });
  });

  describe('buildCSPReportOnly', () => {
    it('should include report-uri when provided', () => {
      const nonce = generateNonce();
      const reportUri = 'https://example.com/csp-report';
      const csp = buildCSPReportOnly(nonce, reportUri);
      expect(csp).toContain(`report-uri ${reportUri}`);
    });

    it('should not include report-uri when not provided', () => {
      const nonce = generateNonce();
      const csp = buildCSPReportOnly(nonce);
      expect(csp).not.toContain('report-uri');
    });

    it('should include all normal CSP directives', () => {
      const nonce = generateNonce();
      const csp = buildCSPReportOnly(nonce);
      expect(csp).toContain('default-src');
      expect(csp).toContain('script-src');
      expect(csp).toContain(`'nonce-${nonce}'`);
    });
  });

  describe('CSP Security', () => {
    it('should prevent inline script execution without nonce', () => {
      const csp = buildCSP('known-nonce');

      // Should NOT allow:
      expect(csp).not.toContain("'unsafe-inline'");
      expect(csp).not.toContain("'unsafe-eval'");

      // Should ONLY allow scripts with correct nonce
      expect(csp).toContain("'nonce-known-nonce'");
    });

    it('should prevent data URI scripts', () => {
      const csp = buildCSP(generateNonce());

      // script-src should not include data:
      const scriptSrcMatch = csp.match(/script-src[^;]+/);
      expect(scriptSrcMatch).toBeTruthy();
      expect(scriptSrcMatch![0]).not.toContain('data:');
    });

    it('should prevent object and embed tags', () => {
      const csp = buildCSP(generateNonce());
      expect(csp).toContain("object-src 'none'");
    });

    it('should use self for default-src', () => {
      const csp = buildCSP(generateNonce());
      expect(csp).toContain("default-src 'self'");
    });
  });

  describe('CSP Format', () => {
    it('should not have extra whitespace', () => {
      const csp = buildCSP(generateNonce());
      expect(csp).not.toMatch(/\s{2,}/);
    });

    it('should be a single line', () => {
      const csp = buildCSP(generateNonce());
      expect(csp).not.toContain('\n');
    });

    it('should end each directive with semicolon or be last', () => {
      const csp = buildCSP(generateNonce());
      const directives = csp.split(';').map(d => d.trim()).filter(Boolean);
      expect(directives.length).toBeGreaterThan(5);
    });
  });
});
