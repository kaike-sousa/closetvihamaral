'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ShoppingBag, User, Search } from 'lucide-react'
import { CATEGORIES } from '@/lib/types'

export function StoreHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const messages = [
    "| Enviamos para TODO O BRASIL |",
    "| Pedido acima de R$200 ganha frete grátis |",
    "| Parcelamento em até 3x sem juros |",
    "| Lançamentos novos todos os meses! |",
  ]

  return (
    <header className="sticky top-0 z-50">

      {/* Barra rosa */}
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

      {/* Header principal */}
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ALTURA AUMENTADA */}
          <div className="flex h-20 items-center justify-between">

            {/* Logo */}
            <Link
              href="/"
              className="flex flex-col items-center group select-none cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-4xl font-bold text-gray-800 tracking-tight">
                  closet
                </h1>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-7 h-7 text-gray-800"
                >
                  <path d="M12 3a2 2 0 00-2 2 2 2 0 004 0c0-1.1-.9-2-2-2z" />
                  <path d="M12 7v2l8 8H4l8-8z" />
                </svg>
              </div>

              <span className="text-sm tracking-widest text-gray-600 mt-1 font-light">
                VIH AMARAL
              </span>
            </Link>

            {/* Menu central (fonte maior) */}
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

            {/* Ações */}
            <div className="flex items-center gap-4">

              {/* Botão busca */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>

              <Link
                href="/admin/login"
                className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <User className="h-5 w-5" />
              </Link>

              {/* Carrinho */}
              <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-foreground text-background text-xs flex items-center justify-center">
                  0
                </span>
              </button>

              {/* Menu mobile */}
              <button
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>

            </div>
          </div>

          {/* Barra de busca */}
          {isSearchOpen && (
            <div className="pb-4">
              <input
                type="search"
                placeholder="Buscar produtos..."
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          )}

          {/* Mobile */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col gap-4">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.value}
                    href={cat.value === 'todos' ? '/produtos' : `/produtos?categoria=${cat.value}`}
                    className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

        </nav>
      </div>

      {/* animação barra */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 15s linear infinite;
        }
      `}</style>

    </header>
  )
}