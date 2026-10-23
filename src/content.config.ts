import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const cases = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/cases' }),
  schema: z.object({
    title: z.string(),
    fileNumber: z.string(), // "Dosya 01", "Dosya 02", "Dosya 03"
    tagline: z.string(),
    date: z.string(),
    lang: z.enum(['tr', 'en']),
    testedScale: z.string(),
    summary: z.string(),
    stack: z.array(z.string()),
    metrics: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })).optional(),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    summary: z.string(),
    lang: z.enum(['tr', 'en']),
    tags: z.array(z.string()),
    readingTime: z.string(),
  }),
});

export const collections = { cases, posts };
