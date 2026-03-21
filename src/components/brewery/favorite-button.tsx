import * as React from 'react'
import { Heart } from 'lucide-react'
import { actions } from 'astro:actions'
import { authClient } from '@/lib/auth-client'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

interface FavoriteButtonProps {
  breweryId: string
  initialIsFavorited?: boolean
  className?: string
}

/**
 * A reusable favorite button that handles optimistic UI updates
 * and authentication redirects.
 */
export function FavoriteButton({
  breweryId,
  initialIsFavorited = false,
  className,
}: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = React.useState(initialIsFavorited)
  const [isLoading, setIsLoading] = React.useState(false)
  const { data: session } = authClient.useSession()

  const handleToggle = async (e: React.MouseEvent) => {
    // Prevent event bubbling if this is used inside a card/link
    e.preventDefault()
    e.stopPropagation()

    // If no session, redirect to login with a return URL
    if (!session) {
      window.location.href = `/auth?redirect=${encodeURIComponent(window.location.pathname)}`
      return
    }

    const previousState = isFavorited
    
    // Optimistic Update: Assume success for immediate feedback
    setIsFavorited(!previousState)
    setIsLoading(true)

    const { data, error } = await actions.toggleFavorite({ breweryId })

    if (error) {
      // Revert if the server call fails
      setIsFavorited(previousState)
      console.error('Failed to toggle favorite:', error)
    } else if (data) {
      // Sync with final server state
      setIsFavorited(data.favorited)
    }

    setIsLoading(false)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      disabled={isLoading}
      className={cn(
        'group h-10 w-10 rounded-full transition-all duration-300',
        isFavorited
          ? 'bg-primary/10 text-primary hover:bg-primary/20'
          : 'hover:bg-primary/10 hover:text-primary',
        className
      )}
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={cn(
          'h-5 w-5 transition-all duration-300',
          isFavorited ? 'fill-current scale-110' : 'group-hover:scale-110'
        )}
      />
    </Button>
  )
}
