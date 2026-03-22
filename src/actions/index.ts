import { defineAction, ActionError } from 'astro:actions'
import { z } from 'astro:schema'
import { getBreweriesByCity } from '@/lib/api/brewery'
import { getFavoriteIdsForUser, toggleFavorite } from '@/lib/api/favorites'
import { auth } from '@/lib/auth'

export const server = {
  search: defineAction({
    accept: 'form',
    input: z.object({
      city: z.string().min(2, 'Please enter at least 2 characters.'),
      page: z.coerce.number().optional().default(1),
    }),
    handler: async (input, context) => {
      const breweries = await getBreweriesByCity(input.city, input.page)

      const session = await auth.api.getSession({
        headers: context.request.headers,
      })

      const favoriteIds = session?.user ? await getFavoriteIdsForUser(session.user.id) : []

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

      const favorited = await toggleFavorite(session.user.id, input.breweryId)
      return { favorited }
    },
  }),
}
