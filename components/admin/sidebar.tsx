'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react'

// Removido o item "Início" daqui para evitar duplicidade
const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/produtos', label: 'Produtos', icon: Package },
  { href: '/admin/pedidos', label: 'Pedidos', icon: ShoppingCart },
  { href: '/admin/clientes', label: 'Clientes', icon: Users },
  { href: '/admin/configuracoes', label: 'Configurações', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    return href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] bg-white border-b border-gray-200">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex flex-col items-center group select-none cursor-pointer">
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-4xl font-bold text-gray-800 tracking-tight">closet</h1>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-gray-800">
              <path d="M12 3a2 2 0 00-2 2 2 2 0 004 0c0-1.1-.9-2-2-2z" />
              <path d="M12 7v2l8 8H4l8-8z" />
            </svg>
          </div>
          <span className="text-sm tracking-widest text-gray-600 mt-1 font-light uppercase">VIH AMARAL</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${active 
                    ? 'bg-black text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-100'
                  }
                `}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Botão Sair - Volta para a Home */}
        <Link
          href="/"
          className="hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`
        lg:hidden absolute top-20 left-0 right-0 bg-white border-b border-gray-200 shadow-xl overflow-hidden transition-all duration-300
        ${mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
      `}>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-4 rounded-xl text-base font-medium
                  ${active ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}
                `}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
          
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-4 w-full text-base font-medium text-red-500 border-t border-gray-100"
          >
            <LogOut className="h-5 w-5" />
            Sair para o Início
          </Link>
        </nav>
      </div>
    </header>
  )
}