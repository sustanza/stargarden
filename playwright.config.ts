import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for Stargarden's end-to-end smoke tests.
 * It boots the Astro site, reuses the dev server locally, and falls back to the
 * production preview build inside CI to stay close to real deployments.
 */
const HOST = '127.0.0.1';
const PORT = Number.parseInt(process.env.PORT ?? '4321', 10);
const baseURL = `http://${HOST}:${PORT}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL,
    trace: process.env.CI ? 'on-first-retry' : 'retain-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: process.env.CI
      ? `npm run preview -- --host ${HOST} --port ${PORT}`
      : `npm run dev -- --host ${HOST} --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
    stderr: 'pipe',
    timeout: 120_000,
  },
});
