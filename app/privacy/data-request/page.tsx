"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Shield, FileText, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function DataRequestPage() {
  const [requestType, setRequestType] = useState("")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    idNumber: "",
    requestDetails: "",
    verificationMethod: "",
    agreeToTerms: false,
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementation for submitting data request
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-8">
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
            <h1 className="text-3xl font-bold mb-4">คำขอได้รับการส่งแล้ว</h1>
            <p className="text-muted-foreground mb-8">
              เราได้รับคำขอของคุณแล้ว และจะดำเนินการตรวจสอบภายใน 30 วัน คุณจะได้รับอีเมลยืนยันและผลการดำเนินการในเร็วๆ นี้
            </p>
            <div className="bg-muted p-6 rounded-lg mb-8">
              <h3 className="font-semibold mb-2">หมายเลขคำขอ: #DR2024001</h3>
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
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8">
        <div className="container mx-auto px-4">
          <Link href="/privacy">
            <Button variant="ghost" className="text-white hover:bg-white/20 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              กลับไปนโยบายความเป็นส่วนตัว
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <FileText className="h-12 w-12" />
            <div>
              <h1 className="text-3xl font-bold">ขอดูข้อมูลส่วนบุคคล</h1>
              <p className="text-blue-100">ใช้สิทธิตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Alert className="mb-8">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              เพื่อความปลอดภัยของข้อมูล เราจำเป็นต้องยืนยันตัวตนของคุณก่อนดำเนินการ กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>แบบฟอร์มขอดูข้อมูลส่วนบุคคล</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="requestType">ประเภทคำขอ</Label>
                  <Select value={requestType} onValueChange={setRequestType} required>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกประเภทคำขอ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="access">ขอดูข้อมูลส่วนบุคคล</SelectItem>
                      <SelectItem value="correction">ขอแก้ไขข้อมูลส่วนบุคคล</SelectItem>
                      <SelectItem value="deletion">ขอลบข้อมูลส่วนบุคคล</SelectItem>
                      <SelectItem value="portability">ขอรับข้อมูลในรูปแบบที่อ่านได้</SelectItem>
                      <SelectItem value="objection">คัดค้านการประมวลผลข้อมูล</SelectItem>
                      <SelectItem value="withdraw">ถอนความยินยอม</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

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
                  <Label htmlFor="verificationMethod">วิธีการยืนยันตัวตน</Label>
                  <Select
                    value={formData.verificationMethod}
                    onValueChange={(value) => setFormData({ ...formData, verificationMethod: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกวิธีการยืนยันตัวตน" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">ส่งลิงก์ยืนยันทางอีเมล</SelectItem>
                      <SelectItem value="sms">ส่งรหัส OTP ทาง SMS</SelectItem>
                      <SelectItem value="document">อัปโหลดสำเนาบัตรประชาชน</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="requestDetails">รายละเอียดคำขอ</Label>
                  <Textarea
                    id="requestDetails"
                    value={formData.requestDetails}
                    onChange={(e) => setFormData({ ...formData, requestDetails: e.target.value })}
                    placeholder="กรุณาระบุรายละเอียดคำขอของคุณ เช่น ข้อมูลใดที่ต้องการดู หรือเหตุผลในการขอลบข้อมูล"
                    rows={4}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                    required
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm">
                    ข้าพเจ้ายืนยันว่าข้อมูลที่ให้ไว้ข้างต้นเป็นความจริง และยินยอมให้ SHEET88
                    ดำเนินการตรวจสอบและประมวลผลข้อมูลเพื่อการดำเนินการตามคำขอนี้
                  </Label>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">ข้อมูลสำคัญ:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• เราจะดำเนินการภายใน 30 วันนับจากวันที่ได้รับคำขอที่สมบูรณ์</li>
                    <li>• คุณจะได้รับอีเมลยืนยันการรับคำขอภายใน 24 ชั่วโมง</li>
                    <li>• หากจำเป็นต้องขยายเวลา เราจะแจ้งให้ทราบล่วงหน้า</li>
                    <li>• การให้ข้อมูลเท็จอาจมีผลทางกฎหมาย</li>
                  </ul>
                </div>

                <Button type="submit" className="w-full" disabled={!formData.agreeToTerms}>
                  ส่งคำขอ
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
