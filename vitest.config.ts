import { getViteConfig } from 'astro/config';

export default getViteConfig(
  {},
  {
    site: 'https://astro.build',
    trailingSlash: 'always',
  },
);