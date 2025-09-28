"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useCart } from "@/hooks/use-cart"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { formatPrice, type ShippingInfo } from "@/lib/cart"
import { addOrder, type Order } from "@/lib/orders"
import {
  ArrowLeft,
  CreditCard,
  Truck,
  Shield,
  CheckCircle,
  Smartphone,
  Building2,
  QrCode,
  Banknote,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { items, subtotal, shipping, total, clearCart, getItemCount } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("promptpay")
  const [acceptTerms, setAcceptTerms] = useState(false)

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    district: "",
    province: "",
    postalCode: "",
  })

  const handleInputChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!acceptTerms) {
      toast({
        title: "กรุณายอมรับเงื่อนไข",
        description: "คุณต้องยอมรับเงื่อนไขการใช้งานก่อนสั่งซื้อ",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate order processing
    setTimeout(() => {
      const orderId = `ORD-${Date.now()}`

      const paymentMethodMap = {
        promptpay: "PromptPay QR Code",
        "bank-transfer": "โอนผ่านธนาคาร",
        "credit-card": "บัตรเครดิต/เดบิต",
        cod: "เก็บเงินปลายทาง (COD)",
        "mobile-banking": "Mobile Banking",
        "internet-banking": "Internet Banking",
        "true-wallet": "TrueMoney Wallet",
        "rabbit-line-pay": "Rabbit LINE Pay",
      }

      const order: Order = {
        id: orderId,
        customerName: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
        customerEmail: shippingInfo.email,
        customerPhone: shippingInfo.phone,
        items: items.map((item) => ({
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image || "/placeholder.svg",
        })),
        total,
        status: "confirmed",
        paymentMethod: paymentMethodMap[paymentMethod as keyof typeof paymentMethodMap] || "ไม่ระบุ",
        shippingAddress: {
          address: shippingInfo.address,
          district: shippingInfo.district,
          province: shippingInfo.province,
          postalCode: shippingInfo.postalCode,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      addOrder(order)

      clearCart()
      setIsProcessing(false)

      toast({
        title: "สั่งซื้อสำเร็จ!",
        description: `หมายเลขคำสั่งซื้อ: ${orderId}`,
      })

      router.push(`/order-success?orderId=${orderId}`)
    }, 2000)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartItemCount={0} />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">ตะกร้าสินค้าว่าง</h1>
          <p className="text-muted-foreground mb-6">กรุณาเพิ่มสินค้าลงในตะกร้าก่อนดำเนินการสั่งซื้อ</p>
          <Button onClick={() => router.push("/")}>กลับไปเลือกสินค้า</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={getItemCount()} />

      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          กลับ
        </Button>

        <h1 className="text-3xl font-bold mb-8">ชำระเงิน</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  ข้อมูลการจัดส่ง
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitOrder} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">ชื่อ *</Label>
                      <Input
                        id="firstName"
                        value={shippingInfo.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">นามสกุล *</Label>
                      <Input
                        id="lastName"
                        value={shippingInfo.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">อีเมล *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">เบอร์โทรศัพท์ *</Label>
                      <Input
                        id="phone"
                        value={shippingInfo.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">ที่อยู่ *</Label>
                    <Input
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="district">อำเภอ/เขต *</Label>
                      <Input
                        id="district"
                        value={shippingInfo.district}
                        onChange={(e) => handleInputChange("district", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="province">จังหวัด *</Label>
                      <Input
                        id="province"
                        value={shippingInfo.province}
                        onChange={(e) => handleInputChange("province", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">รหัสไปรษณีย์ *</Label>
                      <Input
                        id="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={(e) => handleInputChange("postalCode", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  วิธีการชำระเงิน
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="promptpay" id="promptpay" />
                    <Label htmlFor="promptpay" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <QrCode className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium">PromptPay QR Code</p>
                            <p className="text-sm text-muted-foreground">สแกน QR Code ผ่านแอปธนาคาร</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                          แนะนำ
                        </Badge>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="mobile-banking" id="mobile-banking" />
                    <Label htmlFor="mobile-banking" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium">Mobile Banking</p>
                          <p className="text-sm text-muted-foreground">SCB Easy, Krungthai NEXT, K PLUS</p>
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="internet-banking" id="internet-banking" />
                    <Label htmlFor="internet-banking" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Building2 className="h-5 w-5 text-purple-600" />
                        <div>
                          <p className="font-medium">Internet Banking</p>
                          <p className="text-sm text-muted-foreground">ธนาคารกสิกรไทย, ธนาคารไทยพาณิชย์</p>
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-orange-600" />
                        <div>
                          <p className="font-medium">บัตรเครดิต/เดบิต</p>
                          <p className="text-sm text-muted-foreground">Visa, Mastercard, JCB, American Express</p>
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="true-wallet" id="true-wallet" />
                    <Label htmlFor="true-wallet" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-red-600" />
                        <div>
                          <p className="font-medium">TrueMoney Wallet</p>
                          <p className="text-sm text-muted-foreground">ชำระผ่าน TrueMoney Wallet</p>
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="rabbit-line-pay" id="rabbit-line-pay" />
                    <Label htmlFor="rabbit-line-pay" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium">Rabbit LINE Pay</p>
                          <p className="text-sm text-muted-foreground">ชำระผ่าน Rabbit LINE Pay</p>
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                    <Label htmlFor="bank-transfer" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium">โอนเงินผ่านธนาคาร</p>
                          <p className="text-sm text-muted-foreground">โอนเงินแล้วแนบสลิป</p>
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Banknote className="h-5 w-5 text-yellow-600" />
                          <div>
                            <p className="font-medium">เก็บเงินปลายทาง (COD)</p>
                            <p className="text-sm text-muted-foreground">ชำระเงินเมื่อได้รับสินค้า</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                          +30 บาท
                        </Badge>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "promptpay" && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">วิธีการชำระเงินผ่าน PromptPay</h4>
                    <ol className="text-sm text-blue-800 space-y-1">
                      <li>1. กดยืนยันการสั่งซื้อ</li>
                      <li>2. สแกน QR Code ที่ปรากฏขึ้น</li>
                      <li>3. ยืนยันการชำระเงินในแอปธนาคาร</li>
                      <li>4. รอการยืนยันจากระบบ (ประมาณ 1-2 นาที)</li>
                    </ol>
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="font-medium text-yellow-900 mb-2">เงื่อนไขการเก็บเงินปลายทาง</h4>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• ค่าบริการ COD 30 บาท</li>
                      <li>• ชำระเงินสดเท่านั้น</li>
                      <li>• ตรวจสอบสินค้าก่อนชำระเงิน</li>
                      <li>• หากไม่รับสินค้า จะถูกเรียกเก็บค่าขนส่งไป-กลับ</li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Terms and Conditions */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                    ฉันยอมรับ{" "}
                    <a href="#" className="text-green-600 hover:underline">
                      เงื่อนไขการใช้งาน
                    </a>{" "}
                    และ{" "}
                    <a href="#" className="text-green-600 hover:underline">
                      นโยบายความเป็นส่วนตัว
                    </a>{" "}
                    รวมถึงยินยอมให้เก็บรวบรวมและใช้ข้อมูลส่วนบุคคลตามที่ระบุไว้
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>สรุปคำสั่งซื้อ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-12 h-16 flex-shrink-0">
                        <Image
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium line-clamp-2">{item.product.name}</h4>
                        <p className="text-sm text-muted-foreground">จำนวน: {item.quantity}</p>
                        <p className="text-sm font-semibold text-green-600">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Totals */}
                <div className="space-y-2">
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
                  {paymentMethod === "cod" && (
                    <div className="flex justify-between text-sm">
                      <span>ค่าบริการ COD</span>
                      <span>{formatPrice(30)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>ยอดรวมทั้งหมด</span>
                    <span className="text-green-600">{formatPrice(total + (paymentMethod === "cod" ? 30 : 0))}</span>
                  </div>
                </div>

                <Button
                  onClick={handleSubmitOrder}
                  disabled={isProcessing || !acceptTerms}
                  className="w-full"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      กำลังดำเนินการ...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      ยืนยันการสั่งซื้อ
                    </>
                  )}
                </Button>

                {/* Security Info */}
                <div className="text-center pt-4">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>การชำระเงินปลอดภัย SSL 256-bit</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">ข้อมูลการชำระเงินของคุณได้รับการเข้ารหัสและปกป้อง</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
