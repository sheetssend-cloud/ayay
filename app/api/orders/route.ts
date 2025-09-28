import { type NextRequest, NextResponse } from "next/server"
import { addOrder, type Order } from "@/lib/data-store"

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    const newOrder: Order = {
      id: crypto.randomUUID(),
      ...orderData,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    addOrder(newOrder)
    return NextResponse.json({ order: newOrder }, { status: 201 })
  } catch (error) {
    console.error("Create order error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
