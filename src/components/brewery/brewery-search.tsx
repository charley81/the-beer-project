import { useActionState, useRef, useEffect, useState, startTransition } from 'react'
import { actions, isActionError } from 'astro:actions'
import { BreweryCard } from './brewery-card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import { Search as SearchIcon, MapPin, Loader2, X, Plus } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { Card, CardHeader, CardContent, CardFooter } from '../ui/card'
import { SearchEmptyState } from './search-empty-state'
import { motion, AnimatePresence } from 'framer-motion'

export function BrewerySearch({ initialCity = '', initialData = null }) {
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [query, setQuery] = useState(initialCity)
  const [page, setPage] = useState(1)
  const [results, setResults] = useState<any[]>(initialData?.data?.breweries || [])
  const [favoriteIds, setFavoriteIds] = useState<string[]>(initialData?.data?.favoriteIds || [])
  const [hasMore, setHasMore] = useState(results.length === 10)

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const city = formData.get('city') as string
      const currentPage = parseInt(formData.get('page') as string || '1')

      if (!city || city.trim().length < 2) {
        return {
          data: { breweries: [], favoriteIds: [] },
          error: { message: 'City name is too short (minimum 2 characters).' },
        }
      }

      // If it's a new search (page 1), update URL
      if (currentPage === 1) {
        const url = new URL(window.location.href)
        url.searchParams.set('city', city)
        window.history.pushState({}, '', url)
      }

      const result = await actions.search(formData)
      
      return {
        ...result,
        isLoadMore: currentPage > 1
      }
    },
    initialData,
  )

  // Sync results when state updates
  useEffect(() => {
    if (state?.data) {
      if (state.isLoadMore) {
        setResults(prev => [...prev, ...state.data.breweries])
      } else {
        setResults(state.data.breweries)
        setPage(1)
      }
      setFavoriteIds(state.data.favoriteIds || [])
      setHasMore(state.data.breweries.length === 10)
    }
  }, [state])

  const handleClear = () => {
    setQuery('')
    setResults([])
    setPage(1)
    setHasMore(false)

    const url = new URL(window.location.href)
    url.searchParams.delete('city')
    window.history.pushState({}, '', url)

    inputRef.current?.focus()
  }

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault()
    setPage(1)
    const formData = new FormData(formRef.current!)
    formData.set('page', '1')
    startTransition(() => {
      formAction(formData)
    })
  }

  const handleLoadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    const formData = new FormData()
    formData.set('city', query)
    formData.set('page', nextPage.toString())
    startTransition(() => {
      formAction(formData)
    })
  }

  const handleQuickSearch = (city: string) => {
    setQuery(city)
    setPage(1)
    const formData = new FormData()
    formData.set('city', city)
    formData.set('page', '1')
    startTransition(() => {
      formAction(formData)
    })
  }

  const hasQuery = query.trim().length >= 2
  const error = state?.error
  const hasSearched = (state !== null || results.length > 0) && hasQuery

  return (
    <div className="flex h-full flex-col gap-8 py-4 overflow-hidden">
      <div className="w-full flex-none">
        <form
          ref={formRef}
          onSubmit={handleSearch}
          className="bg-card focus-within:ring-primary/20 relative group flex flex-col gap-3 rounded-2xl border p-1 shadow-sm transition-all focus-within:ring-2 sm:flex-row"
        >
          <div className="relative grow">
            <MapPin className="text-muted-foreground group-focus-within:text-primary absolute left-4 top-1/2 size-5 -translate-y-1/2 transition-colors" />
            <Input
              ref={inputRef}
              name="city"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter a city (e.g. San Diego)..."
              aria-label="Search for breweries by city"
              className="h-14 border-none bg-transparent text-lg shadow-none pl-12 focus-visible:ring-0 focus-visible:ring-offset-0"
              disabled={isPending}
              autoComplete="off"
            />
            <input type="hidden" name="page" value={page} />

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
            {isPending && page === 1 ? (
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
        className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-10"
        aria-live="polite"
        aria-busy={isPending}
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 px-0 py-6">
          <AnimatePresence mode="popLayout">
            {results.length > 0 ? (
              results.map((brewery: any, index: number) => (
                <motion.div
                  key={`${brewery.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: (index % 10) * 0.05,
                    ease: [0.21, 0.47, 0.32, 0.98] 
                  }}
                >
                  <BreweryCard 
                    brewery={brewery} 
                    isFavorited={favoriteIds.includes(brewery.id)}
                  />
                </motion.div>
              ))
            ) : null}
          </AnimatePresence>

          {isPending && page === 1 && <SearchSkeletons />}

          {!isPending && results.length === 0 && (
            <div className="col-span-full">
               <SearchEmptyState
                hasSearched={hasSearched}
                onSelectCity={handleQuickSearch}
              />
            </div>
          )}

          {error && (
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
          )}
        </div>

        {hasMore && (
          <div className="mt-8 flex justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={handleLoadMore}
              disabled={isPending}
              className="group min-w-48 h-12 rounded-full border-primary/20 hover:border-primary/50 hover:bg-primary/5"
            >
              {isPending ? (
                <Loader2 className="animate-spin size-5 mr-2" />
              ) : (
                <Plus className="size-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              )}
              {isPending ? 'Loading...' : 'Load More Breweries'}
            </Button>
          </div>
        )}
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
