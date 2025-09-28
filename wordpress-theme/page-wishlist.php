<?php
/**
 * Template Name: Wishlist
 */

get_header();

// Get wishlist items
global $wpdb;
$session_id = session_id();
if (!$session_id) {
    session_start();
    $session_id = session_id();
}

$wishlist_items = $wpdb->get_results($wpdb->prepare(
    "SELECT w.*, p.post_title, p.post_content 
     FROM {$wpdb->prefix}opensheets_wishlist w 
     JOIN {$wpdb->posts} p ON w.product_id = p.ID 
     WHERE w.session_id = %s 
     ORDER BY w.created_at DESC",
    $session_id
));
?>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center mb-8">รายการโปรด</h1>
    
    <?php if (empty($wishlist_items)): ?>
        <div class="text-center py-12">
            <i class="fas fa-heart text-gray-300 text-6xl mb-4"></i>
            <h2 class="text-xl font-semibold text-gray-600 mb-2">ยังไม่มีสินค้าในรายการโปรด</h2>
            <p class="text-gray-500 mb-6">เพิ่มสินค้าที่คุณสนใจเพื่อดูภายหลัง</p>
            <a href="<?php echo home_url('/products'); ?>" 
               class="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">
                เลือกซื้อสินค้า
            </a>
        </div>
    <?php else: ?>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <?php foreach ($wishlist_items as $item): 
                $product_id = $item->product_id;
                $price = get_post_meta($product_id, '_price', true);
                $image = get_the_post_thumbnail_url($product_id, 'medium');
                $permalink = get_permalink($product_id);
            ?>
                <div class="bg-white rounded-lg shadow-md overflow-hidden wishlist-item" data-product-id="<?php echo $product_id; ?>">
                    <div class="relative">
                        <img src="<?php echo esc_url($image ?: '/wp-content/themes/opensheets/assets/images/placeholder.jpg'); ?>" 
                             alt="<?php echo esc_attr($item->post_title); ?>" 
                             class="w-full h-48 object-cover">
                        <button class="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 remove-from-wishlist"
                                data-product-id="<?php echo $product_id; ?>">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="p-4">
                        <h3 class="font-semibold text-lg mb-2">
                            <a href="<?php echo esc_url($permalink); ?>" class="hover:text-blue-600">
                                <?php echo esc_html($item->post_title); ?>
                            </a>
                        </h3>
                        
                        <p class="text-gray-600 text-sm mb-3 line-clamp-2">
                            <?php echo wp_trim_words($item->post_content, 15); ?>
                        </p>
                        
                        <div class="flex items-center justify-between">
                            <span class="text-blue-600 font-bold text-xl">
                                <?php echo number_format($price); ?> บาท
                            </span>
                            
                            <div class="flex space-x-2">
                                <button class="add-to-cart-btn bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                        data-product-id="<?php echo $product_id; ?>">
                                    <i class="fas fa-shopping-cart mr-1"></i>
                                    เพิ่มในตะกร้า
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</div>

<script>
jQuery(document).ready(function($) {
    $('.remove-from-wishlist').click(function() {
        const $btn = $(this);
        const productId = $btn.data('product-id');
        
        $.ajax({
            url: '<?php echo admin_url('admin-ajax.php'); ?>',
            type: 'POST',
            data: {
                action: 'remove_from_wishlist',
                product_id: productId,
                nonce: '<?php echo wp_create_nonce('opensheets_nonce'); ?>'
            },
            success: function(response) {
                const data = JSON.parse(response);
                if (data.success) {
                    $btn.closest('.wishlist-item').fadeOut();
                    OpenSheets.showNotification(data.message, 'success');
                }
            }
        });
    });
});
</script>

<?php get_footer(); ?>
