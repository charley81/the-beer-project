import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  const blog = await getCollection('blog')

  return rss({
    stylesheet: '/pretty-feed-v3.xsl',
    title: 'The Beer Project',
    description: 'The latest word from the best beer project in the world',
    site: context.site!,
    trailingSlash: false,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.date,
      link: `blog/${post.id}`,
      customData: `<language>en-us</language>`,
    })),
  })
}
