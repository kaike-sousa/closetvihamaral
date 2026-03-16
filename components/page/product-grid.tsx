    "use client"

    import { ProductCarousel } from "@/components/page/product-carousel"
    import { ProductCardData } from "@/components/page/product-card"

    const products: ProductCardData[] = [
    {
        id: "1",
        name: "Vestido Elegante",
        price: 129.9,
        image: "/products/vestido1.jpg",
        category: "vestidos"
    },
    {
        id: "2",
        name: "Conjunto Feminino",
        price: 159.9,
        image: "/products/conjunto1.jpg",
        category: "conjuntos"
    }
    ]

    export default function ProductGrid() {
    return (
        <section className="container mx-auto px-4 py-10">
        <ProductCarousel products={products} />
        </section>
    )
    }