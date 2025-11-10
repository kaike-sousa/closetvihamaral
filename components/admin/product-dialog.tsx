"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Product {
  id?: number
  name: string
  description: string
  price: number
  category: string
  slug: string
}

interface ProductDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  product: Product | null
  onSave: (product: Product) => void
}

export function ProductDialog({ isOpen, onOpenChange, product, onSave }: ProductDialogProps) {
  const [formData, setFormData] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    category: "Vestidos",
    slug: "",
  })

  useEffect(() => {
    if (product) {
      setFormData(product)
    } else {
      setFormData({
        name: "",
        description: "",
        price: 0,
        category: "Vestidos",
        slug: "",
      })
    }
  }, [product, isOpen])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    onSave(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>{product ? "Editar Produto" : "Novo Produto"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Slug</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Descrição</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-input rounded-lg"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Preço (R$)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  className="w-full px-3 py-2 border border-input rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Categoria</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-input rounded-lg"
                >
                  <option>Vestidos</option>
                  <option>Blusas</option>
                  <option>Calças</option>
                  <option>Casacos</option>
                  <option>Saias</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-border">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">{product ? "Atualizar" : "Criar"} Produto</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
