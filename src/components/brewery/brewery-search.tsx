import * as React from 'react'
import { useActionState, useRef, useEffect } from 'react'
import { actions, isActionError } from 'astro:actions'
import { BreweryCard } from './brewery-card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import { Search as SearchIcon, MapPin, Beer, Loader2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'

export function BrewerySearch({ initialCity = '' }) {
  const formRef = useRef<HTMLFormElement>(null)

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

  useEffect(() => {
    if (initialCity && formRef.current) {
      const formData = new FormData()
      formData.set('city', initialCity)

      formAction(formData)
    }
  }, [])

  const results = state?.data || []
  const error = state?.error
  const hasSearched = state !== null

  return (
    <div className="flex h-full flex-col gap-8 py-4 overflow-hidden">
      {/* --- FIXED SEARCH BAR --- */}
      <div className="w-full flex-none">
        <form
          ref={formRef}
          action={formAction}
          className="bg-card focus-within:ring-primary/20 relative group flex flex-col gap-3 rounded-2xl border p-1 shadow-sm transition-all focus-within:ring-2 sm:flex-row"
        >
          <div className="relative grow">
            <MapPin className="text-muted-foreground group-focus-within:text-primary absolute left-4 top-1/2 size-5 -translate-y-1/2 transition-colors" />
            <Input
              name="city"
              defaultValue={initialCity}
              placeholder="Enter a city (e.g. San Diego)..."
              className="h-14 border-none bg-transparent text-lg shadow-none pl-12 focus-visible:ring-0 focus-visible:ring-offset-0"
              disabled={isPending}
              autoComplete="off"
            />
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

      {/* --- SCROLLABLE RESULTS GRID --- */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 p-10">
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
            results.map((brewery) => (
              <BreweryCard key={brewery.id} brewery={brewery} />
            ))
          ) : (
            <SearchEmptyState hasSearched={hasSearched} />
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
        <Card key={i} className="flex flex-col h-full overflow-hidden border-dashed opacity-50">
          <CardHeader className="space-y-3 pb-4">
            <div className="flex items-start justify-between gap-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-5 w-20 shrink-0" />
            </div>
            <Skeleton className="h-4 w-1/3" />
          </CardHeader>

          <CardContent className="flex-grow space-y-4">
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

function SearchEmptyState({ hasSearched }: { hasSearched: boolean }) {
  if (hasSearched) {
    return (
      <div className="col-span-full py-20 text-center">
        <Beer className="text-muted-foreground/20 mx-auto mb-4 size-16" />
        <h3 className="text-xl font-semibold text-foreground">
          No breweries found
        </h3>
        <p className="text-muted-foreground">
          Try searching for a different city or check your spelling.
        </p>
      </div>
    )
  }

  return (
    <div className="col-span-full py-20 text-center">
      <div className="bg-primary/10 mx-auto mb-4 flex size-16 items-center justify-center rounded-full">
        <SearchIcon className="text-primary size-8" />
      </div>
      <h3 className="text-xl font-semibold text-foreground">
        Ready for a pour?
      </h3>
      <p className="text-muted-foreground">
        Enter a city above to find local craft breweries.
      </p>
    </div>
  )
}
