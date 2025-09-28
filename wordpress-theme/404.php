<?php
/**
 * 404 Error Page Template
 */

get_header(); ?>

<div class="container mx-auto px-4 py-16">
    <div class="text-center">
        <div class="mb-8">
            <h1 class="text-9xl font-bold text-gray-300">404</h1>
            <h2 class="text-3xl font-semibold text-gray-700 mb-4">ไม่พบหน้าที่คุณต้องการ</h2>
            <p class="text-gray-600 mb-8">ขออภัย หน้าที่คุณกำลังมองหาอาจถูกย้าย ลบ หรือไม่มีอยู่จริง</p>
        </div>
        
        <div class="max-w-md mx-auto mb-8">
            <form role="search" method="get" action="<?php echo home_url('/'); ?>" class="flex">
                <input type="search" 
                       name="s" 
                       placeholder="ค้นหาสินค้า..." 
                       class="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <button type="submit" 
                        class="bg-blue-600 text-white px-6 py-2 rounded-r-md hover:bg-blue-700">
                    <i class="fas fa-search"></i>
                </button>
            </form>
        </div>
        
        <div class="space-x-4">
            <a href="<?php echo home_url(); ?>" 
               class="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors">
                กลับหน้าหลัก
            </a>
            <a href="<?php echo home_url('/products'); ?>" 
               class="bg-gray-200 text-gray-800 py-3 px-6 rounded-md hover:bg-gray-300 transition-colors">
                ดูสินค้าทั้งหมด
            </a>
        </div>
        
        <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div class="bg-white p-6 rounded-lg shadow-md">
                <i class="fas fa-book text-blue-600 text-3xl mb-4"></i>
                <h3 class="font-semibold mb-2">หนังสือเตรียมสอบ</h3>
                <p class="text-gray-600 text-sm">หนังสือเตรียมสอบคุณภาพสูง</p>
                <a href="<?php echo home_url('/products?category=books'); ?>" 
                   class="text-blue-600 hover:underline text-sm">ดูเพิ่มเติม</a>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-md">
                <i class="fas fa-file-alt text-green-600 text-3xl mb-4"></i>
                <h3 class="font-semibold mb-2">แบบทดสอบ</h3>
                <p class="text-gray-600 text-sm">แบบทดสอบและข้อสอบย้อนหลัง</p>
                <a href="<?php echo home_url('/products?category=tests'); ?>" 
                   class="text-blue-600 hover:underline text-sm">ดูเพิ่มเติม</a>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-md">
                <i class="fas fa-graduation-cap text-purple-600 text-3xl mb-4"></i>
                <h3 class="font-semibold mb-2">คอร์สเรียน</h3>
                <p class="text-gray-600 text-sm">คอร์สเรียนออนไลน์และออฟไลน์</p>
                <a href="<?php echo home_url('/products?category=courses'); ?>" 
                   class="text-blue-600 hover:underline text-sm">ดูเพิ่มเติม</a>
            </div>
        </div>
    </div>
</div>

<?php get_footer(); ?>
