'use client'

import type { Product } from '@/data/products'

interface StoreButtonProps {
  product: Product
  url: string
  className?: string
  children?: React.ReactNode
}

export function StoreButton({ product, url, className = '', children = 'Buy Now' }: StoreButtonProps) {
  return (
    <button
      className={`snipcart-add-item ${className}`}
      data-item-id={product.id}
      data-item-name={product.name}
      data-item-price={product.price}
      data-item-url={url}
      data-item-image={product.image}
      data-item-description={product.description}
    >
      {children}
    </button>
  )
}
