"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Plus } from "lucide-react"
import { ProductDialog } from "./product-dialog"

type Product = {
  id: number
  name: string
  category: string
  price: number
  stock: number
  status: "ativo" | "inativo"
}

export function ProductsTable() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [productsList, setProductsList] = useState<Product[]>([])

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/products")
        const data = await res.json()

        // Transformar os dados do Prisma para o formato do frontend
        const products: Product[] = data.map((p: any) => ({
          id: p.id,
          name: p.name,
          category: p.category,
          price: p.price,
          stock: p.variants?.reduce((sum: number, v: any) => sum + (v.stock || 0), 0) || 0,
          status: "ativo", // se quiser, pode criar um campo status no DB ou calcular
        }))

        setProductsList(products)
      } catch (err) {
        console.error("Erro ao carregar produtos:", err)
      }
    }
    load()
  }, [])

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setIsOpen(true)
  }

  const handleDelete = (id: number) => {
    setProductsList(productsList.filter((p) => p.id !== id))
    // Aqui você pode chamar a API DELETE se quiser remover do banco
  }

  const handleNew = () => {
    setSelectedProduct(null)
    setIsOpen(true)
  }

  const handleSave = (product: Product) => {
    if (selectedProduct) {
      // editando
      setProductsList(productsList.map((p) => (p.id === product.id ? product : p)))
    } else {
      // criando novo localmente — ID temporário
      setProductsList([...productsList, { ...product, id: Date.now() }])
    }
    setIsOpen(false)
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Produtos</CardTitle>
            <CardDescription>Gerencie todos os produtos da loja</CardDescription>
          </div>
          <Button onClick={handleNew} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Novo Produto
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Nome</th>
                  <th className="text-left py-3 px-4 font-semibold">Categoria</th>
                  <th className="text-left py-3 px-4 font-semibold">Preço</th>
                  <th className="text-left py-3 px-4 font-semibold">Estoque</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-center py-3 px-4 font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {productsList.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-3 px-4">{product.name}</td>
                    <td className="py-3 px-4">{product.category}</td>
                    <td className="py-3 px-4">R$ {product.price.toFixed(2).replace(".", ",")}</td>
                    <td className="py-3 px-4">
                      <span className={product.stock === 0 ? "text-destructive font-medium" : ""}>
                        {product.stock} unidades
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                          product.status === "ativo"
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-100"
                        }`}
                      >
                        {product.status === "ativo" ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(product)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <ProductDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        product={selectedProduct}
        onSave={handleSave}
      />
    </>
  )
}
