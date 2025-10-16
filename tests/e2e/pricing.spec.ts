import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Pricing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pricing');
  });

  test('displays pricing plans', async ({ page }) => {
    // Check page heading
    await expect(page.locator('h1')).toContainText('Choose Your Plan');

    // Verify all three pricing tiers are present
    await expect(page.locator('[data-testid="pricing-card"]')).toHaveCount(3);

    // Check for starter plan
    const starterCard = page.locator('[data-testid="pricing-card"]').first();
    await expect(starterCard).toContainText('Starter');
    await expect(starterCard).toContainText('$9');
    await expect(starterCard).toContainText('/month');

    // Check for professional plan
    const proCard = page.locator('[data-testid="pricing-card"]').nth(1);
    await expect(proCard).toContainText('Professional');
    await expect(proCard).toContainText('$29');
    await expect(proCard).toContainText('Most Popular');

    // Check for enterprise plan
    const enterpriseCard = page.locator('[data-testid="pricing-card"]').nth(2);
    await expect(enterpriseCard).toContainText('Enterprise');
    await expect(enterpriseCard).toContainText('Custom');
  });

  test('displays feature lists for each plan', async ({ page }) => {
    const cards = page.locator('[data-testid="pricing-card"]');

    // Each card should have a feature list
    for (let i = 0; i < 3; i++) {
      const card = cards.nth(i);
      const features = card.locator('li');
      await expect(features).toHaveCount(await features.count());
      expect(await features.count()).toBeGreaterThan(0);
    }
  });

  test('CTA buttons are clickable', async ({ page }) => {
    // Check that each pricing card has a CTA button
    const ctaButtons = page.locator('[data-testid="pricing-card"] button, [data-testid="pricing-card"] a[role="button"]');
    await expect(ctaButtons).toHaveCount(3);

    // Verify buttons are visible and enabled
    for (let i = 0; i < 3; i++) {
      const button = ctaButtons.nth(i);
      await expect(button).toBeVisible();
      await expect(button).toBeEnabled();
    }
  });

  test('FAQ section is present', async ({ page }) => {
    // Check for FAQ heading
    await expect(page.locator('h2')).toContainText('Frequently Asked Questions');

    // Check that FAQ items exist
    const faqItems = page.locator('[data-testid="faq-item"]');
    await expect(faqItems.first()).toBeVisible();
  });

  test.describe('Accessibility', () => {
    test('@a11y has no detectable accessibility violations', async ({ page }) => {
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toHaveLength(0);
    });

    test('@a11y pricing cards have proper ARIA labels', async ({ page }) => {
      const cards = page.locator('[data-testid="pricing-card"]');

      for (let i = 0; i < 3; i++) {
        const card = cards.nth(i);
        const heading = card.locator('h2, h3').first();
        await expect(heading).toBeVisible();

        // Check that buttons have accessible names
        const button = card.locator('button, a[role="button"]').first();
        const buttonText = await button.textContent();
        expect(buttonText).toBeTruthy();
      }
    });
  });

  test('responsive design works correctly', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('[data-testid="pricing-card"]').first()).toBeVisible();

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('[data-testid="pricing-card"]').first()).toBeVisible();

    // Test desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.locator('[data-testid="pricing-card"]').first()).toBeVisible();
  });
});