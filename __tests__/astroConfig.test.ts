import { beforeAll, describe, expect, it, vi } from 'vitest';

/**
 * Minimal representation of a Vite plugin used inside the Astro config.
 */
interface PluginStub {
  readonly name: string;
}

/**
 * Minimal representation of an Astro integration.
 */
interface IntegrationStub<TOptions = Record<string, unknown>> {
  readonly name: string;
  readonly options?: TOptions;
}

/**
 * Strongly typed options that the template passes into astro-expressive-code.
 */
interface ExpressiveCodeOptions {
  readonly themes: string[];
  readonly styleOverrides: {
    readonly borderRadius: string;
    readonly frames: {
      readonly shadowColor: string;
    };
  };
}

/**
 * Shape we expect from the Astro configuration object for smoke testing.
 */
interface AstroConfigShape {
  readonly site?: string;
  readonly integrations?: IntegrationStub[];
  readonly vite?: {
    readonly plugins?: PluginStub[];
  };
}

const tailwindPluginStub: PluginStub = { name: '@tailwindcss/vite' };
const sitemapIntegrationStub: IntegrationStub = { name: '@astrojs/sitemap' };
const reactIntegrationStub: IntegrationStub = { name: '@astrojs/react' };
const pagefindIntegrationStub: IntegrationStub = { name: 'astro-pagefind' };
const expressiveCodeInvocations: ExpressiveCodeOptions[] = [];

vi.mock('astro/config', () => ({
  /**
   * Provides an identity version of Astro's defineConfig helper for testing.
   */
  defineConfig: <TConfig extends AstroConfigShape>(config: TConfig): TConfig => config,
}));

vi.mock('@tailwindcss/vite', () => ({
  default: () => tailwindPluginStub,
}));

vi.mock('@astrojs/sitemap', () => ({
  default: () => sitemapIntegrationStub,
}));

vi.mock('@astrojs/react', () => ({
  default: () => reactIntegrationStub,
}));

vi.mock('astro-pagefind', () => ({
  default: () => pagefindIntegrationStub,
}));

vi.mock('astro-expressive-code', () => ({
  default: (options: ExpressiveCodeOptions) => {
    expressiveCodeInvocations.push(options);
    return { name: 'astro-expressive-code', options } satisfies IntegrationStub<ExpressiveCodeOptions>;
  },
}));

let config: AstroConfigShape;

beforeAll(async () => {
  const imported = await import('../astro.config.mjs');
  config = imported.default as AstroConfigShape;
});

describe('astro.config.mjs', () => {
  it('keeps critical site metadata and integrations wired up', () => {
    expect(config.site).toBe('https://stargarden.pages.dev');

    const integrationNames = config.integrations?.map(integration => integration.name);
    expect(integrationNames).toEqual([
      '@astrojs/sitemap',
      '@astrojs/react',
      'astro-pagefind',
      'astro-expressive-code',
    ]);

    const vitePlugins = config.vite?.plugins ?? [];
    expect(vitePlugins).toHaveLength(1);
    expect(vitePlugins[0]).toBe(tailwindPluginStub);
  });

  it('passes expressive code theme overrides for consistent syntax styling', () => {
    expect(expressiveCodeInvocations).toHaveLength(1);
    const [invocation] = expressiveCodeInvocations;
    expect(invocation.themes).toEqual(['github-dark']);
    expect(invocation.styleOverrides).toMatchObject({
      borderRadius: '0.5rem',
      frames: { shadowColor: '#124' },
    });
  });
});
