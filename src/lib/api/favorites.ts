import { db, Favorite, eq, and } from 'astro:db'
import { getBreweriesByIds, type Brewery } from './brewery'

/**
 * Service to handle favorites-related logic.
 * Keeps our Astro pages and actions clean and DRY.
 */
export async function getFavoriteIdsForUser(userId: string): Promise<string[]> {
  const favorites = await db
    .select({ breweryId: Favorite.breweryId })
    .from(Favorite)
    .where(eq(Favorite.userId, userId))

  return favorites.map((f) => f.breweryId)
}

/**
 * Fetches all full brewery objects favorited by a user.
 */
export async function getFavoriteBreweriesForUser(userId: string): Promise<Brewery[]> {
  const ids = await getFavoriteIdsForUser(userId)
  if (ids.length === 0) return []
  
  return await getBreweriesByIds(ids)
}

export async function isBreweryFavorited(userId: string, breweryId: string): Promise<boolean> {
  const favorite = await db
    .select()
    .from(Favorite)
    .where(
      and(
        eq(Favorite.userId, userId),
        eq(Favorite.breweryId, breweryId)
      )
    )
    .get()
  
  return !!favorite
}

export async function toggleFavorite(userId: string, breweryId: string): Promise<boolean> {
  const existing = await db
    .select()
    .from(Favorite)
    .where(
      and(
        eq(Favorite.userId, userId),
        eq(Favorite.breweryId, breweryId)
      )
    )
    .get()

  if (existing) {
    await db
      .delete(Favorite)
      .where(
        and(
          eq(Favorite.userId, userId),
          eq(Favorite.breweryId, breweryId)
        )
      )
    return false
  } else {
    await db.insert(Favorite).values({
      id: crypto.randomUUID(),
      userId,
      breweryId: breweryId,
      createdAt: new Date(),
    })
    return true
  }
}
