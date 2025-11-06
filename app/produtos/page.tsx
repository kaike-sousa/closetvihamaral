import { products } from "@/data/products"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function ConjuntosPage() {
  const filtered = products.filter((p) => p.category === "ver_tudo")

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-10">Produtos</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="rounded-t-2xl w-full h-72 object-cover"
              />
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-700 mt-1">R$ {product.price.toFixed(2)}</p>
                <Link
                  href={`/produtos/${product.id}`}
                  className="mt-4 inline-block bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-xl text-sm"
                >
                  Comprar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
