import { test, expect } from "@playwright/test";

/**
 * Ensures the DaisyUI theme toggle updates the document theme and persists
 * the choice across reloads via localStorage coordination.
 */
test.describe("theme toggle", () => {
  test("switches theme and remembers selection", async ({ page }) => {
    await page.goto("/");

    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-theme", "corporate");

    const desktopToggle = page.locator(
      "header > nav.navbar input.theme-controller",
    );
    await expect(desktopToggle).toBeVisible();

    const desktopToggleLabel = page.locator("header > nav.navbar label.swap");
    await desktopToggleLabel.click();
    await expect(desktopToggle).toBeChecked();
    await expect(html).toHaveAttribute("data-theme", "business");

    const storedTheme = await page.evaluate(() =>
      window.localStorage.getItem("theme"),
    );
    expect(storedTheme).toBe("business");

    await page.reload();
    await expect(html).toHaveAttribute("data-theme", "business");
  });

  test("theme state persists across SPA navigations under ClientRouter", async ({
    page,
  }) => {
    await page.goto("/");

    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-theme", "corporate");

    // Toggle to dark
    const desktopToggleLabel = page.locator("header > nav.navbar label.swap");
    await desktopToggleLabel.click();
    await expect(html).toHaveAttribute("data-theme", "business");

    // Click an internal link — ClientRouter promotes this to an SPA swap
    await page.locator('header > nav.navbar a[href="/posts/"]').click();
    await expect(page).toHaveURL(/\/posts\/?$/);

    // data-theme must persist across the SPA nav, and themeController must
    // have re-bound on astro:page-load so the checkbox stays in sync
    await expect(html).toHaveAttribute("data-theme", "business");
    const desktopToggle = page.locator(
      "header > nav.navbar input.theme-controller",
    );
    await expect(desktopToggle).toBeChecked();
  });
});
