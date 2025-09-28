<?php
/**
 * Template Name: Track Order
 */

get_header(); ?>

<div class="container mx-auto px-4 py-8">
    <div class="max-w-2xl mx-auto">
        <div class="bg-white rounded-lg shadow-md p-6">
            <h1 class="text-2xl font-bold text-center mb-6">ติดตามคำสั่งซื้อ</h1>
            
            <form id="track-order-form" class="space-y-4">
                <div>
                    <label for="order_number" class="block text-sm font-medium text-gray-700 mb-2">
                        หมายเลขคำสั่งซื้อ
                    </label>
                    <input type="text" 
                           id="order_number" 
                           name="order_number" 
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                           placeholder="ใส่หมายเลขคำสั่งซื้อ เช่น OS20241201001"
                           required>
                </div>
                
                <button type="submit" 
                        class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    ค้นหา
                </button>
            </form>
            
            <div id="order-result" class="mt-6"></div>
        </div>
        
        <div class="mt-8 bg-blue-50 rounded-lg p-6">
            <h2 class="text-lg font-semibold mb-4">ติดต่อสอบถาม</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex items-center">
                    <i class="fas fa-phone text-blue-600 mr-3"></i>
                    <span>085-5555555</span>
                </div>
                <div class="flex items-center">
                    <i class="fab fa-line text-green-500 mr-3"></i>
                    <span>@opensheets</span>
                </div>
            </div>
        </div>
    </div>
</div>

<?php get_footer(); ?>
