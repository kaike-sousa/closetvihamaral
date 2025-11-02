"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Newsletter signup:", email)
    setEmail("")
    alert("Obrigada por se inscrever!")
  }

  return (
    <section className="py-20 bg-white text-black">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-balance">
            Fique por Dentro das Novidades
          </h2>
          <p className="text-gray-700 mb-8 text-lg">
            Receba em primeira mão lançamentos, promoções exclusivas e dicas de estilo
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white text-black border border-gray-300 focus:border-gray-500"
            />
            <Button
              type="submit"
              size="lg"
              className="bg-black text-white hover:bg-gray-800 transition"
            >
              Inscrever-se
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
