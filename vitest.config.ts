import { getViteConfig } from 'astro/config';

export default getViteConfig(
  {},
  {
    site: 'https://stargarden.pages.dev',
    trailingSlash: 'always',
  },
);