'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, X, ShoppingBag, User, Search, Settings } from 'lucide-react'
import { CATEGORIES } from '@/lib/types'
import { useCart } from '@/context/cart-context'
import { supabase } from '@/lib/supabase'

export function StoreHeader() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const { cart } = useCart()
  const totalItens = cart.length

  // Função de Busca que redireciona para o ID (singular) ou Lista (plural)
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    const term = searchQuery.trim()
    
    if (term) {
      try {
        // Busca na tabela 'produtos' do seu Supabase
        const { data: produtos, error } = await supabase
          .from('produtos') 
          .select('id')
          .ilike('name', `%${term}%`)
          .limit(2)

        if (produtos && produtos.length === 1) {
          // Se achou exatamente 1, vai para a pasta /produto/[id]
          router.push(`/produto/${produtos[0].id}`)
        } else {
          // Se achou vários ou nenhum, vai para a página de resultados /produtos
          router.push(`/produtos?search=${encodeURIComponent(term)}`)
        }
      } catch (err) {
        router.push(`/produtos?search=${encodeURIComponent(term)}`)
      }

      setIsSearchOpen(false)
      setSearchQuery('')
      setMobileMenuOpen(false)
    }
  }

  const checkAdminStatus = async (userId: string) => {
    try {
      const { data } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single()

      setIsAdmin(data?.role === 'admin')
    } catch (err) {
      setIsAdmin(false)
    }
  }

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsLoggedIn(!!session)
      if (session?.user) checkAdminStatus(session.user.id)
    }
    
    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session)
      if (session?.user) {
        checkAdminStatus(session.user.id)
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
    <header className="sticky top-0 z-50 w-full">
      {/* Barra de Anúncios (Marquee) */}
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
              <span className="text-sm tracking-widest text-gray-600 mt-1 font-light uppercase">VIH AMARAL</span>
            </Link>

            {/* Menu Desktop */}
            <div className="hidden md:flex md:items-center md:gap-10">
              {CATEGORIES.map((cat) => (
                <Link 
                  key={cat.value} 
                  href={cat.value === 'todos' ? '/produtos' : `/produtos?categoria=${cat.value}`} 
                  className="text-base font-medium text-muted-foreground hover:text-[#b5518f] transition-colors"
                >
                  {cat.label}
                </Link>
              ))}
            </div>

            {/* Ações Direitas */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)} 
                className={`p-2 transition-colors ${isSearchOpen ? 'text-[#b5518f]' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <Search className="h-5 w-5" />
              </button>

              <Link
                href={isLoggedIn ? "/perfil" : "/login"}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <User className="h-5 w-5" />
              </Link>
              
              {isAdmin && (
                <Link 
                  href="/admin" 
                  className="hidden sm:block p-2 text-muted-foreground hover:text-foreground transition-colors" 
                  title="Painel Admin"
                >
                  <Settings className="h-5 w-5" />
                </Link>
              )}

              <Link href="/carrinho" className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                <ShoppingBag className="h-5 w-5" />
                {totalItens > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#b5518f] text-white text-[10px] flex items-center justify-center animate-in fade-in zoom-in duration-300 font-bold">
                    {totalItens}
                  </span>
                )}
              </Link>

              <button 
                className="md:hidden p-2 text-muted-foreground" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* INPUT DE PESQUISA */}
        {isSearchOpen && (
          <div className="border-t border-border bg-background animate-in slide-in-from-top duration-200">
            <div className="mx-auto max-w-7xl px-4 py-4">
              <form onSubmit={handleSearch} className="relative flex items-center">
                <input
                  autoFocus
                  type="text"
                  placeholder="O que você está procurando?"
                  className="w-full bg-muted/50 border-none rounded-full py-2 px-12 focus:ring-2 focus:ring-[#b5518f] outline-none text-foreground h-11"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
                <button 
                  type="button" 
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-4 text-muted-foreground hover:text-foreground p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border animate-in slide-in-from-top duration-300">
          <div className="space-y-1 px-4 pb-6 pt-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.value}
                href={cat.value === 'todos' ? '/produtos' : `/produtos?categoria=${cat.value}`}
                className="block py-3 text-base font-medium text-muted-foreground border-b border-border/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat.label}
              </Link>
            ))}
            
            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center gap-2 py-3 text-base font-medium text-[#b5518f]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Settings className="h-5 w-5" />
                Painel Administrativo
              </Link>
            )}
          </div>
        </div>
      )}

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
        @media (max-width: 640px) {
          .marquee-track {
            animation-duration: 15s;
          }
        }
      `}</style>
    </header>
  )
}