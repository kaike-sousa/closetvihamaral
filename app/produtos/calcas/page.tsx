"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { products } from "@/data/products"

export default function SaiasPage() {
  // Filtra apenas produtos da categoria "saias"
  const saias = products.filter((p) => p.category === "saias")

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-10 text-center">Coleção de Saias</h1>

        {saias.length === 0 ? (
          <p className="text-center text-gray-500">
            Nenhuma saia disponível no momento.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {saias.map((product, index) => (
              <ProductCard
                key={product.id}
                product={{
                  id: index, // converte o índice para número (corrige o erro de tipo)
                  name: product.name,
                  price: product.price,
                  image: product.images[0], // primeira imagem
                  category: product.category,
                }}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
