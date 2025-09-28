import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser, requireAdmin } from "@/lib/auth"
import { getOrders, updateOrderStatus } from "@/lib/data-store"

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!requireAdmin(user)) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const orders = getOrders()
    return NextResponse.json({ orders })
  } catch (error) {
    console.error("Get orders error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!requireAdmin(user)) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const { orderId, status } = await request.json()
    const success = updateOrderStatus(orderId, status)

    if (!success) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Update order error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
