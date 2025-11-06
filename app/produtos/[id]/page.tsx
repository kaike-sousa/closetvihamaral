"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { products } from "@/data/products"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

export default function ProductPage() {
  const { addItem } = useCart()
  const params = useParams()
  const id = params?.id as string

  const product = products.find((p) => p.id === id)

  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [mainImage, setMainImage] = useState(product?.images[0] || "")

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado 😕</h1>
          <p className="text-gray-600">Verifique o link ou volte à página inicial.</p>
        </main>
        <Footer />
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: mainImage || product.images[0],
      quantity: 1,
      color: selectedColor || product.colors[0]?.name,
      size: selectedSize || product.sizes[0],
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Galeria */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex md:flex-col gap-2 order-2 md:order-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`border rounded-lg overflow-hidden hover:opacity-80 ${
                    mainImage === img ? "border-black" : "border-gray-200"
                  }`}
                >
                  <img src={img} alt={`Imagem ${idx + 1}`} className="w-20 h-24 object-cover" />
                </button>
              ))}
            </div>

            <div className="flex-1 order-1 md:order-2">
              <img
                src={mainImage}
                alt={product.name}
                className="rounded-2xl shadow-lg w-full object-cover aspect-[3/4]"
              />
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-6 whitespace-pre-line">{product.description}</p>
            <p className="text-2xl font-semibold text-black mb-6">
              R$ {product.price.toFixed(2).replace(".", ",")}
            </p>

            {/* Cor */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-2">Cores disponíveis:</p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColor(color.name)
                      setMainImage(color.image)
                    }}
                    className={`px-3 py-1 rounded-full border text-sm ${
                      selectedColor === color.name
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-black"
                    }`}
                  >
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Tamanho */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-2">Tamanho:</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 rounded-full border text-sm ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full bg-black hover:bg-gray-900 text-white rounded-md py-3 text-base font-medium tracking-wide flex items-center justify-center"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Comprar
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
