import { test, expect } from '@playwright/test';

/**
 * Confirms that the demo content renders correctly so template consumers can
 * browse listings and open individual posts without runtime errors.
 */
test.describe('demo content smoke', () => {
  test('lists posts and opens a detail page', async ({ page }) => {
    await page.goto('/posts/');

    const cards = page.locator('a.card');
    await expect(cards.first()).toBeVisible();
    const firstTitle = (await cards.first().locator('.card-title').textContent())?.trim();
    expect(firstTitle).toBeTruthy();

    await cards.first().click();
    await expect(page).toHaveURL(/\/posts\/[\w-]+\/?$/);
    if (firstTitle) {
      await expect(page.locator('article.prose h1')).toHaveText(firstTitle);
    } else {
      await expect(page.locator('article.prose h1')).toBeVisible();
    }
  });
});

/**
 * Verifies that posts with `draft: true` are excluded from all public pages
 * and do not generate individual routes.
 */
test.describe('draft post filtering', () => {
  test('draft post does not appear in the posts listing', async ({ page }) => {
    await page.goto('/posts/');
    await expect(page.locator('a.card').first()).toBeVisible();
    await expect(page.locator('text=Draft Test Post')).toHaveCount(0);
  });

  test('draft post does not appear on the home page', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Draft Test Post')).toHaveCount(0);
  });

  test('draft post returns 404', async ({ page }) => {
    const response = await page.goto('/posts/draft-test-post/');
    expect(response?.status()).toBe(404);
  });
});
