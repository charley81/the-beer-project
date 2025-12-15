import { defineCollection, z, type SchemaContext } from 'astro:content'
import { glob } from 'astro/loaders'

export const imageSchema = ({ image }: SchemaContext) =>
  z.object({
    image: image(),
    description: z.string().optional(),
  })

const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/pages/blog' }),
  schema: ({ image }) => {
    return z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      author: z.string(),
      date: z.string(),
      tags: z.array(z.string()).optional(),
      featuredImage: imageSchema({ image }),
    })
  },
})

export const collections = { blog }
