'use client'

import { usePathname } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Não aplica o layout na página de login
  if (pathname.startsWith('/admin/login')) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* A Navbar fica fixa no topo */}
      <AdminSidebar />

      {/* O pt-20 (80px) cria o espaço exato da altura da barra.
          O lg:pt-24 dá um respiro extra em telas grandes se desejar.
      */}
      <main className="flex-1 pt-20 lg:pt-20 w-full flex flex-col">
        <div className="p-6 lg:p-10 w-full max-w-[1600px] mx-auto flex-1">
          {/* Aqui dentro o seu "Painel de Pedidos" ou "Dashboard" aparecerá perfeito */}
          {children}
        </div>
      </main>
    </div>
  )
}