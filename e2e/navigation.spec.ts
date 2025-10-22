import { test, expect } from '@playwright/test';

/**
 * Validates navbar interactions for both mobile and desktop layouts, ensuring
 * users can open the drawer, trigger search, and navigate to key sections.
 */
test.describe('navbar interactions', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('mobile drawer and search modal operate correctly', async ({ page }) => {
    await page.goto('/');

    const searchButton = page.locator('button[aria-label="Open search"]').first();
    await searchButton.click();

    const searchDialog = page.locator('dialog#search_modal');
    await expect(searchDialog).toHaveJSProperty('open', true);
    await expect(searchDialog.locator('.pagefind-ui').first()).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(searchDialog).toHaveJSProperty('open', false);

    const drawerCheckbox = page.locator('#nav-drawer');
    await expect(drawerCheckbox).not.toBeChecked();

    await page.getByLabel('Open sidebar').click();
    await expect(drawerCheckbox).toBeChecked();
    await expect(page.locator('.drawer-side')).toBeVisible();
  });
});

test.describe('desktop navigation', () => {
  test('primary links navigate to pages', async ({ page }) => {
    await page.goto('/');

    const desktopNav = page.locator('header > nav.navbar');
    await expect(desktopNav).toBeVisible();

    await desktopNav.locator('a[href="/posts/"]').click();
    await expect(page).toHaveURL(/\/posts\/?$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Posts' })).toBeVisible();
  });
});
