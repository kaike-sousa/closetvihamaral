import type { Metadata } from "next"
import { ProductsTable } from "@/components/admin/products-table"

export const metadata: Metadata = {
  title: "Produtos | Admin",
}

export default function ProductsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Produtos</h1>
        <p className="text-muted-foreground">Gerencie todos os produtos da loja</p>
      </div>
      <ProductsTable />
    </div>
  )
}
