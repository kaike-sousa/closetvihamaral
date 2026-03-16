export interface ProductColor {
  name: string
  hex: string
  images: string[]
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: Category
  sizes: string[]
  colors: ProductColor[]
  featured: boolean
  createdAt: Date
}

export type Category = 
  | 'saias' 
  | 'conjuntos' 
  | 'vestidos' 
  | 'cropped' 
  | 'bodys' 
  | 'calcas'

export const CATEGORIES: { value: Category | 'todos'; label: string }[] = [
  { value: 'todos', label: 'Ver Tudo' },
  { value: 'saias', label: 'Saias' },
  { value: 'conjuntos', label: 'Conjuntos' },
  { value: 'vestidos', label: 'Vestidos' },
  { value: 'cropped', label: 'Cropped' },
  { value: 'bodys', label: 'Bodys' },
  { value: 'calcas', label: 'Calças' },
]

export const SIZES = ['PP', 'P', 'M', 'G', 'GG']

export const AVAILABLE_COLORS = [
  { name: 'Preto', hex: '#1a1a1a' },
  { name: 'Branco', hex: '#ffffff' },
  { name: 'Bege', hex: '#d4c4a8' },
  { name: 'Rosa', hex: '#e8b4b8' },
  { name: 'Azul Marinho', hex: '#1e3a5f' },
  { name: 'Vermelho', hex: '#8b2635' },
  { name: 'Verde', hex: '#2d4a3e' },
  { name: 'Marrom', hex: '#5c4033' },
]

export interface Order {
  id: string
  customerName: string
  customerEmail: string
  items: { product: Product; quantity: number; size: string; color: string }[]
  total: number
  status: 'pendente' | 'processando' | 'enviado' | 'entregue'
  createdAt: Date
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  totalOrders: number
  totalSpent: number
  createdAt: Date
}
