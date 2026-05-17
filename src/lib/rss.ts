import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";

const parser = new MarkdownIt();

/**
 * Minimal post shape consumed by `buildRssItem`.
 *
 * Kept structural (not `CollectionEntry<'posts'>`) so unit tests can construct
 * fixtures inline without dragging in the `astro:content` runtime.
 */
export interface RssPost {
  id: string;
  body?: string;
  data: {
    title: string;
    description: string;
    date: Date;
    cover?: {
      src: string;
      format: string;
    };
  };
}

export interface RssEnclosure {
  url: string;
  length: number;
  type: string;
}

export interface RssItem {
  title: string;
  pubDate: Date;
  description: string;
  link: string;
  content: string;
  enclosure?: RssEnclosure;
}

/**
 * Build a single RSS item from a post collection entry.
 *
 * Renders the markdown body through markdown-it + sanitize-html (allowing
 * `<img>` per the docs at /en/recipes/rss/#including-full-post-content) and
 * attaches the cover image as an `enclosure` when present.
 *
 * Pure function — no Astro context required beyond the absolute site URL,
 * so callers can fixture this directly in unit tests.
 */
export function buildRssItem(post: RssPost, site: URL): RssItem {
  const item: RssItem = {
    title: post.data.title,
    pubDate: post.data.date,
    description: post.data.description,
    link: `/posts/${post.id}/`,
    content: sanitizeHtml(parser.render(post.body ?? ""), {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    }),
  };

  if (post.data.cover) {
    item.enclosure = {
      url: new URL(post.data.cover.src, site).href,
      length: 0,
      type: `image/${post.data.cover.format}`,
    };
  }

  return item;
}
