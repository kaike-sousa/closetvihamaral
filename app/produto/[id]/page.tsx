'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ChevronLeft, 
  Minus, 
  Plus, 
  ChevronRight, 
  ImageIcon, 
  ShoppingBag, 
  X,
  Truck 
} from 'lucide-react'
import { StoreHeader } from '@/components/store/header'
import { StoreFooter } from '@/components/store/footer'
import { Product, ProductColor } from '@/lib/types'
import { supabase } from '@/lib/supabase'
import { formatProduct } from '@/lib/formatProducts'
import { useCart } from '@/context/cart-context'
import { toast } from 'sonner'

export default function ProductPage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()
  const searchParams = useSearchParams()
  const colorParam = searchParams.get('cor')

  // Estados
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false) // Estado para o modal
  
  const { addToCart } = useCart()

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    const { data, error } = await supabase
      .from('produtos')
      .select(`*, produto_imagens(*), produto_variantes(*)`)
      .eq('id', id)
      .single()

    if (error) {
      console.error(error)
      return
    }

    const formatted = formatProduct(data)
    setProduct(formatted)

    if (formatted.colors.length > 0) {
      const found = formatted.colors.find(
        (c: ProductColor) => c.name === colorParam
      )
      setSelectedColor(found || formatted.colors[0])
    }

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

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Por favor, selecione um tamanho!')
      return
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: selectedColor.images[0],
      color: selectedColor.name,
      size: selectedSize,
      quantity: quantity
    })
    
    // Abre o modal de sucesso estilo Záfira
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <StoreHeader />

      <main className="flex-1 max-w-[1600px] mx-auto px-8 py-10">
        <div className="text-sm text-gray-500 mb-6 flex gap-2">
          <Link href="/">Início</Link> /
          <Link href="/produtos">Produtos</Link> /
          <span className="text-black">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* IMAGENS */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-1">
              {selectedColor.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`border rounded overflow-hidden ${
                    i === currentImageIndex ? 'border-black' : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} className="w-16 h-20 object-cover" alt="" />
                </button>
              ))}
            </div>

            <div className="relative w-[400px] h-[520px] bg-white border rounded-lg overflow-hidden group">
              {currentImage ? (
                <Image
                  src={currentImage}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <ImageIcon />
                </div>
              )}

              {selectedColor.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex(prev => prev === 0 ? selectedColor.images.length - 1 : prev - 1)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex(prev => prev === selectedColor.images.length - 1 ? 0 : prev + 1)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* INFO */}
          <div className="flex flex-col max-w-md">
            <h1 className="text-3xl font-semibold">{product.name}</h1>
            <p className="text-3xl font-bold mt-4">{formatPrice(product.price)}</p>
            <p className="text-sm text-gray-500 mt-1">ou 3x de {formatPrice(product.price / 3)} sem juros</p>

            <div className="mt-6">
              <p className="text-sm font-medium mb-2">Outras cores:</p>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColor(color)
                      setCurrentImageIndex(0)
                    }}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor.name === color.name ? 'border-black scale-110' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm font-medium mb-2">Tamanho</p>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border ${
                      selectedSize === size ? 'bg-black text-white border-black' : 'border-gray-300 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm font-medium mb-2">Quantidade</p>
              <div className="flex items-center border w-fit rounded">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-gray-100">
                  <Minus size={16} />
                </button>
                <span className="px-4">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-gray-100">
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <button 
              onClick={handleAddToCart}
              className="mt-8 w-full bg-black text-white py-4 font-semibold hover:bg-gray-800 transition-all active:scale-[0.98]"
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>

        <div className="mt-16 max-w-3xl">
          <h2 className="text-xl font-semibold mb-6 border-b pb-2">Descrição do produto</h2>
          <p className="text-gray-600">{product.description}</p>
        </div>
      </main>

      <StoreFooter />

      {/* MODAL CENTRADO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white p-12 rounded-lg shadow-2xl w-full max-w-lg text-center animate-in zoom-in-95 duration-300">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black">
              <X size={24} />
            </button>
            <div className="flex justify-center mb-6">
              <ShoppingBag className="w-16 h-16 text-black stroke-[1]" />
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-black">Produto adicionado ao carrinho!</h2>
            <p className="text-gray-600 mb-10 text-sm">{product.name} - Cor: {selectedColor.name} / Tam: {selectedSize}</p>
            <div className="space-y-3">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-full bg-[#b5518f] text-white py-3 font-semibold rounded transition-all hover:bg-[#9e437b] active:scale-[0.98]"
              >
                Continuar comprando
              </button>
              <Link href="/carrinho" className="block">
                <button className="w-full bg-black text-white py-3 font-semibold hover:bg-gray-800 transition-colors rounded">
                  Ir para o carrinho
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}