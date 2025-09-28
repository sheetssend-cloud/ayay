import type { Product } from "./products"

export interface CartItem {
  id: string
  product: Product
  quantity: number
  addedAt: Date
}

export interface ShippingInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  district: string
  province: string
  postalCode: string
}

export interface Order {
  id: string
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
  shippingInfo: ShippingInfo
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt: Date
  updatedAt: Date
}

export const calculateCartTotal = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = subtotal >= 300 ? 0 : 50 // Free shipping over 300 baht
  return {
    subtotal,
    shipping,
    total: subtotal + shipping,
  }
}

export const formatPrice = (price: number) => {
  return `฿${price.toLocaleString()}`
}
