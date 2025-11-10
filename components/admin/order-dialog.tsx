"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Order } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface OrderDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  order: Order | null
  onSave: (order: Order) => void
}

type OrderStatus = "pendente" | "processando" | "envio" | "entregue"

export function OrderDialog({ isOpen, onOpenChange, order, onSave }: OrderDialogProps) {
  const [status, setStatus] = useState<OrderStatus>("pendente")

  useEffect(() => {
    if (order) {
      setStatus(order.status as OrderStatus)
    }
  }, [order, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (order) {
      onSave({ ...order, status })
      onOpenChange(false)
    }
  }

  if (!isOpen || !order) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Atualizar Status do Pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Pedido: {order.id}</p>
              <label className="block text-sm font-medium mb-2">Novo Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as OrderStatus)}
                className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="pendente">Pendente</option>
                <option value="processando">Processando</option>
                <option value="envio">Envio</option>
                <option value="entregue">Entregue</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-border">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">Atualizar</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
