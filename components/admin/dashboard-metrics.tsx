"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Package, ShoppingCart, DollarSign } from "lucide-react"
import { getTotalSales, getTotalOrders, getTotalProducts, getOutOfStockProducts } from "@/lib/mock-data"

export function DashboardMetrics() {
  const totalSales = getTotalSales()
  const totalOrders = getTotalOrders()
  const totalProducts = getTotalProducts()
  const outOfStock = getOutOfStockProducts()

  const metrics = [
    {
      title: "Vendas Totais",
      value: `R$ ${totalSales.toFixed(2).replace(".", ",")}`,
      description: "Faturamento total",
      icon: DollarSign,
      color: "bg-blue-100 dark:bg-blue-900",
      iconColor: "text-blue-600 dark:text-blue-300",
    },
    {
      title: "Total de Pedidos",
      value: totalOrders.toString(),
      description: "Pedidos processados",
      icon: ShoppingCart,
      color: "bg-green-100 dark:bg-green-900",
      iconColor: "text-green-600 dark:text-green-300",
    },
    {
      title: "Produtos",
      value: totalProducts.toString(),
      description: "Total de itens",
      icon: Package,
      color: "bg-purple-100 dark:bg-purple-900",
      iconColor: "text-purple-600 dark:text-purple-300",
    },
    {
      title: "Fora de Estoque",
      value: outOfStock.length.toString(),
      description: "Produtos sem estoque",
      icon: TrendingUp,
      color: "bg-red-100 dark:bg-red-900",
      iconColor: "text-red-600 dark:text-red-300",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      {metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <Card key={metric.title} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <div className={`${metric.color} rounded-lg p-2`}>
                <Icon className={`h-4 w-4 ${metric.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
