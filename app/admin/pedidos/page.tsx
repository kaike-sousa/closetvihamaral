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
    User,
    ShoppingBag,
    Calendar,
    Package
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
    const formatDate = (date: string) => new Intl.DateTimeFormat('pt-BR').format(new Date(date))

    return (
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 animate-in fade-in duration-500">
        
        {/* MODAL DE CONFIRMAÇÃO */}
        {(confirmDelete || confirmStatus) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">{confirmDelete ? 'Excluir Pedido?' : 'Alterar Status?'}</h3>
              <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                {confirmDelete ? 'Ação permanente.' : `Deseja alterar para ${confirmStatus?.status.toUpperCase()}?`}
              </p>
              <div className="grid grid-cols-2 gap-3 mt-8">
                <button onClick={() => { setConfirmDelete(null); setConfirmStatus(null); }} className="px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm">Cancelar</button>
                <button onClick={confirmDelete ? handleDelete : handleStatusChange} className="px-4 py-3 rounded-xl bg-slate-900 text-white font-semibold text-sm">Confirmar</button>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Pedidos</h1>
            <p className="text-sm text-slate-500">Gerencie e acompanhe as vendas da loja.</p>
          </div>
          <button onClick={loadOrders} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm font-medium text-slate-700 text-sm">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Sincronizar
          </button>
        </div>

        {/* Busca */}
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Buscar pedido ou cliente..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="p-20 text-center text-slate-400 italic bg-white rounded-2xl border border-slate-100">Carregando pedidos...</div>
        ) : (
          <>
            {/* VERSÃO DESKTOP */}
            <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 border-b border-slate-200">
                    <tr>
                      <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Identificação</th>
                      <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Cliente</th>
                      <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Conteúdo</th>
                      <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                      <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredOrders.map((order) => {
                      const config = statusConfig[order.status];
                      return (
                        <tr key={order.id} className="hover:bg-slate-50/80 transition-colors group">
                          <td className="p-4">
                            <span className="font-mono text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">#{order.id.slice(0, 8)}</span>
                            <div className="text-[10px] text-slate-400 mt-2 flex items-center gap-1 font-medium"><Calendar className="w-3 h-3" /> {formatDate(order.created_at)}</div>
                          </td>
                          <td className="p-4">
                            <p className="text-sm font-bold text-slate-800">{order.customerName}</p>
                            <p className="text-xs text-slate-400">{order.customerEmail}</p>
                          </td>
                          <td className="p-4">
                            <div className="text-xs text-slate-600 font-medium">{order.pedido_itens.length} item(ns)</div>
                            <div className="text-sm font-black text-slate-900 mt-1">{formatCurrency(order.total)}</div>
                          </td>
                          <td className="p-4">
                            <div className="flex justify-center">
                              <div className="relative group w-[140px]">
                                <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-[10px] font-black uppercase transition-all ${config.color}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                                  <span className="flex-1 text-center">{config.label}</span>
                                  <ChevronDown className="w-3 h-3 opacity-40" />
                                </div>
                                <select 
                                  value={order.status} 
                                  onChange={(e) => setConfirmStatus({ id: order.id, status: e.target.value as any })}
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                >
                                  {Object.entries(statusConfig).map(([key, val]) => (<option key={key} value={key}>{val.label}</option>))}
                                </select>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <button onClick={() => setConfirmDelete(order.id)} className="p-2 text-slate-300 hover:text-red-500 rounded-lg transition-all"><Trash2 className="w-5 h-5" /></button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* VERSÃO MOBILE (IGUAL CLIENTES) */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {filteredOrders.map((order) => {
                const config = statusConfig[order.status];
                return (
                  <div key={order.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                          <ShoppingBag className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-blue-600 font-mono">#{order.id.slice(0, 8)}</p>
                          <p className="font-bold text-slate-900 text-sm">{order.customerName}</p>
                        </div>
                      </div>
                      <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[10px] font-black uppercase ${config.color}`}>
                        {config.label}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50/50 rounded-xl">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1 mb-1"><Package className="w-3 h-3" /> Itens</p>
                        <div className="space-y-0.5">
                          {order.pedido_itens.slice(0, 2).map((item, i) => (
                            <p key={i} className="text-[10px] text-slate-600 truncate">{item.quantidade}x {item.produto_nome}</p>
                          ))}
                          {order.pedido_itens.length > 2 && <p className="text-[9px] text-slate-400">+{order.pedido_itens.length - 2} mais...</p>}
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1 mb-1">Total Pago</p>
                        <p className="text-sm font-black text-slate-900">{formatCurrency(order.total)}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                        <Calendar className="w-3 h-3" /> {formatDate(order.created_at)}
                      </span>
                      <div className="flex gap-2">
                        <div className="relative">
                            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-[10px] font-bold text-slate-600">
                              Status <ChevronDown className="w-3 h-3" />
                            </button>
                            <select 
                              value={order.status} 
                              onChange={(e) => setConfirmStatus({ id: order.id, status: e.target.value as any })}
                              className="absolute inset-0 opacity-0 w-full"
                            >
                              {Object.entries(statusConfig).map(([key, val]) => (<option key={key} value={key}>{val.label}</option>))}
                            </select>
                        </div>
                        <button onClick={() => setConfirmDelete(order.id)} className="p-1.5 text-slate-300 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}

        {/* Estado Vazio */}
        {!loading && filteredOrders.length === 0 && (
          <div className="p-16 text-center bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 font-medium">Nenhum pedido encontrado.</p>
          </div>
        )}
      </div>
    )
  }