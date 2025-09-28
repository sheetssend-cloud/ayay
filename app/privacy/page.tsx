"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Shield, Eye, Trash2, Download } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Shield className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">นโยบายความเป็นส่วนตัว</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            เราให้ความสำคัญกับการปกป้องข้อมูลส่วนบุคคลของคุณตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <Eye className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">ดูข้อมูลของคุณ</h3>
                <p className="text-sm text-muted-foreground mb-4">ขอดูข้อมูลส่วนบุคคลที่เราเก็บรวบรวม</p>
                <Link href="/privacy/data-request">
                  <Button variant="outline" size="sm">
                    ขอดูข้อมูล
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Download className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">ดาวน์โหลดข้อมูล</h3>
                <p className="text-sm text-muted-foreground mb-4">ดาวน์โหลดข้อมูลส่วนบุคคลของคุณ</p>
                <Link href="/privacy/data-export">
                  <Button variant="outline" size="sm">
                    ดาวน์โหลด
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Trash2 className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">ลบข้อมูล</h3>
                <p className="text-sm text-muted-foreground mb-4">ขอให้ลบข้อมูลส่วนบุคคลของคุณ</p>
                <Link href="/privacy/data-deletion">
                  <Button variant="outline" size="sm">
                    ขอลบข้อมูล
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Privacy Policy Content */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">นโยบายความเป็นส่วนตัว</CardTitle>
              <p className="text-muted-foreground">อัปเดตล่าสุด: 1 มกราคม 2024</p>
            </CardHeader>
            <CardContent className="prose max-w-none space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-4">1. ข้อมูลที่เราเก็บรวบรวม</h2>
                <p className="mb-4">เราเก็บรวบรวมข้อมูลส่วนบุคคลของคุณในกรณีต่อไปนี้:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>ข้อมูลการสมัครสมาชิก:</strong> ชื่อ, นามสกุล, อีเมล, เบอร์โทรศัพท์
                  </li>
                  <li>
                    <strong>ข้อมูลการสั่งซื้อ:</strong> ที่อยู่จัดส่ง, ข้อมูลการชำระเงิน
                  </li>
                  <li>
                    <strong>ข้อมูลการใช้งาน:</strong> IP Address, Browser, การเข้าชมเว็บไซต์
                  </li>
                  <li>
                    <strong>ข้อมูลการติดต่อ:</strong> ข้อความ, คำถาม, ความคิดเห็น
                  </li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold mb-4">2. วัตถุประสงค์ในการใช้ข้อมูล</h2>
                <p className="mb-4">เราใช้ข้อมูลส่วนบุคคลของคุณเพื่อ:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>ดำเนินการตามสัญญาการซื้อขายสินค้า</li>
                  <li>จัดส่งสินค้าและบริการให้กับคุณ</li>
                  <li>ติดต่อสื่อสารเกี่ยวกับคำสั่งซื้อและบริการ</li>
                  <li>ปรับปรุงและพัฒนาเว็บไซต์และบริการ</li>
                  <li>ส่งข้อมูลข่าวสารและโปรโมชั่น (หากได้รับความยินยอม)</li>
                  <li>ปฏิบัติตามกฎหมายและระเบียบที่เกี่ยวข้อง</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold mb-4">3. การเปิดเผยข้อมูล</h2>
                <p className="mb-4">เราอาจเปิดเผยข้อมูลส่วนบุคคลของคุณให้กับ:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>ผู้ให้บริการขนส่ง:</strong> เพื่อจัดส่งสินค้าให้กับคุณ
                  </li>
                  <li>
                    <strong>ผู้ให้บริการชำระเงิน:</strong> เพื่อดำเนินการชำระเงิน
                  </li>
                  <li>
                    <strong>ผู้ให้บริการเทคโนโลยี:</strong> เพื่อการดูแลระบบและความปลอดภัย
                  </li>
                  <li>
                    <strong>หน่วยงานราชการ:</strong> เมื่อมีกฎหมายกำหนด
                  </li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold mb-4">4. สิทธิของเจ้าของข้อมูล</h2>
                <p className="mb-4">ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล คุณมีสิทธิ:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>สิทธิในการเข้าถึงข้อมูล:</strong> ขอดูข้อมูลส่วนบุคคลที่เราเก็บรวบรวม
                  </li>
                  <li>
                    <strong>สิทธิในการแก้ไขข้อมูล:</strong> ขอแก้ไขข้อมูลที่ไม่ถูกต้องหรือไม่สมบูรณ์
                  </li>
                  <li>
                    <strong>สิทธิในการลบข้อมูล:</strong> ขอให้ลบข้อมูลส่วนบุคคลของคุณ
                  </li>
                  <li>
                    <strong>สิทธิในการพกพาข้อมูล:</strong> ขอรับข้อมูลในรูปแบบที่สามารถอ่านได้
                  </li>
                  <li>
                    <strong>สิทธิในการคัดค้าน:</strong> คัดค้านการประมวลผลข้อมูลในบางกรณี
                  </li>
                  <li>
                    <strong>สิทธิในการถอนความยินยอม:</strong> ถอนความยินยอมที่ให้ไว้
                  </li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold mb-4">5. ความปลอดภัยของข้อมูล</h2>
                <p className="mb-4">เราใช้มาตรการรักษาความปลอดภัยที่เหมาะสม เช่น:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>การเข้ารหัสข้อมูล (SSL/TLS)</li>
                  <li>การควบคุมการเข้าถึงข้อมูล</li>
                  <li>การสำรองข้อมูลอย่างปลอดภัย</li>
                  <li>การตรวจสอบและทดสอบระบบความปลอดภัยอย่างสม่ำเสมอ</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold mb-4">6. การใช้คุกกี้</h2>
                <p className="mb-4">เว็บไซต์ของเราใช้คุกกี้เพื่อ:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>จดจำการตั้งค่าและความต้องการของคุณ</li>
                  <li>วิเคราะห์การใช้งานเว็บไซต์</li>
                  <li>ปรับปรุงประสบการณ์การใช้งาน</li>
                  <li>แสดงโฆษณาที่เกี่ยวข้อง</li>
                </ul>
                <p className="mt-4">คุณสามารถจัดการการตั้งค่าคุกกี้ได้ในเบราว์เซอร์ของคุณ</p>
              </section>

              <Separator />

              <section>
                <h2 className="text-xl font-semibold mb-4">7. การติดต่อเรา</h2>
                <p className="mb-4">หากคุณมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัวหรือต้องการใช้สิทธิของคุณ กรุณาติดต่อเราที่:</p>
                <div className="bg-muted p-4 rounded-lg">
                  <p>
                    <strong>บริษัท SHEET88 จำกัด</strong>
                  </p>
                  <p>เจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล (DPO)</p>
                  <p>อีเมล: privacy@sheet88.com</p>
                  <p>โทรศัพท์: 02-xxx-xxxx</p>
                  <p>ที่อยู่: 123 ถนนสุขุมวิท กรุงเทพฯ 10110</p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
