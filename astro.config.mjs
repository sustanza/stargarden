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
  // You can set configuration options here
  themes: ["github-dark"],
  styleOverrides: {
    // You can also override styles
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
