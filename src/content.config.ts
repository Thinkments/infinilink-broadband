import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) => z.object({
    title: z.string().max(65),
    description: z.string().min(50).max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Infinilink Technical Team'),
    heroImage: image().or(z.string()),
    altText: z.string(),
    category: z.enum(['Rural Internet Guides', 'Tech & Speeds', 'Community & Wise County', 'Troubleshooting & Wi-Fi']),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
