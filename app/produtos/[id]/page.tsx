"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProdutos = async () => {
      const { data, error } = await supabase.from("products").select("*")
      if (error) console.error("Erro ao buscar produtos:", error)
      else setProdutos(data || [])
      setLoading(false)
    }

    fetchProdutos()
  }, [])

  if (loading) return <p>Carregando produtos...</p>

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Produtos Cadastrados</h1>
      <div className="grid grid-cols-2 gap-4">
        {produtos.map((p) => (
          <div key={p.id} className="border p-3 rounded shadow-sm">
            <img
              src={p.image_url}
              alt={p.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="font-semibold mt-2">{p.name}</h2>
            <p className="text-gray-600 text-sm">{p.description}</p>
            <p className="font-bold text-pink-600 mt-1">R$ {p.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
