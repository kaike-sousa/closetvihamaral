'use client'

import { useState, useEffect } from 'react'
import { supabase } from "@/lib/supabase"
import { 
  Search, 
  Package, 
  Calendar, 
  RefreshCw, 
  Trash2, 
  ChevronDown, 
  CheckCircle2, 
  Clock, 
  Truck, 
  PlayCircle,
  AlertCircle
} from 'lucide-react'

// --- Tipagens ---
type PedidoItem = {
  quantidade: number
  tamanho: string
  cor: string
  produto_nome: string
}

type Order = {
  id: string
  customerName: string
  customerEmail: string
  total: number
  status: 'pendente' | 'processando' | 'enviado' | 'entregue'
  created_at: string
  pedido_itens: PedidoItem[]
}

// --- Funções de Banco de Dados ---
export async function getOrders() {
  const { data, error } = await supabase
    .from("pedidos")
    .select(`
      id, total, status, created_at,
      users:users!pedidos_user_id_fkey ( nome, email ),
      pedido_itens ( quantidade, tamanho, cor, produto_nome )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar pedidos:", error)
    return []
  }

  return (data || []).map((order: any) => ({
    id: order.id,
    total: order.total,
    status: order.status,
    created_at: order.created_at,
    customerName: order.users?.nome ?? 'Cliente não identificado',
    customerEmail: order.users?.email ?? 'Sem e-mail',
    pedido_itens: order.pedido_itens ?? []
  }))
}

export async function updateOrderStatus(orderId: string, status: string) {
  const { error } = await supabase.from("pedidos").update({ status }).eq("id", orderId)
  return !error
}

export async function deleteOrder(orderId: string) {
  await supabase.from("pedido_itens").delete().eq("pedido_id", orderId)
  const { error } = await supabase.from("pedidos").delete().eq("id", orderId)
  return !error
}

// --- Componente Principal ---
export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  useEffect(() => { loadOrders() }, [])

  async function loadOrders() {
    setLoading(true)
    const data = await getOrders()
    setOrders(data)
    setLoading(false)
  }

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
    const success = await updateOrderStatus(orderId, newStatus)
    if (success) {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
    }
  }

  const handleDelete = async (orderId: string) => {
    if (confirm("Deseja realmente excluir este pedido? Esta ação não pode ser desfeita.")) {
      const success = await deleteOrder(orderId)
      if (success) setOrders(prev => prev.filter(o => o.id !== orderId))
    }
  }

  // Configuração Visual dos Status
  const statusConfig = {
    pendente: { label: 'Pendente', color: 'text-amber-700 bg-amber-50 border-amber-200', dot: 'bg-amber-500', icon: <Clock className="w-3.5 h-3.5" /> },
    processando: { label: 'Em Preparo', color: 'text-blue-700 bg-blue-50 border-blue-200', dot: 'bg-blue-500', icon: <PlayCircle className="w-3.5 h-3.5" /> },
    enviado: { label: 'Enviado', color: 'text-purple-700 bg-purple-50 border-purple-200', dot: 'bg-purple-500', icon: <Truck className="w-3.5 h-3.5" /> },
    entregue: { label: 'Entregue', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', dot: 'bg-emerald-500', icon: <CheckCircle2 className="w-3.5 h-3.5" /> }
  }

  // ✅ FILTRO MELHORADO: Busca por Nome, Email ou ID
  const filteredOrders = orders.filter(o => 
    o.customerName.toLowerCase().includes(filter.toLowerCase()) || 
    o.customerEmail.toLowerCase().includes(filter.toLowerCase()) ||
    o.id.toLowerCase().includes(filter.toLowerCase())
  )

  const formatCurrency = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0)

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Painel de Pedidos</h1>
          <p className="text-slate-500">Gerencie o fluxo de vendas e entregas da sua loja.</p>
        </div>
        <button 
          onClick={loadOrders}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm font-medium text-slate-700"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Sincronizar
        </button>
      </div>

      {/* Busca Corrigida */}
      <div className="relative max-w-md group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
        <input 
          type="text"
          placeholder="Buscar por nome, e-mail ou ID..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* Tabela Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-200">
              <tr>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Detalhes</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Cliente</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Produtos</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Status do Pedido</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={5} className="p-20 text-center text-slate-400 italic">Carregando dados do servidor...</td></tr>
              ) : filteredOrders.map((order) => {
                const config = statusConfig[order.status] || statusConfig.pendente;
                return (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="p-4">
                      <div className="font-mono text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block mb-1 lowercase">
                        #{order.id.slice(0, 8)}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1 uppercase font-semibold">
                        <Calendar className="w-3 h-3" />
                        {new Date(order.created_at).toLocaleDateString('pt-BR')}
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="text-sm font-bold text-slate-800 leading-none">{order.customerName}</div>
                      <div className="text-xs text-slate-400 mt-1">{order.customerEmail}</div>
                    </td>

                    <td className="p-4">
                      <div className="space-y-1">
                        {order.pedido_itens.map((item, idx) => (
                          <div key={idx} className="text-[11px] text-slate-600 flex items-center gap-2">
                            <span className="w-5 h-5 flex items-center justify-center bg-slate-100 rounded text-[10px] font-bold text-slate-500">{item.quantidade}x</span>
                            <span className="font-medium">{item.produto_nome}</span>
                            <span className="text-[9px] bg-slate-100 text-slate-400 px-1 rounded uppercase">{item.tamanho}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 text-sm font-black text-slate-900">{formatCurrency(order.total)}</div>
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center">
                        <div className="relative group w-[150px]">
                          <div className={`
                            flex items-center gap-2 px-3 py-2 rounded-xl border text-[11px] font-black uppercase tracking-tight transition-all
                            ${config.color}
                          `}>
                            <span className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`} />
                            {config.icon}
                            <span className="flex-1">{config.label}</span>
                            <ChevronDown className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value as any)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          >
                            <option value="pendente">Pendente</option>
                            <option value="processando">Processando</option>
                            <option value="enviado">Enviado</option>
                            <option value="entregue">Entregue</option>
                          </select>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleDelete(order.id)}
                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-95"
                        title="Remover Pedido"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {!loading && filteredOrders.length === 0 && (
            <div className="p-16 text-center">
              <div className="inline-flex p-4 rounded-full bg-slate-50 text-slate-300 mb-4">
                <AlertCircle className="w-10 h-10" />
              </div>
              <p className="text-slate-500 font-medium">Nenhum pedido encontrado com esses critérios.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}