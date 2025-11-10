"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { getOrdersByStatus, orders } from "@/lib/mock-data"

export function DashboardCharts() {
  // Prepare data for orders by status
  const ordersByStatus = {
    pendente: getOrdersByStatus("pendente").length,
    processando: getOrdersByStatus("processando").length,
    envio: getOrdersByStatus("envio").length,
    entregue: getOrdersByStatus("entregue").length,
  }

  const statusChartData = [
    { name: "Pendente", value: ordersByStatus.pendente },
    { name: "Processando", value: ordersByStatus.processando },
    { name: "Envio", value: ordersByStatus.envio },
    { name: "Entregue", value: ordersByStatus.entregue },
  ]

  // Prepare data for sales trend
  const salesTrendData = orders
    .reduce(
      (acc, order) => {
        const date = order.date
        const existing = acc.find((item) => item.date === date)
        if (existing) {
          existing.valor += order.total
          existing.pedidos += 1
        } else {
          acc.push({ date, valor: order.total, pedidos: 1 })
        }
        return acc
      },
      [] as Array<{ date: string; valor: number; pedidos: number }>,
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"]

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
      {/* Sales Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Tendência de Vendas</CardTitle>
          <CardDescription>Vendas ao longo do tempo</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="valor" stroke="#3b82f6" name="Valor (R$)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Orders by Status */}
      <Card>
        <CardHeader>
          <CardTitle>Pedidos por Status</CardTitle>
          <CardDescription>Distribuição de pedidos</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {statusChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Orders Performance */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Desempenho de Pedidos</CardTitle>
          <CardDescription>Quantidade de pedidos por data</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pedidos" fill="#10b981" name="Quantidade de Pedidos" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
