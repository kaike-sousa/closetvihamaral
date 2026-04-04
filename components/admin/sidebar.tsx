'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  Home
} from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/produtos', label: 'Produtos', icon: Package },
  { href: '/admin/pedidos', label: 'Pedidos', icon: ShoppingCart },
  { href: '/admin/clientes', label: 'Clientes', icon: Users },
  { href: '/admin/configuracoes', label: 'Configurações', icon: Settings },
  { href: '/', label: 'Início', icon: Home },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const handleLogout = () => {
    logout()
    router.push('/admin/login')
  }

  const isActive = (href: string) => {
    if (href === '/' && pathname !== '/') return false
    return href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] bg-white border-b border-gray-200">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/admin" className="flex flex-col min-w-fit">
          <span className="font-serif text-xl font-bold text-gray-900 italic leading-none">Closet Vih Amaral</span>
          <span className="text-[10px] uppercase tracking-[2px] text-gray-400 font-bold">Admin</span>
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

        {/* Logout Button (Desktop) */}
        <button
          onClick={handleLogout}
          className="hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </button>

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
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-4 w-full text-base font-medium text-red-500 border-t border-gray-100"
          >
            <LogOut className="h-5 w-5" />
            Sair da Conta
          </button>
        </nav>
      </div>
    </header>
  )
}