'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Plus, Pencil, Trash2, X, Upload, ImageIcon } from 'lucide-react'

import { supabase } from '@/lib/supabase'
import { CATEGORIES, SIZES, AVAILABLE_COLORS, Category } from '@/lib/types'

interface ProductVariant {
  id: string
  produto_id: string
  color: string
  size: string
  stock: number
}

interface ProductImage {
  id: string
  produto_id: string
  color: string
  image_url: string
  position: number
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  featured: boolean
  produto_variantes: ProductVariant[]
  produto_imagens: ProductImage[]
}

interface ColorWithImages {
  name: string
  hex: string
  images: string[]
}

export default function AdminProductsPage() {

  const [products, setProducts] = useState<Product[]>([])
  const [showModal, setShowModal] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'vestidos' as Category,
    sizes: [] as string[],
    colors: [] as ColorWithImages[],
    featured: false
  })

  const [activeColorTab, setActiveColorTab] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    const { data, error } = await supabase
      .from('produtos')
      .select(`
        *,
        produto_variantes (*),
        produto_imagens (*)
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar produtos:', error)
      return
    }

    setProducts(data || [])
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const getCategoryLabel = (category: string) => {
    const cat = CATEGORIES.find(c => c.value === category)
    return cat?.label || category
  }

  const handleSizeToggle = (size: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }))
  }

  const handleColorToggle = (colorName: string) => {
  const color = AVAILABLE_COLORS.find(c => c.name === colorName)
  if (!color) return

  const exists = formData.colors.find(c => c.name === colorName)

  if (exists) {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter(c => c.name !== colorName)
    }))
  } else {
    setFormData(prev => ({
      ...prev,
      colors: [...prev.colors, { name: color.name, hex: color.hex, images: [] }]
    }))
    setActiveColorTab(colorName)
  }
}

const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files
  if (!files || !activeColorTab) return

  Array.from(files).forEach(file => {
    const reader = new FileReader()

    reader.onload = (event) => {
      const imageUrl = event.target?.result as string

      setFormData(prev => ({
        ...prev,
        colors: prev.colors.map(color =>
          color.name === activeColorTab
            ? { ...color, images: [...color.images, imageUrl] }
            : color
        )
      }))
    }

    reader.readAsDataURL(file)
  })

  if (fileInputRef.current) {
    fileInputRef.current.value = ''
  }
}

const handleRemoveImage = (colorName: string, imageIndex: number) => {
  setFormData(prev => ({
    ...prev,
    colors: prev.colors.map(color =>
      color.name === colorName
        ? { ...color, images: color.images.filter((_, i) => i !== imageIndex) }
        : color
    )
  }))
}

const resetForm = () => {
  setFormData({
    name: '',
    description: '',
    price: '',
    category: 'vestidos',
    sizes: [],
    colors: [],
    featured: false
  })
  setActiveColorTab(null)
}

const handleDelete = async (id: string) => {
  if (!window.confirm('Tem certeza que deseja excluir este produto?')) return

  const { error } = await supabase
    .from('produtos')
    .delete()
    .eq('id', id)

  if (!error) fetchProducts()
}

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  const { error } = await supabase
    .from('produtos')
    .insert({
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      featured: formData.featured
    })

  if (error) {
    console.error(error)
    return
  }

  await fetchProducts()
  setShowModal(false)
  resetForm()
}

  const activeColor = formData.colors.find(c => c.name === activeColorTab)

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Produtos</h1>
            <p className="text-muted-foreground">Gerencie os produtos da sua loja</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-lg font-medium hover:bg-foreground/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Novo Produto
          </button>
        </div>

        {/* Products Table */}
        <div className="bg-background rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Produto</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Categoria</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Preço</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Tamanhos</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Cores</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        product.colors?.[0]?.images?.[0] ? (
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted">
                            <Image
                              src={product.colors[0].images[0]}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                            <ImageIcon className="h-5 w-5 text-muted-foreground" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-sm">{product.name}</p>
                          {product.featured && (
                            <span className="text-xs text-muted-foreground">Destaque</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm">{getCategoryLabel(product.category)}</td>
                    <td className="p-4 text-sm font-medium">{formatCurrency(product.price)}</td>
                    <td className="p-4 text-sm text-muted-foreground">{product.sizes.join(', ')}</td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        {product.colors.map((color) => (
                          <div
                            key={color.name}
                            className="w-5 h-5 rounded-full border border-border relative group"
                            style={{ backgroundColor: color.hex }}
                            title={`${color.name} (${color.images.length} imagens)`}
                          >
                            {color.images.length > 0 && (
                              <span className="absolute -top-1 -right-1 w-3 h-3 bg-foreground text-background text-[8px] rounded-full flex items-center justify-center">
                                {color.images.length}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                          <Pencil className="h-4 w-4 text-muted-foreground" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Product Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-background z-10">
                <h2 className="text-lg font-semibold">Novo Produto</h2>
                <button
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome do Produto</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Ex: Vestido Midi Elegante"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Descrição</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    placeholder="Descreva o produto..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Preço (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="0,00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Categoria</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {CATEGORIES.filter(c => c.value !== 'todos').map((cat) => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tamanhos Disponíveis</label>
                  <div className="flex flex-wrap gap-2">
                    {SIZES.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleSizeToggle(size)}
                        className={`w-12 h-12 rounded-lg border font-medium transition-colors ${
                          formData.sizes.includes(size)
                            ? 'border-foreground bg-foreground text-background'
                            : 'border-border hover:border-foreground'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Cores Disponíveis</label>
                  <p className="text-xs text-muted-foreground mb-3">Selecione as cores e adicione imagens para cada uma</p>
                  <div className="flex flex-wrap gap-3">
                    {AVAILABLE_COLORS.map((color) => {
                      const isSelected = formData.colors.some(c => c.name === color.name)
                      const colorData = formData.colors.find(c => c.name === color.name)
                      return (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() => handleColorToggle(color.name)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                            isSelected
                              ? 'border-foreground bg-muted'
                              : 'border-border hover:border-foreground'
                          }`}
                        >
                          <span
                            className="w-5 h-5 rounded-full border border-border"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="text-sm">{color.name}</span>
                          {colorData && colorData.images.length > 0 && (
                            <span className="bg-foreground text-background text-xs px-1.5 py-0.5 rounded-full">
                              {colorData.images.length}
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Tabs de cores selecionadas para upload de imagens */}
                {formData.colors.length > 0 && (
                  <div className="border border-border rounded-xl overflow-hidden">
                    <div className="flex border-b border-border bg-muted/30 overflow-x-auto">
                      {formData.colors.map((color) => (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() => setActiveColorTab(color.name)}
                          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                            activeColorTab === color.name
                              ? 'border-foreground text-foreground bg-background'
                              : 'border-transparent text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full border border-border"
                            style={{ backgroundColor: color.hex }}
                          />
                          {color.name}
                          {color.images.length > 0 && (
                            <span className="text-xs bg-muted px-1.5 py-0.5 rounded">
                              {color.images.length}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="p-4">
                      {activeColor ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                              Adicione imagens para a cor <strong>{activeColor.name}</strong>
                            </p>
                            <label className="inline-flex items-center gap-2 bg-muted hover:bg-muted/80 px-3 py-2 rounded-lg cursor-pointer transition-colors">
                              <Upload className="h-4 w-4" />
                              <span className="text-sm font-medium">Upload</span>
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                className="hidden"
                              />
                            </label>
                          </div>

                          {activeColor.images.length > 0 ? (
                            <div className="grid grid-cols-4 gap-3">
                              {activeColor.images.map((image, index) => (
                                <div key={index} className="relative group aspect-square rounded-lg overflow-hidden bg-muted">
                                  <Image
                                    src={image}
                                    alt={`${activeColor.name} ${index + 1}`}
                                    fill
                                    className="object-cover"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveImage(activeColor.name, index)}
                                    className="absolute top-2 right-2 p-1.5 bg-background/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                  {index === 0 && (
                                    <span className="absolute bottom-2 left-2 text-xs bg-foreground text-background px-2 py-0.5 rounded">
                                      Principal
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                              <ImageIcon className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                              <p className="text-sm text-muted-foreground mb-1">
                                Nenhuma imagem adicionada
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Clique em Upload para adicionar imagens desta cor
                              </p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-sm text-muted-foreground">
                            Selecione uma cor acima para adicionar imagens
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded border-border"
                  />
                  <label htmlFor="featured" className="text-sm">Marcar como destaque</label>
                </div>

                <div className="flex gap-3 pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={() => { setShowModal(false); resetForm(); }}
                    className="flex-1 px-4 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-foreground text-background px-4 py-3 rounded-lg font-medium hover:bg-foreground/90 transition-colors"
                  >
                    Salvar Produto
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
  )
}
