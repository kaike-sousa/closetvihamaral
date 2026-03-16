'use client'

import { use, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, Minus, Plus, ChevronRight, ImageIcon } from 'lucide-react'
import { StoreHeader } from '@/components/store/header'
import { StoreFooter } from '@/components/store/footer'
import { Product, ProductColor } from '@/lib/types'
import { supabase } from '@/lib/supabase'

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
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Erro ao buscar produto:', error)
      return
    }

    setProduct(data)

    if (data.colors && data.colors.length > 0) {
      if (colorParam) {
        const foundColor = data.colors.find((c:any) => c.name === colorParam)
        setSelectedColor(foundColor || data.colors[0])
      } else {
        setSelectedColor(data.colors[0])
      }
    }

    if (data.sizes && data.sizes.length > 0) {
      setSelectedSize(data.sizes[0])
    }

    setCurrentImageIndex(0)
  }
  
  // Reset image index when color changes
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [selectedColor])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price)
  }

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      saias: 'Saias',
      conjuntos: 'Conjuntos',
      vestidos: 'Vestidos',
      cropped: 'Cropped',
      bodys: 'Bodys',
      calcas: 'Calças',
    }
    return labels[category] || category
  }

  const nextImage = () => {
    if (selectedColor && selectedColor.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === selectedColor.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedColor && selectedColor.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedColor.images.length - 1 : prev - 1
      )
    }
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

  const hasImages = selectedColor.images.length > 0
  const currentImage = hasImages ? selectedColor.images[currentImageIndex] : null

  return (
    <div className="min-h-screen flex flex-col">
      <StoreHeader />
      
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-muted-foreground flex items-center gap-2">
            <Link href="/" className="hover:text-foreground">Início</Link>
            <span>/</span>
            <Link href="/produtos" className="hover:text-foreground">Produtos</Link>
            <span>/</span>
            <Link href={`/produtos?categoria=${product.category}`} className="hover:text-foreground">
              {getCategoryLabel(product.category)}
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <Link
            href="/produtos"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar para produtos
          </Link>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[3/4] rounded-lg bg-muted overflow-hidden group">
                {currentImage ? (
                  <Image
                    src={currentImage}
                    alt={`${product.name} - ${selectedColor.name}`}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 flex flex-col items-center justify-center text-muted-foreground/30">
                    <ImageIcon className="h-16 w-16 mb-2" />
                    <span className="text-xs uppercase tracking-widest mb-2">{product.category}</span>
                    <span className="text-lg font-medium">{selectedColor.name}</span>
                  </div>
                )}

                {/* Navigation Arrows */}
                {hasImages && selectedColor.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                      {currentImageIndex + 1} / {selectedColor.images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {hasImages && selectedColor.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {selectedColor.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative flex-shrink-0 w-20 h-24 rounded-md overflow-hidden border-2 transition-all ${
                        currentImageIndex === index
                          ? 'border-foreground'
                          : 'border-transparent hover:border-border'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              <h1 className="font-serif text-3xl font-semibold">{product.name}</h1>
              <p className="text-2xl font-semibold mt-4">{formatPrice(product.price)}</p>
              <p className="text-sm text-muted-foreground mt-1">
                ou 3x de {formatPrice(product.price / 3)} sem juros
              </p>

              <p className="text-muted-foreground mt-6">{product.description}</p>

              {/* Color Selection */}
              <div className="mt-8">
                <h3 className="text-sm font-medium mb-3">
                  Cor: <span className="font-normal">{selectedColor.name}</span>
                </h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <Link
                      key={color.name}
                      href={`/produto/${product.id}?cor=${encodeURIComponent(color.name)}`}
                      className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor.name === color.name
                          ? 'border-foreground scale-110'
                          : 'border-border hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {color.images.length > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-foreground text-background text-[10px] rounded-full flex items-center justify-center">
                          {color.images.length}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Clique em uma cor para ver as fotos dessa variação
                </p>
              </div>

              {/* Size Selection */}
              <div className="mt-8">
                <h3 className="text-sm font-medium mb-3">Tamanho</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-md border font-medium transition-colors ${
                        selectedSize === size
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-border hover:border-foreground'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-8">
                <h3 className="text-sm font-medium mb-3">Quantidade</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-md border border-border flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-md border border-border flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button className="mt-8 w-full bg-foreground text-background py-4 rounded-md font-medium hover:bg-foreground/90 transition-colors">
                Adicionar ao Carrinho
              </button>

              {/* Product Info */}
              <div className="mt-8 pt-8 border-t border-border">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Categoria</span>
                    <p className="font-medium">{getCategoryLabel(product.category)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tamanhos disponíveis</span>
                    <p className="font-medium">{product.sizes.join(', ')}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Cores disponíveis</span>
                    <p className="font-medium">{product.colors.map(c => c.name).join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <StoreFooter />
    </div>
  )
}
