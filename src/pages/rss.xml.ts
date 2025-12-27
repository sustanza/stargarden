import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

/**
 * Generates an RSS feed for the blog.
 * Available at /rss.xml
 */
export async function GET(context: APIContext) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);

  return rss({
    title: 'Stargarden Blog',
    description: 'A blog about the cosmos and beyond',
    site: context.site!,
    items: posts
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description,
        link: `/posts/${post.slug}/`,
      })),
    customData: '<language>en-us</language>',
  });
}
