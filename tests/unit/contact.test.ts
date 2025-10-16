import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendEmail } from '@/lib/email';

// Mock environment variables
const mockEnv = {
  RESEND_API_KEY: '',
  EMAIL_FROM: '',
};

describe('Email Service', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // Mock console to avoid spam in tests
    vi.spyOn(console, 'info').mockImplementation(() => {});
  });

  it('uses console provider when no API key', async () => {
    // Clear environment variables to trigger console provider
    process.env.RESEND_API_KEY = '';
    process.env.EMAIL_FROM = '';

    const result = await sendEmail({
      to: 'test@example.com',
      subject: 'Test Subject',
      html: '<p>Test message</p>',
    });

    expect(result.ok).toBe(true);
    expect(console.info).toHaveBeenCalledWith(expect.stringContaining('[Console Email Provider] Email would be sent:'));
  });

  it('validates email options', async () => {
    const result = await sendEmail({
      to: 'test@example.com',
      subject: 'Newsletter Subscription',
      html: '<h2>Welcome!</h2><p>Thanks for subscribing.</p>',
      replyTo: 'noreply@example.com',
    });

    // Should succeed with console provider
    expect(result.ok).toBe(true);
  });

  it('handles multiple recipients', async () => {
    const result = await sendEmail({
      to: ['user1@example.com', 'user2@example.com'],
      subject: 'Bulk Email',
      html: '<p>Bulk message</p>',
    });

    expect(result.ok).toBe(true);
  });
});