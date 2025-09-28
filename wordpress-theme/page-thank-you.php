<?php
/**
 * Template Name: Thank You
 */

get_header();

$order_number = isset($_GET['order']) ? sanitize_text_field($_GET['order']) : '';
?>

<div class="container mx-auto px-4 py-8">
    <div class="max-w-2xl mx-auto text-center">
        <div class="bg-white rounded-lg shadow-md p-8">
            <div class="mb-6">
                <i class="fas fa-check-circle text-green-500 text-6xl mb-4"></i>
                <h1 class="text-3xl font-bold text-gray-800 mb-2">ขอบคุณสำหรับคำสั่งซื้อ!</h1>
                <?php if ($order_number): ?>
                    <p class="text-lg text-gray-600">หมายเลขคำสั่งซื้อ: <strong><?php echo esc_html($order_number); ?></strong></p>
                <?php endif; ?>
            </div>
            
            <div class="bg-blue-50 rounded-lg p-6 mb-6">
                <h2 class="text-xl font-semibold mb-4">ขั้นตอนต่อไป</h2>
                <div class="space-y-3 text-left">
                    <div class="flex items-start">
                        <span class="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">1</span>
                        <p>เราจะส่งอีเมลยืนยันคำสั่งซื้อให้คุณภายใน 5 นาที</p>
                    </div>
                    <div class="flex items-start">
                        <span class="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">2</span>
                        <p>ทีมงานจะติดต่อยืนยันรายละเอียดการจัดส่งภายใน 24 ชั่วโมง</p>
                    </div>
                    <div class="flex items-start">
                        <span class="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">3</span>
                        <p>สินค้าจะถูกจัดส่งภายใน 1-3 วันทำการ</p>
                    </div>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <a href="<?php echo home_url('/track'); ?>" 
                   class="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors">
                    ติดตามคำสั่งซื้อ
                </a>
                <a href="<?php echo home_url(); ?>" 
                   class="bg-gray-200 text-gray-800 py-3 px-6 rounded-md hover:bg-gray-300 transition-colors">
                    กลับหน้าหลัก
                </a>
            </div>
            
            <div class="border-t pt-6">
                <h3 class="text-lg font-semibold mb-3">ติดต่อสอบถาม</h3>
                <div class="flex justify-center space-x-6">
                    <div class="flex items-center">
                        <i class="fas fa-phone text-blue-600 mr-2"></i>
                        <span>085-5555555</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fab fa-line text-green-500 mr-2"></i>
                        <span>@opensheets</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php get_footer(); ?>
