// src/content/config.ts
import { defineCollection, z } from "astro:content";

const slug = z.string().regex(/^[a-z0-9-]+$/);

export const collections = {
  issues: defineCollection({
    type: "content",
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        description: z.string().max(160),
        cover: image(),
        date: z.date(),
        youtubeId: z.string().length(11).optional(),

        /* warranty-tracking */
        warrantyStartDate: z.date().optional(),
        warrantyStatus: z.enum([
          "requested", "in-review", "approved", "denied", "completed",
        ]).optional(),
        warrantyNotes: z.string().optional(),
        warrantyCompletionDate: z.date().optional(),
        warrantyCompletionNotes: z.string().optional(),

        /* ↓↓↓ relations ↓↓↓ */
        relatedVideos: z.array(slug).default([]).optional(),   // slugs from videos
        tags: z.array(z.string()).default([]),
        draft: z.boolean().optional(),
      }),
  }),
};