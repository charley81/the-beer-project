'use client'

import { cn } from '@/lib/utils'

interface CartBadgeProps {
  className?: string
}

/**
 * LESSON: Smart Badge Component
 * By abstracting the badge, we handle hydration warnings in one place 
 * and can implement "smart visibility" (hiding when 0).
 */
export function CartBadge({ className }: CartBadgeProps) {
  return (
    <span
      suppressHydrationWarning
      className={cn(
        'snipcart-items-count absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-black rounded-full flex items-center justify-center w-4 h-4 aspect-square leading-none empty:hidden',
        className
      )}
    >
      0
    </span>
  )
}
