import { describe, expect, it } from "vitest";
import { buildRssItem, type RssPost } from "../src/lib/rss";

const site = new URL("https://stargarden.pages.dev");

function makePost(overrides: Partial<RssPost> = {}): RssPost {
  return {
    id: "black-holes",
    body: "# A test heading\n\nBody copy with [a link](/foo) and **emphasis**.",
    data: {
      title: "Black Holes",
      description: "A short description.",
      date: new Date("2025-05-04T00:00:00Z"),
      cover: { src: "/_astro/cover.abc.webp", format: "webp" },
    },
    ...overrides,
  };
}

describe("buildRssItem", () => {
  it("emits title, pubDate, description, link, and rendered HTML content", () => {
    const post = makePost();
    const item = buildRssItem(post, site);

    expect(item.title).toBe("Black Holes");
    expect(item.pubDate).toEqual(new Date("2025-05-04T00:00:00Z"));
    expect(item.description).toBe("A short description.");
    expect(item.link).toBe("/posts/black-holes/");
    expect(item.content).toContain("<h1");
    expect(item.content).toContain("A test heading");
    expect(item.content).toContain('<a href="/foo"');
    expect(item.content).toContain("<strong>emphasis</strong>");
  });

  it("attaches an enclosure with absolute URL when the post has a cover", () => {
    const post = makePost();
    const item = buildRssItem(post, site);

    expect(item.enclosure).toBeDefined();
    expect(item.enclosure?.url).toBe(
      "https://stargarden.pages.dev/_astro/cover.abc.webp",
    );
    expect(item.enclosure?.length).toBe(0);
    expect(item.enclosure?.type).toBe("image/webp");
  });

  it("omits the enclosure when the post has no cover", () => {
    const post = makePost({
      data: {
        title: "No cover",
        description: "still valid",
        date: new Date("2025-01-01T00:00:00Z"),
      },
    });
    const item = buildRssItem(post, site);

    expect(item.enclosure).toBeUndefined();
  });

  it("allows <img> tags through the sanitizer (per Astro RSS docs)", () => {
    const post = makePost({
      body: "![alt](https://example.com/x.png)",
    });
    const item = buildRssItem(post, site);

    expect(item.content).toContain('<img src="https://example.com/x.png"');
    expect(item.content).toContain('alt="alt"');
  });
});
