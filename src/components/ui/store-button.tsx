'use client'

import type { Product } from '@/data/products'

interface StoreButtonProps {
  product: Product
  className?: string
  children?: React.ReactNode
}

export function StoreButton({ product, className = '', children = 'Buy Now' }: StoreButtonProps) {
  return (
    <button
      className={className}
      onClick={() => console.log('Store item clicked:', product.name)}
    >
      {children}
    </button>
  )
}
