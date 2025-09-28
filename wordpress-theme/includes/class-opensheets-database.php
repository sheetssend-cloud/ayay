<?php
/**
 * OPEN SHEETS Database Management
 *
 * @package OpenSheets
 */

if (!defined('ABSPATH')) {
    exit;
}

class OpenSheets_Database {
    
    private $version = '1.0.0';
    
    public function __construct() {
        add_action('after_switch_theme', array($this, 'create_tables'));
        add_action('wp_loaded', array($this, 'check_version'));
        register_activation_hook(__FILE__, array($this, 'create_tables'));
    }
    
    public function check_version() {
        $installed_version = get_option('opensheets_db_version', '0.0.0');
        
        if (version_compare($installed_version, $this->version, '<')) {
            $this->create_tables();
            update_option('opensheets_db_version', $this->version);
        }
    }
    
    public function create_tables() {
        global $wpdb;
        
        $charset_collate = $wpdb->get_charset_collate();
        
        // Orders table
        $orders_table = $wpdb->prefix . 'opensheets_orders';
        $orders_sql = "CREATE TABLE $orders_table (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            order_number varchar(50) NOT NULL,
            customer_name varchar(255) NOT NULL,
            customer_email varchar(255) NOT NULL,
            customer_phone varchar(50) DEFAULT NULL,
            customer_address text DEFAULT NULL,
            subtotal decimal(10,2) NOT NULL DEFAULT 0.00,
            shipping_cost decimal(10,2) NOT NULL DEFAULT 0.00,
            discount_amount decimal(10,2) NOT NULL DEFAULT 0.00,
            total_amount decimal(10,2) NOT NULL DEFAULT 0.00,
            payment_method varchar(50) DEFAULT NULL,
            payment_status varchar(20) DEFAULT 'pending',
            order_status varchar(20) DEFAULT 'pending',
            notes text DEFAULT NULL,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            UNIQUE KEY order_number (order_number),
            KEY customer_email (customer_email),
            KEY order_status (order_status),
            KEY created_at (created_at)
        ) $charset_collate;";
        
        // Order items table
        $order_items_table = $wpdb->prefix . 'opensheets_order_items';
        $order_items_sql = "CREATE TABLE $order_items_table (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            order_id bigint(20) NOT NULL,
            product_id bigint(20) NOT NULL,
            product_name varchar(255) NOT NULL,
            product_sku varchar(100) DEFAULT NULL,
            quantity int(11) NOT NULL DEFAULT 1,
            unit_price decimal(10,2) NOT NULL DEFAULT 0.00,
            total_price decimal(10,2) NOT NULL DEFAULT 0.00,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY order_id (order_id),
            KEY product_id (product_id),
            FOREIGN KEY (order_id) REFERENCES $orders_table(id) ON DELETE CASCADE
        ) $charset_collate;";
        
        // Coupons table
        $coupons_table = $wpdb->prefix . 'opensheets_coupons';
        $coupons_sql = "CREATE TABLE $coupons_table (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            code varchar(50) NOT NULL,
            description text DEFAULT NULL,
            discount_type varchar(20) NOT NULL DEFAULT 'percentage',
            discount_value decimal(10,2) NOT NULL DEFAULT 0.00,
            minimum_amount decimal(10,2) DEFAULT NULL,
            maximum_discount decimal(10,2) DEFAULT NULL,
            usage_limit int(11) DEFAULT NULL,
            used_count int(11) NOT NULL DEFAULT 0,
            start_date datetime DEFAULT NULL,
            end_date datetime DEFAULT NULL,
            is_active tinyint(1) NOT NULL DEFAULT 1,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            UNIQUE KEY code (code),
            KEY is_active (is_active),
            KEY start_date (start_date),
            KEY end_date (end_date)
        ) $charset_collate;";
        
        // Coupon usage table
        $coupon_usage_table = $wpdb->prefix . 'opensheets_coupon_usage';
        $coupon_usage_sql = "CREATE TABLE $coupon_usage_table (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            coupon_id bigint(20) NOT NULL,
            order_id bigint(20) NOT NULL,
            customer_email varchar(255) NOT NULL,
            discount_amount decimal(10,2) NOT NULL DEFAULT 0.00,
            used_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY coupon_id (coupon_id),
            KEY order_id (order_id),
            KEY customer_email (customer_email),
            FOREIGN KEY (coupon_id) REFERENCES $coupons_table(id) ON DELETE CASCADE,
            FOREIGN KEY (order_id) REFERENCES $orders_table(id) ON DELETE CASCADE
        ) $charset_collate;";
        
        // Wishlist table
        $wishlist_table = $wpdb->prefix . 'opensheets_wishlist';
        $wishlist_sql = "CREATE TABLE $wishlist_table (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            customer_email varchar(255) NOT NULL,
            product_id bigint(20) NOT NULL,
            added_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            UNIQUE KEY customer_product (customer_email, product_id),
            KEY customer_email (customer_email),
            KEY product_id (product_id),
            KEY added_at (added_at)
        ) $charset_collate;";
        
        // Product views table
        $product_views_table = $wpdb->prefix . 'opensheets_product_views';
        $product_views_sql = "CREATE TABLE $product_views_table (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            product_id bigint(20) NOT NULL,
            ip_address varchar(45) NOT NULL,
            user_agent text DEFAULT NULL,
            viewed_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY product_id (product_id),
            KEY ip_address (ip_address),
            KEY viewed_at (viewed_at)
        ) $charset_collate;";
        
        // Reviews table
        $reviews_table = $wpdb->prefix . 'opensheets_reviews';
        $reviews_sql = "CREATE TABLE $reviews_table (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            product_id bigint(20) NOT NULL,
            customer_name varchar(255) NOT NULL,
            customer_email varchar(255) NOT NULL,
            rating int(1) NOT NULL DEFAULT 5,
            review_title varchar(255) DEFAULT NULL,
            review_content text DEFAULT NULL,
            is_verified tinyint(1) NOT NULL DEFAULT 0,
            is_approved tinyint(1) NOT NULL DEFAULT 0,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY product_id (product_id),
            KEY customer_email (customer_email),
            KEY rating (rating),
            KEY is_approved (is_approved),
            KEY created_at (created_at)
        ) $charset_collate;";
        
        // Inventory log table
        $inventory_log_table = $wpdb->prefix . 'opensheets_inventory_log';
        $inventory_log_sql = "CREATE TABLE $inventory_log_table (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            product_id bigint(20) NOT NULL,
            change_type varchar(20) NOT NULL,
            quantity_before int(11) NOT NULL DEFAULT 0,
            quantity_after int(11) NOT NULL DEFAULT 0,
            quantity_changed int(11) NOT NULL DEFAULT 0,
            reason varchar(255) DEFAULT NULL,
            user_id bigint(20) DEFAULT NULL,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY product_id (product_id),
            KEY change_type (change_type),
            KEY user_id (user_id),
            KEY created_at (created_at)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        
        dbDelta($orders_sql);
        dbDelta($order_items_sql);
        dbDelta($coupons_sql);
        dbDelta($coupon_usage_sql);
        dbDelta($wishlist_table);
        dbDelta($product_views_sql);
        dbDelta($reviews_sql);
        dbDelta($inventory_log_sql);
        
        // Insert default data
        $this->insert_default_data();
    }
    
    private function insert_default_data() {
        global $wpdb;
        
        // Insert default coupons
        $coupons_table = $wpdb->prefix . 'opensheets_coupons';
        
        $default_coupons = array(
            array(
                'code' => 'WELCOME10',
                'description' => 'ส่วนลด 10% สำหรับลูกค้าใหม่',
                'discount_type' => 'percentage',
                'discount_value' => 10.00,
                'minimum_amount' => 500.00,
                'usage_limit' => 100,
                'end_date' => date('Y-m-d H:i:s', strtotime('+1 year')),
            ),
            array(
                'code' => 'FREESHIP',
                'description' => 'ฟรีค่าจัดส่ง',
                'discount_type' => 'fixed',
                'discount_value' => 50.00,
                'minimum_amount' => 300.00,
                'usage_limit' => 200,
                'end_date' => date('Y-m-d H:i:s', strtotime('+6 months')),
            ),
        );
        
        foreach ($default_coupons as $coupon) {
            $existing = $wpdb->get_var($wpdb->prepare(
                "SELECT id FROM $coupons_table WHERE code = %s",
                $coupon['code']
            ));
            
            if (!$existing) {
                $wpdb->insert($coupons_table, $coupon);
            }
        }
    }
    
    // Order management functions
    public static function create_order($order_data) {
        global $wpdb;
        
        $orders_table = $wpdb->prefix . 'opensheets_orders';
        $order_items_table = $wpdb->prefix . 'opensheets_order_items';
        
        // Generate order number
        $order_number = 'OS' . date('Ymd') . sprintf('%04d', rand(1, 9999));
        
        // Prepare order data
        $order_insert_data = array(
            'order_number' => $order_number,
            'customer_name' => sanitize_text_field($order_data['customer_name']),
            'customer_email' => sanitize_email($order_data['customer_email']),
            'customer_phone' => sanitize_text_field($order_data['customer_phone'] ?? ''),
            'customer_address' => sanitize_textarea_field($order_data['customer_address'] ?? ''),
            'subtotal' => floatval($order_data['subtotal']),
            'shipping_cost' => floatval($order_data['shipping_cost']),
            'discount_amount' => floatval($order_data['discount_amount'] ?? 0),
            'total_amount' => floatval($order_data['total_amount']),
            'payment_method' => sanitize_text_field($order_data['payment_method'] ?? 'bank_transfer'),
            'notes' => sanitize_textarea_field($order_data['notes'] ?? ''),
        );
        
        // Insert order
        $result = $wpdb->insert($orders_table, $order_insert_data);
        
        if ($result === false) {
            return false;
        }
        
        $order_id = $wpdb->insert_id;
        
        // Insert order items
        if (isset($order_data['items']) && is_array($order_data['items'])) {
            foreach ($order_data['items'] as $item) {
                $item_data = array(
                    'order_id' => $order_id,
                    'product_id' => intval($item['product_id']),
                    'product_name' => sanitize_text_field($item['product_name']),
                    'product_sku' => sanitize_text_field($item['product_sku'] ?? ''),
                    'quantity' => intval($item['quantity']),
                    'unit_price' => floatval($item['unit_price']),
                    'total_price' => floatval($item['total_price']),
                );
                
                $wpdb->insert($order_items_table, $item_data);
                
                // Update product stock
                self::update_product_stock($item['product_id'], -$item['quantity'], 'order', $order_id);
            }
        }
        
        return $order_id;
    }
    
    public static function get_order($order_id) {
        global $wpdb;
        
        $orders_table = $wpdb->prefix . 'opensheets_orders';
        $order_items_table = $wpdb->prefix . 'opensheets_order_items';
        
        $order = $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $orders_table WHERE id = %d",
            $order_id
        ), ARRAY_A);
        
        if (!$order) {
            return false;
        }
        
        $items = $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM $order_items_table WHERE order_id = %d",
            $order_id
        ), ARRAY_A);
        
        $order['items'] = $items;
        
        return $order;
    }
    
    public static function update_order_status($order_id, $status) {
        global $wpdb;
        
        $orders_table = $wpdb->prefix . 'opensheets_orders';
        
        return $wpdb->update(
            $orders_table,
            array('order_status' => sanitize_text_field($status)),
            array('id' => intval($order_id))
        );
    }
    
    // Coupon management functions
    public static function validate_coupon($code, $cart_total = 0) {
        global $wpdb;
        
        $coupons_table = $wpdb->prefix . 'opensheets_coupons';
        
        $coupon = $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $coupons_table 
             WHERE code = %s 
             AND is_active = 1 
             AND (start_date IS NULL OR start_date <= NOW()) 
             AND (end_date IS NULL OR end_date >= NOW())",
            $code
        ), ARRAY_A);
        
        if (!$coupon) {
            return array('valid' => false, 'message' => 'คูปองไม่ถูกต้องหรือหมดอายุ');
        }
        
        // Check usage limit
        if ($coupon['usage_limit'] && $coupon['used_count'] >= $coupon['usage_limit']) {
            return array('valid' => false, 'message' => 'คูปองถูกใช้หมดแล้ว');
        }
        
        // Check minimum amount
        if ($coupon['minimum_amount'] && $cart_total < $coupon['minimum_amount']) {
            return array(
                'valid' => false, 
                'message' => sprintf('ยอดขั้นต่ำ %s บาท', number_format($coupon['minimum_amount'], 2))
            );
        }
        
        // Calculate discount
        $discount = 0;
        if ($coupon['discount_type'] === 'percentage') {
            $discount = ($cart_total * $coupon['discount_value']) / 100;
            if ($coupon['maximum_discount'] && $discount > $coupon['maximum_discount']) {
                $discount = $coupon['maximum_discount'];
            }
        } else {
            $discount = $coupon['discount_value'];
        }
        
        return array(
            'valid' => true,
            'coupon' => $coupon,
            'discount' => $discount,
            'message' => 'คูปองใช้ได้'
        );
    }
    
    public static function use_coupon($coupon_id, $order_id, $customer_email, $discount_amount) {
        global $wpdb;
        
        $coupons_table = $wpdb->prefix . 'opensheets_coupons';
        $coupon_usage_table = $wpdb->prefix . 'opensheets_coupon_usage';
        
        // Record usage
        $wpdb->insert($coupon_usage_table, array(
            'coupon_id' => intval($coupon_id),
            'order_id' => intval($order_id),
            'customer_email' => sanitize_email($customer_email),
            'discount_amount' => floatval($discount_amount),
        ));
        
        // Update used count
        $wpdb->query($wpdb->prepare(
            "UPDATE $coupons_table SET used_count = used_count + 1 WHERE id = %d",
            $coupon_id
        ));
        
        return true;
    }
    
    // Product stock management
    public static function update_product_stock($product_id, $quantity_change, $reason = 'manual', $reference_id = null) {
        $current_stock = get_post_meta($product_id, '_exam_stock', true) ?: 0;
        $new_stock = max(0, $current_stock + $quantity_change);
        
        // Update product meta
        update_post_meta($product_id, '_exam_stock', $new_stock);
        
        // Log the change
        global $wpdb;
        $inventory_log_table = $wpdb->prefix . 'opensheets_inventory_log';
        
        $wpdb->insert($inventory_log_table, array(
            'product_id' => intval($product_id),
            'change_type' => sanitize_text_field($reason),
            'quantity_before' => intval($current_stock),
            'quantity_after' => intval($new_stock),
            'quantity_changed' => intval($quantity_change),
            'reason' => sanitize_text_field($reason . ($reference_id ? " (ID: $reference_id)" : '')),
            'user_id' => get_current_user_id(),
        ));
        
        return $new_stock;
    }
    
    // Wishlist functions
    public static function add_to_wishlist($customer_email, $product_id) {
        global $wpdb;
        
        $wishlist_table = $wpdb->prefix . 'opensheets_wishlist';
        
        $existing = $wpdb->get_var($wpdb->prepare(
            "SELECT id FROM $wishlist_table WHERE customer_email = %s AND product_id = %d",
            $customer_email,
            $product_id
        ));
        
        if ($existing) {
            return false; // Already in wishlist
        }
        
        return $wpdb->insert($wishlist_table, array(
            'customer_email' => sanitize_email($customer_email),
            'product_id' => intval($product_id),
        ));
    }
    
    public static function remove_from_wishlist($customer_email, $product_id) {
        global $wpdb;
        
        $wishlist_table = $wpdb->prefix . 'opensheets_wishlist';
        
        return $wpdb->delete($wishlist_table, array(
            'customer_email' => sanitize_email($customer_email),
            'product_id' => intval($product_id),
        ));
    }
    
    public static function get_wishlist($customer_email) {
        global $wpdb;
        
        $wishlist_table = $wpdb->prefix . 'opensheets_wishlist';
        
        return $wpdb->get_results($wpdb->prepare(
            "SELECT w.*, p.post_title as product_name 
             FROM $wishlist_table w 
             LEFT JOIN {$wpdb->posts} p ON w.product_id = p.ID 
             WHERE w.customer_email = %s 
             ORDER BY w.added_at DESC",
            $customer_email
        ), ARRAY_A);
    }
    
    // Analytics functions
    public static function track_product_view($product_id) {
        global $wpdb;
        
        $product_views_table = $wpdb->prefix . 'opensheets_product_views';
        $ip_address = $_SERVER['REMOTE_ADDR'] ?? '';
        $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? '';
        
        // Check if same IP viewed this product in last hour
        $recent_view = $wpdb->get_var($wpdb->prepare(
            "SELECT id FROM $product_views_table 
             WHERE product_id = %d AND ip_address = %s 
             AND viewed_at > DATE_SUB(NOW(), INTERVAL 1 HOUR)",
            $product_id,
            $ip_address
        ));
        
        if (!$recent_view) {
            $wpdb->insert($product_views_table, array(
                'product_id' => intval($product_id),
                'ip_address' => sanitize_text_field($ip_address),
                'user_agent' => sanitize_text_field($user_agent),
            ));
        }
    }
    
    public static function get_popular_products($limit = 10) {
        global $wpdb;
        
        $product_views_table = $wpdb->prefix . 'opensheets_product_views';
        
        return $wpdb->get_results($wpdb->prepare(
            "SELECT p.ID, p.post_title, COUNT(v.id) as view_count
             FROM {$wpdb->posts} p
             LEFT JOIN $product_views_table v ON p.ID = v.product_id
             WHERE p.post_type = 'exam_product' AND p.post_status = 'publish'
             GROUP BY p.ID
             ORDER BY view_count DESC
             LIMIT %d",
            $limit
        ), ARRAY_A);
    }
    
    // Sales reports
    public static function get_sales_data($start_date = null, $end_date = null) {
        global $wpdb;
        
        $orders_table = $wpdb->prefix . 'opensheets_orders';
        
        $where_clause = "WHERE order_status IN ('completed', 'processing')";
        $params = array();
        
        if ($start_date) {
            $where_clause .= " AND created_at >= %s";
            $params[] = $start_date;
        }
        
        if ($end_date) {
            $where_clause .= " AND created_at <= %s";
            $params[] = $end_date;
        }
        
        $query = "SELECT 
                    COUNT(*) as total_orders,
                    SUM(total_amount) as total_sales,
                    AVG(total_amount) as average_order_value,
                    DATE(created_at) as order_date
                  FROM $orders_table 
                  $where_clause
                  GROUP BY DATE(created_at)
                  ORDER BY order_date DESC";
        
        if (!empty($params)) {
            $query = $wpdb->prepare($query, $params);
        }
        
        return $wpdb->get_results($query, ARRAY_A);
    }
}

// Initialize database
new OpenSheets_Database();
?>
