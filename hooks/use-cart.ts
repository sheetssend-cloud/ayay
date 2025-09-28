"use client"

import { useState, useEffect } from "react"
import type { Product } from "@/lib/products"
import { type CartItem, calculateCartTotal } from "@/lib/cart"

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setItems(
          parsedCart.map((item: any) => ({
            ...item,
            addedAt: new Date(item.addedAt),
          })),
        )
      } catch (error) {
        console.error("Error loading cart:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addItem = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id)

      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      } else {
        return [
          ...prev,
          {
            id: `${product.id}-${Date.now()}`,
            product,
            quantity,
            addedAt: new Date(),
          },
        ]
      }
    })
  }

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId)
      return
    }

    setItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
  }

  const getItemCount = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0)
  }

  const totals = calculateCartTotal(items)

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemCount,
    ...totals,
  }
}
