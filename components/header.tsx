"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CartDrawer } from "@/components/cart-drawer"
import { useCart } from "@/hooks/use-cart"
import { User, Menu, Phone, Mail, Package } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface HeaderProps {
  cartItemCount?: number
}

export function Header({ cartItemCount }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const cart = useCart()

  return (
    <header className="border-b bg-background">
      {/* Top bar */}
      <div className="bg-blue-900 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>Tel: 085-5555555</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>Line: @opensheets</span>
            </div>
          </div>
          <div className="hidden md:block">แหล่งรวมแนวข้อสอบ ชาวข้าราชการ 1 ในประเทศ</div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-green-600 text-white p-2 rounded-lg">
              <span className="font-bold text-xl">O</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-600">OPEN SHEETS</h1>
              <p className="text-sm text-muted-foreground">แหล่งรวมแนวข้อสอบ</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-green-600 transition-colors">
              หน้าหลัก
            </Link>
            <Link href="/products" className="hover:text-green-600 transition-colors">
              สินค้าทั้งหมด
            </Link>
            <Link href="/categories" className="hover:text-green-600 transition-colors">
              หมวดหมู่
            </Link>
            <Link href="/orders" className="hover:text-green-600 transition-colors">
              ติดตามคำสั่งซื้อ
            </Link>
            <Link href="/about" className="hover:text-green-600 transition-colors">
              เกี่ยวกับเรา
            </Link>
            <Link href="/contact" className="hover:text-green-600 transition-colors">
              ติดต่อเรา
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              เข้าสู่ระบบ
            </Button>

            <CartDrawer
              items={cart.items}
              itemCount={cart.getItemCount()}
              subtotal={cart.subtotal}
              shipping={cart.shipping}
              total={cart.total}
              onUpdateQuantity={cart.updateQuantity}
              onRemoveItem={cart.removeItem}
            />

            {/* Mobile menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    หน้าหลัก
                  </Link>
                  <Link href="/products" onClick={() => setIsMenuOpen(false)}>
                    สินค้าทั้งหมด
                  </Link>
                  <Link href="/categories" onClick={() => setIsMenuOpen(false)}>
                    หมวดหมู่
                  </Link>
                  <Link href="/orders" onClick={() => setIsMenuOpen(false)}>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      ติดตามคำสั่งซื้อ
                    </div>
                  </Link>
                  <Link href="/about" onClick={() => setIsMenuOpen(false)}>
                    เกี่ยวกับเรา
                  </Link>
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                    ติดต่อเรา
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
