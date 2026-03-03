import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({
    pattern: '*/index.mdx',
    base: './src/content/projects',
  }),
  schema: ({ image }) =>
    z.object({
      // Higher priority = shown earlier on work page. Display index computed at build time.
      priority: z.number().default(0),
      name: z.string(),
      categories: z
        .array(z.enum(['research', 'software', 'hardware', 'design']))
        .default([]),
      // Images co-located with the project file — optimized at build time
      thumbnails: z.array(image()).default([]),
      // Optional captions for thumbnails, matched by index (missing = no caption)
      captions: z.array(z.string()).default([]),
      // Optional per-image scale factors (0–1), matched by index to thumbnails
      imageScales: z.array(z.number()).default([]),
      // Short silent video clips — stored in public/projects/<slug>/
      videoThumbnails: z.array(z.string()).default([]),
      // Optional interleave positions for videos: videoPositions[v] = image index after which video v should appear
      // If omitted or empty, all videos render after all images (legacy order)
      videoPositions: z.array(z.number()).default([]),
      // Layout variant for the project page ('layout' is reserved by MDX)
      template: z.enum(['text', 'gallery']).default('text'),
      // Set true on template files to exclude from the work page
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
