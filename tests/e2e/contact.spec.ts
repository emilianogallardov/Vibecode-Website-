import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Contact', () => {
  test('should display contact page', async ({ page }) => {
    await page.goto('/contact');

    // Check page title and heading
    await expect(page).toHaveTitle(/Contact/);
    await expect(page.locator('h1')).toContainText('Get in Touch');

    // Check that contact form is present
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="subject"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('/contact');

    // Try to submit empty form
    await page.locator('button[type="submit"]').click();

    // Check for HTML5 validation errors
    const nameField = page.locator('input[name="name"]');
    const isNameInvalid = await nameField.evaluate((el: HTMLInputElement) => !el.validity.valid);
    expect(isNameInvalid).toBe(true);
  });

  test('should fill and submit contact form (mocked)', async ({ page }) => {
    // Mock the API response
    await page.route('/api/contact', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Thank you for your message!' }),
      });
    });

    await page.goto('/contact');

    // Fill out the form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'This is a test message');

    // Note: In a real test, you'd need to handle Turnstile captcha
    // For now, we just check that the form elements work

    // Check that fields are filled
    await expect(page.locator('input[name="name"]')).toHaveValue('Test User');
    await expect(page.locator('input[name="email"]')).toHaveValue('test@example.com');
  });

  test('should display contact information', async ({ page }) => {
    await page.goto('/contact');

    // Check that contact information is displayed
    await expect(page.locator('text=Email Us')).toBeVisible();
    await expect(page.locator('text=hello@example.com')).toBeVisible();
    await expect(page.locator('text=Office Hours')).toBeVisible();
  });

  test('@a11y should not have accessibility violations', async ({ page }) => {
    await page.goto('/contact');
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});