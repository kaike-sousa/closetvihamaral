"use client";

import { useState, useEffect } from "react";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import Link from "next/link";
import { createClient } from "@/lib/utils/client";
import type { Session } from "@supabase/supabase-js";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  const supabase = createClient();

  const { items } = useCart();
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const messages = [
    "| Enviamos para TODO O BRASIL |",
    "| Pedido acima de R$200 ganha frete grátis |",
    "| Parcelamento em até 3x sem juros |",
    "| Lançamentos novos todos os meses! |",
  ];

  // 🔹 Carrega sessão + role
  useEffect(() => {
    async function loadUser() {
      // 1️⃣ Pega a sessão rapidamente (pode não ser autenticada)
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      // 2️⃣ Agora valida usuário com o servidor Supabase (100% seguro)
      const { data: userResponse } = await supabase.auth.getUser();

      const user = userResponse?.user;

      if (user?.id) {
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("role")
          .eq("auth_uid", user.id)
          .single();

        if (userError) {
          console.error("Erro ao carregar dados do usuário:", userError);
        }

        setIsAdmin(userData?.role === "admin");
      }

      setLoadingUser(false);
    }

    loadUser();
  }, [supabase]);


  // 🔹 Logout
  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <header className="sticky top-0 z-50">
      {/* Barra superior animada */}
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

      {/* HEADER PRINCIPAL */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link
              href="/"
              className="flex flex-col items-center group select-none cursor-pointer"
            >
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

            {/* Navegação Desktop */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/produtos/ver_tudo">VER TUDO</Link>
              <Link href="/produtos/conjuntos">Conjuntos</Link>
              <Link href="/produtos/saias">Saias</Link>
              <Link href="/produtos/vestidos">Vestidos</Link>
              <Link href="/produtos/croppeds">Croppeds</Link>
              <Link href="/produtos/bodys">Bodys</Link>
              <Link href="/produtos/calcas">Calças</Link>

              {/* Painel Admin */}
              {!loadingUser && isAdmin && (
                <Link
                  href="/admin"
                  className="text-pink-600 font-semibold hover:text-pink-700"
                >
                  Painel Admin
                </Link>
              )}
            </nav>

            {/* Ações */}
            <div className="flex items-center gap-4">
              {!session ? (
                <Link href="/login">
                  <Button className="hidden md:flex bg-[#b5518f] hover:bg-[#9e3f78] text-white px-6">
                    Entrar
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={handleLogout}
                  className="hidden md:flex bg-gray-200 hover:bg-gray-300 text-gray-800 px-6"
                >
                  Sair
                </Button>
              )}

              {/* Busca */}
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                <Search className="h-5 w-5" />
              </Button>

              {/* Carrinho */}
              <Link href="/carrinho">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Menu Mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
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
                <Link href="/produtos/ver_tudo">VER TUDO</Link>
                <Link href="/produtos/conjuntos">Conjuntos</Link>
                <Link href="/produtos/saias">Saias</Link>
                <Link href="/produtos/vestidos">Vestidos</Link>
                <Link href="/produtos/croppeds">Croppeds</Link>
                <Link href="/produtos/bodys">Bodys</Link>
                <Link href="/produtos/calcas">Calças</Link>

                {!loadingUser && isAdmin && (
                  <Link href="/admin" className="text-pink-600 font-semibold">
                    Painel Admin
                  </Link>
                )}

                {!session ? (
                  <Link href="/login">
                    <Button className="bg-[#b5518f] hover:bg-[#9e3f78] text-white w-full">
                      Entrar
                    </Button>
                  </Link>
                ) : (
                  <Button onClick={handleLogout} className="bg-gray-200 text-gray-800 w-full">
                    Sair
                  </Button>
                )}
              </div>
            </nav>
          )}
        </div>
      </div>

      {/* CSS da animação */}
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
          gap: 2rem;
        }
      `}</style>
    </header>
  );
}
