import { test, expect } from '@playwright/test';

test.describe('Newsletter Subscription', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('newsletter form is visible', async ({ page }) => {
    const newsletterSection = page.locator('[data-testid="newsletter-section"], section:has(input[type="email"])');
    await expect(newsletterSection).toBeVisible();

    const emailInput = page.locator('input[type="email"][placeholder*="email" i]');
    await expect(emailInput).toBeVisible();

    const submitButton = page.locator('button:has-text("Subscribe"), button:has-text("Sign up"), button:has-text("Join")');
    await expect(submitButton).toBeVisible();
  });

  test('shows validation error for invalid email', async ({ page }) => {
    const emailInput = page.locator('input[type="email"][placeholder*="email" i]');
    const submitButton = page.locator('button:has-text("Subscribe"), button:has-text("Sign up"), button:has-text("Join")');

    // Try to submit with invalid email
    await emailInput.fill('invalid-email');
    await submitButton.click();

    // Check for validation message
    const errorMessage = page.locator('text=/invalid|error|please enter/i');
    await expect(errorMessage).toBeVisible({ timeout: 5000 });
  });

  test('shows validation error for empty email', async ({ page }) => {
    const submitButton = page.locator('button:has-text("Subscribe"), button:has-text("Sign up"), button:has-text("Join")');

    // Try to submit without entering email
    await submitButton.click();

    // Check for required field validation
    const emailInput = page.locator('input[type="email"][placeholder*="email" i]');
    const isRequired = await emailInput.evaluate((el: HTMLInputElement) => el.required);
    expect(isRequired).toBeTruthy();
  });

  test('accepts valid email format', async ({ page }) => {
    const emailInput = page.locator('input[type="email"][placeholder*="email" i]');
    const submitButton = page.locator('button:has-text("Subscribe"), button:has-text("Sign up"), button:has-text("Join")');

    // Fill in valid email
    await emailInput.fill('test@example.com');

    // Intercept the API call
    await page.route('/api/newsletter', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Subscribed successfully' }),
      });
    });

    await submitButton.click();

    // Check for success message
    const successMessage = page.locator('text=/success|thank you|subscribed|you\'re in/i');
    await expect(successMessage).toBeVisible({ timeout: 5000 });
  });

  test('handles API errors gracefully', async ({ page }) => {
    const emailInput = page.locator('input[type="email"][placeholder*="email" i]');
    const submitButton = page.locator('button:has-text("Subscribe"), button:has-text("Sign up"), button:has-text("Join")');

    // Mock API error
    await page.route('/api/newsletter', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal server error' }),
      });
    });

    await emailInput.fill('test@example.com');
    await submitButton.click();

    // Check for error message
    const errorMessage = page.locator('text=/error|problem|try again/i');
    await expect(errorMessage).toBeVisible({ timeout: 5000 });
  });

  test('prevents duplicate submissions', async ({ page }) => {
    const emailInput = page.locator('input[type="email"][placeholder*="email" i]');
    const submitButton = page.locator('button:has-text("Subscribe"), button:has-text("Sign up"), button:has-text("Join")');

    let requestCount = 0;
    await page.route('/api/newsletter', async (route) => {
      requestCount++;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await emailInput.fill('test@example.com');

    // Click submit button multiple times quickly
    await submitButton.click();
    await submitButton.click();
    await submitButton.click();

    // Wait a bit for any delayed requests
    await page.waitForTimeout(1000);

    // Should only send one request
    expect(requestCount).toBeLessThanOrEqual(1);
  });

  test('newsletter form works in footer', async ({ page }) => {
    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded();

    // Check if footer has newsletter form
    const footerEmailInput = page.locator('footer input[type="email"]');
    if (await footerEmailInput.isVisible()) {
      await footerEmailInput.fill('footer@example.com');

      const footerSubmitButton = page.locator('footer button:has-text("Subscribe"), footer button:has-text("Sign up")');

      // Mock successful response
      await page.route('/api/newsletter', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true }),
        });
      });

      await footerSubmitButton.click();

      // Check for success indication
      const successMessage = page.locator('footer text=/success|thank you|subscribed/i');
      await expect(successMessage).toBeVisible({ timeout: 5000 });
    }
  });
});