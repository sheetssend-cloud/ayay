<?php
/**
 * The template for displaying the footer
 *
 * @package OpenSheets
 */
?>

    </div> #content 

    <footer id="colophon" class="site-footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3><?php _e('OPEN SHEETS', 'opensheets'); ?></h3>
                    <p><?php _e('ศูนย์รวมหนังสือเตรียมสอบคุณภาพสูง พร้อมบริการที่ดีที่สุด', 'opensheets'); ?></p>
                    <div class="contact-info">
                        <p><strong><?php _e('โทร:', 'opensheets'); ?></strong> <?php echo get_theme_mod('opensheets_phone', '085-5555555'); ?></p>
                        <p><strong><?php _e('LINE:', 'opensheets'); ?></strong> <?php echo get_theme_mod('opensheets_line', '@opensheets'); ?></p>
                    </div>
                </div>

                <div class="footer-section">
                    <h3><?php _e('หมวดหมู่สินค้า', 'opensheets'); ?></h3>
                    <?php
                    $categories = get_terms(array(
                        'taxonomy' => 'exam_category',
                        'hide_empty' => false,
                        'number' => 5,
                    ));
                    if ($categories && !is_wp_error($categories)) :
                    ?>
                        <ul>
                            <?php foreach ($categories as $category) : ?>
                                <li><a href="<?php echo get_term_link($category); ?>"><?php echo $category->name; ?></a></li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endif; ?>
                </div>

                <div class="footer-section">
                    <h3><?php _e('ลิงก์ด่วน', 'opensheets'); ?></h3>
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'footer',
                        'menu_class'     => 'footer-menu',
                        'fallback_cb'    => false,
                    ));
                    ?>
                </div>

                <div class="footer-section">
                    <h3><?php _e('ติดตามเรา', 'opensheets'); ?></h3>
                    <div class="social-links">
                        <a href="#" class="social-link facebook"><?php _e('Facebook', 'opensheets'); ?></a>
                        <a href="#" class="social-link line"><?php _e('LINE', 'opensheets'); ?></a>
                        <a href="#" class="social-link instagram"><?php _e('Instagram', 'opensheets'); ?></a>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <div class="copyright">
                    <p>&copy; <?php echo date('Y'); ?> OPEN SHEETS. <?php _e('สงวนลิขสิทธิ์', 'opensheets'); ?></p>
                </div>
                <div class="footer-links">
                    <a href="<?php echo esc_url(home_url('/privacy-policy')); ?>"><?php _e('นโยบายความเป็นส่วนตัว', 'opensheets'); ?></a>
                    <a href="<?php echo esc_url(home_url('/terms')); ?>"><?php _e('ข้อกำหนดการใช้งาน', 'opensheets'); ?></a>
                </div>
            </div>
        </div>
    </footer>
</div> #page 

<?php wp_footer(); ?>

<script>
// Cart functionality
jQuery(document).ready(function($) {
    // Add to cart
    $('.add-to-cart-btn').on('click', function(e) {
        e.preventDefault();
        
        var productId = $(this).data('product-id');
        var quantity = $(this).closest('.product-card').find('.quantity-input').val() || 1;
        
        $.ajax({
            url: opensheets_ajax.ajax_url,
            type: 'POST',
            data: {
                action: 'opensheets_add_to_cart',
                product_id: productId,
                quantity: quantity,
                nonce: opensheets_ajax.nonce
            },
            success: function(response) {
                if (response.success) {
                    $('.cart-count').text(response.data.cart_count);
                    alert(response.data.message);
                }
            }
        });
    });
    
    // Update cart count on page load
    $.ajax({
        url: opensheets_ajax.ajax_url,
        type: 'POST',
        data: {
            action: 'opensheets_get_cart',
            nonce: opensheets_ajax.nonce
        },
        success: function(response) {
            if (response.success) {
                $('.cart-count').text(response.data.count);
            }
        }
    });
});
</script>

</body>
</html>
