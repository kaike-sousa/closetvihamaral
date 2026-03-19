'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, Minus, Plus, ChevronRight, ImageIcon } from 'lucide-react'
import { StoreHeader } from '@/components/store/header'
import { StoreFooter } from '@/components/store/footer'
import { Product, ProductColor } from '@/lib/types'
import { supabase } from '@/lib/supabase'
import { formatProduct } from '@/lib/formatProducts'

export default function ProductPage() {
  const params = useParams()
  const id = params.id as string

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
      .select(`*, produto_imagens(*), produto_variantes(*)`)
      .eq('id', id)
      .single()

    if (error) return console.error(error)

    const formatted = formatProduct(data)
    setProduct(formatted)

    // cor inicial
    if (formatted.colors.length > 0) {
      const found = formatted.colors.find(
        (c: ProductColor) => c.name === colorParam
      )
      setSelectedColor(found || formatted.colors[0])
    }

    // tamanho inicial
    if (formatted.sizes.length > 0) {
      setSelectedSize(formatted.sizes[0])
    }
  }

  useEffect(() => {
    setCurrentImageIndex(0)
  }, [selectedColor])

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)

  if (!product || !selectedColor) {
    return (
      <div className="min-h-screen flex flex-col">
        <StoreHeader />
        <main className="flex-1 flex items-center justify-center">
          Produto não encontrado
        </main>
        <StoreFooter />
      </div>
    )
  }

  const currentImage = selectedColor.images[currentImageIndex]

  return (
    <div className="min-h-screen flex flex-col">
      <StoreHeader />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8">

        {/* breadcrumb */}
        <div className="text-sm text-muted-foreground mb-6 flex gap-2">
          <Link href="/">Início</Link> /
          <Link href="/produtos">Produtos</Link> /
          <span>{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* IMAGENS */}
          <div>
            <div className="relative aspect-[3/4] bg-muted rounded-xl overflow-hidden group">
              {currentImage ? (
                <Image src={currentImage} alt={product.name} fill className="object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <ImageIcon />
                </div>
              )}

              {/* setas */}
              {selectedColor.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === 0 ? selectedColor.images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === selectedColor.images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
            </div>

            {/* thumbnails */}
            <div className="flex gap-2 mt-3">
              {selectedColor.images.map((img, i) => (
                <button key={i} onClick={() => setCurrentImageIndex(i)}>
                  <img
                    src={img}
                    className={`w-16 h-20 object-cover rounded border ${
                      i === currentImageIndex ? 'border-black' : ''
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* INFO */}
          <div className="flex flex-col">

            <h1 className="text-3xl font-semibold">{product.name}</h1>

            <p className="text-2xl font-bold mt-3">
              {formatPrice(product.price)}
            </p>

            <p className="text-sm text-muted-foreground">
              ou 3x de {formatPrice(product.price / 3)} sem juros
            </p>

            {/* descrição */}
            <p className="mt-6 text-muted-foreground">
              {product.description}
            </p>

            {/* CORES */}
            <div className="mt-8">
              <p className="text-sm font-medium mb-2">
                Cor: {selectedColor.name}
              </p>

              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <Link
                    key={color.name}
                    href={`/produto/${product.id}?cor=${color.name}`}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor.name === color.name
                        ? 'border-black scale-110'
                        : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            {/* TAMANHOS */}
            <div className="mt-8">
              <p className="text-sm font-medium mb-2">Tamanho</p>

              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded ${
                      selectedSize === size
                        ? 'bg-black text-white'
                        : 'hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* QUANTIDADE */}
            <div className="mt-8">
              <p className="text-sm font-medium mb-2">Quantidade</p>

              <div className="flex items-center gap-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus />
                </button>

                <span>{quantity}</span>

                <button onClick={() => setQuantity(quantity + 1)}>
                  <Plus />
                </button>
              </div>
            </div>

            {/* BOTÃO */}
            <button className="mt-8 w-full bg-black text-white py-4 rounded-lg font-medium hover:opacity-90">
              Adicionar ao carrinho
            </button>

          </div>
        </div>
      </main>

      <StoreFooter />
    </div>
  )
}