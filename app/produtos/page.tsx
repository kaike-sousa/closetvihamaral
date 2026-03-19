'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { StoreHeader } from '@/components/store/header'
import { StoreFooter } from '@/components/store/footer'
import { ProductCard } from '@/components/store/product-card'
import { supabase } from '@/lib/supabase'
import { CATEGORIES, Category } from '@/lib/types'

function ProductsContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('categoria') as Category | null
  const category = categoryParam || 'todos'

  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [category])

  const fetchProducts = async () => {
    setLoading(true)

    let query = supabase
      .from('produtos')
      .select(`
        *,
        produto_imagens(*),
        produto_variantes(*)
      `)

    // FILTRO DINÂMICO (corrigido)
    if (category !== 'todos') {
      query = query.eq('category', category)
    }

    const { data, error } = await query

    if (error) {
      console.error('Erro ao buscar produtos:', error)
      setLoading(false)
      return
    }

    // TRANSFORMAÇÃO SEGURA
    const formattedProducts = (data || []).map((product: any) => {
      const colorsMap: any = {}

      product.produto_imagens?.forEach((img: any) => {
        if (!colorsMap[img.color]) {
          colorsMap[img.color] = {
            name: img.color,
            images: []
          }
        }

        colorsMap[img.color].images.push(img.image_url)
      })

      return {
        ...product,
        colors: Object.values(colorsMap),
        produto_imagens: product.produto_imagens || [],
        produto_variantes: product.produto_variantes || []
      }
    })

    setProducts(formattedProducts)
    setLoading(false)
  }

  return (
    <>
      {/* FILTRO DE CATEGORIA */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.value}
            href={
              cat.value === 'todos'
                ? '/produtos'
                : `/produtos?categoria=${cat.value}`
            }
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === cat.value
                ? 'bg-foreground text-background'
                : 'bg-muted hover:bg-muted-foreground/10'
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {/* LISTAGEM */}
      {loading ? (
        <div className="py-16 text-center text-muted-foreground">
          Carregando produtos...
        </div>
      ) : (
        <>
          <div className="mb-6 text-sm text-muted-foreground">
            {products.length}{' '}
            {products.length === 1
              ? 'produto encontrado'
              : 'produtos encontrados'}
          </div>

          {products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                Nenhum produto encontrado nesta categoria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  )
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <StoreHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">

          {/* BREADCRUMB */}
          <nav className="mb-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Início
            </Link>
            <span className="mx-2">/</span>
            <span>Produtos</span>
          </nav>

          <h1 className="font-serif text-3xl font-semibold mb-8">
            Nossos Produtos
          </h1>

          <Suspense
            fallback={
              <div className="py-16 text-center text-muted-foreground">
                Carregando...
              </div>
            }
          >
            <ProductsContent />
          </Suspense>

        </div>
      </main>

      <StoreFooter />
    </div>
  )
}