import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

export const collections = {
  posts: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        description: z.string().max(160),
        cover: image(),
        date: z.date(),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().optional(),
      }),
  }),
};
