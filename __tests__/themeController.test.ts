/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from "vitest";

import {
  getEffectiveTheme,
  setupThemeController,
} from "../src/scripts/themeController";

/**
 * jsdom doesn't implement matchMedia. Each test stubs it to control the
 * `prefers-color-scheme: dark` branch.
 */
function stubMatchMedia(prefersDark: boolean): void {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches: prefersDark && query.includes("prefers-color-scheme: dark"),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
}

describe("getEffectiveTheme", () => {
  it("returns the saved value when it is a known theme", () => {
    expect(getEffectiveTheme("business", false)).toBe("business");
    expect(getEffectiveTheme("corporate", true)).toBe("corporate");
  });

  it("falls back to business when no saved theme and OS prefers dark", () => {
    expect(getEffectiveTheme(null, true)).toBe("business");
  });

  it("falls back to corporate when no saved theme and OS does not prefer dark", () => {
    expect(getEffectiveTheme(null, false)).toBe("corporate");
  });

  it("ignores unrecognized saved values", () => {
    expect(getEffectiveTheme("mystery", true)).toBe("business");
    expect(getEffectiveTheme("", false)).toBe("corporate");
  });
});

describe("themeController", () => {
  beforeEach(() => {
    // Clear theme and DOM before each test
    localStorage.clear();
    document.body.innerHTML = "";
    document.documentElement.removeAttribute("data-theme");
    vi.unstubAllGlobals();
    stubMatchMedia(false);
  });

  it("respects prefers-color-scheme when no saved theme exists", () => {
    stubMatchMedia(true);
    document.body.innerHTML =
      '<input type="checkbox" class="theme-controller" value="business">';
    setupThemeController();
    const cb = document.querySelector<HTMLInputElement>(".theme-controller");
    expect(document.documentElement.getAttribute("data-theme")).toBe(
      "business",
    );
    expect(cb?.checked).toBe(true);
  });

  it("defaults to corporate when no saved theme and OS prefers light", () => {
    document.body.innerHTML =
      '<input type="checkbox" class="theme-controller" value="business">';
    setupThemeController();
    const cb = document.querySelector<HTMLInputElement>(".theme-controller");
    expect(document.documentElement.getAttribute("data-theme")).toBe(
      "corporate",
    );
    expect(cb?.checked).toBe(false);
  });

  it("should set data-theme from localStorage on load", () => {
    localStorage.setItem("theme", "business");
    document.body.innerHTML =
      '<input type="checkbox" class="theme-controller" value="business">';
    setupThemeController();
    const cb = document.querySelector<HTMLInputElement>(".theme-controller");
    expect(document.documentElement.getAttribute("data-theme")).toBe(
      "business",
    );
    expect(cb?.checked).toBe(true);
  });

  it("should update theme and persist when toggled", () => {
    document.body.innerHTML =
      '<input type="checkbox" class="theme-controller" value="business">';
    setupThemeController();
    const cb = document.querySelector<HTMLInputElement>(".theme-controller");
    expect(cb).not.toBeNull();
    if (!cb) return;
    cb.checked = true;
    cb.dispatchEvent(new Event("change"));
    expect(document.documentElement.getAttribute("data-theme")).toBe(
      "business",
    );
    expect(localStorage.getItem("theme")).toBe("business");
    cb.checked = false;
    cb.dispatchEvent(new Event("change"));
    expect(document.documentElement.getAttribute("data-theme")).toBe(
      "corporate",
    );
    expect(localStorage.getItem("theme")).toBe("corporate");
  });

  it("should sync all theme-controller checkboxes", () => {
    document.body.innerHTML = `
      <input type="checkbox" class="theme-controller" value="business">
      <input type="checkbox" class="theme-controller" value="business">
    `;
    setupThemeController();
    const cbs =
      document.querySelectorAll<HTMLInputElement>(".theme-controller");
    expect(cbs.length).toBe(2);
    const [cb1, cb2] = cbs;
    cb1.checked = true;
    cb1.dispatchEvent(new Event("change"));
    expect(cb2.checked).toBe(true);
    cb2.checked = false;
    cb2.dispatchEvent(new Event("change"));
    expect(cb1.checked).toBe(false);
  });
});
