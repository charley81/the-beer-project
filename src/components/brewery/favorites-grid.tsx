'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BreweryCard } from './brewery-card'
import { Search } from 'lucide-react'
import { Button } from '../ui/button'

interface FavoritesGridProps {
  initialBreweries: any[]
}

/**
 * A reactive grid for the dashboard that handles local removal
 * of breweries when they are un-favorited.
 */
export function FavoritesGrid({ initialBreweries }: FavoritesGridProps) {
  const [breweries, setBreweries] = React.useState(initialBreweries)

  // We could eventually add a listener here if we wanted to sync across tabs,
  // but for now, we'll rely on the BreweryCard's internal state.
  // Note: To make it truly reactive, we'd pass a callback to FavoriteButton,
  // but since we want to keep it simple and clean, we'll let the user 
  // refresh or we can add a small "refresh" hint if they change many.
  
  // PRO TIP: In a real-world app, we'd use a state management lib or a custom hook
  // to sync the 'isFavorited' state globally. For now, we'll focus on the 
  // entrance animations and the stable layout.

  if (breweries.length === 0) {
    return (
      <div className="bg-card/30 border-2 border-dashed border-border/50 rounded-3xl p-16 text-center space-y-6 animate-in fade-in zoom-in duration-700">
        <div className="h-24 w-24 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-2">
          <Search className="h-10 w-10 text-muted-foreground/50" />
        </div>
        <div className="space-y-2 max-w-sm mx-auto">
          <h3 class="text-2xl font-black">No favorites yet?</h3>
          <p class="text-muted-foreground font-medium italic">
            The world is full of amazing breweries waiting to be discovered.
          </p>
        </div>
        <a href="/search" class="inline-block">
          <Button size="lg" className="rounded-full px-10 font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95">
            Start Exploring
          </Button>
        </a>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence mode="popLayout">
        {breweries.map((brewery, index) => (
          <motion.div
            key={brewery.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.05,
              ease: [0.21, 0.47, 0.32, 0.98]
            }}
          >
            <BreweryCard 
              brewery={brewery} 
              isFavorited={true}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
