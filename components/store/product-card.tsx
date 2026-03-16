'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ImageIcon } from 'lucide-react'
import { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [hoveredColor, setHoveredColor] = useState<string | null>(null)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price)
  }

  // Get the image to display based on hovered color or first available
  const getDisplayImage = () => {
    if (hoveredColor) {
      const color = product.colors.find(c => c.name === hoveredColor)
      if (color && color.images.length > 0) return color.images[0]
    }
    // Default to first color's first image
    if (product.colors.length > 0 && product.colors[0].images.length > 0) {
      return product.colors[0].images[0]
    }
    return null
  }

  const displayImage = getDisplayImage()

  return (
    <div className="group">
      <Link href={`/produto/${product.id}${hoveredColor ? `?cor=${encodeURIComponent(hoveredColor)}` : ''}`}>
        <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted mb-4 relative">
          {displayImage ? (
            <Image
              src={displayImage}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 flex flex-col items-center justify-center text-muted-foreground/30 group-hover:scale-105 transition-transform duration-300">
              <ImageIcon className="h-8 w-8 mb-2" />
              <span className="text-xs uppercase tracking-widest">{product.category}</span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="space-y-2">
        <Link href={`/produto/${product.id}`}>
          <h3 className="font-medium text-sm group-hover:underline">{product.name}</h3>
        </Link>
        <p className="text-sm font-semibold">{formatPrice(product.price)}</p>
        
        {/* Color Options */}
        <div className="flex gap-2 pt-1">
          {product.colors.map((color) => (
            <Link
              key={color.name}
              href={`/produto/${product.id}?cor=${encodeURIComponent(color.name)}`}
              className={`w-5 h-5 rounded-full border hover:scale-110 transition-all ${
                hoveredColor === color.name ? 'border-foreground scale-110' : 'border-border'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
              onMouseEnter={() => setHoveredColor(color.name)}
              onMouseLeave={() => setHoveredColor(null)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
