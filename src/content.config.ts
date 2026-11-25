import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/posts',
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    date: z.string(),
    summary: z.string(),
    lang: z.literal('tr').default('tr'),
    tags: z.array(z.string()),
    readingTime: z.string().optional(),
    parent: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const collections = { posts };
