'use client'

import { useState, useEffect } from 'react'
import { getOrders, updateOrderStatus } from '@/lib/services/pedidos'

type PedidoItem = {
  quantity: number
  size: string
  color: string
  produtos?: {
    name: string
  }
}

type Order = {
  id: string
  customerName: string
  customerEmail: string
  total: number
  status: 'pendente' | 'processando' | 'enviado' | 'entregue'
  created_at: string
  pedido_itens?: PedidoItem[]
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOrders()
  }, [])

  async function loadOrders() {
    setLoading(true)
    const data = await getOrders()
    setOrders(data)
    setLoading(false)
  }

  const formatCurrency = (value: number) => {
    if (!value) return 'R$ 0,00'

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const formatDate = (date: string | Date | null) => {
    if (!date) return '-'

    const parsed = new Date(date)

    if (isNaN(parsed.getTime())) return '-'

    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(parsed)
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pendente: 'bg-yellow-100 text-yellow-800',
      processando: 'bg-blue-100 text-blue-800',
      enviado: 'bg-purple-100 text-purple-800',
      entregue: 'bg-green-100 text-green-800',
    }

    return colors[status] || 'bg-muted text-muted-foreground'
  }

  const handleStatusChange = async (
    orderId: string,
    newStatus: Order['status']
  ) => {
    await updateOrderStatus(orderId, newStatus)
    await loadOrders()
  }

  return (
      <div className="space-y-6">

        <div>
          <h1 className="text-2xl font-semibold">Pedidos</h1>
          <p className="text-muted-foreground">
            Gerencie os pedidos da sua loja
          </p>
        </div>

        <div className="bg-background rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">

            {loading ? (
              <div className="p-6 text-sm text-muted-foreground">
                Carregando pedidos...
              </div>
            ) : (

              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                      Pedido
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                      Cliente
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                      Itens
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                      Data
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                      Total
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-border last:border-0 hover:bg-muted/30"
                    >

                      <td className="p-4 text-sm font-medium">
                        #{order.id.slice(0, 8)}
                      </td>

                      <td className="p-4">
                        <div>
                          <p className="text-sm font-medium">
                            {order.customerName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {order.customerEmail}
                          </p>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="text-sm">
                          {order.pedido_itens?.length ? (
                            order.pedido_itens.map((item, index) => (
                              <div key={index} className="text-muted-foreground">
                                {item.quantity}x {item.produtos?.name} ({item.size}, {item.color})
                              </div>
                            ))
                          ) : (
                            <span className="text-muted-foreground text-xs">
                              Sem itens
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="p-4 text-sm text-muted-foreground">
                        {formatDate(order.created_at)}
                      </td>

                      <td className="p-4 text-sm font-medium">
                        {formatCurrency(order.total)}
                      </td>

                      <td className="p-4">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(
                              order.id,
                              e.target.value as Order['status']
                            )
                          }
                          className={`px-3 py-1 text-xs font-medium rounded-full border-0 cursor-pointer ${getStatusColor(order.status)}`}
                        >
                          <option value="pendente">Pendente</option>
                          <option value="processando">Processando</option>
                          <option value="enviado">Enviado</option>
                          <option value="entregue">Entregue</option>
                        </select>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

            )}
          </div>
        </div>
      </div>
  )
}