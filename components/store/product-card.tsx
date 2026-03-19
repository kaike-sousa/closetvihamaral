'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ImageIcon } from 'lucide-react'
import { Product, AVAILABLE_COLORS } from '@/lib/types'

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

  // IMAGEM BASEADA NA COR
  function getDisplayImage(): string | null {
    if (hoveredColor) {
      const color = product.colors?.find(c => c.name === hoveredColor)
      return color?.images?.[0] || null
    }

    return product.colors?.[0]?.images?.[0] || null
  }

  const displayImage = getDisplayImage()

  // ✅ CORES ÚNICAS
  const uniqueColors = product.colors?.map(c => c.name) || []

  return (
    <div className="group">
      <Link
        href={`/produto/${product.id}${
          hoveredColor ? `?cor=${encodeURIComponent(hoveredColor)}` : ''
        }`}
      >
        <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted mb-4 relative">
          {displayImage ? (
            <Image
              src={displayImage}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 flex flex-col items-center justify-center text-muted-foreground/30">
              <ImageIcon className="h-8 w-8 mb-2" />
              <span className="text-xs uppercase tracking-widest">
                {product.category}
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="space-y-2">
        <Link href={`/produto/${product.id}`}>
          <h3 className="font-medium text-sm group-hover:underline">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm font-semibold">
          {formatPrice(product.price)}
        </p>

        {/* 🎨 CORES */}
        <div className="flex gap-2 pt-1">
          {uniqueColors.map((colorName) => {
            const colorData = AVAILABLE_COLORS.find(
              (c) => c.name === colorName
            )

            return (
              <Link
                key={colorName}
                href={`/produto/${product.id}?cor=${encodeURIComponent(colorName)}`}
                className={`w-5 h-5 rounded-full border transition-all ${
                  hoveredColor === colorName
                    ? 'border-foreground scale-110'
                    : 'border-border hover:scale-110'
                }`}
                style={{ backgroundColor: colorData?.hex || '#ccc' }}
                title={colorName}
                onMouseEnter={() => setHoveredColor(colorName)}
                onMouseLeave={() => setHoveredColor(null)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}