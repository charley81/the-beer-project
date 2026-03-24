'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CartBadgeProps {
  className?: string
}

/**
 * LESSON: Animated Smart Badge
 * We use framer-motion to add a "pop" animation whenever the count changes.
 * We bridge Snipcart's vanilla JS events into React state to trigger the animation.
 */
export function CartBadge({ className }: CartBadgeProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let unsubscribeStore: (() => void) | undefined

    const updateCount = () => {
      if (window.Snipcart) {
        const state = window.Snipcart.store.getState()
        // Try all possible paths for Snipcart v3
        const newCount = 
          state.cart?.items?.count ?? 
          state.cart?.summary?.itemsCount ?? 
          state.cart?.itemsCount ?? 
          state.cart?.items?.length ?? 
          0
          
        console.log('[CartBadge] Updating count:', newCount, '(from state.cart.items.count)')
        setCount(newCount)
        setIsVisible(newCount > 0)
      } else {
        console.log('[CartBadge] Snipcart not found during updateCount')
      }
    }

    const initSnipcart = () => {
      console.log('[CartBadge] Initializing Snipcart subscription')
      updateCount()
      try {
        unsubscribeStore = window.Snipcart.store.subscribe(updateCount)
        console.log('[CartBadge] Subscribed successfully')
      } catch (err) {
        console.error('[CartBadge] Failed to subscribe:', err)
      }
    }

    // Check every 500ms for a few seconds if Snipcart is ready, 
    // just in case the 'ready' event was missed or fired too early.
    const pollInterval = setInterval(() => {
      if (window.Snipcart && window.Snipcart.store) {
        console.log('[CartBadge] Polling found Snipcart')
        initSnipcart()
        clearInterval(pollInterval)
      }
    }, 500)

    if (window.Snipcart && window.Snipcart.store) {
      initSnipcart()
      clearInterval(pollInterval)
    } else {
      document.addEventListener('snipcart.ready', () => {
        console.log('[CartBadge] snipcart.ready event fired')
        initSnipcart()
        clearInterval(pollInterval)
      })
    }

    return () => {
      clearInterval(pollInterval)
      document.removeEventListener('snipcart.ready', initSnipcart)
      if (unsubscribeStore) unsubscribeStore()
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.span
          key={count} // Trigger animation whenever count changes
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 15,
            duration: 0.2
          }}
          className={cn(
            'absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-black rounded-full flex items-center justify-center min-w-4 h-4 aspect-square px-1 leading-none z-10 pointer-events-none',
            className
          )}
        >
          {count}
        </motion.span>
      )}
    </AnimatePresence>
  )
}
