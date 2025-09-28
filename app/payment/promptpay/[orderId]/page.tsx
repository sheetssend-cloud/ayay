"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Clock, Copy, RefreshCw, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { formatPrice } from "@/lib/cart"

interface PaymentInfo {
  orderId: string
  amount: number
  qrCode: string
  promptPayId: string
  expiryTime: Date
  status: "pending" | "paid" | "expired"
}

export default function PromptPayPaymentPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null)
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [isChecking, setIsChecking] = useState(false)

  useEffect(() => {
    // Load payment information
    const loadPaymentInfo = async () => {
      // Simulate API call
      const mockPaymentInfo: PaymentInfo = {
        orderId: params.orderId as string,
        amount: 1250,
        qrCode:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
        promptPayId: "0123456789",
        expiryTime: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
        status: "pending",
      }
      setPaymentInfo(mockPaymentInfo)
    }

    loadPaymentInfo()
  }, [params.orderId])

  useEffect(() => {
    if (!paymentInfo) return

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const expiry = paymentInfo.expiryTime.getTime()
      const difference = expiry - now

      if (difference > 0) {
        setTimeLeft(Math.floor(difference / 1000))
      } else {
        setTimeLeft(0)
        setPaymentInfo((prev) => (prev ? { ...prev, status: "expired" } : null))
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [paymentInfo])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleCopyPromptPayId = () => {
    if (paymentInfo) {
      navigator.clipboard.writeText(paymentInfo.promptPayId)
      toast({
        title: "คัดลอกแล้ว",
        description: "หมายเลข PromptPay ถูกคัดลอกไปยังคลิปบอร์ดแล้ว",
      })
    }
  }

  const handleCheckPayment = async () => {
    setIsChecking(true)

    // Simulate payment check
    setTimeout(() => {
      // Random success for demo
      if (Math.random() > 0.5) {
        setPaymentInfo((prev) => (prev ? { ...prev, status: "paid" } : null))
        toast({
          title: "ชำระเงินสำเร็จ!",
          description: "ระบบได้รับการชำระเงินแล้ว กำลังเปลี่ยนเส้นทาง...",
        })
        setTimeout(() => {
          router.push(`/order-success?orderId=${params.orderId}`)
        }, 2000)
      } else {
        toast({
          title: "ยังไม่พบการชำระเงิน",
          description: "กรุณาตรวจสอบการชำระเงินและลองใหม่อีกครั้ง",
          variant: "destructive",
        })
      }
      setIsChecking(false)
    }, 2000)
  }

  if (!paymentInfo) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p>กำลังโหลดข้อมูลการชำระเงิน...</p>
        </div>
      </div>
    )
  }

  if (paymentInfo.status === "paid") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-green-600 mb-2">ชำระเงินสำเร็จ!</h1>
          <p className="text-muted-foreground mb-6">ระบบได้รับการชำระเงินแล้ว</p>
          <Button onClick={() => router.push(`/order-success?orderId=${params.orderId}`)}>ดูรายละเอียดคำสั่งซื้อ</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          กลับ
        </Button>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">ชำระเงินผ่าน PromptPay</h1>
            <p className="text-muted-foreground">สแกน QR Code หรือโอนเงินผ่านหมายเลข PromptPay</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* QR Code */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center">QR Code</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300 mb-4">
                  <img src="/promptpay-qr-code.jpg" alt="PromptPay QR Code" className="w-48 h-48 mx-auto" />
                </div>
                <p className="text-sm text-muted-foreground">สแกน QR Code นี้ด้วยแอปธนาคารของคุณ</p>
              </CardContent>
            </Card>

            {/* Payment Details */}
            <Card>
              <CardHeader>
                <CardTitle>รายละเอียดการชำระเงิน</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>หมายเลขคำสั่งซื้อ:</span>
                  <span className="font-mono">{paymentInfo.orderId}</span>
                </div>

                <div className="flex justify-between">
                  <span>จำนวนเงิน:</span>
                  <span className="font-bold text-green-600">{formatPrice(paymentInfo.amount)}</span>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span>หมายเลข PromptPay:</span>
                    <Button variant="ghost" size="sm" onClick={handleCopyPromptPayId}>
                      <Copy className="h-4 w-4 mr-2" />
                      คัดลอก
                    </Button>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg font-mono text-center text-lg">
                    {paymentInfo.promptPayId}
                  </div>
                </div>

                <Separator />

                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="h-4 w-4" />
                    <span>เวลาที่เหลือ:</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">
                    {paymentInfo.status === "expired" ? "หมดเวลา" : formatTime(timeLeft)}
                  </div>
                  {paymentInfo.status === "expired" && (
                    <Badge variant="destructive" className="mt-2">
                      QR Code หมดอายุแล้ว
                    </Badge>
                  )}
                </div>

                <Button
                  onClick={handleCheckPayment}
                  disabled={isChecking || paymentInfo.status === "expired"}
                  className="w-full"
                  size="lg"
                >
                  {isChecking ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      กำลังตรวจสอบ...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      ตรวจสอบการชำระเงิน
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Instructions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>วิธีการชำระเงิน</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">ผ่าน QR Code</h4>
                  <ol className="text-sm space-y-2">
                    <li>1. เปิดแอปธนาคารของคุณ</li>
                    <li>2. เลือกเมนู "สแกน QR Code" หรือ "PromptPay"</li>
                    <li>3. สแกน QR Code ที่แสดงด้านซ้าย</li>
                    <li>4. ตรวจสอบจำนวนเงินและยืนยันการโอน</li>
                    <li>5. กดปุ่ม "ตรวจสอบการชำระเงิน"</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">ผ่านหมายเลข PromptPay</h4>
                  <ol className="text-sm space-y-2">
                    <li>1. เปิดแอปธนาคารของคุณ</li>
                    <li>2. เลือกเมนู "โอนเงิน" หรือ "PromptPay"</li>
                    <li>3. ใส่หมายเลข PromptPay: {paymentInfo.promptPayId}</li>
                    <li>4. ใส่จำนวนเงิน: {formatPrice(paymentInfo.amount)}</li>
                    <li>5. ยืนยันการโอนและกดปุ่ม "ตรวจสอบการชำระเงิน"</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
