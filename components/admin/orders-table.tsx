"use client"

import { useState } from "react"
import { type Order, orders } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Edit } from "lucide-react"
import { OrderDialog } from "./order-dialog"
import { OrderDetailsDialog } from "./order-details-dialog"

type OrderStatus = "pendente" | "processando" | "envio" | "entregue"

const statusColors: Record<OrderStatus, string> = {
  pendente: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100",
  processando: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100",
  envio: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-100",
  entregue: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100",
}

const statusLabels: Record<OrderStatus, string> = {
  pendente: "Pendente",
  processando: "Processando",
  envio: "Envio",
  entregue: "Entregue",
}

export function OrdersTable() {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [ordersList, setOrdersList] = useState(orders)

  const handleEdit = (order: Order) => {
    setSelectedOrder(order)
    setIsEditOpen(true)
  }

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order)
    setIsDetailsOpen(true)
  }

  const handleSave = (order: Order) => {
    setOrdersList(ordersList.map((o) => (o.id === order.id ? order : o)))
    setIsEditOpen(false)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Pedidos</CardTitle>
          <CardDescription>Gerencie todos os pedidos da loja</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">ID Pedido</th>
                  <th className="text-left py-3 px-4 font-semibold">Cliente</th>
                  <th className="text-left py-3 px-4 font-semibold">Data</th>
                  <th className="text-left py-3 px-4 font-semibold">Total</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-center py-3 px-4 font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {ordersList.map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 font-medium">{order.id}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{new Date(order.date).toLocaleDateString("pt-BR")}</td>
                    <td className="py-3 px-4 font-medium">R$ {order.total.toFixed(2).replace(".", ",")}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-semibold ${statusColors[order.status as OrderStatus]}`}
                      >
                        {statusLabels[order.status as OrderStatus]}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(order)} title="Ver detalhes">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(order)} title="Editar status">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <OrderDialog isOpen={isEditOpen} onOpenChange={setIsEditOpen} order={selectedOrder} onSave={handleSave} />

      <OrderDetailsDialog isOpen={isDetailsOpen} onOpenChange={setIsDetailsOpen} order={selectedOrder} />
    </>
  )
}
