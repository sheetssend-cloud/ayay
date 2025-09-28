"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Truck, Package, Clock, Shield, Star } from "lucide-react"
import {
  getAvailableShippingOptions,
  thailandProvinces,
  type ShippingProvider,
  type ShippingService,
} from "@/lib/shipping"

interface ShippingCalculatorProps {
  orderValue: number
  onShippingSelect?: (providerId: string, serviceId: string, cost: number) => void
}

export function ShippingCalculator({ orderValue, onShippingSelect }: ShippingCalculatorProps) {
  const [province, setProvince] = useState("")
  const [weight, setWeight] = useState(1)
  const [dimensions, setDimensions] = useState({ length: 20, width: 15, height: 5 })
  const [shippingOptions, setShippingOptions] = useState<
    Array<{
      provider: ShippingProvider
      service: ShippingService
      cost: number
      zone: any
    }>
  >([])
  const [selectedOption, setSelectedOption] = useState<string>("")

  useEffect(() => {
    if (province) {
      const options = getAvailableShippingOptions(province, weight, dimensions, orderValue)
      setShippingOptions(options)
      setSelectedOption("")
    }
  }, [province, weight, dimensions, orderValue])

  const handleSelectShipping = (providerId: string, serviceId: string, cost: number) => {
    const optionKey = `${providerId}-${serviceId}`
    setSelectedOption(optionKey)
    onShippingSelect?.(providerId, serviceId, cost)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" />
          คำนวณค่าจัดส่ง
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Destination */}
        <div>
          <Label htmlFor="province">จังหวัดปลายทาง *</Label>
          <Select value={province} onValueChange={setProvince}>
            <SelectTrigger>
              <SelectValue placeholder="เลือกจังหวัด" />
            </SelectTrigger>
            <SelectContent>
              {thailandProvinces.map((prov) => (
                <SelectItem key={prov} value={prov}>
                  {prov}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Package Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="weight">น้ำหนัก (กก.)</Label>
            <Input
              id="weight"
              type="number"
              min="0.1"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(Number.parseFloat(e.target.value) || 1)}
            />
          </div>
          <div>
            <Label>ขนาดพัสดุ (ซม.)</Label>
            <div className="grid grid-cols-3 gap-1">
              <Input
                placeholder="ยาว"
                type="number"
                value={dimensions.length}
                onChange={(e) => setDimensions((prev) => ({ ...prev, length: Number.parseInt(e.target.value) || 20 }))}
              />
              <Input
                placeholder="กว้าง"
                type="number"
                value={dimensions.width}
                onChange={(e) => setDimensions((prev) => ({ ...prev, width: Number.parseInt(e.target.value) || 15 }))}
              />
              <Input
                placeholder="สูง"
                type="number"
                value={dimensions.height}
                onChange={(e) => setDimensions((prev) => ({ ...prev, height: Number.parseInt(e.target.value) || 5 }))}
              />
            </div>
          </div>
        </div>

        {/* Shipping Options */}
        {shippingOptions.length > 0 && (
          <div>
            <Label className="text-base font-semibold">ตัวเลือกการจัดส่ง</Label>
            <div className="space-y-3 mt-2">
              {shippingOptions.map((option) => {
                const optionKey = `${option.provider.id}-${option.service.id}`
                const isSelected = selectedOption === optionKey
                const isFree = option.cost === 0

                return (
                  <div
                    key={optionKey}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      isSelected ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleSelectShipping(option.provider.id, option.service.id, option.cost)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Package className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{option.provider.name}</p>
                            <p className="text-sm text-muted-foreground">{option.service.name}</p>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          {isFree ? (
                            <Badge className="bg-green-100 text-green-700">ฟรี</Badge>
                          ) : (
                            <span className="font-semibold">฿{option.cost}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <Clock className="h-3 w-3" />
                          <span>{option.service.deliveryTime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-3 text-sm">
                      {option.service.trackingIncluded && (
                        <div className="flex items-center gap-1 text-blue-600">
                          <Package className="h-3 w-3" />
                          <span>ติดตามได้</span>
                        </div>
                      )}
                      {option.service.codSupported && (
                        <div className="flex items-center gap-1 text-orange-600">
                          <Shield className="h-3 w-3" />
                          <span>COD</span>
                        </div>
                      )}
                      {option.service.insuranceAvailable && (
                        <div className="flex items-center gap-1 text-purple-600">
                          <Shield className="h-3 w-3" />
                          <span>ประกันภัย</span>
                        </div>
                      )}
                      {option.provider.type === "express" && (
                        <div className="flex items-center gap-1 text-green-600">
                          <Star className="h-3 w-3" />
                          <span>ด่วน</span>
                        </div>
                      )}
                    </div>

                    {option.service.freeShippingThreshold && orderValue < option.service.freeShippingThreshold && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        ซื้อเพิ่ม ฿{(option.service.freeShippingThreshold - orderValue).toLocaleString()}
                        เพื่อได้รับการจัดส่งฟรี
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {province && shippingOptions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>ไม่มีตัวเลือกการจัดส่งสำหรับพื้นที่นี้</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
