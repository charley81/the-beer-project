import { defineAction, ActionError } from 'astro:actions'
import { z } from 'astro:schema'
import { getBreweriesByCity } from '@/lib/api/brewery'
import { db, Favorite, and, eq } from 'astro:db'
import { auth } from '@/lib/auth'

export const server = {
  search: defineAction({
    accept: 'form',
    input: z.object({
      city: z.string().min(2, 'Please enter at least 2 characters.'),
      page: z.number().optional().default(1),
    }),
    handler: async (input, context) => {
      const breweries = await getBreweriesByCity(input.city, input.page)

      const session = await auth.api.getSession({
        headers: context.request.headers,
      })

      let favoriteIds: string[] = []
      if (session?.user) {
        const favorites = await db
          .select({ breweryId: Favorite.breweryId })
          .from(Favorite)
          .where(eq(Favorite.userId, session.user.id))

        favoriteIds = favorites.map((f) => f.breweryId)
      }

      return {
        breweries,
        favoriteIds,
      }
    },
  }),

  toggleFavorite: defineAction({
    input: z.object({
      breweryId: z.string(),
    }),
    handler: async (input, context) => {
      const session = await auth.api.getSession({
        headers: context.request.headers,
      })

      if (!session) {
        throw new ActionError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to favorite a brewery.',
        })
      }

      const userId = session.user.id

      const existing = await db
        .select()
        .from(Favorite)
        .where(
          and(
            eq(Favorite.userId, userId),
            eq(Favorite.breweryId, input.breweryId)
          )
        )
        .get()

      if (existing) {
        await db
          .delete(Favorite)
          .where(
            and(
              eq(Favorite.userId, userId),
              eq(Favorite.breweryId, input.breweryId)
            )
          )
        return { favorited: false }
      } else {
        await db.insert(Favorite).values({
          id: crypto.randomUUID(),
          userId,
          breweryId: input.breweryId,
          createdAt: new Date(),
        })
        return { favorited: true }
      }
    },
  }),
}
