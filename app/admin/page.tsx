'use client'

import { useEffect, useState } from 'react'
import { Package, ShoppingCart, Users, DollarSign } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type Stats = {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  totalCustomers: number
}

type Order = {
  id: string
  total: number
  status: string
  created_at: string
}

export default function AdminDashboardPage() {

  const [stats, setStats] = useState<Stats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0
  })

  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    loadDashboard()
  }, [])

  async function loadDashboard() {

    // PEDIDOS RECENTES
    const { data: ordersData, error: ordersError } = await supabase
      .from('pedidos')
      .select(`
        id,
        total,
        status,
        created_at
      `)
      .order('created_at', { ascending: false })
      .limit(5)

    if (ordersError) {
      console.error('Erro pedidos:', ordersError)
    }

    // PRODUTOS
    const { count: productsCount } = await supabase
      .from('produtos')
      .select('*', { count: 'exact', head: true })

    // CLIENTES
    const { count: customersCount } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'user')

    // TODOS PEDIDOS (para receita total)
    const { data: ordersTotal } = await supabase
      .from('pedidos')
      .select('total')

    const revenue =
      ordersTotal?.reduce((acc, order) => acc + Number(order.total), 0) || 0

    setStats({
      totalRevenue: revenue,
      totalOrders: ordersTotal?.length || 0,
      totalProducts: productsCount || 0,
      totalCustomers: customersCount || 0
    })

    setOrders(ordersData || [])
  }

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat('pt-BR').format(new Date(date))

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pendente: 'bg-yellow-100 text-yellow-800',
      processando: 'bg-blue-100 text-blue-800',
      enviado: 'bg-purple-100 text-purple-800',
      entregue: 'bg-green-100 text-green-800',
    }
    return colors[status] || 'bg-muted text-muted-foreground'
  }

  return (
      <div className="space-y-8">

        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral da sua loja</p>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <div className="bg-background rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Receita Total</p>
                <p className="text-2xl font-semibold mt-1">
                  {formatCurrency(stats.totalRevenue)}
                </p>
              </div>
              <DollarSign className="text-green-600"/>
            </div>
          </div>

          <div className="bg-background rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pedidos</p>
                <p className="text-2xl font-semibold mt-1">
                  {stats.totalOrders}
                </p>
              </div>
              <ShoppingCart className="text-blue-600"/>
            </div>
          </div>

          <div className="bg-background rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Produtos</p>
                <p className="text-2xl font-semibold mt-1">
                  {stats.totalProducts}
                </p>
              </div>
              <Package className="text-purple-600"/>
            </div>
          </div>

          <div className="bg-background rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Clientes</p>
                <p className="text-2xl font-semibold mt-1">
                  {stats.totalCustomers}
                </p>
              </div>
              <Users className="text-orange-600"/>
            </div>
          </div>

        </div>

        {/* Pedidos recentes */}

        <div className="bg-background rounded-xl border border-border">

          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold">
              Pedidos Recentes
            </h2>
          </div>

          <table className="w-full">

            <thead>
              <tr className="border-b border-border">
                <th className="p-4 text-left text-sm">Pedido</th>
                <th className="p-4 text-left text-sm">Data</th>
                <th className="p-4 text-left text-sm">Total</th>
                <th className="p-4 text-left text-sm">Status</th>
              </tr>
            </thead>

            <tbody>

              {orders.map((order) => (

                <tr key={order.id} className="border-b border-border">

                  <td className="p-4">#{order.id}</td>

                  <td className="p-4">
                    {formatDate(order.created_at)}
                  </td>

                  <td className="p-4 font-medium">
                    {formatCurrency(order.total)}
                  </td>

                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
  )
}