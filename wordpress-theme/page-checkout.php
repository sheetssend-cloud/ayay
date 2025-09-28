<?php
/**
 * Template for checkout page
 *
 * @package OpenSheets
 */

get_header(); ?>

<main id="primary" class="site-main">
    <div class="container">
        <header class="page-header">
            <h1 class="page-title"><?php _e('ชำระเงิน', 'opensheets'); ?></h1>
        </header>

        <div class="checkout-content">
            <form id="checkout-form" class="checkout-form">
                <?php wp_nonce_field('opensheets_nonce', 'opensheets_nonce'); ?>
                
                <div class="checkout-sections">
                    <div class="billing-section">
                        <h2><?php _e('ข้อมูลการจัดส่ง', 'opensheets'); ?></h2>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="customer_name"><?php _e('ชื่อ-นามสกุล', 'opensheets'); ?> <span class="required">*</span></label>
                                <input type="text" id="customer_name" name="customer_name" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group half">
                                <label for="customer_email"><?php _e('อีเมล', 'opensheets'); ?> <span class="required">*</span></label>
                                <input type="email" id="customer_email" name="customer_email" required>
                            </div>
                            <div class="form-group half">
                                <label for="customer_phone"><?php _e('เบอร์โทรศัพท์', 'opensheets'); ?> <span class="required">*</span></label>
                                <input type="tel" id="customer_phone" name="customer_phone" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="customer_address"><?php _e('ที่อยู่จัดส่ง', 'opensheets'); ?> <span class="required">*</span></label>
                                <textarea id="customer_address" name="customer_address" rows="4" required></textarea>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="notes"><?php _e('หมายเหตุ (ถ้ามี)', 'opensheets'); ?></label>
                                <textarea id="notes" name="notes" rows="3"></textarea>
                            </div>
                        </div>
                    </div>
                    
                    <div class="payment-section">
                        <h2><?php _e('วิธีการชำระเงิน', 'opensheets'); ?></h2>
                        
                        <div class="payment-methods">
                            <label class="payment-method">
                                <input type="radio" name="payment_method" value="bank_transfer" checked>
                                <div class="method-info">
                                    <h3><?php _e('โอนเงินผ่านธนาคาร', 'opensheets'); ?></h3>
                                    <p><?php _e('โอนเงินเข้าบัญชีธนาคารและแจ้งหลักฐานการโอน', 'opensheets'); ?></p>
                                </div>
                            </label>
                            
                            <label class="payment-method">
                                <input type="radio" name="payment_method" value="promptpay">
                                <div class="method-info">
                                    <h3><?php _e('พร้อมเพย์', 'opensheets'); ?></h3>
                                    <p><?php _e('ชำระผ่าน QR Code พร้อมเพย์', 'opensheets'); ?></p>
                                </div>
                            </label>
                            
                            <label class="payment-method">
                                <input type="radio" name="payment_method" value="cod">
                                <div class="method-info">
                                    <h3><?php _e('เก็บเงินปลายทาง', 'opensheets'); ?></h3>
                                    <p><?php _e('ชำระเงินเมื่อได้รับสินค้า (เพิ่มค่าธรรมเนียม 20 บาท)', 'opensheets'); ?></p>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                
                <div class="order-summary">
                    <h2><?php _e('สรุปคำสั่งซื้อ', 'opensheets'); ?></h2>
                    
                    <div class="summary-items" id="checkout-items">
                         Items will be loaded via JavaScript 
                    </div>
                    
                    <div class="coupon-section">
                        <div class="coupon-input">
                            <input type="text" id="coupon-code" placeholder="<?php _e('รหัสคูปอง', 'opensheets'); ?>">
                            <button type="button" id="apply-coupon-btn" class="btn btn-secondary">
                                <?php _e('ใช้คูปอง', 'opensheets'); ?>
                            </button>
                        </div>
                        <div id="coupon-message" class="coupon-message"></div>
                    </div>
                    
                    <div class="order-totals">
                        <div class="total-row">
                            <span><?php _e('ยอดรวมสินค้า:', 'opensheets'); ?></span>
                            <span id="subtotal">0.00 ฿</span>
                        </div>
                        <div class="total-row">
                            <span><?php _e('ค่าจัดส่ง:', 'opensheets'); ?></span>
                            <span id="shipping-cost">50.00 ฿</span>
                        </div>
                        <div class="total-row discount-row" id="discount-row" style="display: none;">
                            <span><?php _e('ส่วนลด:', 'opensheets'); ?></span>
                            <span id="discount-amount">-0.00 ฿</span>
                        </div>
                        <div class="total-row cod-fee-row" id="cod-fee-row" style="display: none;">
                            <span><?php _e('ค่าธรรมเนียม COD:', 'opensheets'); ?></span>
                            <span>20.00 ฿</span>
                        </div>
                        <div class="total-row final-total">
                            <span><?php _e('ยอดรวมทั้งหมด:', 'opensheets'); ?></span>
                            <span id="final-total">0.00 ฿</span>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn btn-primary btn-large" id="place-order-btn">
                        <?php _e('สั่งซื้อ', 'opensheets'); ?>
                    </button>
                </div>
            </form>
        </div>
    </div>
</main>

<script>
jQuery(document).ready(function($) {
    let cartData = {};
    let appliedCoupon = null;
    
    // Load cart data
    loadCheckoutData();
    
    function loadCheckoutData() {
        $.ajax({
            url: opensheets_ajax.ajax_url,
            type: 'POST',
            data: {
                action: 'opensheets_get_cart',
                nonce: opensheets_ajax.nonce
            },
            success: function(response) {
                if (response.success) {
                    cartData = response.data;
                    displayCheckoutItems();
                    updateTotals();
                }
            }
        });
    }
    
    function displayCheckoutItems() {
        const container = $('#checkout-items');
        container.empty();
        
        if (cartData.items && cartData.items.length > 0) {
            cartData.items.forEach(function(item) {
                const itemHtml = `
                    <div class="summary-item">
                        <div class="item-info">
                            <h4>${item.title}</h4>
                            <span class="quantity">จำนวน: ${item.quantity}</span>
                        </div>
                        <div class="item-price">${item.subtotal.toFixed(2)} ฿</div>
                    </div>
                `;
                container.append(itemHtml);
            });
        } else {
            container.html('<p>ไม่มีสินค้าในตะกร้า</p>');
            $('#place-order-btn').prop('disabled', true);
        }
    }
    
    function updateTotals() {
        const subtotal = cartData.total || 0;
        let shipping = subtotal >= 500 ? 0 : 50;
        let discount = 0;
        let codFee = 0;
        
        // Check payment method
        const paymentMethod = $('input[name="payment_method"]:checked').val();
        if (paymentMethod === 'cod') {
            codFee = 20;
            $('#cod-fee-row').show();
        } else {
            $('#cod-fee-row').hide();
        }
        
        // Apply coupon discount
        if (appliedCoupon) {
            discount = appliedCoupon.discount || 0;
            $('#discount-row').show();
            $('#discount-amount').text('-' + discount.toFixed(2) + ' ฿');
        } else {
            $('#discount-row').hide();
        }
        
        const total = subtotal + shipping + codFee - discount;
        
        $('#subtotal').text(subtotal.toFixed(2) + ' ฿');
        $('#shipping-cost').text(shipping.toFixed(2) + ' ฿');
        $('#final-total').text(total.toFixed(2) + ' ฿');
    }
    
    // Payment method change
    $('input[name="payment_method"]').on('change', function() {
        updateTotals();
    });
    
    // Apply coupon
    $('#apply-coupon-btn').on('click', function() {
        const couponCode = $('#coupon-code').val().trim();
        if (!couponCode) return;
        
        $.ajax({
            url: opensheets_ajax.ajax_url,
            type: 'POST',
            data: {
                action: 'opensheets_apply_coupon',
                coupon_code: couponCode,
                cart_total: cartData.total,
                nonce: opensheets_ajax.nonce
            },
            success: function(response) {
                if (response.success) {
                    appliedCoupon = {
                        code: couponCode,
                        discount: response.data.discount
                    };
                    $('#coupon-message').html('<span class="success">' + response.data.message + '</span>');
                    updateTotals();
                } else {
                    $('#coupon-message').html('<span class="error">' + response.data.message + '</span>');
                }
            }
        });
    });
    
    // Submit order
    $('#checkout-form').on('submit', function(e) {
        e.preventDefault();
        
        const formData = $(this).serialize();
        $('#place-order-btn').prop('disabled', true).text('กำลังดำเนินการ...');
        
        $.ajax({
            url: opensheets_ajax.ajax_url,
            type: 'POST',
            data: formData + '&action=opensheets_place_order',
            success: function(response) {
                if (response.success) {
                    alert('สั่งซื้อสำเร็จ! เลขที่คำสั่งซื้อ: ' + response.data.order_id);
                    window.location.href = '<?php echo home_url('/order-success'); ?>?order_id=' + response.data.order_id;
                } else {
                    alert('เกิดข้อผิดพลาด: ' + response.data.message);
                    $('#place-order-btn').prop('disabled', false).text('สั่งซื้อ');
                }
            },
            error: function() {
                alert('เกิดข้อผิดพลาดในการเชื่อมต่อ');
                $('#place-order-btn').prop('disabled', false).text('สั่งซื้อ');
            }
        });
    });
});
</script>

<?php get_footer(); ?>
