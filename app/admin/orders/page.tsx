"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Edit, Package, Truck, CheckCircle, XCircle } from "lucide-react"
import type { Order } from "@/lib/cart"
import { updateOrderStatus } from "@/lib/admin"
import { useToast } from "@/hooks/use-toast"

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [newStatus, setNewStatus] = useState<Order["status"]>("pending")
  const [trackingNumber, setTrackingNumber] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await fetch("/api/admin/orders")
        const data = await response.json()
        if (response.ok) {
          setOrders(data.orders || [])
          setFilteredOrders(data.orders || [])
        } else {
          console.error("Error loading orders:", data.error)
        }
      } catch (error) {
        console.error("Error loading orders:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadOrders()
  }, [])

  useEffect(() => {
    let filtered = orders

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter)
    }

    setFilteredOrders(filtered)
  }, [orders, searchTerm, statusFilter])

  const handleUpdateOrder = async () => {
    if (!selectedOrder) return

    const success = await updateOrderStatus(selectedOrder.id, newStatus)

    if (success) {
      // Reload orders
      const response = await fetch("/api/admin/orders")
      const data = await response.json()
      if (response.ok) {
        setOrders(data.orders || [])
      }

      toast({
        title: "อัปเดตคำสั่งซื้อสำเร็จ",
        description: `คำสั่งซื้อ ${selectedOrder.id} ได้รับการอัปเดตแล้ว`,
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to update order. Please try again.",
        variant: "destructive",
      })
    }

    setIsUpdateDialogOpen(false)
    setSelectedOrder(null)
    setTrackingNumber("")
  }

  const openUpdateDialog = (order: Order) => {
    setSelectedOrder(order)
    setNewStatus(order.status)
    setTrackingNumber("")
    setIsUpdateDialogOpen(true)
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

  const getOrderStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-purple-100 text-purple-800"
      case "shipped":
        return "bg-indigo-100 text-indigo-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getOrderStatusText = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "รอดำเนินการ"
      case "confirmed":
        return "ยืนยันแล้ว"
      case "processing":
        return "กำลังเตรียมสินค้า"
      case "shipped":
        return "จัดส่งแล้ว"
      case "delivered":
        return "ส่งสำเร็จ"
      case "cancelled":
        return "ยกเลิก"
      default:
        return status
    }
  }

  if (isLoading) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1">
          <AdminHeader title="Orders" description="Manage all orders" />
          <div className="p-6">
            <div className="animate-pulse">Loading orders...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="จัดการคำสั่งซื้อ" description="ดูและจัดการคำสั่งซื้อทั้งหมด" />

        <main className="p-6 space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="ค้นหาด้วยรหัสคำสั่งซื้อ, ชื่อลูกค้า, หรืออีเมล"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="กรองตามสถานะ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทุกสถานะ</SelectItem>
                    <SelectItem value="pending">รอดำเนินการ</SelectItem>
                    <SelectItem value="confirmed">ยืนยันแล้ว</SelectItem>
                    <SelectItem value="processing">กำลังเตรียมสินค้า</SelectItem>
                    <SelectItem value="shipped">จัดส่งแล้ว</SelectItem>
                    <SelectItem value="delivered">ส่งสำเร็จ</SelectItem>
                    <SelectItem value="cancelled">ยกเลิก</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Orders Table */}
          <Card>
            <CardHeader>
              <CardTitle>คำสั่งซื้อทั้งหมด ({filteredOrders.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>รหัสคำสั่งซื้อ</TableHead>
                    <TableHead>ลูกค้า</TableHead>
                    <TableHead>สินค้า</TableHead>
                    <TableHead>ยอดรวม</TableHead>
                    <TableHead>สถานะ</TableHead>
                    <TableHead>วันที่สั่งซื้อ</TableHead>
                    <TableHead>การจัดการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.customerName}</p>
                          <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {order.items.map((item, index) => (
                            <div key={index} className="text-sm">
                              {item.product.name} x{item.quantity}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">฿{order.total.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={getOrderStatusColor(order.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            {getOrderStatusText(order.status)}
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(order.createdAt).toLocaleDateString("th-TH")}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => openUpdateDialog(order)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Update Order Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>อัปเดตคำสั่งซื้อ {selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="status">สถานะ</Label>
              <Select value={newStatus} onValueChange={(value) => setNewStatus(value as Order["status"])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">รอดำเนินการ</SelectItem>
                  <SelectItem value="confirmed">ยืนยันแล้ว</SelectItem>
                  <SelectItem value="processing">กำลังเตรียมสินค้า</SelectItem>
                  <SelectItem value="shipped">จัดส่งแล้ว</SelectItem>
                  <SelectItem value="delivered">ส่งสำเร็จ</SelectItem>
                  <SelectItem value="cancelled">ยกเลิก</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(newStatus === "shipped" || newStatus === "delivered") && (
              <div>
                <Label htmlFor="tracking">เลขติดตาม</Label>
                <Input
                  id="tracking"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="กรอกเลขติดตาม"
                />
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
                ยกเลิก
              </Button>
              <Button onClick={handleUpdateOrder}>อัปเดต</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
