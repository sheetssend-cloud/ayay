import type { Product } from "./products"
import type { Order } from "./cart"

export interface AdminStats {
  totalOrders: number
  totalRevenue: number
  totalProducts: number
  pendingOrders: number
  monthlyRevenue: number
  topSellingProducts: Array<{
    product: Product
    totalSold: number
    revenue: number
  }>
}

export interface ProductFormData {
  name: string
  nameEn: string
  description: string
  price: number
  originalPrice?: number
  category: string
  tags: string[]
  image: string
  inStock: boolean
  features: string[]
  format: "ebook" | "physical" | "bundle"
}

export const getAdminStats = async (): Promise<AdminStats> => {
  try {
    // Get orders from API
    const ordersResponse = await fetch("/api/admin/orders")
    const ordersData = await ordersResponse.json()
    const orders: Order[] = ordersData.orders || []

    // Get products from API
    const productsResponse = await fetch("/api/admin/products")
    const productsData = await productsResponse.json()
    const products: Product[] = productsData.products || []

    const totalOrders = orders.length
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
    const totalProducts = products.length
    const pendingOrders = orders.filter((order) => order.status === "pending").length

    // Calculate monthly revenue (current month)
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const monthlyRevenue = orders
      .filter((order) => {
        const orderDate = new Date(order.createdAt)
        return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear
      })
      .reduce((sum, order) => sum + order.total, 0)

    // Calculate top selling products
    const productSales: { [key: string]: { quantity: number; revenue: number } } = {}

    orders.forEach((order) => {
      order.items.forEach((item) => {
        const productId = item.product.id
        if (!productSales[productId]) {
          productSales[productId] = { quantity: 0, revenue: 0 }
        }
        productSales[productId].quantity += item.quantity
        productSales[productId].revenue += item.product.price * item.quantity
      })
    })

    const topSellingProducts = Object.entries(productSales)
      .map(([productId, sales]) => {
        const product = products.find((p) => p.id === productId)
        return product
          ? {
              product,
              totalSold: sales.quantity,
              revenue: sales.revenue,
            }
          : null
      })
      .filter(Boolean)
      .sort((a, b) => (b?.totalSold || 0) - (a?.totalSold || 0))
      .slice(0, 5) as AdminStats["topSellingProducts"]

    return {
      totalOrders,
      totalRevenue,
      totalProducts,
      pendingOrders,
      monthlyRevenue,
      topSellingProducts,
    }
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return {
      totalOrders: 0,
      totalRevenue: 0,
      totalProducts: 0,
      pendingOrders: 0,
      monthlyRevenue: 0,
      topSellingProducts: [],
    }
  }
}

export const saveProduct = async (product: Product): Promise<boolean> => {
  try {
    const response = await fetch("/api/admin/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
    return response.ok
  } catch (error) {
    console.error("Error saving product:", error)
    return false
  }
}

export const updateProduct = async (productId: string, updates: Partial<Product>): Promise<boolean> => {
  try {
    const response = await fetch(`/api/admin/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    })
    return response.ok
  } catch (error) {
    console.error("Error updating product:", error)
    return false
  }
}

export const deleteProduct = async (productId: string): Promise<boolean> => {
  try {
    const response = await fetch(`/api/admin/products/${productId}`, {
      method: "DELETE",
    })
    return response.ok
  } catch (error) {
    console.error("Error deleting product:", error)
    return false
  }
}

export const updateOrderStatus = async (orderId: string, status: Order["status"]): Promise<boolean> => {
  try {
    const response = await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId, status }),
    })
    return response.ok
  } catch (error) {
    console.error("Error updating order status:", error)
    return false
  }
}
