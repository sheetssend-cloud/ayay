import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  BookOpen,
  ShoppingCart,
  User,
  Settings,
  CreditCard,
  Package,
  BarChart3,
  Tag,
  Truck,
  Search,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  Bell,
  Lock,
  Mail,
  Phone,
  Clock,
  Star,
  Heart,
  Share2,
} from "lucide-react"

export default function ManualPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">คู่มือการใช้งานเว็บไซต์ร้านหนังสือเตรียมสอบ</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            คู่มือฉบับสมบูรณ์สำหรับการใช้งานระบบร้านค้าออนไลน์หนังสือเตรียมสอบ ทั้งสำหรับลูกค้าและผู้ดูแลระบบ
          </p>
        </div>

        {/* สำหรับลูกค้า */}
        <Card className="mb-8">
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <User className="h-6 w-6" />
              คู่มือสำหรับลูกค้า
            </CardTitle>
            <CardDescription className="text-blue-100">วิธีการใช้งานเว็บไซต์สำหรับการซื้อหนังสือเตรียมสอบ</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* การสมัครสมาชิก */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  การสมัครสมาชิก
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>1.</strong> คลิกปุ่ม "สมัครสมาชิก" ที่มุมขวาบน
                  </p>
                  <p>
                    <strong>2.</strong> กรอกข้อมูล: ชื่อ, อีเมล, รหัสผ่าน
                  </p>
                  <p>
                    <strong>3.</strong> คลิก "สมัครสมาชิก" เพื่อยืนยัน
                  </p>
                  <p>
                    <strong>4.</strong> ระบบจะพาไปหน้าเข้าสู่ระบบอัตโนมัติ
                  </p>
                </div>
              </div>

              {/* การเข้าสู่ระบบ */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Lock className="h-5 w-5 text-green-600" />
                  การเข้าสู่ระบบ
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>1.</strong> คลิกปุ่ม "เข้าสู่ระบบ" ที่มุมขวาบน
                  </p>
                  <p>
                    <strong>2.</strong> กรอกอีเมลและรหัสผ่าน
                  </p>
                  <p>
                    <strong>3.</strong> คลิก "เข้าสู่ระบบ"
                  </p>
                  <p>
                    <strong>4.</strong> ระบบจะพาไปหน้าหลักพร้อมใช้งาน
                  </p>
                </div>
              </div>

              {/* การค้นหาหนังสือ */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Search className="h-5 w-5 text-purple-600" />
                  การค้นหาหนังสือ
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>1.</strong> ใช้ช่องค้นหาด้านบนหน้าเว็บ
                  </p>
                  <p>
                    <strong>2.</strong> พิมพ์ชื่อหนังสือ, ผู้แต่ง, หรือหมวดหมู่
                  </p>
                  <p>
                    <strong>3.</strong> กดปุ่ม Enter หรือคลิกไอคอนค้นหา
                  </p>
                  <p>
                    <strong>4.</strong> เลือกหมวดหมู่จากเมนูด้านซ้าย
                  </p>
                  <p>
                    <strong>5.</strong> ใช้ตัวกรองราคาและการเรียงลำดับ
                  </p>
                </div>
              </div>

              {/* การสั่งซื้อ */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-orange-600" />
                  การสั่งซื้อหนังสือ
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>1.</strong> คลิกที่หนังสือที่ต้องการ
                  </p>
                  <p>
                    <strong>2.</strong> อ่านรายละเอียดและดูรูปภาพ
                  </p>
                  <p>
                    <strong>3.</strong> เลือกจำนวนที่ต้องการ
                  </p>
                  <p>
                    <strong>4.</strong> คลิก "เพิ่มลงตรกะ"
                  </p>
                  <p>
                    <strong>5.</strong> ไปที่ตะกร้าสินค้าเพื่อตรวจสอบ
                  </p>
                  <p>
                    <strong>6.</strong> คลิก "ชำระเงิน" เพื่อดำเนินการต่อ
                  </p>
                </div>
              </div>

              {/* การชำระเงิน */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-red-600" />
                  การชำระเงิน
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>1.</strong> กรอกข้อมูลที่อยู่จัดส่ง
                  </p>
                  <p>
                    <strong>2.</strong> เลือกวิธีการจัดส่ง
                  </p>
                  <p>
                    <strong>3.</strong> ใส่รหัสคูปอง (ถ้ามี)
                  </p>
                  <p>
                    <strong>4.</strong> เลือกวิธีการชำระเงิน
                  </p>
                  <p>
                    <strong>5.</strong> ตรวจสอบยอดรวมและคลิก "สั่งซื้อ"
                  </p>
                  <p>
                    <strong>6.</strong> ทำการชำระเงินตามวิธีที่เลือก
                  </p>
                </div>
              </div>

              {/* การติดตามคำสั่งซื้อ */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Package className="h-5 w-5 text-indigo-600" />
                  การติดตามคำสั่งซื้อ
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>1.</strong> เข้าสู่ระบบและไปที่ "ประวัติการสั่งซื้อ"
                  </p>
                  <p>
                    <strong>2.</strong> ดูสถานะคำสั่งซื้อปัจจุบัน
                  </p>
                  <p>
                    <strong>3.</strong> คลิกที่คำสั่งซื้อเพื่อดูรายละเอียด
                  </p>
                  <p>
                    <strong>4.</strong> ติดตามหมายเลขพัสดุ (ถ้ามี)
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* สำหรับผู้ดูแลระบบ */}
        <Card className="mb-8">
          <CardHeader className="bg-red-600 text-white">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Settings className="h-6 w-6" />
              คู่มือสำหรับผู้ดูแลระบบ (Admin)
            </CardTitle>
            <CardDescription className="text-red-100">วิธีการใช้งานระบบหลังบ้านสำหรับจัดการร้านค้า</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">ข้อมูลการเข้าสู่ระบบ Admin:</h4>
              <p className="text-sm text-yellow-700">
                <strong>อีเมล:</strong> admin@thaiexam.com
                <br />
                <strong>รหัสผ่าน:</strong> password
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* การเข้าสู่ระบบ Admin */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Lock className="h-5 w-5 text-red-600" />
                  การเข้าสู่ระบบ Admin
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>1.</strong> ไปที่ /admin หรือคลิกลิงก์ Admin
                  </p>
                  <p>
                    <strong>2.</strong> ใช้ข้อมูลเข้าสู่ระบบด้านบน
                  </p>
                  <p>
                    <strong>3.</strong> ระบบจะพาไปหน้า Dashboard
                  </p>
                  <p>
                    <strong>4.</strong> เมนูด้านซ้ายสำหรับจัดการต่างๆ
                  </p>
                </div>
              </div>

              {/* จัดการสินค้า */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  จัดการสินค้า
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>เพิ่มสินค้า:</strong> คลิก "เพิ่มสินค้าใหม่" กรอกข้อมูลครบถ้วน
                  </p>
                  <p>
                    <strong>แก้ไขสินค้า:</strong> คลิกไอคอน <Edit className="h-4 w-4 inline" /> ที่สินค้า
                  </p>
                  <p>
                    <strong>ลบสินค้า:</strong> คลิกไอคอน <Trash2 className="h-4 w-4 inline" /> และยืนยัน
                  </p>
                  <p>
                    <strong>ดูรายละเอียด:</strong> คลิกไอคอน <Eye className="h-4 w-4 inline" />
                  </p>
                </div>
              </div>

              {/* จัดการคำสั่งซื้อ */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Package className="h-5 w-5 text-green-600" />
                  จัดการคำสั่งซื้อ
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>ดูคำสั่งซื้อ:</strong> ไปที่เมนู "คำสั่งซื้อ"
                  </p>
                  <p>
                    <strong>อัปเดตสถานะ:</strong> เลือกสถานะใหม่และบันทึก
                  </p>
                  <p>
                    <strong>ค้นหาคำสั่งซื้อ:</strong> ใช้ช่องค้นหาด้านบน
                  </p>
                  <p>
                    <strong>กรองตามสถานะ:</strong> ใช้ตัวกรองด้านซ้าย
                  </p>
                </div>
              </div>

              {/* จัดการหมวดหมู่ */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Tag className="h-5 w-5 text-purple-600" />
                  จัดการหมวดหมู่
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>เพิ่มหมวดหมู่:</strong> คลิก "เพิ่มหมวดหมู่ใหม่"
                  </p>
                  <p>
                    <strong>แก้ไขหมวดหมู่:</strong> คลิกไอคอนแก้ไข
                  </p>
                  <p>
                    <strong>ลบหมวดหมู่:</strong> คลิกไอคอนลบ (ต้องไม่มีสินค้า)
                  </p>
                  <p>
                    <strong>จัดเรียง:</strong> ลากและวางเพื่อเรียงลำดับ
                  </p>
                </div>
              </div>

              {/* จัดการคูปอง */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Tag className="h-5 w-5 text-orange-600" />
                  จัดการคูปองส่วนลด
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>สร้างคูปอง:</strong> กำหนดรหัส, ประเภท, มูลค่า
                  </p>
                  <p>
                    <strong>กำหนดเงื่อนไข:</strong> ยอดขั้นต่ำ, วันหมดอายุ
                  </p>
                  <p>
                    <strong>จำกัดการใช้:</strong> จำนวนครั้งสูงสุด
                  </p>
                  <p>
                    <strong>เปิด/ปิดใช้งาน:</strong> สลับสถานะคูปอง
                  </p>
                </div>
              </div>

              {/* รายงานและสถิติ */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-indigo-600" />
                  รายงานและสถิติ
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>ยอดขายรวม:</strong> ดูยอดขายรายวัน/เดือน/ปี
                  </p>
                  <p>
                    <strong>สินค้าขายดี:</strong> รายงานสินค้าที่ขายดีที่สุด
                  </p>
                  <p>
                    <strong>สถิติลูกค้า:</strong> จำนวนลูกค้าใหม่และเก่า
                  </p>
                  <p>
                    <strong>ส่งออกรายงาน:</strong> ดาวน์โหลดเป็น Excel/PDF
                  </p>
                </div>
              </div>

              {/* การจัดส่ง */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Truck className="h-5 w-5 text-green-600" />
                  จัดการการจัดส่ง
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>ตั้งค่าการจัดส่ง:</strong> กำหนดวิธีและราคา
                  </p>
                  <p>
                    <strong>พิมพ์ใบจัดส่ง:</strong> สำหรับแต่ละคำสั่งซื้อ
                  </p>
                  <p>
                    <strong>อัปเดตเลขพัสดุ:</strong> ใส่หมายเลขติดตาม
                  </p>
                  <p>
                    <strong>แจ้งลูกค้า:</strong> ส่งอีเมลแจ้งสถานะ
                  </p>
                </div>
              </div>

              {/* การตลาด */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Bell className="h-5 w-5 text-pink-600" />
                  การตลาดและโปรโมชั่น
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>สร้างแคมเปญ:</strong> กำหนดโปรโมชั่นพิเศษ
                  </p>
                  <p>
                    <strong>ส่งอีเมลมาร์เก็ตติ้ง:</strong> แจ้งข่าวสารลูกค้า
                  </p>
                  <p>
                    <strong>จัดการแบนเนอร์:</strong> อัปโหลดภาพโฆษณา
                  </p>
                  <p>
                    <strong>ติดตามผล:</strong> วิเคราะห์ประสิทธิภาพ
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ฟีเจอร์พิเศษ */}
        <Card className="mb-8">
          <CardHeader className="bg-green-600 text-white">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Star className="h-6 w-6" />
              ฟีเจอร์พิเศษ
            </CardTitle>
            <CardDescription className="text-green-100">ความสามารถพิเศษของระบบที่ควรรู้</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <Search className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold mb-2">ค้นหาอัจฉริยะ</h4>
                <p className="text-sm text-gray-600">ค้นหาหนังสือด้วย AI ที่เข้าใจภาษาไทย</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <h4 className="font-semibold mb-2">รายการโปรด</h4>
                <p className="text-sm text-gray-600">บันทึกหนังสือที่สนใจไว้อ่านภายหลัง</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Share2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold mb-2">แชร์หนังสือ</h4>
                <p className="text-sm text-gray-600">แชร์หนังสือที่ชอบให้เพื่อนๆ</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* การแก้ไขปัญหา */}
        <Card>
          <CardHeader className="bg-orange-600 text-white">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <RefreshCw className="h-6 w-6" />
              การแก้ไขปัญหาเบื้องต้น
            </CardTitle>
            <CardDescription className="text-orange-100">วิธีแก้ไขปัญหาที่พบบ่อย</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">ปัญหาที่พบบ่อย</h4>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h5 className="font-medium">ลืมรหัสผ่าน</h5>
                    <p className="text-sm text-gray-600">คลิก "ลืมรหัสผ่าน" ที่หน้าเข้าสู่ระบบ และทำตามขั้นตอน</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h5 className="font-medium">ไม่สามารถชำระเงินได้</h5>
                    <p className="text-sm text-gray-600">ตรวจสอบข้อมูลบัตรเครดิต หรือลองวิธีการชำระเงินอื่น</p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4">
                    <h5 className="font-medium">สินค้าในตะกร้าหายไป</h5>
                    <p className="text-sm text-gray-600">ตรวจสอบการเข้าสู่ระบบ หรือล้างแคชเบราว์เซอร์</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h5 className="font-medium">หน้าเว็บโหลดช้า</h5>
                    <p className="text-sm text-gray-600">รีเฟรชหน้าเว็บ หรือลองใช้เบราว์เซอร์อื่น</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-lg mb-3">ติดต่อสอบถาม</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">อีเมล</p>
                      <p className="text-sm text-gray-600">support@thaiexam.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">โทรศัพท์</p>
                      <p className="text-sm text-gray-600">02-xxx-xxxx</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-medium">เวลาทำการ</p>
                      <p className="text-sm text-gray-600">จ-ศ 9:00-18:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8 text-gray-600">
          <p>© 2025 ร้านหนังสือเตรียมสอบไทย - คู่มือการใช้งาน เวอร์ชั่น 1.0</p>
        </div>
      </div>
    </div>
  )
}
