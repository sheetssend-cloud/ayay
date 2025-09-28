"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Search, Package, Truck, CheckCircle, XCircle } from "lucide-react"
import { getOrdersByEmail, getOrderStatusColor, getOrderStatusText, type Order } from "@/lib/orders"
import Image from "next/image"
import Link from "next/link"

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [email, setEmail] = useState("")
  const [searchPerformed, setSearchPerformed] = useState(false)

  const handleSearch = () => {
    if (!email.trim()) return

    const customerOrders = getOrdersByEmail(email.trim())
    setOrders(customerOrders)
    setSearchPerformed(true)
  }

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Package className="h-4 w-4" />
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />
      case "processing":
        return <Package className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">ติดตามคำสั่งซื้อ</h1>
            <p className="text-muted-foreground">ค้นหาและติดตามสถานะคำสั่งซื้อของคุณ</p>
          </div>

          {/* Search */}
          <Card>
            <CardHeader>
              <CardTitle>ค้นหาคำสั่งซื้อ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="กรอกอีเมลที่ใช้สั่งซื้อ"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button onClick={handleSearch} disabled={!email.trim()}>
                  ค้นหา
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {searchPerformed && (
            <div className="space-y-4">
              {orders.length > 0 ? (
                <>
                  <h2 className="text-xl font-semibold">คำสั่งซื้อของคุณ ({orders.length})</h2>
                  {orders.map((order) => (
                    <Card key={order.id}>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {/* Order Header */}
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold">คำสั่งซื้อ {order.id}</h3>
                              <p className="text-sm text-muted-foreground">
                                สั่งซื้อเมื่อ{" "}
                                {new Date(order.createdAt).toLocaleDateString("th-TH", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                            <Badge className={getOrderStatusColor(order.status)}>
                              <div className="flex items-center gap-1">
                                {getStatusIcon(order.status)}
                                {getOrderStatusText(order.status)}
                              </div>
                            </Badge>
                          </div>

                          <Separator />

                          {/* Order Items */}
                          <div className="space-y-3">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex items-center gap-4">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  width={60}
                                  height={80}
                                  className="object-cover rounded"
                                />
                                <div className="flex-1">
                                  <h4 className="font-medium">{item.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    ฿{item.price.toLocaleString()} x {item.quantity}
                                  </p>
                                </div>
                                <p className="font-medium">฿{(item.price * item.quantity).toLocaleString()}</p>
                              </div>
                            ))}
                          </div>

                          <Separator />

                          {/* Order Summary */}
                          <div className="flex justify-between items-center">
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">วิธีการชำระเงิน: {order.paymentMethod}</p>
                              {order.trackingNumber && (
                                <p className="text-sm text-muted-foreground">
                                  เลขติดตาม: <span className="font-mono">{order.trackingNumber}</span>
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold">รวม: ฿{order.total.toLocaleString()}</p>
                            </div>
                          </div>

                          {/* Shipping Address */}
                          <div className="bg-muted p-4 rounded-lg">
                            <h5 className="font-medium mb-2">ที่อยู่จัดส่ง</h5>
                            <p className="text-sm">
                              {order.shippingAddress.address}
                              <br />
                              {order.shippingAddress.district} {order.shippingAddress.province}{" "}
                              {order.shippingAddress.postalCode}
                            </p>
                          </div>

                          {/* Order Status Timeline */}
                          <div className="bg-muted p-4 rounded-lg">
                            <h5 className="font-medium mb-3">สถานะการจัดส่ง</h5>
                            <div className="space-y-2">
                              <div
                                className={`flex items-center gap-2 ${["pending", "confirmed", "processing", "shipped", "delivered"].includes(order.status) ? "text-green-600" : "text-muted-foreground"}`}
                              >
                                <CheckCircle className="h-4 w-4" />
                                <span className="text-sm">ได้รับคำสั่งซื้อแล้ว</span>
                              </div>
                              <div
                                className={`flex items-center gap-2 ${["confirmed", "processing", "shipped", "delivered"].includes(order.status) ? "text-green-600" : "text-muted-foreground"}`}
                              >
                                <CheckCircle className="h-4 w-4" />
                                <span className="text-sm">ยืนยันคำสั่งซื้อแล้ว</span>
                              </div>
                              <div
                                className={`flex items-center gap-2 ${["processing", "shipped", "delivered"].includes(order.status) ? "text-green-600" : "text-muted-foreground"}`}
                              >
                                <Package className="h-4 w-4" />
                                <span className="text-sm">กำลังเตรียมสินค้า</span>
                              </div>
                              <div
                                className={`flex items-center gap-2 ${["shipped", "delivered"].includes(order.status) ? "text-green-600" : "text-muted-foreground"}`}
                              >
                                <Truck className="h-4 w-4" />
                                <span className="text-sm">จัดส่งสินค้าแล้ว</span>
                              </div>
                              <div
                                className={`flex items-center gap-2 ${order.status === "delivered" ? "text-green-600" : "text-muted-foreground"}`}
                              >
                                <CheckCircle className="h-4 w-4" />
                                <span className="text-sm">ส่งสินค้าสำเร็จ</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">ไม่พบคำสั่งซื้อ</h3>
                    <p className="text-muted-foreground mb-4">ไม่พบคำสั่งซื้อสำหรับอีเมล {email}</p>
                    <Link href="/">
                      <Button>เลือกซื้อสินค้า</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
