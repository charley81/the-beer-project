import { getCollection, getEntry } from 'astro:content'
import type { APIRoute } from 'astro'

export const prerender = false

// GET: post by ID or return all posts
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

// POST: Create a new post
export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json()

    // TODO: await db.insert(Blog).values(data)

    return new Response(
      JSON.stringify({
        message: 'Post created successfully',
        data,
      }),
      { status: 201 },
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
    })
  }
}

// PUT: Update an exisiting patch
export const PUT: APIRoute = async ({ params, request }) => {
  const { id } = params

  try {
    const data = await request.json()

    // TODO: await db.update(Blog).set(data).where(eq(Blog.id, id))

    return new Response(
      JSON.stringify({
        message: `Post ${id} updated successfully`,
        data,
      }),
      { status: 200 },
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Update failed' }), {
      status: 400,
    })
  }
}
// DELETE: Remove a post
export const DELETE: APIRoute = async ({ params }) => {
  const { id } = params

  // TODO: await db.delete(Blog).where(eq(Blog.id, id))

  return new Response(
    JSON.stringify({
      message: `Post ${id} deleted successfully`,
    }),
    {
      status: 200,
    },
  )
}
