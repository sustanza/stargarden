import { defineConfig } from 'vitest/config';

/**
 * Vitest configuration.
 * - Uses jsdom for DOM APIs in tests.
 * - Enables globals (describe/it/expect) without explicit imports.
 */
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
