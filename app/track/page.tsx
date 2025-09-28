"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Search, Package, MapPin, Clock, CheckCircle, Truck, AlertCircle } from "lucide-react"
import { trackShipment, getShippingProviderByTrackingNumber, type TrackingInfo } from "@/lib/shipping"
import { useToast } from "@/hooks/use-toast"

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      toast({
        title: "กรุณาใส่หมายเลขติดตาม",
        description: "โปรดใส่หมายเลขติดตามพัสดุ",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const result = await trackShipment(trackingNumber.trim())
      if (result) {
        setTrackingInfo(result)
      } else {
        toast({
          title: "ไม่พบข้อมูลพัสดุ",
          description: "กรุณาตรวจสอบหมายเลขติดตามและลองใหม่อีกครั้ง",
          variant: "destructive",
        })
        setTrackingInfo(null)
      }
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถติดตามพัสดุได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      })
      setTrackingInfo(null)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "picked-up":
        return <Package className="h-5 w-5 text-blue-500" />
      case "in-transit":
        return <Truck className="h-5 w-5 text-orange-500" />
      case "out-for-delivery":
        return <MapPin className="h-5 w-5 text-purple-500" />
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "failed":
      case "returned":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Package className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "picked-up":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "in-transit":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "out-for-delivery":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200"
      case "failed":
      case "returned":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const provider = trackingInfo ? getShippingProviderByTrackingNumber(trackingInfo.trackingNumber) : null

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">ติดตามพัสดุ</h1>
            <p className="text-muted-foreground">ตรวจสอบสถานะการจัดส่งพัสดุของคุณ</p>
          </div>

          {/* Search Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                ค้นหาพัสดุ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="tracking-number">หมายเลขติดตาม</Label>
                  <Input
                    id="tracking-number"
                    placeholder="ใส่หมายเลขติดตามพัสดุ เช่น EMS1234567890TH"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleTrack()}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleTrack} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        กำลังค้นหา...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        ติดตาม
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="mt-4 text-sm text-muted-foreground">
                <p className="mb-2">รองรับการติดตามจาก:</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">ไปรษณีย์ไทย (EMS)</Badge>
                  <Badge variant="outline">Kerry Express</Badge>
                  <Badge variant="outline">Flash Express</Badge>
                  <Badge variant="outline">J&T Express</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Results */}
          {trackingInfo && (
            <div className="space-y-6">
              {/* Package Status */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      สถานะพัสดุ
                    </CardTitle>
                    {provider && <Badge variant="secondary">{provider.name}</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm text-muted-foreground">หมายเลขติดตาม</Label>
                          <p className="font-mono text-lg">{trackingInfo.trackingNumber}</p>
                        </div>

                        <div>
                          <Label className="text-sm text-muted-foreground">สถานะปัจจุบัน</Label>
                          <div className="flex items-center gap-2 mt-1">
                            {getStatusIcon(trackingInfo.status)}
                            <Badge className={getStatusColor(trackingInfo.status)}>{trackingInfo.statusTh}</Badge>
                          </div>
                        </div>

                        {trackingInfo.currentLocation && (
                          <div>
                            <Label className="text-sm text-muted-foreground">ตำแหน่งปัจจุบัน</Label>
                            <p className="flex items-center gap-2 mt-1">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              {trackingInfo.currentLocation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="space-y-4">
                        {trackingInfo.estimatedDelivery && (
                          <div>
                            <Label className="text-sm text-muted-foreground">วันที่คาดว่าจะได้รับ</Label>
                            <p className="flex items-center gap-2 mt-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              {trackingInfo.estimatedDelivery.toLocaleDateString("th-TH", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        )}

                        <div>
                          <Label className="text-sm text-muted-foreground">อัปเดตล่าสุด</Label>
                          <p className="text-sm mt-1">{trackingInfo.lastUpdated.toLocaleString("th-TH")}</p>
                        </div>

                        {provider && (
                          <div>
                            <Label className="text-sm text-muted-foreground">ติดตามเพิ่มเติม</Label>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-1 bg-transparent"
                              onClick={() =>
                                window.open(`${provider.trackingUrl}${trackingInfo.trackingNumber}`, "_blank")
                              }
                            >
                              เปิดในเว็บไซต์ {provider.name}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tracking History */}
              <Card>
                <CardHeader>
                  <CardTitle>ประวัติการขนส่ง</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trackingInfo.history.map((event, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          {getStatusIcon(event.status)}
                          {index < trackingInfo.history.length - 1 && <div className="w-px h-12 bg-border mt-2" />}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className={getStatusColor(event.status)}>
                              {event.statusTh}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {event.timestamp.toLocaleString("th-TH")}
                            </span>
                          </div>
                          <p className="text-sm font-medium">{event.description}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Help Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>ต้องการความช่วยเหลือ?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">ไม่พบหมายเลขติดตาม?</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• ตรวจสอบหมายเลขในอีเมลยืนยันการสั่งซื้อ</li>
                    <li>• ดูในหน้า "คำสั่งซื้อของฉัน"</li>
                    <li>• รอ 24-48 ชั่วโมงหลังจากสั่งซื้อ</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">ติดต่อเรา</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>📞 โทร: 093-8644493</p>
                    <p>💬 Line: @SHEET888</p>
                    <p>📧 อีเมล: support@sheet88.com</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
