import { describe, it, expect, beforeEach, vi } from 'vitest';
import { POST } from '../../app/api/contact/route';
import { NextRequest } from 'next/server';

// Mock dependencies
vi.mock('@/lib/captcha', () => ({
  verifyTurnstile: vi.fn().mockResolvedValue(true),
}));

vi.mock('@/lib/email', () => ({
  sendEmail: vi.fn().mockResolvedValue({ ok: true }),
}));

vi.mock('@/lib/rate-limit', () => ({
  rateLimit: {
    check: vi.fn().mockResolvedValue({
      success: true,
      remaining: 4,
      limit: 5,
      reset: Date.now() + 3600000,
    }),
  },
}));

describe('Contact API Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should successfully process valid contact form submission', async () => {
    const requestData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'Test message content',
      token: 'valid-turnstile-token',
    };

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '127.0.0.1',
      },
      body: JSON.stringify(requestData),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toBeTruthy();
  });

  it('should reject submission with invalid email', async () => {
    const requestData = {
      name: 'John Doe',
      email: 'invalid-email',
      subject: 'Test Subject',
      message: 'Test message',
      token: 'valid-token',
    };

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid form data');
  });

  it('should reject submission without captcha token', async () => {
    const requestData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'Test message',
      token: '',
    };

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('Captcha');
  });

  it('should sanitize HTML in user input', async () => {
    const { sendEmail } = await import('@/lib/email');

    const requestData = {
      name: '<script>alert("XSS")</script>John',
      email: 'john@example.com',
      subject: 'Test <img src=x onerror=alert(1)>',
      message: 'Test message with <script>bad code</script>',
      token: 'valid-token',
    };

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '127.0.0.1',
      },
      body: JSON.stringify(requestData),
    });

    const response = await POST(request);

    expect(response.status).toBe(200);

    // Verify sendEmail was called with sanitized content
    expect(sendEmail).toHaveBeenCalled();
    const emailCall = (sendEmail as any).mock.calls[0][0];
    // Verify HTML tags are escaped
    expect(emailCall.html).not.toContain('<script>');
    expect(emailCall.html).not.toContain('<img');
    expect(emailCall.html).toContain('&lt;'); // Escaped HTML
  });

  it('should detect and block honeypot spam', async () => {
    const requestData = {
      name: 'Spammer',
      email: 'spam@example.com',
      subject: 'Spam Subject',
      message: 'Spam message',
      token: 'valid-token',
      honeypot: 'I am a bot',
    };

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '127.0.0.1',
      },
      body: JSON.stringify(requestData),
    });

    const response = await POST(request);
    const data = await response.json();

    // Should return success to not alert spammers, but not actually send
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });
});
