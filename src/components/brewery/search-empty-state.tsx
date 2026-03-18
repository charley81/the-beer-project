import * as React from 'react'
import { Beer, Search as SearchIcon } from 'lucide-react'
import { Button } from '../ui/button'

interface SearchEmptyStateProps {
  hasSearched: boolean
  onSelectCity: (city: string) => void
}

export function SearchEmptyState({
  hasSearched,
  onSelectCity,
}: SearchEmptyStateProps) {
  const suggestions = [
    { name: 'San Diego', icon: '🌴' },
    { name: 'Austin', icon: '🎸' },
    { name: 'Portland', icon: '🌲' },
    { name: 'Asheville', icon: '⛰️' },
    { name: 'Denver', icon: '🏔️' },
  ]

  if (hasSearched) {
    return (
      <div className="col-span-full py-20 animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center gap-3 text-center">
        <div className="flex items-center justify-center rounded-full bg-card p-3">
          <Beer className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">
          No breweries found
        </h3>
        <p className="text-muted-foreground">
          Try searching for a different city or check your spelling
        </p>
      </div>
    )
  }

  return (
    <div className="col-span-full py-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className=" mx-auto mb-8 flex items-center justify-center">
        <SearchIcon className="size-8 text-primary" />
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-2">
        Ready for a pour?
      </h3>
      <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
        Enter a city above or try one of these legendary beer destinations:
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        {suggestions.map((city) => (
          <Button
            key={city.name}
            type="button"
            onClick={() => onSelectCity(city.name)}
            className="cursor-pointer text-sm bg-card border rounded-full font-semibold hover:border-primary hover:bg-card active:scale-95"
          >
            <span>{city.icon}</span>
            {city.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
