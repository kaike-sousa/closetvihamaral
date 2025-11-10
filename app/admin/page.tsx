import type { Metadata } from "next"
import { DashboardMetrics } from "@/components/admin/dashboard-metrics"
import { DashboardCharts } from "@/components/admin/dashboard-charts"

export const metadata: Metadata = {
  title: "Dashboard | Admin",
}

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Bem-vindo ao painel administrativo</p>
      </div>

      <DashboardMetrics />
      <DashboardCharts />
    </div>
  )
}
