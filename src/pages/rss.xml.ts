import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { buildRssItem } from "../lib/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

/**
 * Generates an RSS feed for the blog.
 * Available at /rss.xml
 */
export async function GET(context: APIContext) {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  const site = context.site!;

  return rss({
    title: `${SITE_TITLE} Blog`,
    description: SITE_DESCRIPTION,
    site,
    items: posts
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map((post) => buildRssItem(post, site)),
    customData: "<language>en-us</language>",
  });
}
