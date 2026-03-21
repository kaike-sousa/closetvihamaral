  import type { Metadata } from 'next'
  import { Playfair_Display, Inter } from 'next/font/google'
  import { Analytics } from '@vercel/analytics/next'
  import { AuthProvider } from '@/lib/auth-context'
  import { CartProvider } from '@/context/cart-context'
  import { Toaster } from 'sonner' // <-- 1. Importe o Toaster
  import './globals.css'

  const playfair = Playfair_Display({ 
    subsets: ["latin"],
    variable: '--font-playfair'
  })

  const inter = Inter({ 
    subsets: ["latin"],
    variable: '--font-inter'
  })

  export const metadata: Metadata = {
    title: 'Closet Vih Amaral | Loja de Roupas Femininas',
    description: 'Encontre as melhores peças de moda feminina.'
  }

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="pt-br">
        <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
          <CartProvider>
            <AuthProvider>
              {children}
              {/* 2. Adicione o Toaster aqui embaixo */}
              <Toaster position="top-center" richColors closeButton />
            </AuthProvider>
          </CartProvider>

          <Analytics />
        </body>
      </html>
    )
  }