import type { Product } from "./products"
import type { Order } from "./cart"

export interface User {
  id: string
  email: string
  password: string
  name: string
  role: "admin" | "customer"
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  nameEn: string
  description: string
  createdAt: Date
  updatedAt: Date
}

export interface Coupon {
  id: string
  code: string
  type: "percentage" | "fixed"
  value: number
  minAmount?: number
  maxDiscount?: number
  expiresAt: Date
  isActive: boolean
  usageCount: number
  maxUsage?: number
  createdAt: Date
  updatedAt: Date
}

// Helper functions for localStorage operations
function getStorageData<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue

  try {
    const data = localStorage.getItem(key)
    if (data) {
      return JSON.parse(data, (key, value) => {
        // Convert date strings back to Date objects
        if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
          return new Date(value)
        }
        return value
      })
    }
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error)
  }
  return defaultValue
}

function setStorageData<T>(key: string, data: T): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error)
    throw error
  }
}

export function getFromStorage<T>(key: string, defaultValue: T): T {
  return getStorageData(key, defaultValue)
}

export function saveToStorage<T>(key: string, data: T): void {
  setStorageData(key, data)
}

// Initialize default data if not exists
function initializeDefaultData() {
  if (typeof window === "undefined") return

  // Initialize default admin user
  const users = getStorageData<User[]>("users", [])
  if (users.length === 0) {
    const defaultAdmin: User = {
      id: "admin-1",
      email: "admin@thaiexam.com",
      password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
      name: "ผู้ดูแลระบบ",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setStorageData("users", [defaultAdmin])
  }

  // Initialize default categories
  const categories = getStorageData<Category[]>("categories", [])
  if (categories.length === 0) {
    const defaultCategories: Category[] = [
      {
        id: "cat-1",
        name: "หนังสือเตรียมสอบราชการ",
        nameEn: "Government Exam Books",
        description: "หนังสือเตรียมสอบข้าราชการทุกประเภท",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "cat-2",
        name: "หนังสือเตรียมสอบครู",
        nameEn: "Teacher Exam Books",
        description: "หนังสือเตรียมสอบครูและบุคลากรทางการศึกษา",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    setStorageData("categories", defaultCategories)
  }
}

// Initialize data on first load
if (typeof window !== "undefined") {
  initializeDefaultData()
}

// Products operations
export function getProducts(): Product[] {
  return getStorageData<Product[]>("products", [])
}

export function saveProducts(products: Product[]): void {
  setStorageData("products", products)
}

export function getProductById(id: string): Product | null {
  const products = getProducts()
  return products.find((p) => p.id === id) || null
}

export function addProduct(product: Product): void {
  const products = getProducts()
  products.push(product)
  saveProducts(products)
}

export function updateProduct(id: string, updates: Partial<Product>): boolean {
  const products = getProducts()
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) return false

  products[index] = { ...products[index], ...updates }
  saveProducts(products)
  return true
}

export function deleteProduct(id: string): boolean {
  const products = getProducts()
  const filteredProducts = products.filter((p) => p.id !== id)
  if (filteredProducts.length === products.length) return false

  saveProducts(filteredProducts)
  return true
}

// Orders operations
export function getOrders(): Order[] {
  return getStorageData<Order[]>("orders", [])
}

export function saveOrders(orders: Order[]): void {
  setStorageData("orders", orders)
}

export function getOrderById(id: string): Order | null {
  const orders = getOrders()
  return orders.find((o) => o.id === id) || null
}

export function addOrder(order: Order): void {
  const orders = getOrders()
  orders.push(order)
  saveOrders(orders)
}

export function updateOrderStatus(id: string, status: Order["status"]): boolean {
  const orders = getOrders()
  const index = orders.findIndex((o) => o.id === id)
  if (index === -1) return false

  orders[index] = { ...orders[index], status, updatedAt: new Date() }
  saveOrders(orders)
  return true
}

// Users operations
export function getUsers(): User[] {
  return getStorageData<User[]>("users", [])
}

export function saveUsers(users: User[]): void {
  setStorageData("users", users)
}

export function getUserByEmail(email: string): User | null {
  const users = getUsers()
  return users.find((u) => u.email === email) || null
}

export function addUser(user: User): void {
  const users = getUsers()
  users.push(user)
  saveUsers(users)
}

// Categories operations
export function getCategories(): Category[] {
  return getStorageData<Category[]>("categories", [])
}

export function saveCategories(categories: Category[]): void {
  setStorageData("categories", categories)
}

export function addCategory(category: Category): void {
  const categories = getCategories()
  categories.push(category)
  saveCategories(categories)
}

export function updateCategory(id: string, updates: Partial<Category>): boolean {
  const categories = getCategories()
  const index = categories.findIndex((c) => c.id === id)
  if (index === -1) return false

  categories[index] = { ...categories[index], ...updates }
  saveCategories(categories)
  return true
}

export function deleteCategory(id: string): boolean {
  const categories = getCategories()
  const filteredCategories = categories.filter((c) => c.id !== id)
  if (filteredCategories.length === categories.length) return false

  saveCategories(filteredCategories)
  return true
}

// Coupons operations
export function getCoupons(): Coupon[] {
  return getStorageData<Coupon[]>("coupons", [])
}

export function saveCoupons(coupons: Coupon[]): void {
  setStorageData("coupons", coupons)
}

export function getCouponByCode(code: string): Coupon | null {
  const coupons = getCoupons()
  return coupons.find((c) => c.code === code && c.isActive) || null
}

export function addCoupon(coupon: Coupon): void {
  const coupons = getCoupons()
  coupons.push(coupon)
  saveCoupons(coupons)
}

export function updateCoupon(id: string, updates: Partial<Coupon>): boolean {
  const coupons = getCoupons()
  const index = coupons.findIndex((c) => c.id === id)
  if (index === -1) return false

  coupons[index] = { ...coupons[index], ...updates }
  saveCoupons(coupons)
  return true
}

export function deleteCoupon(id: string): boolean {
  const coupons = getCoupons()
  const filteredCoupons = coupons.filter((c) => c.id !== id)
  if (filteredCoupons.length === coupons.length) return false

  saveCoupons(filteredCoupons)
  return true
}
