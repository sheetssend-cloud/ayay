import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser, requireAdmin } from "@/lib/auth"
import { getProductById, updateProduct, deleteProduct } from "@/lib/data-store"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()
    if (!requireAdmin(user)) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const product = getProductById(params.id)
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ product })
  } catch (error) {
    console.error("Get product error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()
    if (!requireAdmin(user)) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const updates = await request.json()
    const success = updateProduct(params.id, { ...updates, updatedAt: new Date() })

    if (!success) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const updatedProduct = getProductById(params.id)
    return NextResponse.json({ product: updatedProduct })
  } catch (error) {
    console.error("Update product error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()
    if (!requireAdmin(user)) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const success = deleteProduct(params.id)
    if (!success) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete product error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
