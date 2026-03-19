'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, Minus, Plus, ChevronRight, ImageIcon } from 'lucide-react'
import { StoreHeader } from '@/components/store/header'
import { StoreFooter } from '@/components/store/footer'
import { Product, ProductColor } from '@/lib/types'
import { supabase } from '@/lib/supabase'
import { formatProduct } from '@/lib/formatProducts'
import { use } from 'react'

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const searchParams = useSearchParams()
  const colorParam = searchParams.get('cor')

  const [product, setProduct] = useState<Product | null>(null)
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    const { data, error } = await supabase
      .from('produtos')
      .select(`
        *,
        produto_imagens(*),
        produto_variantes(*)
      `)
      .eq('id', id)
      .single()

    if (error) {
      console.error('Erro ao buscar produto:', error)
      return
    }

    const formatted: Product = formatProduct(data)
    setProduct(formatted)

    // CORES 
    if (formatted.colors?.length > 0) {
      if (colorParam) {
        const found = formatted.colors.find(c => c.name === colorParam)
        setSelectedColor(found || formatted.colors[0])
      } else {
        setSelectedColor(formatted.colors[0])
      }
    }

    // TAMANHOS
    if (formatted.sizes?.length > 0) {
      setSelectedSize(formatted.sizes[0])
    }

    setCurrentImageIndex(0)
  }

  useEffect(() => {
    setCurrentImageIndex(0)
  }, [selectedColor])

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      saias: 'Saias',
      conjuntos: 'Conjuntos',
      vestidos: 'Vestidos',
      cropped: 'Cropped',
      bodys: 'Bodys',
      calcas: 'Calças'
    }
    return labels[category] || category
  }

  const nextImage = () => {
    if (!selectedColor?.images?.length) return
    setCurrentImageIndex((prev) =>
      prev === selectedColor.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    if (!selectedColor?.images?.length) return
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedColor.images.length - 1 : prev - 1
    )
  }

  if (!product || !selectedColor) {
    return (
      <div className="min-h-screen flex flex-col">
        <StoreHeader />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Produto não encontrado.</p>
        </main>
        <StoreFooter />
      </div>
    )
  }

  const hasImages = selectedColor.images?.length > 0
  const currentImage = hasImages ? selectedColor.images[currentImageIndex] : null

  return (
    <div className="min-h-screen flex flex-col">
      <StoreHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">

          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-muted-foreground flex gap-2">
            <Link href="/">Início</Link>
            <span>/</span>
            <Link href="/produtos">Produtos</Link>
            <span>/</span>
            <Link href={`/produtos?categoria=${product.category}`}>
              {getCategoryLabel(product.category)}
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-8">

            {/* IMAGENS */}
            <div>
              <div className="relative aspect-[3/4] rounded-lg bg-muted overflow-hidden">
                {currentImage ? (
                  <Image
                    src={currentImage}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon />
                  </div>
                )}
              </div>

              {hasImages && selectedColor.images.length > 1 && (
                <div className="flex gap-2 mt-2">
                  {selectedColor.images.map((img, i) => (
                    <button key={i} onClick={() => setCurrentImageIndex(i)}>
                      <img src={img} className="w-16 h-20 object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* INFO */}
            <div>
              <h1 className="text-2xl font-semibold">{product.name}</h1>
              <p className="text-xl mt-2">{formatPrice(product.price)}</p>

              {/* CORES */}
              <div className="mt-6 flex gap-2">
                {product.colors?.map((color) => (
                  <Link
                    key={color.name}
                    href={`/produto/${product.id}?cor=${color.name}`}
                    className="w-8 h-8 rounded-full border"
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>

              {/* TAMANHOS */}
              <div className="mt-6 flex gap-2">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="border px-3 py-1"
                  >
                    {size}
                  </button>
                ))}
              </div>

            </div>
          </div>
        </div>
      </main>

      <StoreFooter />
    </div>
  )
}