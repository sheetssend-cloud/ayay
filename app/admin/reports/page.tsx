"use client"

import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileBarChart, Download, Calendar, TrendingUp, ShoppingCart, Users, Package } from "lucide-react"
import { formatPrice } from "@/lib/cart"
import { getFromStorage } from "@/lib/data-store"

interface ReportData {
  period: string
  revenue: number
  orders: number
  customers: number
  products: number
  avgOrderValue: number
  conversionRate: number
}

export default function ReportsPage() {
  const [reportType, setReportType] = useState("sales")
  const [dateRange, setDateRange] = useState("month")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [reportData, setReportData] = useState<ReportData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadReportData = async () => {
      try {
        const orders = getFromStorage("orders", [])
        const products = getFromStorage("products", [])

        // Generate report data based on actual orders
        const currentMonth = new Date().toISOString().slice(0, 7)
        const previousMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().slice(0, 7)

        const currentMonthOrders = orders.filter((order: any) => order.createdAt?.startsWith(currentMonth))
        const previousMonthOrders = orders.filter((order: any) => order.createdAt?.startsWith(previousMonth))

        const currentData: ReportData = {
          period: currentMonth,
          revenue: currentMonthOrders.reduce((sum: number, order: any) => sum + (order.total || 0), 0),
          orders: currentMonthOrders.length,
          customers: new Set(currentMonthOrders.map((order: any) => order.customerEmail)).size,
          products: products.length,
          avgOrderValue:
            currentMonthOrders.length > 0
              ? currentMonthOrders.reduce((sum: number, order: any) => sum + (order.total || 0), 0) /
                currentMonthOrders.length
              : 0,
          conversionRate: 12.5, // This would be calculated from analytics data
        }

        const previousData: ReportData = {
          period: previousMonth,
          revenue: previousMonthOrders.reduce((sum: number, order: any) => sum + (order.total || 0), 0),
          orders: previousMonthOrders.length,
          customers: new Set(previousMonthOrders.map((order: any) => order.customerEmail)).size,
          products: products.length,
          avgOrderValue:
            previousMonthOrders.length > 0
              ? previousMonthOrders.reduce((sum: number, order: any) => sum + (order.total || 0), 0) /
                previousMonthOrders.length
              : 0,
          conversionRate: 11.8,
        }

        setReportData([previousData, currentData])
      } catch (error) {
        console.error("Error loading report data:", error)
        // Fallback to default data if there's an error
        setReportData([
          {
            period: "2024-02",
            revenue: 142000,
            orders: 102,
            customers: 78,
            products: 162,
            avgOrderValue: 1392,
            conversionRate: 13.2,
          },
          {
            period: "2024-03",
            revenue: 158000,
            orders: 118,
            customers: 89,
            products: 168,
            avgOrderValue: 1339,
            conversionRate: 14.1,
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }
    loadReportData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1">
          <AdminHeader title="รายงาน" description="รายงานและสถิติการขาย" />
          <main className="p-6">
            <div className="text-center">กำลังโหลดข้อมูลรายงาน...</div>
          </main>
        </div>
      </div>
    )
  }

  const currentData = reportData[reportData.length - 1]
  const previousData = reportData[reportData.length - 2]

  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return "0.0"
    return (((current - previous) / previous) * 100).toFixed(1)
  }

  const generateReport = () => {
    // Implementation for generating report
    console.log("Generating report:", { reportType, dateRange, startDate, endDate })
  }

  const exportReport = (format: string) => {
    // Implementation for exporting report
    console.log("Exporting report as:", format)
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="รายงาน" description="รายงานและสถิติการขาย" />

        <main className="p-6 space-y-6">
          {/* Report Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileBarChart className="h-5 w-5" />
                สร้างรายงาน
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <Label htmlFor="reportType">ประเภทรายงาน</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">รายงานการขาย</SelectItem>
                      <SelectItem value="products">รายงานสินค้า</SelectItem>
                      <SelectItem value="customers">รายงานลูกค้า</SelectItem>
                      <SelectItem value="inventory">รายงานคลังสินค้า</SelectItem>
                      <SelectItem value="financial">รายงานการเงิน</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dateRange">ช่วงเวลา</Label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">วันนี้</SelectItem>
                      <SelectItem value="week">สัปดาห์นี้</SelectItem>
                      <SelectItem value="month">เดือนนี้</SelectItem>
                      <SelectItem value="quarter">ไตรมาสนี้</SelectItem>
                      <SelectItem value="year">ปีนี้</SelectItem>
                      <SelectItem value="custom">กำหนดเอง</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {dateRange === "custom" && (
                  <>
                    <div>
                      <Label htmlFor="startDate">วันที่เริ่มต้น</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">วันที่สิ้นสุด</Label>
                      <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                  </>
                )}
              </div>
              <div className="flex gap-2">
                <Button onClick={generateReport}>
                  <Calendar className="h-4 w-4 mr-2" />
                  สร้างรายงาน
                </Button>
                <Button variant="outline" onClick={() => exportReport("pdf")}>
                  <Download className="h-4 w-4 mr-2" />
                  ส่งออก PDF
                </Button>
                <Button variant="outline" onClick={() => exportReport("excel")}>
                  <Download className="h-4 w-4 mr-2" />
                  ส่งออก Excel
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ยอดขายรวม</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{formatPrice(currentData.revenue)}</div>
                <p className="text-xs text-muted-foreground">
                  +{calculateGrowth(currentData.revenue, previousData.revenue)}% จากเดือนที่แล้ว
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">จำนวนคำสั่งซื้อ</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.orders}</div>
                <p className="text-xs text-muted-foreground">
                  +{calculateGrowth(currentData.orders, previousData.orders)}% จากเดือนที่แล้ว
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ลูกค้าใหม่</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.customers}</div>
                <p className="text-xs text-muted-foreground">
                  +{calculateGrowth(currentData.customers, previousData.customers)}% จากเดือนที่แล้ว
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ยอดเฉลี่ยต่อคำสั่งซื้อ</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatPrice(currentData.avgOrderValue)}</div>
                <p className="text-xs text-muted-foreground">
                  {calculateGrowth(currentData.avgOrderValue, previousData.avgOrderValue)}% จากเดือนที่แล้ว
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sales Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle>แนวโน้มยอดขาย</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                <div className="text-center">
                  <FileBarChart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">กราฟแนวโน้มยอดขายจะแสดงที่นี่</p>
                  <p className="text-sm text-muted-foreground mt-2">ใช้ไลบรารี Chart.js หรือ Recharts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Products Report */}
          <Card>
            <CardHeader>
              <CardTitle>สินค้าขายดี Top 10</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">อันดับ</th>
                      <th className="text-left p-4">ชื่อสินค้า</th>
                      <th className="text-center p-4">จำนวนขาย</th>
                      <th className="text-right p-4">ยอดขาย</th>
                      <th className="text-center p-4">เปอร์เซ็นต์</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { rank: 1, name: "หนังสือเตรียมสอบ GAT คณิตศาสตร์", sold: 45, revenue: 11250, percentage: 18.5 },
                      { rank: 2, name: "หนังสือเตรียมสอบ PAT ฟิสิกส์", sold: 38, revenue: 10640, percentage: 15.2 },
                      { rank: 3, name: "หนังสือเตรียมสอบ TGAT ภาษาไทย", sold: 32, revenue: 7040, percentage: 12.8 },
                    ].map((item) => (
                      <tr key={item.rank} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                            {item.rank}
                          </div>
                        </td>
                        <td className="p-4 font-medium">{item.name}</td>
                        <td className="text-center p-4">{item.sold}</td>
                        <td className="text-right p-4 font-semibold">{formatPrice(item.revenue)}</td>
                        <td className="text-center p-4">
                          <Badge variant="secondary">{item.percentage}%</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
