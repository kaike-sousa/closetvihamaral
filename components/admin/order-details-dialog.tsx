"use client"

import type { Order } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"

interface OrderDetailsDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  order: Order | null
}

export function OrderDetailsDialog({ isOpen, onOpenChange, order }: OrderDetailsDialogProps) {
  if (!isOpen || !order) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Detalhes do Pedido {order.id}</CardTitle>
          <button onClick={() => onOpenChange(false)} className="rounded-lg p-1 hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Customer Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Cliente</p>
              <p className="font-medium">{order.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{order.customerEmail}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Telefone</p>
              <p className="font-medium">{order.customerPhone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Data</p>
              <p className="font-medium">{new Date(order.date).toLocaleDateString("pt-BR")}</p>
            </div>
          </div>

          {/* Address */}
          <div className="border-t border-border pt-4">
            <p className="text-sm text-muted-foreground mb-2">Endereço de Entrega</p>
            <p className="font-medium">{order.address}</p>
          </div>

          {/* Products */}
          <div className="border-t border-border pt-4">
            <p className="text-sm font-semibold mb-3">Produtos</p>
            <div className="space-y-2">
              {order.products.map((product, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">{product.productName}</p>
                    <p className="text-sm text-muted-foreground">Qtd: {product.quantity}</p>
                  </div>
                  <p className="font-medium">R$ {product.price.toFixed(2).replace(".", ",")}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-border pt-4 flex justify-between items-center">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold">R$ {order.total.toFixed(2).replace(".", ",")}</span>
          </div>

          <div className="flex justify-end pt-4 border-t border-border">
            <Button onClick={() => onOpenChange(false)} variant="outline">
              Fechar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
