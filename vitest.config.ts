import { getViteConfig } from 'astro/config';

export default getViteConfig(
  {  },
  {
    site: 'https://example.com/',
    trailingSlash: 'always',
  },
);