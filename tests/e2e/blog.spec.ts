import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Blog', () => {
  test('should display blog list page', async ({ page }) => {
    await page.goto('/blog');

    // Check page title and heading
    await expect(page).toHaveTitle(/Blog/);
    await expect(page.locator('h1')).toBeVisible();

    // Check that blog posts are listed
    const postsCount = await page.locator('article').count();
    expect(postsCount).toBeGreaterThan(0);
  });

  test('should navigate to blog post', async ({ page }) => {
    await page.goto('/blog');

    // Click on first blog post
    const firstPostLink = page.locator('article a').first();
    await firstPostLink.click();

    // Should be on blog post page
    await expect(page).toHaveURL(/\/blog\/.+/);
    await expect(page.locator('article h1')).toBeVisible();

    // Check that content is rendered
    await expect(page.locator('article .prose')).toBeVisible();
  });

  test('should have structured data on blog post', async ({ page }) => {
    await page.goto('/blog/getting-started-with-nextjs');

    // Check for JSON-LD structured data
    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').count();
    expect(jsonLdScripts).toBeGreaterThan(0);

    // Verify article structured data exists
    const articleStructuredData = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(articleStructuredData!);
    expect(data['@type']).toBe('Article');
    expect(data.headline).toBeTruthy();
  });

  test('should display proper metadata', async ({ page }) => {
    await page.goto('/blog/getting-started-with-nextjs');

    // Check meta description
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();

    // Check Open Graph tags
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');

    expect(ogTitle).toBeTruthy();
    expect(ogType).toBe('article');
  });

  test('@a11y blog list should not have accessibility violations', async ({ page }) => {
    await page.goto('/blog');
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('@a11y blog post should not have accessibility violations', async ({ page }) => {
    await page.goto('/blog/getting-started-with-nextjs');
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});