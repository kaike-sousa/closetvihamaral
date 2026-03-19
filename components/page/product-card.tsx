    "use client"

    import Link from "next/link"

    export interface ProductCardData {
    id: string
    name: string
    price: number
    image: string
    category: string
    }

    interface ProductCardProps {
    product: ProductCardData
    }

    export function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/produto/${product.id}`} className="group block">
        
        {/* IMAGEM */}
        <div className="relative overflow-hidden aspect-[3/4] bg-gray-100">
            <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
        </div>

        {/* INFO */}
        <div className="mt-4 space-y-2 px-1">
            <h3 className="text-base text-gray-700 font-medium leading-snug group-hover:text-black transition-colors">
            {product.name}
            </h3>

            <p className="text-base text-gray-900 font-semibold">
            R$ {product.price.toFixed(2).replace(".", ",")}
            </p>
        </div>

        </Link>
    )
    }