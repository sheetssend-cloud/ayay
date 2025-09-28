<?php
/**
 * Template for cart page
 *
 * @package OpenSheets
 */

get_header(); ?>

<main id="primary" class="site-main">
    <div class="container">
        <header class="page-header">
            <h1 class="page-title"><?php _e('ตะกร้าสินค้า', 'opensheets'); ?></h1>
        </header>

        <div class="cart-content">
            <div class="cart-table-container">
                <table class="cart-table" id="cart-table">
                    <thead>
                        <tr>
                            <th><?php _e('สินค้า', 'opensheets'); ?></th>
                            <th><?php _e('ราคา', 'opensheets'); ?></th>
                            <th><?php _e('จำนวน', 'opensheets'); ?></th>
                            <th><?php _e('รวม', 'opensheets'); ?></th>
                            <th><?php _e('ลบ', 'opensheets'); ?></th>
                        </tr>
                    </thead>
                    <tbody id="cart-items">
                         Cart items will be loaded here via AJAX 
                    </tbody>
                </table>
                
                <div class="cart-empty" id="cart-empty" style="display: none;">
                    <h2><?php _e('ตะกร้าสินค้าว่าง', 'opensheets'); ?></h2>
                    <p><?php _e('คุณยังไม่ได้เพิ่มสินค้าลงในตะกร้า', 'opensheets'); ?></p>
                    <a href="<?php echo get_post_type_archive_link('exam_product'); ?>" class="btn btn-primary">
                        <?php _e('เลือกซื้อสินค้า', 'opensheets'); ?>
                    </a>
                </div>
            </div>

            <div class="cart-summary">
                <div class="summary-box">
                    <h3><?php _e('สรุปคำสั่งซื้อ', 'opensheets'); ?></h3>
                    
                    <div class="summary-row">
                        <span><?php _e('ยอดรวมสินค้า:', 'opensheets'); ?></span>
                        <span id="subtotal">0.00 ฿</span>
                    </div>
                    
                    <div class="summary-row">
                        <span><?php _e('ค่าจัดส่ง:', 'opensheets'); ?></span>
                        <span id="shipping">50.00 ฿</span>
                    </div>
                    
                    <div class="summary-row total">
                        <span><?php _e('ยอดรวมทั้งหมด:', 'opensheets'); ?></span>
                        <span id="total">0.00 ฿</span>
                    </div>
                    
                    <div class="coupon-section">
                        <input type="text" id="coupon-code" placeholder="<?php _e('รหัสคูปอง', 'opensheets'); ?>">
                        <button type="button" id="apply-coupon" class="btn btn-secondary">
                            <?php _e('ใช้คูปอง', 'opensheets'); ?>
                        </button>
                    </div>
                    
                    <div class="checkout-actions">
                        <button type="button" id="update-cart" class="btn btn-outline">
                            <?php _e('อัปเดตตะกร้า', 'opensheets'); ?>
                        </button>
                        
                        <button type="button" id="proceed-checkout" class="btn btn-primary">
                            <?php _e('ดำเนินการสั่งซื้อ', 'opensheets'); ?>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<script>
jQuery(document).ready(function($) {
    // Load cart on page load
    loadCart();
    
    function loadCart() {
        $.ajax({
            url: opensheets_ajax.ajax_url,
            type: 'POST',
            data: {
                action: 'opensheets_get_cart',
                nonce: opensheets_ajax.nonce
            },
            success: function(response) {
                if (response.success) {
                    displayCart(response.data);
                }
            }
        });
    }
    
    function displayCart(cartData) {
        var cartItems = $('#cart-items');
        var cartEmpty = $('#cart-empty');
        var cartTable = $('#cart-table');
        
        if (cartData.items.length === 0) {
            cartTable.hide();
            cartEmpty.show();
            return;
        }
        
        cartTable.show();
        cartEmpty.hide();
        
        cartItems.empty();
        
        cartData.items.forEach(function(item) {
            var row = `
                <tr data-product-id="${item.id}">
                    <td class="product-info">
                        <h4>${item.title}</h4>
                    </td>
                    <td class="product-price">${item.price.toFixed(2)} ฿</td>
                    <td class="product-quantity">
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-product-id="${item.id}">
                    </td>
                    <td class="product-subtotal">${item.subtotal.toFixed(2)} ฿</td>
                    <td class="product-remove">
                        <button type="button" class="remove-item" data-product-id="${item.id}">×</button>
                    </td>
                </tr>
            `;
            cartItems.append(row);
        });
        
        // Update totals
        var subtotal = cartData.total;
        var shipping = subtotal >= 500 ? 0 : 50;
        var total = subtotal + shipping;
        
        $('#subtotal').text(subtotal.toFixed(2) + ' ฿');
        $('#shipping').text(shipping.toFixed(2) + ' ฿');
        $('#total').text(total.toFixed(2) + ' ฿');
    }
    
    // Update quantity
    $(document).on('change', '.quantity-input', function() {
        var productId = $(this).data('product-id');
        var quantity = $(this).val();
        
        $.ajax({
            url: opensheets_ajax.ajax_url,
            type: 'POST',
            data: {
                action: 'opensheets_update_cart',
                product_id: productId,
                quantity: quantity,
                nonce: opensheets_ajax.nonce
            },
            success: function(response) {
                if (response.success) {
                    loadCart();
                }
            }
        });
    });
    
    // Remove item
    $(document).on('click', '.remove-item', function() {
        var productId = $(this).data('product-id');
        
        $.ajax({
            url: opensheets_ajax.ajax_url,
            type: 'POST',
            data: {
                action: 'opensheets_remove_from_cart',
                product_id: productId,
                nonce: opensheets_ajax.nonce
            },
            success: function(response) {
                if (response.success) {
                    loadCart();
                    $('.cart-count').text(response.data.cart_count);
                }
            }
        });
    });
    
    // Proceed to checkout
    $('#proceed-checkout').on('click', function() {
        window.location.href = '<?php echo home_url('/checkout'); ?>';
    });
});
</script>

<?php get_footer(); ?>
