  'use client'

  import Link from 'next/link'
  import { useState, useEffect } from 'react'
  import { Menu, X, ShoppingBag, User, Search, Settings } from 'lucide-react'
  import { CATEGORIES } from '@/lib/types'
  import { useCart } from '@/context/cart-context'
  import { supabase } from '@/lib/supabase'

  export function StoreHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const { cart } = useCart()
    const totalItens = cart.length

    // Monitora a sessão e a role do usuário
    useEffect(() => {
      const checkUserRole = async (userId: string) => {
        const { data } = await supabase
          .from('users')
          .select('role')
          .eq('id', userId)
          .single()
        
        setIsAdmin(data?.role === 'admin')
      }

      const checkUser = async () => {
        const { data: { session } } = await supabase.auth.getSession()
        const logged = !!session
        setIsLoggedIn(logged)
        
        if (logged && session.user) {
          checkUserRole(session.user.id)
        } else {
          setIsAdmin(false)
        }
      }

      checkUser()

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        const logged = !!session
        setIsLoggedIn(logged)
        
        if (logged && session?.user) {
          checkUserRole(session.user.id)
        } else {
          setIsAdmin(false)
        }
      })

      return () => subscription.unsubscribe()
    }, [])

    const messages = [
      "| Enviamos para TODO O BRASIL |",
      "| Pedido acima de R$200 ganha frete grátis |",
      "| Parcelamento em até 3x sem juros |",
      "| Lançamentos novos todos os meses! |",
    ]

    return (
      <header className="sticky top-0 z-50">
        {/* Barra de Avisos (Marquee) */}
        <div className="relative overflow-hidden bg-[#b5518f] text-gray-100 border-b border-pink-200">
          <div className="marquee-track font-medium text-sm py-2 whitespace-nowrap">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-16 px-8">
                {messages.map((msg, idx) => (
                  <span key={idx}>{msg}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">
              
              {/* Logo */}
              <Link href="/" className="flex flex-col items-center group select-none cursor-pointer">
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-4xl font-bold text-gray-800 tracking-tight">closet</h1>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-gray-800">
                    <path d="M12 3a2 2 0 00-2 2 2 2 0 004 0c0-1.1-.9-2-2-2z" />
                    <path d="M12 7v2l8 8H4l8-8z" />
                  </svg>
                </div>
                <span className="text-sm tracking-widest text-gray-600 mt-1 font-light">VIH AMARAL</span>
              </Link>

              {/* Menu Central (Desktop) */}
              <div className="hidden md:flex md:items-center md:gap-10">
                {CATEGORIES.map((cat) => (
                  <Link 
                    key={cat.value} 
                    href={cat.value === 'todos' ? '/produtos' : `/produtos?categoria=${cat.value}`} 
                    className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>

              {/* Ações Lado Direito */}
              <div className="flex items-center gap-2 sm:gap-4">
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)} 
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>

                {/* Botão Admin (Apenas Visível para Admins) */}
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <Settings className="h-5 w-5" />
                    <span className="hidden sm:inline font-medium">Painel Admin</span>
                  </Link>
                )}

                {/* Minha Conta / Perfil */}
                <Link
                  href={isLoggedIn ? "/perfil" : "/admin/login"}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <User className={`h-5 w-5 ${isLoggedIn ? 'text-[#b5518f]' : ''}`} />
                  <span className="hidden sm:inline font-medium">Minha Conta</span>
                </Link>

                {/* Carrinho */}
                <Link href="/carrinho">
                  <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                    <ShoppingBag className="h-5 w-5" />
                    {totalItens > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#b5518f] text-white text-[10px] flex items-center justify-center animate-in fade-in zoom-in duration-300">
                        {totalItens}
                      </span>
                    )}
                  </button>
                </Link>

                {/* Menu Mobile Button */}
                <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>

            {/* Menu Mobile (Dropdown) */}
            {mobileMenuOpen && (
              <div className="md:hidden border-t border-border py-4 space-y-4">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.value}
                    href={cat.value === 'todos' ? '/produtos' : `/produtos?categoria=${cat.value}`}
                    className="block text-base font-medium text-muted-foreground hover:text-foreground px-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {cat.label}
                  </Link>
                ))}
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="block text-base font-medium text-[#b5518f] px-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Painel Administrativo
                  </Link>
                )}
              </div>
            )}
          </nav>
        </div>

        {/* Busca (Input Expansível Opcional) */}
        {isSearchOpen && (
          <div className="bg-background border-b border-border p-4 animate-in slide-in-from-top duration-300">
            <div className="max-w-3xl mx-auto relative">
              <input 
                type="text" 
                placeholder="O que você está procurando?" 
                className="w-full bg-muted rounded-full py-2 px-10 outline-none focus:ring-2 focus:ring-[#b5518f]/20"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <button onClick={() => setIsSearchOpen(false)} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        )}

        {/* Estilos do Marquee */}
        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.3333%); }
          }
          .marquee-track {
            display: flex;
            width: max-content;
            animation: marquee 20s linear infinite;
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
        `}</style>
      </header>
    )
  }