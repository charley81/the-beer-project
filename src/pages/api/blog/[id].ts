import { getCollection, getEntry } from 'astro:content'
import type { APIRoute } from 'astro'

export const prerender = false

export const GET: APIRoute = async ({ params }) => {
  const { id } = params

  const post = await getEntry('blog', id as string)

  if (post) {
    return new Response(JSON.stringify(post), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const allPosts = await getCollection('blog')

  return new Response(JSON.stringify(allPosts), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'X-Fallback': 'true',
    },
  })
}
