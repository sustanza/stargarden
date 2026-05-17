/**
 * Theme controller logic for DaisyUI theme switching.
 * Syncs all .theme-controller checkboxes and persists theme selection in
 * localStorage, falling back to `prefers-color-scheme` on first visit.
 *
 * Imported by ThemeToggle.astro; auto-runs when the module loads.
 */

export type DaisyTheme = "corporate" | "business";

/**
 * Compute the effective theme name given the persisted choice and the OS
 * preference. Pure function — three branches:
 *  - saved value wins
 *  - else, prefers-dark → business
 *  - else → corporate
 */
export function getEffectiveTheme(
  saved: string | null,
  prefersDark: boolean,
): DaisyTheme {
  if (saved === "corporate" || saved === "business") {
    return saved;
  }
  return prefersDark ? "business" : "corporate";
}

export function setupThemeController(): void {
  const controllers =
    document.querySelectorAll<HTMLInputElement>(".theme-controller");

  const applyTheme = (theme: DaisyTheme): void => {
    document.documentElement.setAttribute("data-theme", theme);
    controllers.forEach((cb) => {
      cb.checked = cb.value === theme;
    });
  };

  const saved = localStorage.getItem("theme");
  const prefersDark =
    window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  applyTheme(getEffectiveTheme(saved, prefersDark));

  controllers.forEach((cb) => {
    cb.addEventListener("change", () => {
      // Toggling off snaps back to the explicit `corporate` choice so the
      // user's deliberate "light mode" decision overrides their OS preference.
      const newTheme: DaisyTheme = cb.checked
        ? (cb.value as DaisyTheme)
        : "corporate";
      localStorage.setItem("theme", newTheme);
      applyTheme(newTheme);
    });
  });
}

/* ------------------------------------------------------------------ */
/*  Auto‑run when this module is executed in the browser environment. */
/* ------------------------------------------------------------------ */
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupThemeController);
  } else {
    setupThemeController();
  }
}
