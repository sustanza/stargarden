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
