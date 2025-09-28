"use client"

import type { Product } from "@/lib/products"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, Eye, Download, BookOpen, Package } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const formatIcon = {
    physical: <Package className="h-3 w-3" />,
    digital: <Download className="h-3 w-3" />,
    bundle: <BookOpen className="h-3 w-3" />,
  }

  const formatLabel = {
    physical: "หนังสือเล่ม",
    digital: "ดิจิทัล",
    bundle: "เล่ม + ดิจิทัล",
  }

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <Link href={`/products/${product.slug || product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && <Badge className="bg-blue-500 text-white text-xs">ใหม่</Badge>}
            {product.isBestseller && <Badge className="bg-orange-500 text-white text-xs">ขายดี</Badge>}
            {product.isFeatured && <Badge className="bg-purple-500 text-white text-xs">แนะนำ</Badge>}
            {product.originalPrice && (
              <Badge className="bg-red-500 text-white text-xs">
                ลด {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </Badge>
            )}
          </div>

          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="text-xs flex items-center gap-1">
              {formatIcon[product.format]}
              {formatLabel[product.format]}
            </Badge>
          </div>

          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="secondary" className="text-lg">
                หมดสต็อก
              </Badge>
            </div>
          )}

          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{product.rating}</span>
                <span>({product.reviewCount})</span>
              </div>
              {product.examYear && (
                <Badge variant="outline" className="text-xs">
                  {product.examYear}
                </Badge>
              )}
            </div>

            <h3 className="font-semibold text-sm leading-tight line-clamp-2 text-balance">{product.name}</h3>

            {product.targetPosition && (
              <p className="text-xs text-muted-foreground line-clamp-1">{product.targetPosition}</p>
            )}

            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-green-600">฿{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ฿{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-1">
              {product.examLevel && (
                <Badge variant="secondary" className="text-xs">
                  {product.examLevel}
                </Badge>
              )}
              {product.tags.slice(0, 1).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {product.inStock && product.stockQuantity <= 10 && (
              <p className="text-xs text-orange-600">เหลือเพียง {product.stockQuantity} เล่ม</p>
            )}
          </div>
        </CardContent>
      </Link>

      <div className="px-4 pb-4">
        <Button onClick={() => onAddToCart(product)} disabled={!product.inStock} className="w-full" size="sm">
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.inStock ? "เพิ่มลงตะกร้า" : "หมดสต็อก"}
        </Button>
      </div>
    </Card>
  )
}
