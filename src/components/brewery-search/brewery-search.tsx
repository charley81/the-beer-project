'use client '

import { use, useState } from 'react'

interface Brewery {
  id: string
  name: string
  brewery_type: string
  street: string | null
  city: string
  state: string
  website_url: string | null
  phone: string
}

export default function BrewerySearch() {
  // state
  const [city, setCity] = useState('')
  const [breweries, setBreweries] = useState<Brewery[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!city.trim()) return

    setLoading(true)
    setError('')

    // fetch data from api
    try {
      const response = await fetch(
        `https://api.openbrewerydb.org/v1/breweries?by_city=${encodeURIComponent(city)}`,
      )

      if (!response.ok) throw new Error('Failed to fetch breweries')

      const data = await response.json()
      setBreweries(data)
    } catch (error) {
      setError('Something went wrong please try again')
    } finally {
      setLoading(false)
    }

    return (
      <div className="max-w-4xl mx-auto">
        {/* search form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={city}
              placeholder="Enter city name..."
              className="flex-1 px-4 py-2 border rounded-lg"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !city.trim()}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gra"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>
      </div>
    )
  }
}
