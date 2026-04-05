'use client'

import { useEffect, useState } from 'react'
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  ArrowLeft, 
  RefreshCw,
  Calendar,
  ChevronRight,
  TrendingUp
} from 'lucide-react'
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboard()
  }, [])

  async function loadDashboard() {
    setLoading(true)
    
    // Recent Orders
    const { data: ordersData } = await supabase
      .from('pedidos')
      .select(`id, total, status, created_at`)
      .order('created_at', { ascending: false })
      .limit(5)

    // Counts
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
    setLoading(false)
  }

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat('pt-BR').format(new Date(date))

  const statusConfig: Record<string, string> = {
    pendente: 'text-amber-700 bg-amber-50 border-amber-100',
    processando: 'text-blue-700 bg-blue-50 border-blue-100',
    enviado: 'text-purple-700 bg-purple-50 border-purple-100',
    entregue: 'text-emerald-700 bg-emerald-50 border-emerald-100',
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-sm text-slate-500">Visão geral da sua operação e vendas.</p>
        </div>
        <div className="flex items-center gap-3">
            <button 
                onClick={loadDashboard}
                className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-slate-600 shadow-sm"
                title="Atualizar dados"
            >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Receita Total', val: formatCurrency(stats.totalRevenue), icon: DollarSign, color: 'text-emerald-600 bg-emerald-50', border: 'border-emerald-100' },
          { label: 'Pedidos', val: stats.totalOrders, icon: ShoppingCart, color: 'text-blue-600 bg-blue-50', border: 'border-blue-100' },
          { label: 'Produtos', val: stats.totalProducts, icon: Package, color: 'text-purple-600 bg-purple-50', border: 'border-purple-100' },
          { label: 'Clientes', val: stats.totalCustomers, icon: Users, color: 'text-orange-600 bg-orange-50', border: 'border-orange-100' },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm shadow-slate-200/50 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                <p className="text-2xl font-black text-slate-900 mt-2 tracking-tight">{item.val}</p>
              </div>
              <div className={`p-3 rounded-xl border ${item.border} ${item.color}`}>
                <item.icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PEDIDOS RECENTES */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <TrendingUp size={20} className="text-blue-500" />
            <h2 className="text-lg font-bold text-slate-900">Vendas Recentes</h2>
          </div>
          <Link href="/admin/pedidos" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors bg-blue-50 px-3 py-1.5 rounded-lg">
            Ver tudo <ChevronRight size={14} />
          </Link>
        </div>

        {/* VERSÃO DESKTOP (Tabela) */}
        <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-200">
              <tr>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">ID Pedido</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Data</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Total</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="p-4">
                    <span className="font-mono text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded lowercase">
                      #{order.id.slice(0, 8)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                      <Calendar size={14} className="text-slate-300" />
                      {formatDate(order.created_at)}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-black text-slate-900">{formatCurrency(order.total)}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight border ${statusConfig[order.status] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                        {order.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* VERSÃO MOBILE (Cards) */}
        <div className="grid grid-cols-1 gap-3 md:hidden">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-mono text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded inline-block">#{order.id.slice(0, 8)}</p>
                <p className="text-sm font-black text-slate-900">{formatCurrency(order.total)}</p>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                   <Calendar size={12} /> {formatDate(order.created_at)}
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase border ${statusConfig[order.status] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                {order.status}
              </span>
            </div>
          ))}
        </div>

        {!loading && orders.length === 0 && (
          <div className="text-center p-12 bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400">
            Nenhuma venda registrada ainda.
          </div>
        )}
      </div>
    </div>
  )
}