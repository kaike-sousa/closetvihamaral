    "use client"

    import { useEffect, useState } from "react"
    import { supabase } from "@/lib/supabase"
    import { ProductCarousel } from "@/components/page/product-carousel"
    import { ProductCardData } from "@/components/page/product-card"

    export default function ProductGrid() {
    const [latestProducts, setLatestProducts] = useState<ProductCardData[]>([])
    const [featuredProducts, setFeaturedProducts] = useState<ProductCardData[]>([])

    useEffect(() => {
        fetchProducts()
    }, [])

    async function fetchProducts() {
        // 🔥 ÚLTIMOS 10 PRODUTOS
        const { data: latest, error: latestError } = await supabase
        .from("produtos")
        .select("*, produto_imagens(*)")
        .order("created_at", { ascending: false })
        .limit(10)

        // ⭐ PRODUTOS EM DESTAQUE
        const { data: featured, error: featuredError } = await supabase
        .from("produtos")
        .select("*, produto_imagens(*)")
        .eq("featured", true)
        .order("created_at", { ascending: false })

        if (latestError) console.error(latestError)
        if (featuredError) console.error(featuredError)

        // 🔄 FORMATAR PARA O CARD
        const format = (products: any[]): ProductCardData[] => {
        return products.map((p) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            image: p.produto_imagens?.[0]?.image_url || null,
            category: p.category
        }))
        }

        if (latest) setLatestProducts(format(latest))
        if (featured) setFeaturedProducts(format(featured))
    }

    return (
        <section className="container mx-auto px-4 py-10 space-y-12">
        
        {/* DESTAQUES */}
        {featuredProducts.length > 0 && (
        <div>
        <div className="text-center max-w-2xl mx-auto mb-6">
        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-2 text-balance">
            Você Precisa Conhecer
        </h2>
        <p className="text-muted-foreground text-lg">
            Produtos que não podem ficar de fora da sacola🤩
        </p>
        </div>

            {/* AQUI ERA O ERRO */}
            <ProductCarousel products={featuredProducts} />
        </div>
        )}

        {/* LANÇAMENTOS */}
        {latestProducts.length > 0 && (
        <div>
            
            <div className="text-center max-w-2xl mx-auto mb-6">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-2 text-balance">
                Últimos Lançamentos
            </h2>
            <p className="text-muted-foreground text-lg">
                As novidades do Closet Vih Amaral 👀
            </p>
            </div>

            <ProductCarousel products={latestProducts} />
            
        </div>
        )}

        </section>
    )
    }