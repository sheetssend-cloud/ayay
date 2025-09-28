"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { type CartItem, formatPrice } from "@/lib/cart"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Plus, Minus, Trash2, ShoppingBag } from "lucide-react"

interface CartDrawerProps {
  items: CartItem[]
  itemCount: number
  subtotal: number
  shipping: number
  total: number
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onRemoveItem: (itemId: string) => void
}

export function CartDrawer({
  items,
  itemCount,
  subtotal,
  shipping,
  total,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative bg-transparent">
          <ShoppingCart className="h-4 w-4 mr-2" />
          ตะกร้า
          {itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            ตะกร้าสินค้า ({itemCount} รายการ)
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">ตะกร้าสินค้าว่าง</h3>
              <p className="text-muted-foreground mb-4">เพิ่มสินค้าลงในตะกร้าเพื่อเริ่มการสั่งซื้อ</p>
              <Button onClick={() => setIsOpen(false)}>เลือกซื้อสินค้า</Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 border rounded-lg">
                    <div className="relative w-16 h-20 flex-shrink-0">
                      <Image
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2 mb-1">{item.product.name}</h4>
                      <p className="text-sm text-green-600 font-semibold mb-2">{formatPrice(item.product.price)}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 w-7 p-0 bg-transparent"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="px-2 text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 w-7 p-0 bg-transparent"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span>ยอดรวมสินค้า</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>ค่าจัดส่ง</span>
                  <span className={shipping === 0 ? "text-green-600" : ""}>
                    {shipping === 0 ? "ฟรี" : formatPrice(shipping)}
                  </span>
                </div>
                {shipping === 0 && subtotal >= 300 && <p className="text-xs text-green-600">🎉 คุณได้รับการจัดส่งฟรี!</p>}
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>ยอดรวมทั้งหมด</span>
                  <span className="text-green-600">{formatPrice(total)}</span>
                </div>

                <Link href="/checkout" onClick={() => setIsOpen(false)}>
                  <Button className="w-full" size="lg">
                    ดำเนินการสั่งซื้อ
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
