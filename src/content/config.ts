// src/content/config.ts
import { defineCollection, z } from "astro:content";

const slug = z.string().regex(/^[a-z0-9-]+$/);

export const collections = {
  posts: defineCollection({
    type: "content",
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