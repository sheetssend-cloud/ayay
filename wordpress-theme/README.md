# OPEN SHEETS WordPress Theme

ธีม WordPress สำหรับร้านขายหนังสือเตรียมสอบ OPEN SHEETS พร้อมระบบจัดการสินค้าและ Elementor Pro

## คุณสมบัติ

### ระบบหลัก
- ✅ ระบบจัดการสินค้า (Custom Post Type)
- ✅ ระบบตะกร้าสินค้า (AJAX)
- ✅ ระบบสั่งซื้อและติดตามคำสั่งซื้อ
- ✅ ระบบคูปองส่วนลด
- ✅ ระบบ Wishlist
- ✅ ระบบค้นหาและกรองสินค้า
- ✅ ระบบรีวิวและคะแนน
- ✅ ระบบแอดมิน WordPress

### Elementor Pro
- ✅ Custom Widgets สำหรับแสดงสินค้า
- ✅ Product Grid Widget
- ✅ Product Carousel Widget
- ✅ Store Info Widget
- ✅ Cart Widget
- ✅ รองรับ Elementor Theme Builder

### ระบบฐานข้อมูล
- ✅ ตารางคำสั่งซื้อ (opensheets_orders)
- ✅ ตารางรายการสินค้าในคำสั่งซื้อ (opensheets_order_items)
- ✅ ตารางคูปอง (opensheets_coupons)
- ✅ ตารางรายการโปรด (opensheets_wishlist)
- ✅ ตารางการดูสินค้า (opensheets_product_views)
- ✅ ตารางรีวิว (opensheets_reviews)
- ✅ ตารางบันทึกสต็อก (opensheets_inventory_log)

## การติดตั้ง

### ขั้นตอนที่ 1: อัปโหลดธีม
1. ดาวน์โหลดไฟล์ธีม
2. ไปที่ WordPress Admin > Appearance > Themes
3. คลิก "Add New" > "Upload Theme"
4. เลือกไฟล์ ZIP และอัปโหลด
5. เปิดใช้งานธีม

### ขั้นตอนที่ 2: ติดตั้งปลั๊กอินที่จำเป็น
\`\`\`
- Elementor (ฟรี)
- Elementor Pro (สำหรับ Theme Builder)
- Contact Form 7 (สำหรับฟอร์มติดต่อ)
\`\`\`

### ขั้นตอนที่ 3: สร้างหน้าพื้นฐาน
สร้างหน้าใหม่ใน WordPress Admin และเลือก Template:

1. **หน้าหลัก**: Template "Front Page"
2. **สินค้าทั้งหมด**: Template "Products Archive"
3. **ตะกร้าสินค้า**: Template "Cart"
4. **ชำระเงิน**: Template "Checkout"
5. **ติดตามคำสั่งซื้อ**: Template "Track Order"
6. **ขอบคุณ**: Template "Thank You"
7. **รายการโปรด**: Template "Wishlist"

### ขั้นตอนที่ 4: ตั้งค่าเมนู
1. ไปที่ Appearance > Menus
2. สร้างเมนูใหม่ชื่อ "Main Menu"
3. เพิ่มลิงก์:
   - หน้าหลัก
   - สินค้าทั้งหมด
   - ติดตามคำสั่งซื้อ
   - ติดต่อเรา
4. กำหนดให้เป็น Primary Menu

### ขั้นตอนที่ 5: ตั้งค่า Permalink
1. ไปที่ Settings > Permalinks
2. เลือก "Post name" หรือ "Custom Structure"
3. บันทึกการเปลี่ยนแปลง

## การใช้งาน

### เพิ่มสินค้า
1. ไปที่ WordPress Admin > Exam Products > Add New
2. ใส่ชื่อสินค้า, รายละเอียด, และรูปภาพ
3. ตั้งราคาใน Custom Fields "_price"
4. เลือกหมวดหมู่สินค้า
5. เผยแพร่

### จัดการคำสั่งซื้อ
1. ไปที่ OPEN SHEETS > Orders
2. ดูรายการคำสั่งซื้อทั้งหมด
3. เปลี่ยนสถานะคำสั่งซื้อ
4. ดูรายละเอียดลูกค้าและสินค้า

### สร้างคูปองส่วนลด
1. ไปที่ OPEN SHEETS > Coupons
2. คลิก "Add New Coupon"
3. ใส่รหัสคูปอง, ประเภท (เปอร์เซ็นต์/จำนวนเงิน), และค่าส่วนลด
4. ตั้งวันหมดอายุ (ถ้าต้องการ)
5. บันทึก

### ใช้งาน Elementor Widgets
1. แก้ไขหน้าด้วย Elementor
2. ลาก Widget "OPEN SHEETS" จากแผง Elements
3. เลือก Widget ที่ต้องการ:
   - **Product Grid**: แสดงสินค้าแบบตาราง
   - **Product Carousel**: แสดงสินค้าแบบสไลด์
   - **Store Info**: แสดงข้อมูลร้าน
   - **Cart**: แสดงตะกร้าสินค้า
4. ปรับแต่งการตั้งค่าตามต้องการ

## การปรับแต่ง

### เปลี่ยนสีธีม
แก้ไขไฟล์ `assets/css/style.css`:
\`\`\`css
:root {
    --primary-color: #3B82F6;    /* สีหลัก */
    --secondary-color: #10B981;  /* สีรอง */
    --accent-color: #F59E0B;     /* สีเน้น */
}
\`\`\`

### เปลี่ยนข้อมูลร้าน
แก้ไขไฟล์ `functions.php` ในส่วน:
\`\`\`php
// Store Information
define('STORE_NAME', 'OPEN SHEETS');
define('STORE_PHONE', '085-5555555');
define('STORE_LINE', '@opensheets');
define('STORE_EMAIL', 'info@opensheets.com');
\`\`\`

### เพิ่ม Custom Fields
ใช้ Advanced Custom Fields (ACF) หรือแก้ไขไฟล์ `includes/class-opensheets-meta-boxes.php`

## API Endpoints

### REST API
\`\`\`
GET /wp-json/opensheets/v1/products - ดึงข้อมูลสินค้าทั้งหมด
POST /wp-json/opensheets/v1/orders - สร้างคำสั่งซื้อใหม่
GET /wp-json/opensheets/v1/orders/{id} - ดึงข้อมูลคำสั่งซื้อ
\`\`\`

### AJAX Actions
\`\`\`
add_to_cart - เพิ่มสินค้าในตะกร้า
remove_from_cart - ลบสินค้าออกจากตะกร้า
update_cart_quantity - อัปเดตจำนวนสินค้าในตะกร้า
process_order - ดำเนินการสั่งซื้อ
track_order - ติดตามคำสั่งซื้อ
apply_coupon - ใช้คูปองส่วนลด
search_products - ค้นหาสินค้า
\`\`\`

## การสำรองข้อมูล

### ฐานข้อมูล
ใช้ปลั๊กอิน UpdraftPlus หรือ BackupBuddy สำรองข้อมูลอัตโนมัติ

### ไฟล์
สำรองโฟลเดอร์ `/wp-content/themes/opensheets/` และ `/wp-content/uploads/`

## การแก้ไขปัญหา

### ปัญหาที่พบบ่อย

**1. สินค้าไม่แสดง**
- ตรวจสอบ Permalink Settings
- ตรวจสอบว่าสินค้าถูกเผยแพร่แล้ว
- ตรวจสอบ Custom Post Type registration

**2. ตะกร้าสินค้าไม่ทำงาน**
- ตรวจสอบ jQuery ถูกโหลด
- ตรวจสอบ AJAX URL และ Nonce
- เปิด Browser Console ดู JavaScript errors

**3. Elementor Widgets ไม่แสดง**
- ตรวจสอบว่า Elementor Pro ติดตั้งแล้ว
- Regenerate CSS ใน Elementor > Tools
- ตรวจสอบ Widget registration ใน functions.php

**4. อีเมลยืนยันไม่ส่ง**
- ตรวจสอบการตั้งค่า SMTP
- ใช้ปลั๊กอิน WP Mail SMTP
- ตรวจสอบ Server mail configuration

## การอัปเดต

### อัปเดตธีม
1. สำรองข้อมูลก่อนอัปเดต
2. อัปโหลดไฟล์ธีมใหม่
3. ตรวจสอบการทำงานของเว็บไซต์
4. อัปเดต Custom CSS (ถ้ามี)

### อัปเดตฐานข้อมูล
ระบบจะอัปเดตฐานข้อมูลอัตโนมัติเมื่อเปิดใช้งานธีม

## การสนับสนุน

สำหรับการสนับสนุนและคำถาม:
- **โทร**: 085-5555555
- **LINE**: @opensheets
- **อีเมล**: support@opensheets.com

## เวอร์ชัน

**เวอร์ชัน 1.0.0**
- ระบบพื้นฐานสมบูรณ์
- รองรับ Elementor Pro
- ระบบ AJAX ครบถ้วน
- ระบบแอดมิน WordPress

---

© 2025 OPEN SHEETS. สงวนลิขสิทธิ์.
