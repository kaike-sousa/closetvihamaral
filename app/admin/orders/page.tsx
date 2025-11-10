import type { Metadata } from "next"
import { OrdersTable } from "@/components/admin/orders-table"

export const metadata: Metadata = {
  title: "Pedidos | Admin",
}

export default function OrdersPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Pedidos</h1>
        <p className="text-muted-foreground">Gerencie todos os pedidos da loja</p>
      </div>
      <OrdersTable />
    </div>
  )
}
