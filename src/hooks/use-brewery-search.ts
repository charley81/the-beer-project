import { useState } from 'react'
import { getBreweriesByCity, type Brewery } from '@/lib/api/brewery'

export function useBrewerySearch() {
  const [results, setResults] = useState<Brewery[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  const search = async (city: string) => {
    if (!city.trim()) return

    setIsLoading(true)
    setError(null)
    setHasSearched(true)

    try {
      const data = await getBreweriesByCity(city)
      setResults(data)
    } catch (error) {
      setError('Failed to fetch breweries. Please try again.')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { results, isLoading, error, hasSearched, search }
}
