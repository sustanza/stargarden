/**
 * Astro middleware to normalize URLs to trailing slash style.
 *
 * With `trailingSlash: 'always'` in astro.config, navigating to a path
 * without a trailing slash in dev shows an overlay. This middleware
 * performs a redirect instead, improving DX and ensuring unknown paths
 * cleanly reach the custom 404 page.
 */
import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const url = new URL(context.request.url);

  // Ignore the root path and file-like requests that have an extension
  const isRoot = url.pathname === '/';
  const hasTrailingSlash = url.pathname.endsWith('/');
  const looksLikeFile = /\.[^/]+$/.test(url.pathname);

  if (!isRoot && !hasTrailingSlash && !looksLikeFile) {
    url.pathname = `${url.pathname}/`;
    // Use 308 to preserve method; 301 would also work
    return context.redirect(url.toString(), 308);
  }

  return next();
};

