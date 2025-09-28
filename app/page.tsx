"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { SearchBar } from "@/components/search-bar"
import { ProductCard } from "@/components/product-card"
import { products, type Product } from "@/lib/products"
import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Award, Users, Truck, Phone, Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด")
  const { toast } = useToast()
  const cart = useCart()

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "ทั้งหมด" || product.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const handleAddToCart = (product: Product) => {
    cart.addItem(product)
    toast({
      title: "เพิ่มสินค้าลงตะกร้าแล้ว",
      description: `${product.name} ถูกเพิ่มลงในตะกร้าสินค้าแล้ว`,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-green-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">แหล่งรวมแนวข้อสอบ</h1>
          <p className="text-xl md:text-2xl mb-8 text-balance">ชาวข้าราชการ อันดับ 1 ในประเทศ</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              <span>แนวข้อสอบครบถ้วน</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              <span>คุณภาพมาตรฐาน</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>ผู้ใช้งานกว่า 10,000 คน</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              <span>จัดส่งทั่วประเทศ</span>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <SearchBar
            onSearch={setSearchQuery}
            onCategoryChange={setSelectedCategory}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">สินค้าทั้งหมด</h2>
            <Badge variant="secondary">{filteredProducts.length} รายการ</Badge>
          </div>

          {searchQuery && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">ผลการค้นหา:</span>
              <Badge variant="outline">{searchQuery}</Badge>
              <Button variant="ghost" size="sm" onClick={() => setSearchQuery("")}>
                ล้าง
              </Button>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">ไม่พบสินค้าที่ค้นหา</h3>
            <p className="text-muted-foreground mb-4">ลองเปลี่ยนคำค้นหาหรือหมวดหมู่ใหม่</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("ทั้งหมด")
              }}
            >
              แสดงสินค้าทั้งหมด
            </Button>
          </div>
        )}

        {/* Features Section */}
        <section className="mt-16 py-12 bg-muted/30 rounded-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">ทำไมต้องเลือกเรา</h2>
            <p className="text-muted-foreground">เราคือผู้นำด้านแนวข้อสอบข้าราชการในประเทศไทย</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 px-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">แนวข้อสอบครบถ้วน</h3>
              <p className="text-sm text-muted-foreground">รวบรวมแนวข้อสอบทุกตำแหน่ง ทุกระดับ อัพเดทใหม่ล่าสุด</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">คุณภาพมาตรฐาน</h3>
              <p className="text-sm text-muted-foreground">จัดทำโดยผู้เชี่ยวชาญ ตรวจสอบความถูกต้อง พร้อมเฉลยละเอียด</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">จัดส่งรวดเร็ว</h3>
              <p className="text-sm text-muted-foreground">จัดส่งทั่วประเทศ ได้รับภายใน 2-3 วัน พร้อม e-book ทันที</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-green-600 text-white p-2 rounded-lg">
                  <span className="font-bold text-xl">O</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">OPEN SHEETS</h3>
                </div>
              </div>
              <p className="text-sm text-gray-400">แหล่งรวมแนวข้อสอบข้าราชการ อันดับ 1 ในประเทศไทย</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">หมวดหมู่สินค้า</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    แนวข้อสอบ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    หนังสือเรียน
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    คู่มือการสอบ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    แบบฝึกหัด
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">บริการ</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    วิธีการสั่งซื้อ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    การจัดส่ง
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    การคืนสินค้า
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    ติดต่อเรา
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">ติดต่อเรา</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>085-5555555</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Line: @opensheets</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 OPEN SHEETS. สงวนลิขสิทธิ์.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
