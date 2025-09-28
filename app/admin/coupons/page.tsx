"use client"

import type React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Ticket, Copy, Calendar } from "lucide-react"
import { formatPrice } from "@/lib/cart"
import { getFromStorage, saveToStorage } from "@/lib/data-store"

interface Coupon {
  id: string
  code: string
  name: string
  description: string
  type: "percentage" | "fixed" | "free_shipping"
  value: number
  minOrderAmount: number
  maxDiscount?: number
  usageLimit: number
  usedCount: number
  isActive: boolean
  startDate: string
  endDate: string
  applicableProducts: string[]
  applicableCategories: string[]
  createdAt: string
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null)
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    type: "percentage" as const,
    value: 0,
    minOrderAmount: 0,
    maxDiscount: 0,
    usageLimit: 100,
    isActive: true,
    startDate: "",
    endDate: "",
  })

  useEffect(() => {
    const loadCoupons = async () => {
      try {
        const storedCoupons = getFromStorage<Coupon[]>("coupons", [])
        if (storedCoupons.length === 0) {
          const defaultCoupons: Coupon[] = [
            {
              id: "1",
              code: "WELCOME10",
              name: "ส่วนลดสำหรับสมาชิกใหม่",
              description: "ส่วนลด 10% สำหรับการสั่งซื้อครั้งแรก",
              type: "percentage",
              value: 10,
              minOrderAmount: 500,
              maxDiscount: 200,
              usageLimit: 100,
              usedCount: 25,
              isActive: true,
              startDate: "2024-01-01",
              endDate: "2024-12-31",
              applicableProducts: [],
              applicableCategories: [],
              createdAt: "2024-01-15",
            },
            {
              id: "2",
              code: "FREESHIP",
              name: "ฟรีค่าจัดส่ง",
              description: "ฟรีค่าจัดส่งสำหรับคำสั่งซื้อขั้นต่ำ 1000 บาท",
              type: "free_shipping",
              value: 0,
              minOrderAmount: 1000,
              usageLimit: 50,
              usedCount: 12,
              isActive: true,
              startDate: "2024-01-01",
              endDate: "2024-06-30",
              applicableProducts: [],
              applicableCategories: [],
              createdAt: "2024-01-20",
            },
          ]
          saveToStorage("coupons", defaultCoupons)
          setCoupons(defaultCoupons)
        } else {
          setCoupons(storedCoupons)
        }
      } catch (error) {
        console.error("Error loading coupons:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadCoupons()
  }, [])

  const generateCouponCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setFormData({ ...formData, code: result })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingCoupon) {
        const updatedCoupons = coupons.map((coupon) =>
          coupon.id === editingCoupon.id
            ? {
                ...editingCoupon,
                ...formData,
              }
            : coupon,
        )
        setCoupons(updatedCoupons)
        saveToStorage("coupons", updatedCoupons)
      } else {
        const newCoupon: Coupon = {
          id: Date.now().toString(),
          ...formData,
          usedCount: 0,
          applicableProducts: [],
          applicableCategories: [],
          createdAt: new Date().toISOString().split("T")[0],
        }
        const updatedCoupons = [...coupons, newCoupon]
        setCoupons(updatedCoupons)
        saveToStorage("coupons", updatedCoupons)
      }
    } catch (error) {
      console.error("Error saving coupon:", error)
    }
    setIsDialogOpen(false)
    setEditingCoupon(null)
    setFormData({
      code: "",
      name: "",
      description: "",
      type: "percentage",
      value: 0,
      minOrderAmount: 0,
      maxDiscount: 0,
      usageLimit: 100,
      isActive: true,
      startDate: "",
      endDate: "",
    })
  }

  const toggleStatus = (id: string) => {
    const updatedCoupons = coupons.map((coupon) =>
      coupon.id === id ? { ...coupon, isActive: !coupon.isActive } : coupon,
    )
    setCoupons(updatedCoupons)
    saveToStorage("coupons", updatedCoupons)
  }

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
  }

  const handleEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon)
    setFormData({
      code: coupon.code,
      name: coupon.name,
      description: coupon.description,
      type: coupon.type,
      value: coupon.value,
      minOrderAmount: coupon.minOrderAmount,
      maxDiscount: coupon.maxDiscount || 0,
      usageLimit: coupon.usageLimit,
      isActive: coupon.isActive,
      startDate: coupon.startDate,
      endDate: coupon.endDate,
    })
    setIsDialogOpen(true)
  }

  if (isLoading) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1">
          <AdminHeader title="จัดการคูปอง" description="สร้างและจัดการคูปองส่วนลด" />
          <main className="p-6">
            <div className="text-center">กำลังโหลด...</div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="จัดการคูปอง" description="สร้างและจัดการคูปองส่วนลด" />

        <main className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">คูปองส่วนลด</h2>
              <p className="text-muted-foreground">สร้างและจัดการคูปองส่วนลดสำหรับลูกค้า</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  สร้างคูปอง
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingCoupon ? "แก้ไขคูปอง" : "สร้างคูปองใหม่"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="code">รหัสคูปอง</Label>
                      <div className="flex gap-2">
                        <Input
                          id="code"
                          value={formData.code}
                          onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                          placeholder="COUPON2024"
                          required
                        />
                        <Button type="button" variant="outline" onClick={generateCouponCode}>
                          สุ่ม
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="name">ชื่อคูปอง</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">คำอธิบาย</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={2}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="type">ประเภทส่วนลด</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value: any) => setFormData({ ...formData, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">เปอร์เซ็นต์</SelectItem>
                          <SelectItem value="fixed">จำนวนเงินคงที่</SelectItem>
                          <SelectItem value="free_shipping">ฟรีค่าจัดส่ง</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="value">
                        {formData.type === "percentage"
                          ? "เปอร์เซ็นต์ส่วนลด"
                          : formData.type === "fixed"
                            ? "จำนวนเงินส่วนลด"
                            : "ค่า"}
                      </Label>
                      <Input
                        id="value"
                        type="number"
                        value={formData.value}
                        onChange={(e) => setFormData({ ...formData, value: Number.parseFloat(e.target.value) })}
                        min="0"
                        disabled={formData.type === "free_shipping"}
                      />
                    </div>
                    <div>
                      <Label htmlFor="usageLimit">จำนวนครั้งที่ใช้ได้</Label>
                      <Input
                        id="usageLimit"
                        type="number"
                        value={formData.usageLimit}
                        onChange={(e) => setFormData({ ...formData, usageLimit: Number.parseInt(e.target.value) })}
                        min="1"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="minOrderAmount">ยอดสั่งซื้อขั้นต่ำ (บาท)</Label>
                      <Input
                        id="minOrderAmount"
                        type="number"
                        value={formData.minOrderAmount}
                        onChange={(e) =>
                          setFormData({ ...formData, minOrderAmount: Number.parseFloat(e.target.value) })
                        }
                        min="0"
                      />
                    </div>
                    {formData.type === "percentage" && (
                      <div>
                        <Label htmlFor="maxDiscount">ส่วนลดสูงสุด (บาท)</Label>
                        <Input
                          id="maxDiscount"
                          type="number"
                          value={formData.maxDiscount}
                          onChange={(e) => setFormData({ ...formData, maxDiscount: Number.parseFloat(e.target.value) })}
                          min="0"
                        />
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">วันที่เริ่มต้น</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">วันที่สิ้นสุด</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                    />
                    <Label htmlFor="isActive">เปิดใช้งานทันที</Label>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      ยกเลิก
                    </Button>
                    <Button type="submit">{editingCoupon ? "บันทึกการแก้ไข" : "สร้างคูปอง"}</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coupons.map((coupon) => (
              <Card key={coupon.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Ticket className="h-5 w-5" />
                      {coupon.name}
                    </CardTitle>
                    <Badge variant={coupon.isActive ? "default" : "secondary"}>
                      {coupon.isActive ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <code className="font-mono font-bold text-lg">{coupon.code}</code>
                    <Button variant="ghost" size="sm" onClick={() => copyCode(coupon.code)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{coupon.description}</p>

                    <div className="flex items-center justify-between text-sm">
                      <span>ประเภท:</span>
                      <Badge variant="outline">
                        {coupon.type === "percentage"
                          ? `${coupon.value}%`
                          : coupon.type === "fixed"
                            ? formatPrice(coupon.value)
                            : "ฟรีค่าจัดส่ง"}
                      </Badge>
                    </div>

                    {coupon.minOrderAmount > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span>ยอดขั้นต่ำ:</span>
                        <span>{formatPrice(coupon.minOrderAmount)}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      <span>การใช้งาน:</span>
                      <span>
                        {coupon.usedCount}/{coupon.usageLimit}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span>วันหมดอายุ:</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(coupon.endDate).toLocaleDateString("th-TH")}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => handleEdit(coupon)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      แก้ไข
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => toggleStatus(coupon.id)}>
                      {coupon.isActive ? "ปิด" : "เปิด"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
