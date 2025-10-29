import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bella Moda - Moda Feminina Elegante",
  description: "Loja de roupas femininas com estilo e elegância",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} ${playfair.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
