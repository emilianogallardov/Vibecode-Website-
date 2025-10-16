import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Homepage', () => {
  test('should load and display hero section', async ({ page }) => {
    await page.goto('/');

    // Check hero section is visible
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Build Websites That Convert');

    // Check CTAs are present
    await expect(page.getByRole('link', { name: 'Get Started' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'View Examples' }).first()).toBeVisible();
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    await page.goto('/');

    // Check title
    await expect(page).toHaveTitle(/Vibecode/);

    // Check meta description
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
  });

  test('should navigate to contact page', async ({ page }) => {
    await page.goto('/');

    // Click contact link
    await page.getByRole('link', { name: 'Contact' }).first().click();

    // Should be on contact page
    await expect(page).toHaveURL('/contact');
    await expect(page.locator('h1')).toContainText('Get in Touch');
  });

  test('@a11y should not have accessibility violations', async ({ page }) => {
    await page.goto('/');
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});