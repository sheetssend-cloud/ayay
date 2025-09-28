import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser, requireAdmin } from "@/lib/auth"
import { getProducts, addProduct, type Product } from "@/lib/data-store"

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!requireAdmin(user)) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const products = getProducts()
    return NextResponse.json({ products })
  } catch (error) {
    console.error("Get products error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!requireAdmin(user)) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const productData = await request.json()

    const newProduct: Product = {
      id: crypto.randomUUID(),
      ...productData,
      rating: 0,
      reviewCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    addProduct(newProduct)
    return NextResponse.json({ product: newProduct }, { status: 201 })
  } catch (error) {
    console.error("Create product error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
