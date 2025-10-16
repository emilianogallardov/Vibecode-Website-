import { test, expect } from '@playwright/test';

test.describe('Cookie Consent and Analytics', () => {
  test.beforeEach(async ({ page }) => {
    // Clear cookies before each test
    await page.context().clearCookies();
  });

  test('shows cookie consent banner on first visit', async ({ page }) => {
    await page.goto('/');

    // Check for consent banner
    const consentBanner = page.locator('[data-testid="cookie-consent"], [role="dialog"]:has-text("cookie"), div:has-text("We use cookies")');
    await expect(consentBanner).toBeVisible({ timeout: 5000 });

    // Check for accept and reject buttons
    const acceptButton = page.locator('button:has-text("Accept"), button:has-text("Allow")');
    const rejectButton = page.locator('button:has-text("Reject"), button:has-text("Decline"), button:has-text("Necessary only")');

    await expect(acceptButton).toBeVisible();
    await expect(rejectButton).toBeVisible();
  });

  test('GA is not loaded before consent', async ({ page }) => {
    // Track if GA is loaded
    let gaLoaded = false;
    page.on('request', (request) => {
      if (request.url().includes('googletagmanager.com') || request.url().includes('google-analytics.com')) {
        gaLoaded = true;
      }
    });

    await page.goto('/');
    await page.waitForTimeout(2000); // Wait to ensure no GA requests

    expect(gaLoaded).toBeFalsy();
  });

  test('accepting cookies enables analytics', async ({ page }) => {
    // Track GA requests
    let gaInitialized = false;
    page.on('request', (request) => {
      if (request.url().includes('googletagmanager.com/gtag/js') ||
          request.url().includes('google-analytics.com')) {
        gaInitialized = true;
      }
    });

    await page.goto('/');

    // Accept cookies
    const acceptButton = page.locator('button:has-text("Accept"), button:has-text("Allow all")').first();
    await acceptButton.click();

    // Wait for GA to initialize
    await page.waitForTimeout(3000);

    // Check if consent was stored
    const cookies = await page.context().cookies();
    const consentCookie = cookies.find(c => c.name.includes('consent') || c.name.includes('cookie'));
    expect(consentCookie).toBeTruthy();

    // Navigate to another page to trigger pageview
    await page.goto('/blog');

    // GA should be initialized after consent
    expect(gaInitialized).toBeTruthy();
  });

  test('rejecting cookies prevents analytics', async ({ page }) => {
    let gaLoaded = false;
    page.on('request', (request) => {
      if (request.url().includes('googletagmanager.com') || request.url().includes('google-analytics.com')) {
        gaLoaded = true;
      }
    });

    await page.goto('/');

    // Reject cookies
    const rejectButton = page.locator('button:has-text("Reject"), button:has-text("Decline"), button:has-text("Necessary only")').first();
    await rejectButton.click();

    // Navigate to trigger any potential GA events
    await page.goto('/blog');
    await page.waitForTimeout(2000);

    // GA should not be loaded
    expect(gaLoaded).toBeFalsy();

    // Check that rejection was stored
    const cookies = await page.context().cookies();
    const consentCookie = cookies.find(c => c.name.includes('consent') || c.name.includes('cookie'));
    expect(consentCookie).toBeTruthy();
  });

  test('consent persists across sessions', async ({ page, context }) => {
    await page.goto('/');

    // Accept cookies
    const acceptButton = page.locator('button:has-text("Accept"), button:has-text("Allow")').first();
    await acceptButton.click();

    // Get cookies
    const cookies = await context.cookies();
    const consentCookie = cookies.find(c => c.name.includes('consent') || c.name.includes('cookie'));
    expect(consentCookie).toBeTruthy();

    // Create new page (simulating new session with same cookies)
    const newPage = await context.newPage();
    await newPage.goto('/');

    // Banner should not be visible
    const consentBanner = newPage.locator('[data-testid="cookie-consent"], [role="dialog"]:has-text("cookie")');
    await expect(consentBanner).not.toBeVisible({ timeout: 3000 });

    await newPage.close();
  });

  test('can withdraw consent after accepting', async ({ page }) => {
    await page.goto('/');

    // Accept cookies first
    const acceptButton = page.locator('button:has-text("Accept"), button:has-text("Allow")').first();
    await acceptButton.click();

    // Look for cookie settings link (usually in footer)
    await page.locator('footer').scrollIntoViewIfNeeded();
    const settingsLink = page.locator('a:has-text("Cookie"), a:has-text("Privacy"), button:has-text("Cookie settings")').first();

    if (await settingsLink.isVisible()) {
      await settingsLink.click();

      // Look for withdraw/revoke option
      const withdrawButton = page.locator('button:has-text("Withdraw"), button:has-text("Revoke"), button:has-text("Change")').first();
      if (await withdrawButton.isVisible()) {
        await withdrawButton.click();

        // Verify consent was withdrawn
        const cookies = await page.context().cookies();
        const consentCookie = cookies.find(c => c.name.includes('consent'));

        // Cookie should either be deleted or set to rejected
        if (consentCookie) {
          expect(consentCookie.value).toContain('denied');
        }
      }
    }
  });

  test('respects Do Not Track header', async ({ browser }) => {
    // Create context with DNT header
    const context = await browser.newContext({
      extraHTTPHeaders: {
        'DNT': '1'
      }
    });

    const page = await context.newPage();

    let gaLoaded = false;
    page.on('request', (request) => {
      if (request.url().includes('googletagmanager.com') || request.url().includes('google-analytics.com')) {
        gaLoaded = true;
      }
    });

    await page.goto('/');
    await page.waitForTimeout(2000);

    // With DNT, analytics should respect the preference
    // Implementation may vary - some sites auto-reject, others still show banner
    const consentBanner = page.locator('[data-testid="cookie-consent"], [role="dialog"]:has-text("cookie")');

    // Either banner is shown or GA is not loaded
    if (!await consentBanner.isVisible({ timeout: 1000 })) {
      expect(gaLoaded).toBeFalsy();
    }

    await context.close();
  });

  test('@a11y consent banner is accessible', async ({ page }) => {
    await page.goto('/');

    const consentBanner = page.locator('[data-testid="cookie-consent"], [role="dialog"]:has-text("cookie"), div:has-text("We use cookies")');
    await expect(consentBanner).toBeVisible();

    // Check for keyboard navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Check if buttons are focusable
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    // Check ARIA attributes
    const dialogRole = await consentBanner.getAttribute('role');
    if (dialogRole) {
      expect(dialogRole).toBe('dialog');
    }
  });
});