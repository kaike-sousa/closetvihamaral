"use client"

import { useState } from "react"
import { Search, ShoppingBag, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/hooks/use-cart"
import Link from "next/link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { items } = useCart()
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const messages = [
    "| Enviamos para TODO O BRASIL |",
    "| Pedido acima de R$200 ganha frete grátis |",
    "| Parcelamento em até 3x sem juros |",
    "| Lançamentos novos todos os meses! |",
  ]

  return (
    <header className="sticky top-0 z-50">
      {/* 🔹 Barra de informações rolando contínua (sem pausas) */}
      <div className="relative overflow-hidden bg-[#b5518f] text-gray-100 border-b border-pink-200">
        <div className="marquee-track font-medium text-sm py-2 whitespace-nowrap">
          {/* Três cópias — fluxo infinito e suave */}
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 px-8">
              {messages.map((msg, idx) => (
                <span key={idx}>{msg}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Header Principal */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex flex-col items-center group select-none">
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-4xl font-bold text-gray-800 tracking-tight group-hover:text-pink-600 transition-colors">
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
                    className="w-7 h-7 text-gray-800 group-hover:text-pink-600 transition-colors"
                  >
                    <path d="M12 3a2 2 0 00-2 2 2 2 0 004 0c0-1.1-.9-2-2-2z" />
                    <path d="M12 7v2l8 8H4l8-8z" />
                  </svg>
                </div>
                <span className="text-sm tracking-widest text-gray-600 mt-1 font-light">
                  VIH AMARAL
                </span>
              </Link>
            </div>

            {/* Navegação Desktop */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <a href="/#loja" className="text-foreground hover:text-primary transition-colors">
                Loja
              </a>
              <a href="/#novidades" className="text-foreground hover:text-primary transition-colors">
                Novidades
              </a>
              <Link href="/sobre" className="text-foreground hover:text-primary transition-colors">
                Sobre
              </Link>
              <Link href="/contato" className="text-foreground hover:text-primary transition-colors">
                Contato
              </Link>
            </nav>

            {/* Ações */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-foreground hover:text-primary"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Link href="/carrinho">
                <Button variant="ghost" size="icon" className="text-foreground hover:text-primary relative">
                  <ShoppingBag className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-foreground"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Barra de busca */}
          {isSearchOpen && (
            <div className="pb-4 animate-in slide-in-from-top">
              <Input type="search" placeholder="Buscar produtos..." className="w-full" />
            </div>
          )}

          {/* Menu Mobile */}
          {isMenuOpen && (
            <nav className="md:hidden pb-4 animate-in slide-in-from-top">
              <div className="flex flex-col gap-4">
                <Link href="/" className="text-foreground hover:text-primary transition-colors">
                  Home
                </Link>
                <a href="/#loja" className="text-foreground hover:text-primary transition-colors">
                  Loja
                </a>
                <a href="/#novidades" className="text-foreground hover:text-primary transition-colors">
                  Novidades
                </a>
                <Link href="/sobre" className="text-foreground hover:text-primary transition-colors">
                  Sobre
                </Link>
                <Link href="/contato" className="text-foreground hover:text-primary transition-colors">
                  Contato
                </Link>
              </div>
            </nav>
          )}
        </div>
      </div>

      {/* 🔹 CSS da animação perfeita */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.3333%);
          }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 15s linear infinite;
        }
        .marquee-track > div {
          gap: 2rem; /* antes era 16, diminuiu o espaço entre mensagens */
        }
      `}</style>
    </header>
  )
}
