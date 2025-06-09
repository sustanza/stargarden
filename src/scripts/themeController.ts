/**
 * Theme controller logic for DaisyUI theme switching (TypeScript version).
 * Syncs all .theme-controller checkboxes and persists theme selection in localStorage.
 *
 * This file is intended to be imported by Astro components. The function
 * auto‑runs when loaded so you only need:
 *
 *   <script>
 *     import "../scripts/themeController.ts";
 *   </script>
 */

export function setupThemeController(): void {
  // Collect every checkbox that controls the theme.
  const controllers = document.querySelectorAll<HTMLInputElement>(".theme-controller");

  // Helper to apply a theme and keep all checkboxes in sync.
  const applyTheme = (theme: string): void => {
    document.documentElement.setAttribute("data-theme", theme);
    controllers.forEach(cb => {
      cb.checked = cb.value === theme;
    });
  };

  // Initialise from localStorage (or fall back to "corporate").
  const savedTheme = localStorage.getItem("theme") ?? "corporate";
  applyTheme(savedTheme);

  // Listen for user changes.
  controllers.forEach(cb => {
    cb.addEventListener("change", () => {
      const newTheme = cb.checked ? cb.value : "corporate";
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