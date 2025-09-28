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
import { Plus, Edit, Trash2, FolderTree, Eye, EyeOff } from "lucide-react"
import { getFromStorage, saveToStorage } from "@/lib/data-store"

interface Category {
  id: string
  name: string
  nameEn: string
  slug: string
  description: string
  parentId?: string
  isActive: boolean
  sortOrder: number
  productCount: number
  examTypes: string[]
  subjects: string[]
  createdAt: string
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    nameEn: "",
    description: "",
    parentId: "0", // Updated default value to be a non-empty string
    isActive: true,
    sortOrder: 1,
    examTypes: [] as string[],
    subjects: [] as string[],
  })

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const storedCategories = getFromStorage<Category[]>("categories", [])
        if (storedCategories.length === 0) {
          // Initialize with default categories
          const defaultCategories: Category[] = [
            {
              id: "1",
              name: "หนังสือเตรียมสอบ",
              nameEn: "Exam Preparation Books",
              slug: "exam-prep-books",
              description: "หนังสือเตรียมสอบทุกประเภท",
              isActive: true,
              sortOrder: 1,
              productCount: 45,
              examTypes: ["GAT", "PAT", "TGAT", "TPAT"],
              subjects: ["คณิตศาสตร์", "ภาษาไทย", "ภาษาอังกฤษ", "วิทยาศาสตร์"],
              createdAt: "2024-01-15",
            },
            {
              id: "2",
              name: "หนังสือดิจิทัล",
              nameEn: "Digital Books",
              slug: "digital-books",
              description: "หนังสือในรูปแบบดิจิทัล",
              isActive: true,
              sortOrder: 2,
              productCount: 28,
              examTypes: ["GAT", "PAT"],
              subjects: ["คณิตศาสตร์", "ฟิสิกส์", "เคมี"],
              createdAt: "2024-01-20",
            },
          ]
          saveToStorage("categories", defaultCategories)
          setCategories(defaultCategories)
        } else {
          setCategories(storedCategories)
        }
      } catch (error) {
        console.error("Error loading categories:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadCategories()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingCategory) {
        const updatedCategories = categories.map((cat) =>
          cat.id === editingCategory.id
            ? {
                ...editingCategory,
                ...formData,
                slug: formData.name.toLowerCase().replace(/\s+/g, "-"),
              }
            : cat,
        )
        setCategories(updatedCategories)
        saveToStorage("categories", updatedCategories)
      } else {
        const newCategory: Category = {
          id: Date.now().toString(),
          ...formData,
          slug: formData.name.toLowerCase().replace(/\s+/g, "-"),
          productCount: 0,
          createdAt: new Date().toISOString().split("T")[0],
        }
        const updatedCategories = [...categories, newCategory]
        setCategories(updatedCategories)
        saveToStorage("categories", updatedCategories)
      }
    } catch (error) {
      console.error("Error saving category:", error)
    }

    setIsDialogOpen(false)
    setEditingCategory(null)
    setFormData({
      name: "",
      nameEn: "",
      description: "",
      parentId: "0", // Updated default value to be a non-empty string
      isActive: true,
      sortOrder: 1,
      examTypes: [],
      subjects: [],
    })
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      nameEn: category.nameEn,
      description: category.description,
      parentId: category.parentId || "0", // Updated default value to be a non-empty string
      isActive: category.isActive,
      sortOrder: category.sortOrder,
      examTypes: category.examTypes,
      subjects: category.subjects,
    })
    setIsDialogOpen(true)
  }

  const toggleStatus = (id: string) => {
    const updatedCategories = categories.map((cat) => (cat.id === id ? { ...cat, isActive: !cat.isActive } : cat))
    setCategories(updatedCategories)
    saveToStorage("categories", updatedCategories)
  }

  const handleDelete = (id: string) => {
    const updatedCategories = categories.filter((cat) => cat.id !== id)
    setCategories(updatedCategories)
    saveToStorage("categories", updatedCategories)
  }

  if (isLoading) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1">
          <AdminHeader title="จัดการหมวดหมู่" description="จัดการหมวดหมู่สินค้าและการจัดกลุ่ม" />
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
        <AdminHeader title="จัดการหมวดหมู่" description="จัดการหมวดหมู่สินค้าและการจัดกลุ่ม" />

        <main className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">หมวดหมู่สินค้า</h2>
              <p className="text-muted-foreground">จัดการหมวดหมู่และการจัดกลุ่มสินค้า</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  เพิ่มหมวดหมู่
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingCategory ? "แก้ไขหมวดหมู่" : "เพิ่มหมวดหมู่ใหม่"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">ชื่อหมวดหมู่ (ไทย)</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="nameEn">ชื่อหมวดหมู่ (อังกฤษ)</Label>
                      <Input
                        id="nameEn"
                        value={formData.nameEn}
                        onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
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
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="parentId">หมวดหมู่หลัก</Label>
                      <Select
                        value={formData.parentId}
                        onValueChange={(value) => setFormData({ ...formData, parentId: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกหมวดหมู่หลัก" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">ไม่มีหมวดหมู่หลัก</SelectItem> // Updated value prop to be a non-empty string
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="sortOrder">ลำดับการแสดง</Label>
                      <Input
                        id="sortOrder"
                        type="number"
                        value={formData.sortOrder}
                        onChange={(e) => setFormData({ ...formData, sortOrder: Number.parseInt(e.target.value) })}
                        min="1"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      ยกเลิก
                    </Button>
                    <Button type="submit">{editingCategory ? "บันทึกการแก้ไข" : "เพิ่มหมวดหมู่"}</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderTree className="h-5 w-5" />
                รายการหมวดหมู่
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{category.name}</h3>
                        <Badge variant={category.isActive ? "default" : "secondary"}>
                          {category.isActive ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                        </Badge>
                        <Badge variant="outline">{category.productCount} สินค้า</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
                      <div className="flex gap-2">
                        {category.examTypes.map((type) => (
                          <Badge key={type} variant="secondary" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => toggleStatus(category.id)}>
                        {category.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(category)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(category.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
