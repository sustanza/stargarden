import { test, expect } from '@playwright/test';

/**
 * Ensures the DaisyUI theme toggle updates the document theme and persists
 * the choice across reloads via localStorage coordination.
 */
test.describe('theme toggle', () => {
  test('switches theme and remembers selection', async ({ page }) => {
    await page.goto('/');

    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'corporate');

    const desktopToggle = page.locator('header > nav.navbar input.theme-controller');
    await expect(desktopToggle).toBeVisible();

    const desktopToggleLabel = page.locator('header > nav.navbar label.swap');
    await desktopToggleLabel.click();
    await expect(desktopToggle).toBeChecked();
    await expect(html).toHaveAttribute('data-theme', 'business');

    const storedTheme = await page.evaluate(() => window.localStorage.getItem('theme'));
    expect(storedTheme).toBe('business');

    await page.reload();
    await expect(html).toHaveAttribute('data-theme', 'business');
  });
});
