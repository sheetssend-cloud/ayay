"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Trash2, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function DataDeletionPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    idNumber: "",
    reason: "",
    confirmDeletion: false,
    understandConsequences: false,
    agreeToTerms: false,
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementation for submitting deletion request
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-8">
          <div className="container mx-auto px-4">
            <Link href="/privacy">
              <Button variant="ghost" className="text-white hover:bg-white/20 mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                กลับไปนโยบายความเป็นส่วนตัว
              </Button>
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">คำขอลบข้อมูลได้รับการส่งแล้ว</h1>
            <p className="text-muted-foreground mb-8">
              เราได้รับคำขอลบข้อมูลของคุณแล้ว และจะดำเนินการตรวจสอบภายใน 30 วัน คุณจะได้รับอีเมลยืนยันและผลการดำเนินการในเร็วๆ นี้
            </p>
            <Alert className="mb-8">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>สำคัญ:</strong> หากคำขอได้รับการอนุมัติ ข้อมูลทั้งหมดจะถูกลบอย่างถาวร
                และคุณจะไม่สามารถเข้าถึงบัญชีหรือประวัติการสั่งซื้อได้อีก
              </AlertDescription>
            </Alert>
            <div className="bg-muted p-6 rounded-lg mb-8">
              <h3 className="font-semibold mb-2">หมายเลขคำขอ: #DD2024001</h3>
              <p className="text-sm text-muted-foreground">กรุณาเก็บหมายเลขนี้ไว้สำหรับการติดตามสถานะคำขอ</p>
            </div>
            <Link href="/privacy">
              <Button>กลับไปหน้านโยบายความเป็นส่วนตัว</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-8">
        <div className="container mx-auto px-4">
          <Link href="/privacy">
            <Button variant="ghost" className="text-white hover:bg-white/20 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              กลับไปนโยบายความเป็นส่วนตัว
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <Trash2 className="h-12 w-12" />
            <div>
              <h1 className="text-3xl font-bold">ขอลบข้อมูลส่วนบุคคล</h1>
              <p className="text-red-100">ใช้สิทธิในการลบข้อมูลตาม PDPA</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Alert className="mb-8 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>คำเตือนสำคัญ:</strong> การลบข้อมูลจะส่งผลให้คุณไม่สามารถ:
              <ul className="mt-2 ml-4 list-disc">
                <li>เข้าสู่ระบบบัญชีของคุณ</li>
                <li>ดูประวัติการสั่งซื้อ</li>
                <li>ใช้บริการที่ต้องการข้อมูลส่วนบุคคล</li>
                <li>รับการสนับสนุนลูกค้า</li>
              </ul>
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>แบบฟอร์มขอลบข้อมูลส่วนบุคคล</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">ชื่อ-นามสกุล</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="ชื่อเต็มตามบัตรประชาชน"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="idNumber">เลขบัตรประชาชน</Label>
                    <Input
                      id="idNumber"
                      value={formData.idNumber}
                      onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                      placeholder="1-xxxx-xxxxx-xx-x"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">อีเมล</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="08x-xxx-xxxx"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="reason">เหตุผลในการขอลบข้อมูล</Label>
                  <Textarea
                    id="reason"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    placeholder="กรุณาระบุเหตุผลในการขอลบข้อมูลส่วนบุคคล"
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="confirmDeletion"
                      checked={formData.confirmDeletion}
                      onCheckedChange={(checked) => setFormData({ ...formData, confirmDeletion: checked as boolean })}
                      required
                    />
                    <Label htmlFor="confirmDeletion" className="text-sm">
                      ข้าพเจ้ายืนยันว่าต้องการให้ลบข้อมูลส่วนบุคคลทั้งหมดของข้าพเจ้าออกจากระบบ SHEET88
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="understandConsequences"
                      checked={formData.understandConsequences}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, understandConsequences: checked as boolean })
                      }
                      required
                    />
                    <Label htmlFor="understandConsequences" className="text-sm">
                      ข้าพเจ้าเข้าใจและยอมรับผลที่ตามมาจากการลบข้อมูล รวมถึงการไม่สามารถใช้บริการต่างๆ ได้
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                      required
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm">
                      ข้าพเจ้ายืนยันว่าข้อมูลที่ให้ไว้ข้างต้นเป็นความจริง และยินยอมให้ SHEET88 ดำเนินการตรวจสอบตัวตนก่อนดำเนินการลบข้อมูล
                    </Label>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">ข้อมูลที่อาจไม่ถูกลบ:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• ข้อมูลที่จำเป็นต่อการปฏิบัติตามกฎหมาย (เช่น ใบกำกับภาษี)</li>
                    <li>• ข้อมูลที่อยู่ในระหว่างการดำเนินคดี</li>
                    <li>• ข้อมูลที่จำเป็นต่อการป้องกันการฉ้อโกง</li>
                    <li>• ข้อมูลที่ได้รับการทำให้ไม่สามารถระบุตัวตนได้แล้ว</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={!formData.confirmDeletion || !formData.understandConsequences || !formData.agreeToTerms}
                >
                  ส่งคำขอลบข้อมูล
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
