import type { APIRoute } from "astro";

/**
 * Dynamic robots.txt endpoint per Astro's sitemap docs:
 * https://docs.astro.build/en/guides/integrations-guide/sitemap/#sitemap-link-in-robotstxt
 *
 * Reads `site` from the route context so a fork that updates `site:` in
 * astro.config.mjs propagates here automatically.
 */
const getRobotsTxt = (sitemapURL: URL) => `User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);
  return new Response(getRobotsTxt(sitemapURL), {
    headers: { "Content-Type": "text/plain" },
  });
};
