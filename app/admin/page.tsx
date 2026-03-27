'use client'

import { useEffect, useState } from 'react'
// Adicionei ArrowLeft aqui embaixo
import { Package, ShoppingCart, Users, DollarSign, ArrowLeft } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

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
    const { data: ordersData, error: ordersError } = await supabase
      .from('pedidos')
      .select(`id, total, status, created_at`)
      .order('created_at', { ascending: false })
      .limit(5)

    if (ordersError) console.error('Erro pedidos:', ordersError)

    const { count: productsCount } = await supabase
      .from('produtos')
      .select('*', { count: 'exact', head: true })

    const { count: customersCount } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'user')

    const { data: ordersTotal } = await supabase
      .from('pedidos')
      .select('total')

    const revenue = ordersTotal?.reduce((acc, order) => acc + Number(order.total), 0) || 0

    setStats({
      totalRevenue: revenue,
      totalOrders: ordersTotal?.length || 0,
      totalProducts: productsCount || 0,
      totalCustomers: customersCount || 0
    })

    setOrders(ordersData || [])
  }

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

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
      {/* HEADER COM BOTÃO VOLTAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral da sua loja</p>
        </div>

        <Link 
          href="/" 
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background hover:bg-slate-50 text-sm font-medium transition-all active:scale-95 shadow-sm"
        >
          <ArrowLeft size={18} />
          Voltar para a Loja
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-background rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Receita Total</p>
              <p className="text-2xl font-semibold mt-1">{formatCurrency(stats.totalRevenue)}</p>
            </div>
            <DollarSign className="text-green-600"/>
          </div>
        </div>

        <div className="bg-background rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pedidos</p>
              <p className="text-2xl font-semibold mt-1">{stats.totalOrders}</p>
            </div>
            <ShoppingCart className="text-blue-600"/>
          </div>
        </div>

        <div className="bg-background rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Produtos</p>
              <p className="text-2xl font-semibold mt-1">{stats.totalProducts}</p>
            </div>
            <Package className="text-purple-600"/>
          </div>
        </div>

        <div className="bg-background rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Clientes</p>
              <p className="text-2xl font-semibold mt-1">{stats.totalCustomers}</p>
            </div>
            <Users className="text-orange-600"/>
          </div>
        </div>
      </div>

      {/* Tabela de Pedidos Recentes */}
      <div className="bg-background rounded-xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold">Pedidos Recentes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-slate-50/50">
                <th className="p-4 text-left text-sm font-medium text-muted-foreground">Pedido</th>
                <th className="p-4 text-left text-sm font-medium text-muted-foreground">Data</th>
                <th className="p-4 text-left text-sm font-medium text-muted-foreground">Total</th>
                <th className="p-4 text-left text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-border hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-sm font-mono">#{order.id.slice(0,8)}</td>
                  <td className="p-4 text-sm">{formatDate(order.created_at)}</td>
                  <td className="p-4 text-sm font-medium">{formatCurrency(order.total)}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}