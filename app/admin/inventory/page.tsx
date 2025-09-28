"use client"

import { useState, useEffect } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Package, Search, Download, Upload, TrendingDown } from "lucide-react"
import { formatPrice } from "@/lib/cart"
import { getFromStorage, saveToStorage } from "@/lib/data-store"

interface InventoryItem {
  id: string
  productId: string
  productName: string
  sku: string
  currentStock: number
  reservedStock: number
  availableStock: number
  lowStockThreshold: number
  costPrice: number
  sellPrice: number
  lastRestocked: string
  supplier: string
  location: string
  status: "in_stock" | "low_stock" | "out_of_stock"
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    const loadInventory = async () => {
      try {
        const storedInventory = getFromStorage<InventoryItem[]>("inventory", [])
        if (storedInventory.length === 0) {
          // Initialize with default inventory
          const defaultInventory: InventoryItem[] = [
            {
              id: "1",
              productId: "prod-1",
              productName: "หนังสือเตรียมสอบ GAT คณิตศาสตร์",
              sku: "GAT-MATH-001",
              currentStock: 45,
              reservedStock: 5,
              availableStock: 40,
              lowStockThreshold: 10,
              costPrice: 180,
              sellPrice: 250,
              lastRestocked: "2024-01-15",
              supplier: "สำนักพิมพ์การศึกษา",
              location: "A-01-15",
              status: "in_stock",
            },
            {
              id: "2",
              productId: "prod-2",
              productName: "หนังสือเตรียมสอบ PAT ฟิสิกส์",
              sku: "PAT-PHY-001",
              currentStock: 8,
              reservedStock: 2,
              availableStock: 6,
              lowStockThreshold: 10,
              costPrice: 200,
              sellPrice: 280,
              lastRestocked: "2024-01-10",
              supplier: "สำนักพิมพ์วิทยาศาสตร์",
              location: "B-02-08",
              status: "low_stock",
            },
            {
              id: "3",
              productId: "prod-3",
              productName: "หนังสือเตรียมสอบ TGAT ภาษาไทย",
              sku: "TGAT-TH-001",
              currentStock: 0,
              reservedStock: 0,
              availableStock: 0,
              lowStockThreshold: 15,
              costPrice: 160,
              sellPrice: 220,
              lastRestocked: "2023-12-20",
              supplier: "สำนักพิมพ์ภาษาไทย",
              location: "C-01-12",
              status: "out_of_stock",
            },
          ]
          saveToStorage("inventory", defaultInventory)
          setInventory(defaultInventory)
        } else {
          setInventory(storedInventory)
        }
      } catch (error) {
        console.error("Error loading inventory:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadInventory()
  }, [])

  if (isLoading) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1">
          <AdminHeader title="จัดการคลังสินค้า" description="ติดตามและจัดการสต็อกสินค้า" />
          <main className="p-6">
            <div className="text-center">กำลังโหลด...</div>
          </main>
        </div>
      </div>
    )
  }

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_stock":
        return <Badge className="bg-green-100 text-green-800">มีสินค้า</Badge>
      case "low_stock":
        return <Badge className="bg-yellow-100 text-yellow-800">สินค้าใกล้หมด</Badge>
      case "out_of_stock":
        return <Badge className="bg-red-100 text-red-800">สินค้าหมด</Badge>
      default:
        return <Badge variant="secondary">ไม่ทราบสถานะ</Badge>
    }
  }

  const totalValue = inventory.reduce((sum, item) => sum + item.currentStock * item.costPrice, 0)
  const lowStockItems = inventory.filter((item) => item.status === "low_stock").length
  const outOfStockItems = inventory.filter((item) => item.status === "out_of_stock").length

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="จัดการคลังสินค้า" description="ติดตามและจัดการสต็อกสินค้า" />

        <main className="p-6 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">มูลค่าคลังสินค้า</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{formatPrice(totalValue)}</div>
                <p className="text-xs text-muted-foreground">ราคาทุนรวม</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">รายการสินค้า</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{inventory.length}</div>
                <p className="text-xs text-muted-foreground">รายการทั้งหมด</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">สินค้าใกล้หมด</CardTitle>
                <TrendingDown className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{lowStockItems}</div>
                <p className="text-xs text-muted-foreground">รายการ</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">สินค้าหมด</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{outOfStockItems}</div>
                <p className="text-xs text-muted-foreground">รายการ</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Actions */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="ค้นหาสินค้า หรือ SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="กรองตามสถานะ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="in_stock">มีสินค้า</SelectItem>
                  <SelectItem value="low_stock">สินค้าใกล้หมด</SelectItem>
                  <SelectItem value="out_of_stock">สินค้าหมด</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                นำเข้าข้อมูล
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                ส่งออกข้อมูล
              </Button>
            </div>
          </div>

          {/* Inventory Table */}
          <Card>
            <CardHeader>
              <CardTitle>รายการคลังสินค้า</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">สินค้า</th>
                      <th className="text-left p-4">SKU</th>
                      <th className="text-center p-4">สต็อกปัจจุบัน</th>
                      <th className="text-center p-4">สต็อกจอง</th>
                      <th className="text-center p-4">สต็อกพร้อมขาย</th>
                      <th className="text-center p-4">สถานะ</th>
                      <th className="text-right p-4">ราคาทุน</th>
                      <th className="text-right p-4">ราคาขาย</th>
                      <th className="text-center p-4">ตำแหน่ง</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventory.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <div>
                            <p className="font-medium">{item.productName}</p>
                            <p className="text-sm text-muted-foreground">{item.supplier}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <code className="bg-muted px-2 py-1 rounded text-sm">{item.sku}</code>
                        </td>
                        <td className="text-center p-4">
                          <span className="font-semibold">{item.currentStock}</span>
                        </td>
                        <td className="text-center p-4">
                          <span className="text-muted-foreground">{item.reservedStock}</span>
                        </td>
                        <td className="text-center p-4">
                          <span
                            className={`font-semibold ${
                              item.availableStock <= item.lowStockThreshold ? "text-red-600" : "text-green-600"
                            }`}
                          >
                            {item.availableStock}
                          </span>
                        </td>
                        <td className="text-center p-4">{getStatusBadge(item.status)}</td>
                        <td className="text-right p-4">{formatPrice(item.costPrice)}</td>
                        <td className="text-right p-4">{formatPrice(item.sellPrice)}</td>
                        <td className="text-center p-4">
                          <code className="text-xs bg-muted px-2 py-1 rounded">{item.location}</code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
