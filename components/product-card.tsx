"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"
import Link from "next/link"

export interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <Card className="group border-none shadow-none bg-transparent">
      {/* IMAGEM */}
      <CardContent className="p-0 relative">
        <Link href={`/produtos/${product.id}`}>
          <div className="relative overflow-hidden aspect-[3/4] rounded-lg cursor-pointer">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </div>
        </Link>
      </CardContent>

      {/* INFORMAÇÕES */}
      <CardFooter className="flex flex-col items-center gap-2 pt-3">
        <Link href={`/produtos/${product.id}`}>
          <h3 className="text-sm font-semibold text-center text-gray-800 hover:text-black transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-base font-bold text-black">
          R$ {product.price.toFixed(2).replace(".", ",")}
        </p>

        <Button
          className="w-full bg-black hover:bg-gray-900 text-white rounded-md py-2 mt-1 text-sm font-medium tracking-wide"
          onClick={() => addItem(product)}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Comprar
        </Button>
      </CardFooter>
    </Card>
  )
}
