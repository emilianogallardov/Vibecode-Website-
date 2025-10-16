import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Newsletter } from '@/components/website-examples/Newsletter/Newsletter';

// Mock fetch for tests
global.fetch = vi.fn();

describe('Newsletter Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders newsletter form', () => {
    render(<Newsletter />);
    expect(screen.getByPlaceholderText('Enter your email')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Subscribe' })).toBeTruthy();
  });

  it('validates email input', async () => {
    render(<Newsletter />);
    const emailInput = screen.getByPlaceholderText('Enter your email') as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: 'Subscribe' });

    // Test invalid email
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    // HTML5 validation should prevent submission
    expect(emailInput.validity.valid).toBe(false);
  });

  it('handles successful subscription', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true, message: 'Thanks for subscribing!' }),
    });
    global.fetch = mockFetch;

    render(<Newsletter />);
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const submitButton = screen.getByRole('button', { name: 'Subscribe' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com' }),
      });
    });
  });
});