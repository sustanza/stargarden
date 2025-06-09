/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach } from 'vitest';

// Import the theme controller logic
import { setupThemeController } from '../src/scripts/themeController';

describe('themeController', () => {
  beforeEach(() => {
    // Clear theme and DOM before each test
    localStorage.clear();
    document.body.innerHTML = '';
    document.documentElement.removeAttribute('data-theme');
  });

  it('should set data-theme from localStorage on load', () => {
    localStorage.setItem('theme', 'business');
    document.body.innerHTML = '<input type="checkbox" class="theme-controller" value="business">';
    setupThemeController();
    const cb = document.querySelector<HTMLInputElement>('.theme-controller');
    expect(document.documentElement.getAttribute('data-theme')).toBe('business');
    expect(cb?.checked).toBe(true);
  });

  it('should update theme and persist when toggled', () => {
    document.body.innerHTML = '<input type="checkbox" class="theme-controller" value="business">';
    setupThemeController();
    const cb = document.querySelector<HTMLInputElement>('.theme-controller');
    expect(cb).not.toBeNull();
    if (!cb) return;
    cb.checked = true;
    cb.dispatchEvent(new Event('change'));
    expect(document.documentElement.getAttribute('data-theme')).toBe('business');
    expect(localStorage.getItem('theme')).toBe('business');
    cb.checked = false;
    cb.dispatchEvent(new Event('change'));
    expect(document.documentElement.getAttribute('data-theme')).toBe('corporate');
    expect(localStorage.getItem('theme')).toBe('corporate');
  });

  it('should sync all theme-controller checkboxes', () => {
    document.body.innerHTML = `
      <input type="checkbox" class="theme-controller" value="business">
      <input type="checkbox" class="theme-controller" value="business">
    `;
    setupThemeController();
    const cbs = document.querySelectorAll<HTMLInputElement>('.theme-controller');
    expect(cbs.length).toBe(2);
    const [cb1, cb2] = cbs;
    cb1.checked = true;
    cb1.dispatchEvent(new Event('change'));
    expect(cb2.checked).toBe(true);
    cb2.checked = false;
    cb2.dispatchEvent(new Event('change'));
    expect(cb1.checked).toBe(false);
  });
});
