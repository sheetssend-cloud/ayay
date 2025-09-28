"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Truck, Settings, Plus, Edit, Eye } from "lucide-react"
import { shippingProviders, shippingZones, type ShippingProvider } from "@/lib/shipping"

export default function AdminShippingPage() {
  const [providers, setProviders] = useState<ShippingProvider[]>(shippingProviders)
  const [zones, setZones] = useState(shippingZones)

  const toggleProviderStatus = (providerId: string) => {
    setProviders((prev) =>
      prev.map((provider) => (provider.id === providerId ? { ...provider, isActive: !provider.isActive } : provider)),
    )
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="การจัดส่ง" description="จัดการผู้ให้บริการขนส่งและโซนการจัดส่ง" />

        <main className="p-6">
          <Tabs defaultValue="providers" className="space-y-6">
            <TabsList>
              <TabsTrigger value="providers">ผู้ให้บริการขนส่ง</TabsTrigger>
              <TabsTrigger value="zones">โซนการจัดส่ง</TabsTrigger>
              <TabsTrigger value="settings">ตั้งค่า</TabsTrigger>
            </TabsList>

            {/* Shipping Providers */}
            <TabsContent value="providers">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">ผู้ให้บริการขนส่ง</h2>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    เพิ่มผู้ให้บริการ
                  </Button>
                </div>

                <div className="grid gap-6">
                  {providers.map((provider) => (
                    <Card key={provider.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Truck className="h-6 w-6 text-gray-600" />
                            </div>
                            <div>
                              <CardTitle>{provider.name}</CardTitle>
                              <p className="text-sm text-muted-foreground">{provider.nameEn}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge variant={provider.isActive ? "default" : "secondary"}>
                              {provider.isActive ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                            </Badge>
                            <Switch
                              checked={provider.isActive}
                              onCheckedChange={() => toggleProviderStatus(provider.id)}
                            />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium">ประเภท</Label>
                              <p className="text-sm text-muted-foreground capitalize">{provider.type}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">URL ติดตาม</Label>
                              <p className="text-sm text-muted-foreground truncate">{provider.trackingUrl}</p>
                            </div>
                          </div>

                          <div>
                            <Label className="text-sm font-medium">บริการที่รองรับ</Label>
                            <div className="mt-2">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>บริการ</TableHead>
                                    <TableHead>ราคา</TableHead>
                                    <TableHead>เวลาจัดส่ง</TableHead>
                                    <TableHead>น้ำหนักสูงสุด</TableHead>
                                    <TableHead>COD</TableHead>
                                    <TableHead></TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {provider.supportedServices.map((service) => (
                                    <TableRow key={service.id}>
                                      <TableCell>
                                        <div>
                                          <p className="font-medium">{service.name}</p>
                                          <p className="text-xs text-muted-foreground">{service.description}</p>
                                        </div>
                                      </TableCell>
                                      <TableCell>
                                        <div>
                                          <p>฿{service.price}</p>
                                          {service.freeShippingThreshold && (
                                            <p className="text-xs text-green-600">
                                              ฟรีเมื่อซื้อ ฿{service.freeShippingThreshold}+
                                            </p>
                                          )}
                                        </div>
                                      </TableCell>
                                      <TableCell>{service.deliveryTime}</TableCell>
                                      <TableCell>{service.maxWeight} กก.</TableCell>
                                      <TableCell>
                                        <Badge variant={service.codSupported ? "default" : "secondary"}>
                                          {service.codSupported ? "รองรับ" : "ไม่รองรับ"}
                                        </Badge>
                                      </TableCell>
                                      <TableCell>
                                        <Button variant="ghost" size="sm">
                                          <Edit className="h-4 w-4" />
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Shipping Zones */}
            <TabsContent value="zones">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">โซนการจัดส่ง</h2>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    เพิ่มโซน
                  </Button>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>โซน</TableHead>
                          <TableHead>จังหวัด</TableHead>
                          <TableHead>ตัวคูณราคา</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {zones.map((zone) => (
                          <TableRow key={zone.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{zone.name}</p>
                                <p className="text-sm text-muted-foreground">{zone.provinces.length} จังหวัด</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {zone.provinces.slice(0, 3).map((province) => (
                                  <Badge key={province} variant="outline" className="text-xs">
                                    {province}
                                  </Badge>
                                ))}
                                {zone.provinces.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{zone.provinces.length - 3} อื่นๆ
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">x{zone.multiplier}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Settings */}
            <TabsContent value="settings">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">ตั้งค่าการจัดส่ง</h2>

                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>ตั้งค่าทั่วไป</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="free-shipping-threshold">ยอดขั้นต่ำสำหรับจัดส่งฟรี (บาท)</Label>
                          <Input id="free-shipping-threshold" type="number" defaultValue="1000" />
                        </div>
                        <div>
                          <Label htmlFor="default-weight">น้ำหนักเริ่มต้น (กก.)</Label>
                          <Input id="default-weight" type="number" step="0.1" defaultValue="0.5" />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="default-length">ความยาวเริ่มต้น (ซม.)</Label>
                          <Input id="default-length" type="number" defaultValue="20" />
                        </div>
                        <div>
                          <Label htmlFor="default-width">ความกว้างเริ่มต้น (ซม.)</Label>
                          <Input id="default-width" type="number" defaultValue="15" />
                        </div>
                        <div>
                          <Label htmlFor="default-height">ความสูงเริ่มต้น (ซม.)</Label>
                          <Input id="default-height" type="number" defaultValue="5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>การแจ้งเตือน</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">แจ้งเตือนเมื่อมีการจัดส่ง</Label>
                          <p className="text-sm text-muted-foreground">ส่งอีเมลแจ้งเตือนลูกค้าเมื่อสินค้าถูกจัดส่ง</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">อัปเดตสถานะอัตโนมัติ</Label>
                          <p className="text-sm text-muted-foreground">ดึงข้อมูลสถานะจากผู้ให้บริการขนส่งอัตโนมัติ</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-end">
                    <Button>
                      <Settings className="h-4 w-4 mr-2" />
                      บันทึกการตั้งค่า
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
