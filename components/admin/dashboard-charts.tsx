"use server"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export async function DashboardCharts() {
  // até criarmos a tabela Orders no prisma
  const statusChartData = [
    { name: "Pendente", value: 0 },
    { name: "Processando", value: 0 },
    { name: "Envio", value: 0 },
    { name: "Entregue", value: 0 },
  ]

  const salesTrendData: Array<{ date: string; valor: number; pedidos: number }> = []

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
      {/* Sales Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Tendência de Vendas</CardTitle>
          <CardDescription>Vendas ao longo do tempo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            (Nenhum dado de pedidos configurado ainda)
          </div>
        </CardContent>
      </Card>

      {/* Orders by Status */}
      <Card>
        <CardHeader>
          <CardTitle>Pedidos por Status</CardTitle>
          <CardDescription>Distribuição de pedidos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            (Nenhum dado de pedidos configurado ainda)
          </div>
        </CardContent>
      </Card>

      {/* Orders Performance */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Desempenho de Pedidos</CardTitle>
          <CardDescription>Quantidade de pedidos por data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            (Nenhum dado de pedidos configurado ainda)
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
