"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import type { Product } from "@/lib/products"
import { deleteProduct } from "@/lib/admin"
import { formatPrice } from "@/lib/cart"
import { useToast } from "@/hooks/use-toast"

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch("/api/admin/products")
        const data = await response.json()
        if (response.ok) {
          setProducts(data.products || [])
        } else {
          console.error("Error loading products:", data.error)
        }
      } catch (error) {
        console.error("Error loading products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [])

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDeleteProduct = async (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const success = await deleteProduct(productId)
      if (success) {
        setProducts((prev) => prev.filter((p) => p.id !== productId))
        toast({
          title: "Product deleted",
          description: "The product has been successfully deleted.",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to delete product. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1">
          <AdminHeader title="Products" description="Manage your product catalog" />
          <div className="p-6">
            <div className="animate-pulse">Loading products...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="Products" description="Manage your product catalog" />

        <main className="p-6 space-y-6">
          {/* Header Actions */}
          <div className="flex justify-between items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
            <Link href="/admin/products/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </Link>
          </div>

          {/* Products Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16"></TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="w-16"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="relative w-12 h-16">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium line-clamp-1">{product.name}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">{product.nameEn}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-semibold">{formatPrice(product.price)}</p>
                          {product.originalPrice && (
                            <p className="text-sm text-muted-foreground line-through">
                              {formatPrice(product.originalPrice)}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.inStock ? "default" : "destructive"}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="text-sm">{product.rating}</span>
                          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/products/${product.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/products/${product.id}/edit`}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteProduct(product.id)} className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No products found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
