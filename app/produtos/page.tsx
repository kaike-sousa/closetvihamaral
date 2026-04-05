'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { StoreHeader } from '@/components/store/header'
import { StoreFooter } from '@/components/store/footer'
import { ProductCard } from '@/components/page/product-card'
import { supabase } from '@/lib/supabase'
import { CATEGORIES, Category } from '@/lib/types'

function ProductsContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('categoria') as Category | null
  const category = categoryParam || 'todos'

  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Lógica para o Título Dinâmico (Ver tudo, Saias, Vestidos, etc)
  const getPageTitle = () => {
    if (category === 'todos') return 'Ver tudo'
    const cat = CATEGORIES.find(c => c.value === category)
    return cat ? cat.label : 'Lançamentos'
  }

  useEffect(() => {
    fetchProducts()
  }, [category])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      let query = supabase.from('produtos').select(`*, produto_imagens(*), produto_variantes(*)`)
      
      if (category !== 'todos') {
        query = query.eq('category', category)
      }
      
      const { data, error } = await query
      if (error) throw error

      const formattedProducts = (data || []).map((product: any) => ({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        category: product.category,
        image: product.produto_imagens?.[0]?.image_url || "/placeholder.svg",
      }))
      setProducts(formattedProducts)
    } catch (error) {
      console.error('Erro:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      {/* TÍTULO ESTILO INSTAGRAM / ZÁFIRA */}
      <header className="mb-16 mt-8 text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance text-zinc-900">
          {getPageTitle()}
        </h2>
        <div className="flex justify-center">
          <div className="h-[2px] w-12 bg-zinc-200"></div>
        </div>
      </header>

      {/* CONTAGEM DE ITENS MINIMALISTA */}
      <div className="mb-6 flex items-center justify-between px-1">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
          {products.length} {products.length === 1 ? 'Produto' : 'Produtos'}
        </span>
      </div>

      {loading ? (
        <div className="py-40 text-center">
          <span className="text-[11px] uppercase tracking-[0.5em] text-zinc-400 animate-pulse">
            Carregando Coleção
          </span>
        </div>
      ) : (
        <>
          {products.length === 0 ? (
            <div className="text-center py-32 border-t border-zinc-100">
              <p className="font-serif text-xl text-zinc-400 italic">
                Nenhum item encontrado nesta categoria.
              </p>
            </div>
          ) : (
            /* GRID SEM BORDAS E COLADO - ESTILO ATACADO GRINGA */
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-1 gap-y-10 md:gap-x-2 md:gap-y-16">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <StoreHeader />

      <main className="flex-1">
        {/* Largura total para destacar as fotos, como na Záfira */}
        <div className="mx-auto w-full max-w-[1500px] px-2 md:px-6 py-10">
          
          <Suspense fallback={
            <div className="py-24 text-center text-[10px] uppercase tracking-[0.3em] text-zinc-400">
              Aguarde...
            </div>
          }>
            <ProductsContent />
          </Suspense>

        </div>
      </main>

      <StoreFooter />
    </div>
  )
}