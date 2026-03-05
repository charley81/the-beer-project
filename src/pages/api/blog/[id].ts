import { db, BlogPost, eq } from 'astro:db'
import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

export const prerender = false

// GET: post by ID or return all posts
export const GET: APIRoute = async ({ params }) => {
  const { id } = params

  const post = await db
    .select()
    .from(BlogPost)
    .where(eq(BlogPost.id, id as string))
    .get()

  if (post) {
    return new Response(JSON.stringify(post), {
      status: 200,
    })
  }

  // fallback: list all
  const allPosts = await db.select().from(BlogPost)
  return new Response(JSON.stringify(allPosts), { status: 200 })
}

// POST: Create a new post
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()
    const result = await db.insert(BlogPost).values(body).returning()
    return new Response(JSON.stringify(result[0]), { status: 201 })
  } catch (error) {
    console.error('SQ Error: ', error)
    return new Response(JSON.stringify({ error: 'Failed to create' }), {
      status: 400,
    })
  }
}

// PUT: Update an exisiting patch
export const PUT: APIRoute = async ({ params, request }) => {
  const { id } = params

  try {
    const body = await request.json()
    const result = await db
      .update(BlogPost)
      .set(body)
      .where(eq(BlogPost.id, id as string))
      .returning()
    return new Response(JSON.stringify(result[0]), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Update failed' }), {
      status: 400,
    })
  }
}
// DELETE: Remove a post
export const DELETE: APIRoute = async ({ params }) => {
  const { id } = params

  try {
    await db.delete(BlogPost).where(eq(BlogPost.id, id as string))
    return new Response(JSON.stringify({ message: 'Deleted' }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Delete failed' }))
  }
}
