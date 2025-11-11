import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";

async function getProducts() {
  // Usa caminho relativo (funciona local e na Vercel)
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/products`, {
    cache: "no-store", // sempre busca direto do banco
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return res.json();
}

export default async function SaiasPage() {
  const products = await getProducts();

  // Filtra somente a categoria "saias"
  const saias = products.filter((p: any) => p.category === "saias");

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
            {saias.map((product: any) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.images?.[0]?.url || "/placeholder.png",
                  category: product.category,
                }}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
