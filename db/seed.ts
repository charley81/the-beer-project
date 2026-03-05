import { db, BlogPost } from 'astro:db'

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(BlogPost).values([
    {
      id: 'post-1',
      title: 'First Post',
      description: 'The first beer post',
      author: 'Admin-1',
      date: '2026-03-05',
      content: 'This is the content of the first post',
    },
  ])
}
