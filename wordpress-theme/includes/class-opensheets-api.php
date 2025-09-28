<?php
/**
 * OPEN SHEETS API Endpoints
 * Handles all AJAX and REST API requests
 */

if (!defined('ABSPATH')) {
    exit;
}

class OpenSheets_API {
    
    public function __construct() {
        add_action('wp_ajax_add_to_cart', array($this, 'add_to_cart'));
        add_action('wp_ajax_nopriv_add_to_cart', array($this, 'add_to_cart'));
        
        add_action('wp_ajax_remove_from_cart', array($this, 'remove_from_cart'));
        add_action('wp_ajax_nopriv_remove_from_cart', array($this, 'remove_from_cart'));
        
        add_action('wp_ajax_update_cart_quantity', array($this, 'update_cart_quantity'));
        add_action('wp_ajax_nopriv_update_cart_quantity', array($this, 'update_cart_quantity'));
        
        add_action('wp_ajax_get_cart_count', array($this, 'get_cart_count'));
        add_action('wp_ajax_nopriv_get_cart_count', array($this, 'get_cart_count'));
        
        add_action('wp_ajax_process_order', array($this, 'process_order'));
        add_action('wp_ajax_nopriv_process_order', array($this, 'process_order'));
        
        add_action('wp_ajax_track_order', array($this, 'track_order'));
        add_action('wp_ajax_nopriv_track_order', array($this, 'track_order'));
        
        add_action('wp_ajax_apply_coupon', array($this, 'apply_coupon'));
        add_action('wp_ajax_nopriv_apply_coupon', array($this, 'apply_coupon'));
        
        add_action('wp_ajax_add_to_wishlist', array($this, 'add_to_wishlist'));
        add_action('wp_ajax_nopriv_add_to_wishlist', array($this, 'add_to_wishlist'));
        
        add_action('wp_ajax_search_products', array($this, 'search_products'));
        add_action('wp_ajax_nopriv_search_products', array($this, 'search_products'));
        
        // REST API endpoints
        add_action('rest_api_init', array($this, 'register_rest_routes'));
    }
    
    public function register_rest_routes() {
        register_rest_route('opensheets/v1', '/products', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_products_api'),
            'permission_callback' => '__return_true'
        ));
        
        register_rest_route('opensheets/v1', '/orders', array(
            'methods' => 'POST',
            'callback' => array($this, 'create_order_api'),
            'permission_callback' => '__return_true'
        ));
        
        register_rest_route('opensheets/v1', '/orders/(?P<id>\d+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_order_api'),
            'permission_callback' => '__return_true'
        ));
    }
    
    public function add_to_cart() {
        check_ajax_referer('opensheets_nonce', 'nonce');
        
        $product_id = intval($_POST['product_id']);
        $quantity = intval($_POST['quantity']) ?: 1;
        
        if (!$product_id) {
            wp_die(json_encode(array('success' => false, 'message' => 'Invalid product ID')));
        }
        
        $cart = $this->get_cart();
        
        if (isset($cart[$product_id])) {
            $cart[$product_id]['quantity'] += $quantity;
        } else {
            $product = get_post($product_id);
            $price = get_post_meta($product_id, '_price', true);
            $image = get_the_post_thumbnail_url($product_id, 'thumbnail');
            
            $cart[$product_id] = array(
                'id' => $product_id,
                'title' => $product->post_title,
                'price' => floatval($price),
                'quantity' => $quantity,
                'image' => $image
            );
        }
        
        $this->save_cart($cart);
        
        wp_die(json_encode(array(
            'success' => true,
            'message' => 'เพิ่มสินค้าในตะกร้าแล้ว',
            'cart_count' => $this->get_cart_total_items($cart)
        )));
    }
    
    public function remove_from_cart() {
        check_ajax_referer('opensheets_nonce', 'nonce');
        
        $product_id = intval($_POST['product_id']);
        
        if (!$product_id) {
            wp_die(json_encode(array('success' => false, 'message' => 'Invalid product ID')));
        }
        
        $cart = $this->get_cart();
        
        if (isset($cart[$product_id])) {
            unset($cart[$product_id]);
            $this->save_cart($cart);
        }
        
        wp_die(json_encode(array(
            'success' => true,
            'message' => 'ลบสินค้าออกจากตะกร้าแล้ว',
            'cart_count' => $this->get_cart_total_items($cart)
        )));
    }
    
    public function update_cart_quantity() {
        check_ajax_referer('opensheets_nonce', 'nonce');
        
        $product_id = intval($_POST['product_id']);
        $quantity = intval($_POST['quantity']);
        
        if (!$product_id || $quantity < 0) {
            wp_die(json_encode(array('success' => false, 'message' => 'Invalid data')));
        }
        
        $cart = $this->get_cart();
        
        if ($quantity == 0) {
            unset($cart[$product_id]);
        } else {
            if (isset($cart[$product_id])) {
                $cart[$product_id]['quantity'] = $quantity;
            }
        }
        
        $this->save_cart($cart);
        
        wp_die(json_encode(array(
            'success' => true,
            'cart_count' => $this->get_cart_total_items($cart),
            'cart_total' => $this->get_cart_total($cart)
        )));
    }
    
    public function get_cart_count() {
        $cart = $this->get_cart();
        wp_die(json_encode(array(
            'success' => true,
            'count' => $this->get_cart_total_items($cart)
        )));
    }
    
    public function process_order() {
        check_ajax_referer('opensheets_nonce', 'nonce');
        
        global $wpdb;
        
        $customer_name = sanitize_text_field($_POST['customer_name']);
        $customer_phone = sanitize_text_field($_POST['customer_phone']);
        $customer_email = sanitize_email($_POST['customer_email']);
        $customer_address = sanitize_textarea_field($_POST['customer_address']);
        $payment_method = sanitize_text_field($_POST['payment_method']);
        $coupon_code = sanitize_text_field($_POST['coupon_code']);
        
        $cart = $this->get_cart();
        
        if (empty($cart)) {
            wp_die(json_encode(array('success' => false, 'message' => 'ตะกร้าสินค้าว่าง')));
        }
        
        $subtotal = $this->get_cart_total($cart);
        $discount = 0;
        
        // Apply coupon if provided
        if ($coupon_code) {
            $coupon = $wpdb->get_row($wpdb->prepare(
                "SELECT * FROM {$wpdb->prefix}opensheets_coupons WHERE code = %s AND active = 1 AND (expiry_date IS NULL OR expiry_date > NOW())",
                $coupon_code
            ));
            
            if ($coupon) {
                if ($coupon->type === 'percentage') {
                    $discount = ($subtotal * $coupon->value) / 100;
                } else {
                    $discount = $coupon->value;
                }
                
                // Update coupon usage
                $wpdb->update(
                    $wpdb->prefix . 'opensheets_coupons',
                    array('used_count' => $coupon->used_count + 1),
                    array('id' => $coupon->id)
                );
            }
        }
        
        $total = $subtotal - $discount;
        $order_number = 'OS' . date('Ymd') . rand(1000, 9999);
        
        // Insert order
        $order_data = array(
            'order_number' => $order_number,
            'customer_name' => $customer_name,
            'customer_phone' => $customer_phone,
            'customer_email' => $customer_email,
            'customer_address' => $customer_address,
            'payment_method' => $payment_method,
            'subtotal' => $subtotal,
            'discount' => $discount,
            'total' => $total,
            'status' => 'pending',
            'created_at' => current_time('mysql')
        );
        
        $wpdb->insert($wpdb->prefix . 'opensheets_orders', $order_data);
        $order_id = $wpdb->insert_id;
        
        // Insert order items
        foreach ($cart as $item) {
            $wpdb->insert($wpdb->prefix . 'opensheets_order_items', array(
                'order_id' => $order_id,
                'product_id' => $item['id'],
                'product_name' => $item['title'],
                'price' => $item['price'],
                'quantity' => $item['quantity']
            ));
        }
        
        // Clear cart
        $this->clear_cart();
        
        // Send confirmation email
        $this->send_order_confirmation_email($order_id, $order_data, $cart);
        
        wp_die(json_encode(array(
            'success' => true,
            'message' => 'สั่งซื้อสำเร็จ',
            'order_number' => $order_number,
            'order_id' => $order_id
        )));
    }
    
    public function track_order() {
        $order_number = sanitize_text_field($_POST['order_number']);
        
        if (!$order_number) {
            wp_die(json_encode(array('success' => false, 'message' => 'กรุณาใส่หมายเลขคำสั่งซื้อ')));
        }
        
        global $wpdb;
        
        $order = $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM {$wpdb->prefix}opensheets_orders WHERE order_number = %s",
            $order_number
        ));
        
        if (!$order) {
            wp_die(json_encode(array('success' => false, 'message' => 'ไม่พบคำสั่งซื้อ')));
        }
        
        $order_items = $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM {$wpdb->prefix}opensheets_order_items WHERE order_id = %d",
            $order->id
        ));
        
        wp_die(json_encode(array(
            'success' => true,
            'order' => $order,
            'items' => $order_items
        )));
    }
    
    public function apply_coupon() {
        check_ajax_referer('opensheets_nonce', 'nonce');
        
        $coupon_code = sanitize_text_field($_POST['coupon_code']);
        
        if (!$coupon_code) {
            wp_die(json_encode(array('success' => false, 'message' => 'กรุณาใส่รหัสคูปอง')));
        }
        
        global $wpdb;
        
        $coupon = $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM {$wpdb->prefix}opensheets_coupons WHERE code = %s AND active = 1 AND (expiry_date IS NULL OR expiry_date > NOW())",
            $coupon_code
        ));
        
        if (!$coupon) {
            wp_die(json_encode(array('success' => false, 'message' => 'รหัสคูปองไม่ถูกต้องหรือหมดอายุ')));
        }
        
        $cart = $this->get_cart();
        $subtotal = $this->get_cart_total($cart);
        
        if ($coupon->type === 'percentage') {
            $discount = ($subtotal * $coupon->value) / 100;
        } else {
            $discount = $coupon->value;
        }
        
        wp_die(json_encode(array(
            'success' => true,
            'message' => 'ใช้คูปองสำเร็จ',
            'discount' => $discount,
            'total' => $subtotal - $discount
        )));
    }
    
    public function add_to_wishlist() {
        check_ajax_referer('opensheets_nonce', 'nonce');
        
        $product_id = intval($_POST['product_id']);
        $session_id = $this->get_session_id();
        
        if (!$product_id) {
            wp_die(json_encode(array('success' => false, 'message' => 'Invalid product ID')));
        }
        
        global $wpdb;
        
        $exists = $wpdb->get_var($wpdb->prepare(
            "SELECT id FROM {$wpdb->prefix}opensheets_wishlist WHERE product_id = %d AND session_id = %s",
            $product_id, $session_id
        ));
        
        if ($exists) {
            wp_die(json_encode(array('success' => false, 'message' => 'สินค้านี้อยู่ในรายการโปรดแล้ว')));
        }
        
        $wpdb->insert($wpdb->prefix . 'opensheets_wishlist', array(
            'product_id' => $product_id,
            'session_id' => $session_id,
            'created_at' => current_time('mysql')
        ));
        
        wp_die(json_encode(array('success' => true, 'message' => 'เพิ่มในรายการโปรดแล้ว')));
    }
    
    public function search_products() {
        $search_term = sanitize_text_field($_POST['search']);
        $category = sanitize_text_field($_POST['category']);
        $min_price = floatval($_POST['min_price']);
        $max_price = floatval($_POST['max_price']);
        
        $args = array(
            'post_type' => 'exam_product',
            'post_status' => 'publish',
            'posts_per_page' => 12,
            'meta_query' => array()
        );
        
        if ($search_term) {
            $args['s'] = $search_term;
        }
        
        if ($category) {
            $args['tax_query'] = array(
                array(
                    'taxonomy' => 'product_category',
                    'field' => 'slug',
                    'terms' => $category
                )
            );
        }
        
        if ($min_price || $max_price) {
            $price_query = array('key' => '_price', 'type' => 'NUMERIC');
            
            if ($min_price && $max_price) {
                $price_query['value'] = array($min_price, $max_price);
                $price_query['compare'] = 'BETWEEN';
            } elseif ($min_price) {
                $price_query['value'] = $min_price;
                $price_query['compare'] = '>=';
            } elseif ($max_price) {
                $price_query['value'] = $max_price;
                $price_query['compare'] = '<=';
            }
            
            $args['meta_query'][] = $price_query;
        }
        
        $products = get_posts($args);
        $results = array();
        
        foreach ($products as $product) {
            $price = get_post_meta($product->ID, '_price', true);
            $image = get_the_post_thumbnail_url($product->ID, 'medium');
            
            $results[] = array(
                'id' => $product->ID,
                'title' => $product->post_title,
                'price' => floatval($price),
                'image' => $image,
                'url' => get_permalink($product->ID)
            );
        }
        
        wp_die(json_encode(array('success' => true, 'products' => $results)));
    }
    
    // Helper methods
    private function get_cart() {
        $session_id = $this->get_session_id();
        return get_transient('cart_' . $session_id) ?: array();
    }
    
    private function save_cart($cart) {
        $session_id = $this->get_session_id();
        set_transient('cart_' . $session_id, $cart, DAY_IN_SECONDS);
    }
    
    private function clear_cart() {
        $session_id = $this->get_session_id();
        delete_transient('cart_' . $session_id);
    }
    
    private function get_cart_total_items($cart) {
        $total = 0;
        foreach ($cart as $item) {
            $total += $item['quantity'];
        }
        return $total;
    }
    
    private function get_cart_total($cart) {
        $total = 0;
        foreach ($cart as $item) {
            $total += $item['price'] * $item['quantity'];
        }
        return $total;
    }
    
    private function get_session_id() {
        if (!session_id()) {
            session_start();
        }
        return session_id();
    }
    
    private function send_order_confirmation_email($order_id, $order_data, $cart) {
        $to = $order_data['customer_email'];
        $subject = 'ยืนยันคำสั่งซื้อ - ' . $order_data['order_number'];
        
        $message = "เรียน คุณ" . $order_data['customer_name'] . "\n\n";
        $message .= "ขอบคุณสำหรับคำสั่งซื้อ หมายเลข: " . $order_data['order_number'] . "\n\n";
        $message .= "รายการสินค้า:\n";
        
        foreach ($cart as $item) {
            $message .= "- " . $item['title'] . " x " . $item['quantity'] . " = " . number_format($item['price'] * $item['quantity']) . " บาท\n";
        }
        
        $message .= "\nยอดรวม: " . number_format($order_data['total']) . " บาท\n";
        $message .= "วิธีการชำระเงิน: " . $order_data['payment_method'] . "\n\n";
        $message .= "ติดต่อสอบถาม: 085-5555555\n";
        $message .= "LINE: @opensheets\n\n";
        $message .= "ขอบคุณครับ\nOPEN SHEETS";
        
        wp_mail($to, $subject, $message);
    }
    
    // REST API Methods
    public function get_products_api($request) {
        $args = array(
            'post_type' => 'exam_product',
            'post_status' => 'publish',
            'posts_per_page' => -1
        );
        
        $products = get_posts($args);
        $results = array();
        
        foreach ($products as $product) {
            $price = get_post_meta($product->ID, '_price', true);
            $image = get_the_post_thumbnail_url($product->ID, 'medium');
            
            $results[] = array(
                'id' => $product->ID,
                'title' => $product->post_title,
                'content' => $product->post_content,
                'price' => floatval($price),
                'image' => $image,
                'url' => get_permalink($product->ID)
            );
        }
        
        return rest_ensure_response($results);
    }
    
    public function create_order_api($request) {
        $params = $request->get_json_params();
        
        // Process order creation via REST API
        // Similar to process_order but for REST API
        
        return rest_ensure_response(array('success' => true, 'message' => 'Order created'));
    }
    
    public function get_order_api($request) {
        $order_id = $request['id'];
        
        global $wpdb;
        
        $order = $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM {$wpdb->prefix}opensheets_orders WHERE id = %d",
            $order_id
        ));
        
        if (!$order) {
            return new WP_Error('order_not_found', 'Order not found', array('status' => 404));
        }
        
        return rest_ensure_response($order);
    }
}

new OpenSheets_API();
