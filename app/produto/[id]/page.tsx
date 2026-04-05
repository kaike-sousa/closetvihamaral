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
  X 
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
  const searchParams = useSearchParams()
  const colorParam = searchParams.get('cor')

  const [product, setProduct] = useState<Product | null>(null)
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
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

    if (error) return

    const formatted = formatProduct(data)
    setProduct(formatted)

    if (formatted.colors.length > 0) {
      const found = formatted.colors.find((c: ProductColor) => c.name === colorParam)
      setSelectedColor(found || formatted.colors[0])
    }
    if (formatted.sizes.length > 0) setSelectedSize(formatted.sizes[0])
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)

  if (!product || !selectedColor) return null

  const nextImage = () => setCurrentImageIndex(prev => prev === selectedColor.images.length - 1 ? 0 : prev + 1)
  const prevImage = () => setCurrentImageIndex(prev => prev === 0 ? selectedColor.images.length - 1 : prev - 1)

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Selecione um tamanho!')
      return
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: selectedColor.images[0],
      color: selectedColor.name,
      size: selectedSize,
      quantity
    })
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <StoreHeader />

      <main className="flex-1 w-full max-w-[1400px] mx-auto md:px-8">
        
        {/* Breadcrumb - Desktop */}
        <div className="hidden md:flex text-[11px] uppercase tracking-wider text-gray-400 py-4 gap-2">
          <Link href="/">Início</Link> /
          <Link href="/produtos">Produtos</Link> /
          <span className="text-black font-bold">{product.name}</span>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 lg:py-6">
          
          {/* SEÇÃO DE IMAGENS: Desktop (Lado a Lado) / Mobile (Carrossel) */}
          <div className="flex flex-col md:flex-row-reverse gap-4">
            
            {/* Imagem Principal / Carrossel */}
            <div className="relative aspect-[3/4] w-full bg-white overflow-hidden flex-1">
              <Image
                src={selectedColor.images[currentImageIndex]}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />
              
              {/* Dots - Mobile Only */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 md:hidden">
                {selectedColor.images.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all ${i === currentImageIndex ? 'w-4 bg-black' : 'w-1.5 bg-black/20'}`}
                  />
                ))}
              </div>

              {/* Setas - Sempre Visíveis */}
              <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-black/50 hover:text-black transition-colors"
              >
                <ChevronLeft size={32} strokeWidth={1.5} />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-black/50 hover:text-black transition-colors"
              >
                <ChevronRight size={32} strokeWidth={1.5} />
              </button>
            </div>

            {/* Miniaturas Verticais - Desktop Only (Esquerda da imagem principal) */}
            <div className="hidden md:flex md:flex-col gap-3 overflow-y-auto max-h-[600px] no-scrollbar">
              {selectedColor.images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentImageIndex(i)}
                  className={`relative w-20 aspect-[3/4] border-2 transition-all flex-shrink-0 ${i === currentImageIndex ? 'border-black' : 'border-transparent opacity-60'}`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* COLUNA DA DIREITA: INFO */}
          <div className="px-4 py-6 md:px-0">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>
            <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-tighter">
              REF: {product.id.slice(0, 8)}
            </p>

            <div className="mt-6 flex flex-col gap-1">
              <span className="text-2xl font-black text-black">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs text-gray-500">
                ou 3x de {formatPrice(product.price / 3)} sem juros
              </span>
            </div>

            {/* Cores */}
            <div className="mt-8">
              <span className="text-xs font-bold uppercase tracking-widest block mb-3">Cores:</span>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => { setSelectedColor(color); setCurrentImageIndex(0); }}
                    className={`w-9 h-9 rounded-full border p-0.5 transition-all ${selectedColor.name === color.name ? 'border-black scale-110' : 'border-gray-200'}`}
                  >
                    <div className="w-full h-full rounded-full" style={{ backgroundColor: color.hex }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Tamanhos */}
            <div className="mt-8">
              <span className="text-xs font-bold uppercase tracking-widest block mb-3">Tamanho:</span>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[50px] h-10 text-xs font-bold border transition-all ${selectedSize === size ? 'bg-black text-white border-black' : 'bg-white border-gray-200 hover:border-black'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantidade e Comprar */}
            <div className="mt-10 flex flex-col gap-4">
              <div className="flex items-center justify-between border border-gray-200 rounded-full h-12 w-32 px-2">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1 hover:text-gray-400"><Minus size={18} /></button>
                <span className="font-bold text-sm">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-1 hover:text-gray-400"><Plus size={18} /></button>
              </div>

              <button 
                onClick={handleAddToCart}
                className="w-full bg-black text-white h-14 font-black uppercase tracking-[0.2em] text-sm hover:bg-zinc-800 transition-colors"
              >
                Comprar
              </button>
            </div>

            {/* Descrição */}
            <div className="mt-10 pt-10 border-t border-gray-100">
              <p className="text-sm text-gray-600 leading-relaxed italic">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </main>

      <StoreFooter />

      {/* Modal de Sucesso */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white w-full max-w-md p-8 text-center shadow-2xl animate-in zoom-in-95">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4"><X size={20}/></button>
            <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag size={28} className="text-black" />
            </div>
            <h3 className="font-bold text-lg uppercase tracking-widest">Adicionado!</h3>
            <p className="text-gray-500 text-sm mt-2 mb-8">O item foi colocado no seu carrinho.</p>
            <div className="flex flex-col gap-3">
              <Link href="/carrinho" className="bg-black text-white py-4 text-xs font-bold uppercase tracking-widest">Ir para o carrinho</Link>
              <button onClick={() => setIsModalOpen(false)} className="text-xs font-bold uppercase underline tracking-widest">Continuar Comprando</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}