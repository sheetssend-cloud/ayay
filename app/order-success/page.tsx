"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Download, Truck, Mail, Home } from "lucide-react"
import { type Order, formatPrice } from "@/lib/cart"

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    if (orderId) {
      const orders = JSON.parse(localStorage.getItem("orders") || "[]")
      const foundOrder = orders.find((o: Order) => o.id === orderId)
      setOrder(foundOrder)
    }
  }, [orderId])

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartItemCount={0} />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">ไม่พบคำสั่งซื้อ</h1>
          <Button onClick={() => router.push("/")}>กลับหน้าหลัก</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={0} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-green-600 mb-2">สั่งซื้อสำเร็จ!</h1>
            <p className="text-muted-foreground">ขอบคุณสำหรับการสั่งซื้อ เราได้รับคำสั่งซื้อของคุณแล้ว</p>
          </div>

          {/* Order Details */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold mb-1">หมายเลขคำสั่งซื้อ: {order.id}</h2>
                  <p className="text-sm text-muted-foreground">
                    วันที่สั่งซื้อ: {order.createdAt.toLocaleDateString("th-TH")}
                  </p>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {order.status === "confirmed" ? "ยืนยันแล้ว" : order.status}
                </Badge>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                <h3 className="font-medium">รายการสินค้า:</h3>
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <p className="font-medium text-sm">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">จำนวน: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span>ยอดรวมสินค้า</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>ค่าจัดส่ง</span>
                  <span>{order.shipping === 0 ? "ฟรี" : formatPrice(order.shipping)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>ยอดรวมทั้งหมด</span>
                  <span className="text-green-600">{formatPrice(order.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">ขั้นตอนต่อไป</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium">อีเมลยืนยัน</p>
                    <p className="text-sm text-muted-foreground">เราได้ส่งอีเมลยืนยันไปยัง {order.shippingInfo.email} แล้ว</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Download className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">E-Book</p>
                    <p className="text-sm text-muted-foreground">สำหรับสินค้าประเภท E-Book สามารถดาวน์โหลดได้ทันที</p>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      ดาวน์โหลด E-Book
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="font-medium">การจัดส่ง</p>
                    <p className="text-sm text-muted-foreground">สินค้าจะถูกจัดส่งภายใน 2-3 วันทำการ</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <Link href="/">
              <Button variant="outline">
                <Home className="h-4 w-4 mr-2" />
                กลับหน้าหลัก
              </Button>
            </Link>
            <Button onClick={() => window.print()}>พิมพ์ใบเสร็จ</Button>
          </div>
        </div>
      </main>
    </div>
  )
}
