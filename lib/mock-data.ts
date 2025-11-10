import productsData from "@/data/products.json"
import ordersData from "@/data/orders.json"

export type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  status: "ativo" | "inativo"
  createdAt: string
  sku: string
}

export type Order = {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  products: Array<{
    productId: string
    productName: string
    quantity: number
    price: number
  }>
  total: number
  status: "pendente" | "processando" | "envio" | "entregue"
  date: string
  address: string
}

export const products: Product[] = productsData.products
export const orders: Order[] = ordersData.orders

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id)
}

export const getOrderById = (id: string): Order | undefined => {
  return orders.find((o) => o.id === id)
}

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((p) => p.category === category)
}

export const getOrdersByStatus = (status: Order["status"]): Order[] => {
  return orders.filter((o) => o.status === status)
}

export const getTotalSales = (): number => {
  return orders.reduce((sum, order) => sum + order.total, 0)
}

export const getTotalOrders = (): number => {
  return orders.length
}

export const getTotalProducts = (): number => {
  return products.length
}

export const getLowStockProducts = (threshold = 10): Product[] => {
  return products.filter((p) => p.stock < threshold && p.stock > 0)
}

export const getOutOfStockProducts = (): Product[] => {
  return products.filter((p) => p.stock === 0)
}
