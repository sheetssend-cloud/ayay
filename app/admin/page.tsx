"use client"

import { useEffect, useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Package, ShoppingCart, TrendingUp, Users, DollarSign, Eye } from "lucide-react"
import { getAdminStats, type AdminStats } from "@/lib/admin"
import { formatPrice } from "@/lib/cart"
import Link from "next/link"

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const adminStats = await getAdminStats()
        setStats(adminStats)
      } catch (error) {
        console.error("Error loading admin stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadStats()
  }, [])

  if (isLoading) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1">
          <AdminHeader title="Dashboard" description="Overview of your store performance" />
          <div className="p-6">
            <div className="animate-pulse">Loading...</div>
          </div>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1">
          <AdminHeader title="Dashboard" description="Overview of your store performance" />
          <div className="p-6">
            <div className="text-red-500">Error loading dashboard data</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="Dashboard" description="Overview of your store performance" />

        <main className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{formatPrice(stats.totalRevenue)}</div>
                <p className="text-xs text-muted-foreground">This month: {formatPrice(stats.monthlyRevenue)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalOrders}</div>
                <p className="text-xs text-muted-foreground">{stats.pendingOrders} pending</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalProducts}</div>
                <p className="text-xs text-muted-foreground">Active products</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.5%</div>
                <p className="text-xs text-muted-foreground">+2.1% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Selling Products */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Top Selling Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stats.topSellingProducts.length > 0 ? (
                  <div className="space-y-4">
                    {stats.topSellingProducts.map((item, index) => (
                      <div key={item.product.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-muted rounded flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-sm line-clamp-1">{item.product.name}</p>
                            <p className="text-xs text-muted-foreground">{item.totalSold} sold</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm">{formatPrice(item.revenue)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">No sales data available</p>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">New order received</p>
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">Product updated</p>
                      <p className="text-xs text-muted-foreground">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">Low stock alert</p>
                      <p className="text-xs text-muted-foreground">3 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">New customer registered</p>
                      <p className="text-xs text-muted-foreground">5 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Link href="/admin/products/new">
                  <Button>
                    <Package className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </Link>
                <Link href="/admin/orders">
                  <Button variant="outline">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    View Orders
                  </Button>
                </Link>
                <Link href="/admin/analytics">
                  <Button variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    View Store
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
