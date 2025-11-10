"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, Search } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PedidoDetalhes } from "@/components/pedido-detalhes"

interface Pedido {
  id: string
  cliente: string
  email: string
  total: number
  status: "pendente" | "enviado" | "entregue" | "cancelado"
  dataPedido: string
  dataEntrega?: string | null
  itens: Array<{
    produtoId: string
    nome: string
    quantidade: number
    preco: number
  }>
}

const statusConfig = {
  pendente: { label: "Pendente", color: "bg-yellow-500/20 text-yellow-700" },
  enviado: { label: "Enviado", color: "bg-blue-500/20 text-blue-700" },
  entregue: { label: "Entregue", color: "bg-green-500/20 text-green-700" },
  cancelado: { label: "Cancelado", color: "bg-red-500/20 text-red-700" },
}

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [filtro, setFiltro] = useState("")
  const [filtroStatus, setFiltroStatus] = useState<string | null>("todos") // Updated default value
  const [pedidoSelecionado, setPedidoSelecionado] = useState<Pedido | null>(null)
  const [dialogAberto, setDialogAberto] = useState(false)

  useEffect(() => {
    const carregarPedidos = async () => {
      const res = await fetch("/api/pedidos")
      const data = await res.json()
      setPedidos(data)
    }
    carregarPedidos()
  }, [])

  const handleAtualizarStatus = async (id: string, novoStatus: string) => {
    await fetch(`/api/pedidos/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status: novoStatus }),
    })
    setPedidos(pedidos.map((p) => (p.id === id ? { ...p, status: novoStatus as any } : p)))
  }

  const pedidosFiltrados = pedidos.filter((p) => {
    const matchTexto =
      p.cliente.toLowerCase().includes(filtro.toLowerCase()) || p.id.toLowerCase().includes(filtro.toLowerCase())
    const matchStatus = filtroStatus === "todos" || p.status === filtroStatus
    return matchTexto && matchStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gerenciar Pedidos</h1>
          <p className="text-muted-foreground">Total: {pedidos.length} pedidos</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por cliente ou ID..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filtroStatus || "todos"} onValueChange={(v) => setFiltroStatus(v || "todos")}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os status</SelectItem>
            <SelectItem value="pendente">Pendente</SelectItem>
            <SelectItem value="enviado">Enviado</SelectItem>
            <SelectItem value="entregue">Entregue</SelectItem>
            <SelectItem value="cancelado">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabela */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Cliente</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold">Total</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Data</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {pedidosFiltrados.map((pedido) => (
                  <tr key={pedido.id} className="border-b border-border hover:bg-muted/50 transition">
                    <td className="px-6 py-3 font-medium">{pedido.id}</td>
                    <td className="px-6 py-3">
                      <div>
                        <p className="font-medium">{pedido.cliente}</p>
                        <p className="text-sm text-muted-foreground">{pedido.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-right font-medium">R$ {pedido.total.toFixed(2)}</td>
                    <td className="px-6 py-3">
                      <Select value={pedido.status} onValueChange={(s) => handleAtualizarStatus(pedido.id, s)}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pendente">Pendente</SelectItem>
                          <SelectItem value="enviado">Enviado</SelectItem>
                          <SelectItem value="entregue">Entregue</SelectItem>
                          <SelectItem value="cancelado">Cancelado</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">
                      {new Date(pedido.dataPedido).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-6 py-3 text-right">
                      <Dialog open={dialogAberto && pedidoSelecionado?.id === pedido.id} onOpenChange={setDialogAberto}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setPedidoSelecionado(pedido)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Detalhes do Pedido</DialogTitle>
                            <DialogDescription>Informações completas do pedido</DialogDescription>
                          </DialogHeader>
                          {pedidoSelecionado && <PedidoDetalhes pedido={pedidoSelecionado} />}
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
