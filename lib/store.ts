'use client'

import { Product, Order, Customer, Category } from './types'

// Mock data storage
let products: Product[] = [
  {
    id: '1',
    name: 'Vestido Midi Elegante',
    description: 'Vestido midi com corte elegante, perfeito para ocasiões especiais.',
    price: 289.90,
    category: 'vestidos',
    sizes: ['P', 'M', 'G'],
    colors: [
      { name: 'Preto', hex: '#1a1a1a', images: ['/placeholder-dress-black.jpg'] },
      { name: 'Bege', hex: '#d4c4a8', images: ['/placeholder-dress-beige.jpg'] },
    ],
    featured: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Saia Plissada',
    description: 'Saia plissada com tecido fluido e elegante.',
    price: 159.90,
    category: 'saias',
    sizes: ['PP', 'P', 'M', 'G'],
    colors: [
      { name: 'Rosa', hex: '#e8b4b8', images: ['/placeholder-skirt-pink.jpg'] },
      { name: 'Branco', hex: '#ffffff', images: ['/placeholder-skirt-white.jpg'] },
    ],
    featured: true,
    createdAt: new Date('2024-01-10'),
  },
  {
    id: '3',
    name: 'Conjunto Alfaiataria',
    description: 'Conjunto de blazer e calça em alfaiataria premium.',
    price: 459.90,
    category: 'conjuntos',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Azul Marinho', hex: '#1e3a5f', images: ['/placeholder-suit-navy.jpg'] },
      { name: 'Preto', hex: '#1a1a1a', images: ['/placeholder-suit-black.jpg'] },
    ],
    featured: true,
    createdAt: new Date('2024-01-05'),
  },
  {
    id: '4',
    name: 'Cropped Canelado',
    description: 'Cropped em tecido canelado com acabamento premium.',
    price: 89.90,
    category: 'cropped',
    sizes: ['PP', 'P', 'M'],
    colors: [
      { name: 'Branco', hex: '#ffffff', images: ['/placeholder-crop-white.jpg'] },
      { name: 'Preto', hex: '#1a1a1a', images: ['/placeholder-crop-black.jpg'] },
    ],
    featured: false,
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '5',
    name: 'Body Renda',
    description: 'Body com detalhes em renda delicada.',
    price: 119.90,
    category: 'bodys',
    sizes: ['P', 'M', 'G'],
    colors: [
      { name: 'Preto', hex: '#1a1a1a', images: ['/placeholder-body-black.jpg'] },
      { name: 'Vermelho', hex: '#8b2635', images: ['/placeholder-body-red.jpg'] },
    ],
    featured: true,
    createdAt: new Date('2024-01-18'),
  },
  {
    id: '6',
    name: 'Calça Wide Leg',
    description: 'Calça wide leg em tecido fluido e confortável.',
    price: 179.90,
    category: 'calcas',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Bege', hex: '#d4c4a8', images: ['/placeholder-pants-beige.jpg'] },
      { name: 'Marrom', hex: '#5c4033', images: ['/placeholder-pants-brown.jpg'] },
    ],
    featured: false,
    createdAt: new Date('2024-01-12'),
  },
]

let orders: Order[] = [
  {
    id: '1001',
    customerName: 'Maria Silva',
    customerEmail: 'maria@email.com',
    items: [
      { product: products[0], quantity: 1, size: 'M', color: 'Preto' },
    ],
    total: 289.90,
    status: 'entregue',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '1002',
    customerName: 'Ana Costa',
    customerEmail: 'ana@email.com',
    items: [
      { product: products[1], quantity: 1, size: 'P', color: 'Rosa' },
      { product: products[3], quantity: 2, size: 'M', color: 'Branco' },
    ],
    total: 339.70,
    status: 'enviado',
    createdAt: new Date('2024-01-22'),
  },
  {
    id: '1003',
    customerName: 'Juliana Pereira',
    customerEmail: 'juliana@email.com',
    items: [
      { product: products[2], quantity: 1, size: 'G', color: 'Azul Marinho' },
    ],
    total: 459.90,
    status: 'processando',
    createdAt: new Date('2024-01-25'),
  },
]

let customers: Customer[] = [
  {
    id: 'c1',
    name: 'Maria Silva',
    email: 'maria@email.com',
    phone: '(11) 99999-0001',
    totalOrders: 5,
    totalSpent: 1289.50,
    createdAt: new Date('2023-06-15'),
  },
  {
    id: 'c2',
    name: 'Ana Costa',
    email: 'ana@email.com',
    phone: '(11) 99999-0002',
    totalOrders: 3,
    totalSpent: 789.70,
    createdAt: new Date('2023-08-20'),
  },
  {
    id: 'c3',
    name: 'Juliana Pereira',
    email: 'juliana@email.com',
    phone: '(11) 99999-0003',
    totalOrders: 2,
    totalSpent: 659.80,
    createdAt: new Date('2023-10-10'),
  },
]

// Products API
export function getProducts(): Product[] {
  return [...products]
}

export function getProductsByCategory(category: Category | 'todos'): Product[] {
  if (category === 'todos') return [...products]
  return products.filter(p => p.category === category)
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured)
}

export function addProduct(product: Omit<Product, 'id' | 'createdAt'>): Product {
  const newProduct: Product = {
    ...product,
    id: String(Date.now()),
    createdAt: new Date(),
  }
  products = [newProduct, ...products]
  return newProduct
}

export function updateProduct(id: string, data: Partial<Product>): Product | undefined {
  const index = products.findIndex(p => p.id === id)
  if (index === -1) return undefined
  products[index] = { ...products[index], ...data }
  return products[index]
}

export function deleteProduct(id: string): boolean {
  const initialLength = products.length
  products = products.filter(p => p.id !== id)
  return products.length < initialLength
}

// Orders API
export function getOrders(): Order[] {
  return [...orders]
}

export function updateOrderStatus(id: string, status: Order['status']): Order | undefined {
  const index = orders.findIndex(o => o.id === id)
  if (index === -1) return undefined
  orders[index] = { ...orders[index], status }
  return orders[index]
}

// Customers API
export function getCustomers(): Customer[] {
  return [...customers]
}

// Stats
export function getDashboardStats() {
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
  const totalOrders = orders.length
  const totalProducts = products.length
  const totalCustomers = customers.length
  
  return {
    totalRevenue,
    totalOrders,
    totalProducts,
    totalCustomers,
  }
}
