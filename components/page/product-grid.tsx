    "use client"

    import { useEffect, useState } from "react"
    import { supabase } from "@/lib/supabase"
    import { ProductCarousel } from "@/components/page/product-carousel"
    import { ProductCardData } from "@/components/page/product-card"

    // Componente de Skeleton corrigido com suporte a className
    function ProductSkeleton({ className = "" }: { className?: string }) {
    return (
        <div className={`w-full h-[450px] bg-neutral-100 animate-pulse rounded-[2.5rem] ${className}`} />
    )
    }

    export default function ProductGrid() {
    const [latestProducts, setLatestProducts] = useState<ProductCardData[]>([])
    const [featuredProducts, setFeaturedProducts] = useState<ProductCardData[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProducts()
    }, [])

    async function fetchProducts() {
        setLoading(true)
        
        try {
        // 🚀 PARALELISMO: Busca simultânea para economizar tempo no celular
        const [latestRes, featuredRes] = await Promise.all([
            supabase
            .from("produtos")
            .select("id, name, price, category, produto_imagens(image_url)")
            .order("created_at", { ascending: false })
            .limit(10),
            supabase
            .from("produtos")
            .select("id, name, price, category, produto_imagens(image_url)")
            .eq("featured", true)
            .order("created_at", { ascending: false })
        ])

        const format = (products: any[]): ProductCardData[] => {
            return products.map((p) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            image: p.produto_imagens?.[0]?.image_url || null,
            category: p.category
            }))
        }

        if (latestRes.data) setLatestProducts(format(latestRes.data))
        if (featuredRes.data) setFeaturedProducts(format(featuredRes.data))
        } catch (error) {
        console.error("Erro ao carregar produtos:", error)
        } finally {
        setLoading(false)
        }
    }

    return (
        <section className="container mx-auto px-4 py-10 space-y-16">
        
        {/* SEÇÃO DE DESTAQUES */}
        <div>
            <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-2 text-balance">
                Best Sellers
            </h2>
            <p className="text-muted-foreground text-lg">
                Produtos que não podem ficar de fora da sacola🤩
            </p>
            </div>

            {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <ProductSkeleton />
                <ProductSkeleton className="hidden sm:block" />
                <ProductSkeleton className="hidden md:block" />
                <ProductSkeleton className="hidden md:block" />
            </div>
            ) : (
            featuredProducts.length > 0 && <ProductCarousel products={featuredProducts} />
            )}
        </div>

        {/* SEÇÃO DE LANÇAMENTOS */}
        <div>
            <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-2 text-balance">
                Últimos Lançamentos
            </h2>
            <p className="text-muted-foreground text-lg">
                As novidades do Closet Vih Amaral 👀
            </p>
            </div>

            {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <ProductSkeleton />
                <ProductSkeleton className="hidden sm:block" />
                <ProductSkeleton className="hidden md:block" />
                <ProductSkeleton className="hidden md:block" />
            </div>
            ) : (
            latestProducts.length > 0 && <ProductCarousel products={latestProducts} />
            )}
        </div>

        </section>
    )
    }