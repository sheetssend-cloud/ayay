"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { products } from "@/lib/products"
import { Header } from "@/components/header"
import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  ArrowLeft,
  Check,
  Truck,
  Shield,
  BookOpen,
  Download,
  Package,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const cart = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [showFullDescription, setShowFullDescription] = useState(false)

  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">ไม่พบสินค้าที่ต้องการ</h1>
          <Button onClick={() => router.push("/")}>กลับหน้าหลัก</Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    cart.addItem(product, quantity)
    toast({
      title: "เพิ่มสินค้าลงตะกร้าแล้ว",
      description: `${product.name} จำนวน ${quantity} รายการ`,
    })
  }

  const formatType = {
    ebook: "E-Book",
    physical: "หนังสือเล่ม",
    bundle: "E-Book + หนังสือเล่ม",
  }

  // Sample images for gallery
  const sampleImages = [
    product.image,
    "/placeholder.svg?height=600&width=400&text=หน้าตัวอย่าง 1",
    "/placeholder.svg?height=600&width=400&text=หน้าตัวอย่าง 2",
    "/placeholder.svg?height=600&width=400&text=สารบัญ",
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">
            หน้าหลัก
          </Link>
          <span>/</span>
          <Link href="/" className="hover:text-foreground">
            สินค้าทั้งหมด
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          กลับ
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] relative overflow-hidden rounded-lg border">
              <Image
                src={sampleImages[selectedImage] || product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.originalPrice && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                  ลด {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </Badge>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="secondary" className="text-lg">
                    หมดสต็อก
                  </Badge>
                </div>
              )}
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {sampleImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square relative overflow-hidden rounded border-2 transition-colors ${
                    selectedImage === index ? "border-green-500" : "border-border hover:border-green-300"
                  }`}
                >
                  <Image src={image || "/placeholder.svg"} alt={`ตัวอย่าง ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-balance">{product.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">{product.nameEn}</p>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-medium">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">({product.reviewCount} รีวิว)</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="bg-green-50 p-6 rounded-lg border">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-green-600">฿{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ฿{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">รูปแบบ: {formatType[product.format]}</span>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm">จำนวน:</span>
                  <div className="flex items-center border rounded">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                    <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)}>
                      +
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAddToCart} disabled={!product.inStock} className="flex-1" size="lg">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {product.inStock ? "เพิ่มลงตะกร้า" : "หมดสต็อก"}
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Delivery Info */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">จัดส่งฟรี</p>
                      <p className="text-sm text-muted-foreground">สำหรับคำสั่งซื้อมากกว่า ฿300</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Download className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">E-Book ทันที</p>
                      <p className="text-sm text-muted-foreground">ดาวน์โหลดได้ทันทีหลังชำระเงิน</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">รับประกันคุณภาพ</p>
                      <p className="text-sm text-muted-foreground">คืนเงิน 100% หากไม่พอใจ</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-12 space-y-8">
          <Separator />

          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold mb-4">รายละเอียดสินค้า</h2>
            <div className="space-y-4">
              <p className={`text-muted-foreground leading-relaxed ${!showFullDescription ? "line-clamp-3" : ""}`}>
                {product.description}
              </p>
              <Button
                variant="ghost"
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-green-600 hover:text-green-700 p-0 h-auto"
              >
                {showFullDescription ? "ดูน้อยลง" : "ดูเพิ่มเติม"}
              </Button>
            </div>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-2xl font-bold mb-4">เนื้อหาที่ครอบคลุม</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div>
            <h2 className="text-2xl font-bold mb-4">ข้อมูลจำเพาะ</h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">รูปแบบ:</span>
                      <span className="font-medium">{formatType[product.format]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">หมวดหมู่:</span>
                      <span className="font-medium">{product.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">จำนวนหน้า:</span>
                      <span className="font-medium">350+ หน้า</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ภาษา:</span>
                      <span className="font-medium">ไทย</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ปีที่พิมพ์:</span>
                      <span className="font-medium">2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">สถานะ:</span>
                      <span className={`font-medium ${product.inStock ? "text-green-600" : "text-red-600"}`}>
                        {product.inStock ? "มีสินค้า" : "หมดสต็อก"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sample Content */}
          <div>
            <h2 className="text-2xl font-bold mb-4">ตัวอย่างเนื้อหา</h2>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold">บทที่ 1: หลักการพื้นฐาน</h3>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">ตัวอย่างข้อสอบ:</p>
                  <p className="mb-3">1. หลักการบริหารงานภาครัฐที่เน้นการมีส่วนร่วมของประชาชน คือข้อใด?</p>
                  <div className="space-y-1 text-sm">
                    <p>ก. การบริหารแบบราชการ</p>
                    <p>ข. การบริหารกิจการบ้านเมืองที่ดี</p>
                    <p>ค. การบริหารแบบเผด็จการ</p>
                    <p>ง. การบริหารแบบทหาร</p>
                  </div>
                  <p className="text-green-600 font-medium mt-3 text-sm">เฉลย: ข. การบริหารกิจการบ้านเมืองที่ดี</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Related Products */}
          <div>
            <h2 className="text-2xl font-bold mb-6">สินค้าที่เกี่ยวข้อง</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products
                .filter((p) => p.id !== product.id && p.category === product.category)
                .slice(0, 4)
                .map((relatedProduct) => (
                  <Card key={relatedProduct.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                    <Link href={`/products/${relatedProduct.id}`}>
                      <div className="aspect-[3/4] relative overflow-hidden">
                        <Image
                          src={relatedProduct.image || "/placeholder.svg"}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-sm line-clamp-2 mb-2">{relatedProduct.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-green-600">฿{relatedProduct.price.toLocaleString()}</span>
                          {relatedProduct.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ฿{relatedProduct.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
