import { NextResponse } from "next/server"
import { getProducts } from "@/lib/data-store"

export async function GET() {
  try {
    const products = getProducts()
    return NextResponse.json({ products })
  } catch (error) {
    console.error("Get products error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
