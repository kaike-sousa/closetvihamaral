'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ShoppingCart, Package, Users, Settings } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname()

  // NÃO aplicar layout nas páginas de login
  if (pathname.startsWith('/admin/login')) {
    return <>{children}</>
  }

  return (

    <div className="flex min-h-screen bg-muted">

      {/* SIDEBAR */}

      <aside className="w-64 bg-background border-r">

        <div className="p-6 border-b">
          <h1 className="text-lg font-semibold">
            Admin
          </h1>
        </div>

        <nav className="p-4 space-y-2">

          <Link
            href="/admin"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-muted"
          >
            <LayoutDashboard size={18}/>
            Dashboard
          </Link>

          <Link
            href="/admin/pedidos"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-muted"
          >
            <ShoppingCart size={18}/>
            Pedidos
          </Link>

          <Link
            href="/admin/produtos"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-muted"
          >
            <Package size={18}/>
            Produtos
          </Link>

          <Link
            href="/admin/clientes"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-muted"
          >
            <Users size={18}/>
            Clientes
          </Link>

          <Link
            href="/admin/configuracoes"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-muted"
          >
            <Settings size={18}/>
            Configurações
          </Link>

        </nav>

      </aside>

      {/* CONTEÚDO */}

      <main className="flex-1 p-8">
        {children}
      </main>

    </div>

  )
}