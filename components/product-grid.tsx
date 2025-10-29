// product-grid.tsx
"use client"

import { ProductCarousel } from "@/components/product-carousel"
import { Product } from "@/components/product-card"

// Produtos de exemplo
const products: Product[] = [
  { id: 1, name: "Vestido Floral Elegante", price: 189.9, image: "/elegant-floral-dress.png", category: "vestidos" },
  { id: 2, name: "Blusa de Seda Rosa", price: 129.9, image: "/pink-silk-blouse.jpg", category: "blusas" },
  { id: 3, name: "Calça Alfaiataria", price: 159.9, image: "/tailored-pants-women.jpg", category: "calcas" },
  { id: 4, name: "Saia Midi Plissada", price: 139.9, image: "/pleated-midi-skirt.png", category: "saias" },
  { id: 5, name: "Blazer Estruturado", price: 249.9, image: "/structured-blazer-women.jpg", category: "blazers" },
  { id: 6, name: "Vestido Longo Festa", price: 299.9, image: "/long-evening-dress.jpg", category: "vestidos" },
  { id: 7, name: "Camisa Branca Clássica", price: 99.9, image: "/classic-white-shirt-women.jpg", category: "blusas" },
  { id: 8, name: "Conjunto Tricot", price: 179.9, image: "/knit-set-women.jpg", category: "conjuntos" },
]

export function ProductGrid() {
  return (
    <section id="loja" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Título */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-2 text-balance">
            Mais Vendidos
          </h2>
          <p className="text-muted-foreground text-lg">
            Os Queridinhos do Mês no Closet
          </p>
        </div>

        {/* Carrossel */}
        <ProductCarousel products={products} />
      </div>
    </section>
  )
}
