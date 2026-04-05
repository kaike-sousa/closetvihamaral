'use client'

import { useState, useEffect } from 'react'
import { supabase } from "@/lib/supabase"
import { 
  Search, 
  RefreshCw, 
  Trash2, 
  ChevronDown, 
  CheckCircle2, 
  Clock, 
  Truck, 
  PlayCircle,
  AlertCircle,
  User,
  ShoppingBag,
  Calendar,
  X
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

  if (error) return []

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

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  
  // Estados para os Modais de Confirmação
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [confirmStatus, setConfirmStatus] = useState<{id: string, status: Order['status']} | null>(null)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => { loadOrders() }, [])

  async function loadOrders() {
    setLoading(true)
    const data = await getOrders()
    setOrders(data)
    setLoading(false)
  }

  // Executa a troca de status após confirmação
  const handleStatusChange = async () => {
    if (!confirmStatus) return
    setActionLoading(true)
    
    const { error } = await supabase
      .from("pedidos")
      .update({ status: confirmStatus.status })
      .eq("id", confirmStatus.id)

    if (!error) {
      setOrders(prev => prev.map(o => o.id === confirmStatus.id ? { ...o, status: confirmStatus.status } : o))
      setConfirmStatus(null)
    }
    setActionLoading(false)
  }

  // Executa a exclusão após confirmação
  const handleDelete = async () => {
    if (!confirmDelete) return
    setActionLoading(true)

    await supabase.from("pedido_itens").delete().eq("pedido_id", confirmDelete)
    const { error } = await supabase.from("pedidos").delete().eq("id", confirmDelete)

    if (!error) {
      setOrders(prev => prev.filter(o => o.id !== confirmDelete))
      setConfirmDelete(null)
    }
    setActionLoading(false)
  }

  const statusConfig = {
    pendente: { label: 'Pendente', color: 'text-amber-700 bg-amber-50 border-amber-200', dot: 'bg-amber-500', icon: <Clock className="w-3.5 h-3.5" /> },
    processando: { label: 'Preparo', color: 'text-blue-700 bg-blue-50 border-blue-200', dot: 'bg-blue-500', icon: <PlayCircle className="w-3.5 h-3.5" /> },
    enviado: { label: 'Enviado', color: 'text-purple-700 bg-purple-50 border-purple-200', dot: 'bg-purple-500', icon: <Truck className="w-3.5 h-3.5" /> },
    entregue: { label: 'Entregue', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', dot: 'bg-emerald-500', icon: <CheckCircle2 className="w-3.5 h-3.5" /> }
  }

  const filteredOrders = orders.filter(o => 
    o.customerName.toLowerCase().includes(filter.toLowerCase()) || 
    o.id.toLowerCase().includes(filter.toLowerCase())
  )

  const formatCurrency = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0)

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 relative">
      
      {/* --- MODAL DE CONFIRMAÇÃO (GENÉRICO) --- */}
      {(confirmDelete || confirmStatus) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 scale-in-center">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${confirmDelete ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
              {confirmDelete ? <Trash2 /> : <RefreshCw />}
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {confirmDelete ? 'Excluir Pedido?' : 'Alterar Status?'}
            </h3>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">
              {confirmDelete 
                ? 'Esta ação é permanente e removerá todos os itens vinculados a este pedido do banco de dados.'
                : `Deseja alterar o status deste pedido para ${confirmStatus?.status.toUpperCase()}?`}
            </p>
            
            <div className="grid grid-cols-2 gap-3 mt-8">
              <button 
                disabled={actionLoading}
                onClick={() => { setConfirmDelete(null); setConfirmStatus(null); }}
                className="px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors text-sm"
              >
                Cancelar
              </button>
              <button 
                disabled={actionLoading}
                onClick={confirmDelete ? handleDelete : handleStatusChange}
                className={`px-4 py-3 rounded-xl text-white font-semibold transition-all text-sm flex items-center justify-center gap-2 ${confirmDelete ? 'bg-red-500 hover:bg-red-600' : 'bg-slate-900 hover:bg-black'}`}
              >
                {actionLoading && <RefreshCw className="w-4 h-4 animate-spin" />}
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Gerenciar Pedidos</h1>
          <p className="text-sm text-slate-500">Acompanhamento de vendas em tempo real.</p>
        </div>
        <button 
          onClick={loadOrders}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm font-bold text-slate-700 text-sm"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Sincronizar
        </button>
      </div>

      {/* Busca */}
      <div className="relative w-full max-w-md group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text"
          placeholder="Buscar pedido ou cliente..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="p-20 text-center text-slate-400 animate-pulse">Carregando base de pedidos...</div>
      ) : (
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Identificação</th>
                  <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Cliente</th>
                  <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Conteúdo</th>
                  <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Status Atual</th>
                  <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Gerir</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredOrders.map((order) => {
                  const config = statusConfig[order.status] || statusConfig.pendente;
                  return (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="p-5">
                        <span className="font-mono text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                          #{order.id.slice(0, 8)}
                        </span>
                        <div className="text-[10px] text-slate-400 mt-2 flex items-center gap-1 font-bold">
                          <Calendar className="w-3 h-3" /> {new Date(order.created_at).toLocaleDateString('pt-BR')}
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="text-sm font-bold text-slate-800 leading-none">{order.customerName}</div>
                        <div className="text-[11px] text-slate-400 mt-1.5 font-medium">{order.customerEmail}</div>
                      </td>
                      <td className="p-5">
                        <div className="space-y-1">
                          {order.pedido_itens.map((item, idx) => (
                            <div key={idx} className="text-[11px] text-slate-600 flex items-center gap-2">
                              <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] font-black text-slate-500">{item.quantidade}x</span>
                              <span className="font-medium truncate max-w-[120px]">{item.produto_nome}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 text-sm font-black text-slate-900">{formatCurrency(order.total)}</div>
                      </td>
                      <td className="p-5">
                        <div className="flex justify-center">
                          <div className="relative group w-[150px]">
                            <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-wider transition-all ${config.color}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                              <span className="flex-1 text-center">{config.label}</span>
                              <ChevronDown className="w-3 h-3 opacity-40" />
                            </div>
                            <select
                              value={order.status}
                              onChange={(e) => setConfirmStatus({ id: order.id, status: e.target.value as any })}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            >
                              {Object.entries(statusConfig).map(([key, val]) => (
                                <option key={key} value={key}>{val.label}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 text-right">
                        <button 
                          onClick={() => setConfirmDelete(order.id)}
                          className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}