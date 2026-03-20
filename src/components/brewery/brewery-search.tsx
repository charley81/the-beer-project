import { useActionState, useRef, useEffect, useState } from 'react'
import { actions, isActionError } from 'astro:actions'
import { BreweryCard } from './brewery-card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import { Search as SearchIcon, MapPin, Beer, Loader2, X } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { Card, CardHeader, CardContent, CardFooter } from '../ui/card'
import { SearchEmptyState } from './search-empty-state'

export function BrewerySearch({ initialCity = '' }) {
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [query, setQuery] = useState(initialCity)

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const city = formData.get('city') as string

      if (!city || city.trim().length < 2) {
        return {
          data: [],
          error: { message: 'City name is too short (minimum 2 characters).' },
        }
      }

      const url = new URL(window.location.href)
      url.searchParams.set('city', city)
      window.history.pushState({}, '', url)

      return await actions.search(formData)
    },
    null,
  )

  const handleClear = () => {
    setQuery('')

    const url = new URL(window.location.href)
    url.searchParams.delete('city')
    window.history.pushState({}, '', url)

    inputRef.current?.focus()
  }

  const handleQuickSearch = (city: string) => {
    if (inputRef.current) {
      inputRef.current.value = city
      const formData = new FormData()
      formData.set('city', city)
      formAction(formData)
    }
  }

  useEffect(() => {
    if (initialCity && formRef.current) {
      const formData = new FormData()
      formData.set('city', initialCity)

      formAction(formData)
    }
  }, [])

  const hasQuery = query.trim().length >= 2
  const results = state?.data?.breweries || []
  const favoriteIds = state?.data?.favoriteIds || []
  const showResults = hasQuery && results.length > 0
  const error = state?.error
  const hasSearched = state !== null && hasQuery

  return (
    <div className="flex h-full flex-col gap-8 py-4 overflow-hidden">
      <div className="w-full flex-none">
        <form
          ref={formRef}
          action={formAction}
          className="bg-card focus-within:ring-primary/20 relative group flex flex-col gap-3 rounded-2xl border p-1 shadow-sm transition-all focus-within:ring-2 sm:flex-row"
        >
          <div className="relative grow">
            <MapPin className="text-muted-foreground group-focus-within:text-primary absolute left-4 top-1/2 size-5 -translate-y-1/2 transition-colors" />
            <Input
              ref={inputRef}
              name="city"
              defaultValue={initialCity}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter a city (e.g. San Diego)..."
              aria-label="Search for breweries by city"
              className="h-14 border-none bg-transparent text-lg shadow-none pl-12 focus-visible:ring-0 focus-visible:ring-offset-0"
              disabled={isPending}
              autoComplete="off"
            />

            {query && !isPending && (
              <Button
                type="button"
                onClick={handleClear}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-muted-foreground bg-primary/80 hover:text-foreground transition-colors focus:outline-hidden focus:ring-2 focus:ring-primary rounded-full"
                aria-label="Clear search"
              >
                <X className="size-5" />
              </Button>
            )}
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={isPending}
            className="h-14 rounded-xl px-8 font-black uppercase tracking-wider shadow-lg shadow-primary/20 transition-all active:scale-95 hover:shadow-primary/30"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin size-5" /> Searching...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <SearchIcon className="size-5" /> Search
              </span>
            )}
          </Button>
        </form>
      </div>

      <div
        className="flex-1 overflow-y-auto pr-2 custom-scrollbar"
        aria-live="polite"
        aria-busy={isPending}
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 px-0 py-10">
          {isPending ? (
            <SearchSkeletons />
          ) : error ? (
            <div className="col-span-full">
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {isActionError(error)
                    ? error.message
                    : (error as any).message}
                </AlertDescription>
              </Alert>
            </div>
          ) : results.length > 0 ? (
            results.map((brewery: any) => (
              <BreweryCard 
                key={brewery.id} 
                brewery={brewery} 
                isFavorited={favoriteIds.includes(brewery.id)}
              />
            ))
          ) : (
            <SearchEmptyState
              hasSearched={hasSearched}
              onSelectCity={handleQuickSearch}
            />
          )}
        </div>
      </div>
    </div>
  )
}

function SearchSkeletons() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <Card
          key={i}
          className="flex flex-col h-full overflow-hidden border-dashed opacity-50"
        >
          <CardHeader className="space-y-3 pb-4">
            <div className="flex items-start justify-between gap-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-5 w-20 shrink-0" />
            </div>
            <Skeleton className="h-4 w-1/3" />
          </CardHeader>

          <CardContent className="grow space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-2/3" />
            </div>

            <div className="flex gap-4">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-24" />
            </div>
          </CardContent>

          <CardFooter className="pt-2">
            <Skeleton className="h-10 w-full rounded-md" />
          </CardFooter>
        </Card>
      ))}
    </>
  )
}
