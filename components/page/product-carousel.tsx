    "use client"

    import { ProductCard, ProductCardData } from "@/components/page/product-card"

    interface ProductCarouselProps {
    products: ProductCardData[]
    }

    export function ProductCarousel({ products }: ProductCarouselProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
            <ProductCard
            key={product.id}
            product={product}
            />
        ))}
        </div>
    )
    }