import * as React from 'react'
import { useActionState } from 'react'
import { actions, isActionError } from 'astro:actions'
import { BreweryCard } from './brewery-card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import { Search as SearchIcon, MapPin, Beer, Loader2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'

export function BrewerySearch() {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const city = formData.get('city') as string

      if (!city || city.trim().length < 2) {
        return {
          data: [],
          error: { message: 'City name is too short (minimum 2 characters).' },
        }
      }

      return await actions.search(formData)
    },
    null,
  )

  const results = state?.data || []
  const error = state?.error
  const hasSearched = state !== null

  return (
    <div className="flex h-full flex-col gap-8 py-4 overflow-hidden">
      {/* --- FIXED SEARCH BAR --- */}
      <div className="w-full flex-none">
        <form
          action={formAction}
          className="bg-card focus-within:ring-primary/20 relative group flex flex-col gap-3 rounded-2xl border p-1 shadow-sm transition-all focus-within:ring-2 sm:flex-row"
        >
          <div className="relative flex-grow">
            <MapPin className="text-muted-foreground group-focus-within:text-primary absolute left-4 top-1/2 size-5 -translate-y-1/2 transition-colors" />
            <Input
              name="city"
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
        <div key={i} className="space-y-4 rounded-xl border p-6">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="space-y-2 py-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
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
