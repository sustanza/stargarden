// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

import astroExpressiveCode from "astro-expressive-code";

import pagefind from "astro-pagefind";

import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";

const expressiveCode = astroExpressiveCode({
  // Pair light + dark themes; switch by DaisyUI's data-theme attribute.
  // Per /reference/configuration/#themecssselector — overriding the default
  // selector wires expressive-code's theme switching to the same data-theme
  // attribute DaisyUI uses, so syntax highlighting always matches the page
  // theme.
  themes: ["github-light", "github-dark"],
  themeCssSelector: (theme) =>
    `[data-theme="${theme.name === "github-dark" ? "business" : "corporate"}"]`,
  styleOverrides: {
    borderRadius: "0.5rem",
    frames: {
      shadowColor: "#124",
    },
  },
});

// https://astro.build/config
export default defineConfig({
  site: "https://stargarden.pages.dev",
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
  },
  integrations: [sitemap(), pagefind(), expressiveCode],
});
