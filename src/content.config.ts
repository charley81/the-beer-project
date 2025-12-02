import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/pages/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    date: z.string(),
    tags: z.array(z.string()).optional(),
    featuredImage: z.string().optional(),
  }),
})

export const collections = { blog }
