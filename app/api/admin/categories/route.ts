import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser, requireAdmin } from "@/lib/auth"
import { getCategories, addCategory, type Category } from "@/lib/data-store"

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!requireAdmin(user)) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const categories = getCategories()
    return NextResponse.json({ categories })
  } catch (error) {
    console.error("Get categories error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!requireAdmin(user)) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const categoryData = await request.json()

    const newCategory: Category = {
      id: crypto.randomUUID(),
      ...categoryData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    addCategory(newCategory)
    return NextResponse.json({ category: newCategory }, { status: 201 })
  } catch (error) {
    console.error("Create category error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
