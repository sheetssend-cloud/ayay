import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser, requireAdmin } from "@/lib/auth"
import { getCoupons, addCoupon, type Coupon } from "@/lib/data-store"

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!requireAdmin(user)) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const coupons = getCoupons()
    return NextResponse.json({ coupons })
  } catch (error) {
    console.error("Get coupons error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!requireAdmin(user)) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const couponData = await request.json()

    const newCoupon: Coupon = {
      id: crypto.randomUUID(),
      ...couponData,
      usageCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    addCoupon(newCoupon)
    return NextResponse.json({ coupon: newCoupon }, { status: 201 })
  } catch (error) {
    console.error("Create coupon error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
