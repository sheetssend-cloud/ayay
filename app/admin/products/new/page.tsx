"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import type { ProductFormData } from "@/lib/admin"
import { useToast } from "@/hooks/use-toast"

export default function NewProduct() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    nameEn: "",
    description: "",
    price: 0,
    originalPrice: undefined,
    category: "แนวข้อสอบ",
    tags: [],
    image: "",
    inStock: true,
    features: [],
    format: "ebook",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Product created",
          description: "The product has been successfully created.",
        })
        router.push("/admin/products")
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to create product. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleTagsChange = (value: string) => {
    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
    setFormData((prev) => ({ ...prev, tags }))
  }

  const handleFeaturesChange = (value: string) => {
    const features = value
      .split("\n")
      .map((feature) => feature.trim())
      .filter(Boolean)
    setFormData((prev) => ({ ...prev, features }))
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="Add New Product" description="Create a new product for your store" />

        <main className="p-6">
          <Button variant="ghost" onClick={() => router.back()} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Information */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Product Name (Thai) *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="nameEn">Product Name (English)</Label>
                      <Input
                        id="nameEn"
                        value={formData.nameEn}
                        onChange={(e) => setFormData((prev) => ({ ...prev, nameEn: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                        rows={4}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="features">Features (one per line)</Label>
                      <Textarea
                        id="features"
                        value={formData.features.join("\n")}
                        onChange={(e) => handleFeaturesChange(e.target.value)}
                        rows={4}
                        placeholder="Enter each feature on a new line"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Pricing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="price">Price (฿) *</Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData((prev) => ({ ...prev, price: Number(e.target.value) }))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="originalPrice">Original Price (฿)</Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        value={formData.originalPrice || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            originalPrice: e.target.value ? Number(e.target.value) : undefined,
                          }))
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Category & Tags</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="แนวข้อสอบ">แนวข้อสอบ</SelectItem>
                          <SelectItem value="หนังสือเรียน">หนังสือเรียน</SelectItem>
                          <SelectItem value="คู่มือการสอบ">คู่มือการสอบ</SelectItem>
                          <SelectItem value="แบบฝึกหัด">แบบฝึกหัด</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input
                        id="tags"
                        value={formData.tags.join(", ")}
                        onChange={(e) => handleTagsChange(e.target.value)}
                        placeholder="tag1, tag2, tag3"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="format">Format *</Label>
                      <Select
                        value={formData.format}
                        onValueChange={(value: "ebook" | "physical" | "bundle") =>
                          setFormData((prev) => ({ ...prev, format: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ebook">E-Book</SelectItem>
                          <SelectItem value="physical">Physical Book</SelectItem>
                          <SelectItem value="bundle">Bundle (E-Book + Physical)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="image">Image URL</Label>
                      <Input
                        id="image"
                        value={formData.image}
                        onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="inStock"
                        checked={formData.inStock}
                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, inStock: checked as boolean }))}
                      />
                      <Label htmlFor="inStock">In Stock</Label>
                    </div>
                  </CardContent>
                </Card>

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Create Product
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
