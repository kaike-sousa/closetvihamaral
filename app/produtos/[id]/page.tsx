"use client"

import { use } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetail } from "@/components/product-detail"

const products = [
  {
    id: 1,
    name: "Vestido Floral Elegante",
    price: 189.9,
    image: "/elegant-floral-dress.png",
    category: "vestidos",
    description:
      "Vestido floral elegante em tecido leve e fluido, perfeito para ocasiões especiais. Modelagem que valoriza a silhueta feminina.",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Rosa", "Azul", "Verde"],
  },
  {
    id: 2,
    name: "Blusa de Seda Rosa",
    price: 129.9,
    image: "/pink-silk-blouse.jpg",
    category: "blusas",
    description:
      "Blusa confeccionada em seda pura com acabamento impecável. Peça versátil que combina com diversos looks.",
    sizes: ["P", "M", "G"],
    colors: ["Rosa", "Branco", "Preto"],
  },
  {
    id: 3,
    name: "Calça Alfaiataria",
    price: 159.9,
    image: "/tailored-pants-women.jpg",
    category: "calcas",
    description: "Calça de alfaiataria com corte reto e cintura alta. Tecido de alta qualidade com caimento perfeito.",
    sizes: ["36", "38", "40", "42", "44"],
    colors: ["Preto", "Cinza", "Bege"],
  },
  {
    id: 4,
    name: "Saia Midi Plissada",
    price: 139.9,
    image: "/pleated-midi-skirt.png",
    category: "saias",
    description: "Saia midi com pregas delicadas e movimento fluido. Ideal para looks elegantes e sofisticados.",
    sizes: ["P", "M", "G"],
    colors: ["Rosa", "Preto", "Nude"],
  },
  {
    id: 5,
    name: "Blazer Estruturado",
    price: 249.9,
    image: "/structured-blazer-women.jpg",
    category: "blazers",
    description:
      "Blazer estruturado com ombros marcados e corte impecável. Peça essencial para um guarda-roupa completo.",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto", "Branco", "Cinza"],
  },
  {
    id: 6,
    name: "Vestido Longo Festa",
    price: 299.9,
    image: "/long-evening-dress.jpg",
    category: "vestidos",
    description: "Vestido longo de festa com detalhes sofisticados. Perfeito para eventos especiais e celebrações.",
    sizes: ["P", "M", "G"],
    colors: ["Vinho", "Azul Marinho", "Preto"],
  },
  {
    id: 7,
    name: "Camisa Branca Clássica",
    price: 99.9,
    image: "/classic-white-shirt-women.jpg",
    category: "blusas",
    description: "Camisa branca clássica em algodão premium. Peça atemporal e versátil para qualquer ocasião.",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Branco"],
  },
  {
    id: 8,
    name: "Conjunto Tricot",
    price: 179.9,
    image: "/knit-set-women.jpg",
    category: "conjuntos",
    description: "Conjunto em tricot macio e confortável. Inclui blusa e calça coordenadas para um look completo.",
    sizes: ["P", "M", "G"],
    colors: ["Bege", "Rosa", "Cinza"],
  },
]

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = products.find((p) => p.id === Number.parseInt(id))

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">Produto não encontrado</h1>
          <a href="/" className="text-primary hover:underline">
            Voltar para a loja
          </a>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ProductDetail product={product} />
      </main>
      <Footer />
    </div>
  )
}
