import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

/**
 * Remark plugin that calculates reading time from the markdown body and
 * writes it into Astro's frontmatter as `minutesRead`.
 *
 * Per the Astro reading-time recipe:
 * https://docs.astro.build/en/recipes/reading-time/
 *
 * Access the value via the second element of `render(entry)`:
 *   const { Content, remarkPluginFrontmatter } = await render(post);
 *   remarkPluginFrontmatter.minutesRead
 */
export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    data.astro.frontmatter.minutesRead = readingTime.text;
  };
}
