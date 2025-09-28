<?php
/**
 * OPEN SHEETS Theme Functions
 * 
 * @package OpenSheets
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Theme setup
function opensheets_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script'
    ));
    add_theme_support('custom-logo');
    add_theme_support('customize-selective-refresh-widgets');
    
    // WooCommerce support
    add_theme_support('woocommerce');
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'opensheets'),
        'footer' => __('Footer Menu', 'opensheets'),
    ));
    
    // Add image sizes
    add_image_size('product-thumb', 300, 300, true);
    add_image_size('product-large', 600, 600, true);
}
add_action('after_setup_theme', 'opensheets_setup');

// Enqueue scripts and styles
function opensheets_scripts() {
    // Main stylesheet
    wp_enqueue_style('opensheets-style', get_stylesheet_uri(), array(), '1.0.0');
    
    // Google Fonts
    wp_enqueue_style('opensheets-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', array(), null);
    
    // Main JavaScript
    wp_enqueue_script('opensheets-main', get_template_directory_uri() . '/assets/js/main.js', array('jquery'), '1.0.0', true);
    
    // Localize script for AJAX
    wp_localize_script('opensheets-main', 'opensheets_ajax', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('opensheets_nonce'),
    ));
}
add_action('wp_enqueue_scripts', 'opensheets_scripts');

// Register widget areas
function opensheets_widgets_init() {
    register_sidebar(array(
        'name'          => __('Sidebar', 'opensheets'),
        'id'            => 'sidebar-1',
        'description'   => __('Add widgets here.', 'opensheets'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));
    
    register_sidebar(array(
        'name'          => __('Footer Widget Area', 'opensheets'),
        'id'            => 'footer-1',
        'description'   => __('Add widgets here to appear in your footer.', 'opensheets'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
}
add_action('widgets_init', 'opensheets_widgets_init');

// Elementor Pro compatibility
function opensheets_elementor_support() {
    add_theme_support('elementor');
    add_theme_support('elementor-pro');
}
add_action('after_setup_theme', 'opensheets_elementor_support');

// Custom post types for exam products
function opensheets_custom_post_types() {
    // Exam Products
    register_post_type('exam_product', array(
        'labels' => array(
            'name' => __('Exam Products', 'opensheets'),
            'singular_name' => __('Exam Product', 'opensheets'),
            'add_new' => __('Add New Product', 'opensheets'),
            'add_new_item' => __('Add New Exam Product', 'opensheets'),
            'edit_item' => __('Edit Exam Product', 'opensheets'),
            'new_item' => __('New Exam Product', 'opensheets'),
            'view_item' => __('View Exam Product', 'opensheets'),
            'search_items' => __('Search Exam Products', 'opensheets'),
            'not_found' => __('No exam products found', 'opensheets'),
            'not_found_in_trash' => __('No exam products found in trash', 'opensheets'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
        'menu_icon' => 'dashicons-book-alt',
        'rewrite' => array('slug' => 'exam-products'),
        'show_in_rest' => true,
    ));
    
    // Orders
    register_post_type('exam_order', array(
        'labels' => array(
            'name' => __('Orders', 'opensheets'),
            'singular_name' => __('Order', 'opensheets'),
        ),
        'public' => false,
        'show_ui' => true,
        'supports' => array('title', 'custom-fields'),
        'menu_icon' => 'dashicons-cart',
        'capabilities' => array(
            'create_posts' => false,
        ),
        'map_meta_cap' => true,
    ));
}
add_action('init', 'opensheets_custom_post_types');

// Custom taxonomies
function opensheets_custom_taxonomies() {
    // Exam Categories
    register_taxonomy('exam_category', 'exam_product', array(
        'labels' => array(
            'name' => __('Exam Categories', 'opensheets'),
            'singular_name' => __('Exam Category', 'opensheets'),
        ),
        'hierarchical' => true,
        'public' => true,
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'exam-category'),
    ));
    
    // Exam Levels
    register_taxonomy('exam_level', 'exam_product', array(
        'labels' => array(
            'name' => __('Exam Levels', 'opensheets'),
            'singular_name' => __('Exam Level', 'opensheets'),
        ),
        'hierarchical' => false,
        'public' => true,
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'exam-level'),
    ));
}
add_action('init', 'opensheets_custom_taxonomies');

// Add custom fields meta boxes
function opensheets_add_meta_boxes() {
    add_meta_box(
        'exam_product_details',
        __('Product Details', 'opensheets'),
        'opensheets_product_details_callback',
        'exam_product',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'opensheets_add_meta_boxes');

// Meta box callback
function opensheets_product_details_callback($post) {
    wp_nonce_field('opensheets_save_meta', 'opensheets_meta_nonce');
    
    $price = get_post_meta($post->ID, '_exam_price', true);
    $stock = get_post_meta($post->ID, '_exam_stock', true);
    $sku = get_post_meta($post->ID, '_exam_sku', true);
    $pdf_file = get_post_meta($post->ID, '_exam_pdf_file', true);
    
    echo '<table class="form-table">';
    echo '<tr><th><label for="exam_price">' . __('Price (THB)', 'opensheets') . '</label></th>';
    echo '<td><input type="number" id="exam_price" name="exam_price" value="' . esc_attr($price) . '" step="0.01" /></td></tr>';
    
    echo '<tr><th><label for="exam_stock">' . __('Stock Quantity', 'opensheets') . '</label></th>';
    echo '<td><input type="number" id="exam_stock" name="exam_stock" value="' . esc_attr($stock) . '" /></td></tr>';
    
    echo '<tr><th><label for="exam_sku">' . __('SKU', 'opensheets') . '</label></th>';
    echo '<td><input type="text" id="exam_sku" name="exam_sku" value="' . esc_attr($sku) . '" /></td></tr>';
    
    echo '<tr><th><label for="exam_pdf_file">' . __('PDF File URL', 'opensheets') . '</label></th>';
    echo '<td><input type="url" id="exam_pdf_file" name="exam_pdf_file" value="' . esc_attr($pdf_file) . '" class="regular-text" /></td></tr>';
    echo '</table>';
}

// Save meta box data
function opensheets_save_meta($post_id) {
    if (!isset($_POST['opensheets_meta_nonce']) || !wp_verify_nonce($_POST['opensheets_meta_nonce'], 'opensheets_save_meta')) {
        return;
    }
    
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }
    
    $fields = array('exam_price', 'exam_stock', 'exam_sku', 'exam_pdf_file');
    
    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, '_' . $field, sanitize_text_field($_POST[$field]));
        }
    }
}
add_action('save_post', 'opensheets_save_meta');

// AJAX handlers for cart functionality
function opensheets_add_to_cart() {
    check_ajax_referer('opensheets_nonce', 'nonce');
    
    $product_id = intval($_POST['product_id']);
    $quantity = intval($_POST['quantity']) ?: 1;
    
    // Get or create cart session
    if (!session_id()) {
        session_start();
    }
    
    if (!isset($_SESSION['opensheets_cart'])) {
        $_SESSION['opensheets_cart'] = array();
    }
    
    // Add to cart
    if (isset($_SESSION['opensheets_cart'][$product_id])) {
        $_SESSION['opensheets_cart'][$product_id] += $quantity;
    } else {
        $_SESSION['opensheets_cart'][$product_id] = $quantity;
    }
    
    wp_send_json_success(array(
        'message' => __('Product added to cart', 'opensheets'),
        'cart_count' => array_sum($_SESSION['opensheets_cart'])
    ));
}
add_action('wp_ajax_opensheets_add_to_cart', 'opensheets_add_to_cart');
add_action('wp_ajax_nopriv_opensheets_add_to_cart', 'opensheets_add_to_cart');

function opensheets_update_cart() {
    check_ajax_referer('opensheets_nonce', 'nonce');
    
    if (!session_id()) {
        session_start();
    }
    
    $product_id = intval($_POST['product_id']);
    $quantity = intval($_POST['quantity']);
    
    if ($quantity <= 0) {
        unset($_SESSION['opensheets_cart'][$product_id]);
    } else {
        $_SESSION['opensheets_cart'][$product_id] = $quantity;
    }
    
    wp_send_json_success(array(
        'message' => __('Cart updated', 'opensheets'),
        'cart_count' => array_sum($_SESSION['opensheets_cart'] ?? array())
    ));
}
add_action('wp_ajax_opensheets_update_cart', 'opensheets_update_cart');
add_action('wp_ajax_nopriv_opensheets_update_cart', 'opensheets_update_cart');

function opensheets_remove_from_cart() {
    check_ajax_referer('opensheets_nonce', 'nonce');
    
    if (!session_id()) {
        session_start();
    }
    
    $product_id = intval($_POST['product_id']);
    
    if (isset($_SESSION['opensheets_cart'][$product_id])) {
        unset($_SESSION['opensheets_cart'][$product_id]);
    }
    
    wp_send_json_success(array(
        'message' => __('Product removed from cart', 'opensheets'),
        'cart_count' => array_sum($_SESSION['opensheets_cart'] ?? array())
    ));
}
add_action('wp_ajax_opensheets_remove_from_cart', 'opensheets_remove_from_cart');
add_action('wp_ajax_nopriv_opensheets_remove_from_cart', 'opensheets_remove_from_cart');

function opensheets_apply_coupon() {
    check_ajax_referer('opensheets_nonce', 'nonce');
    
    $coupon_code = sanitize_text_field($_POST['coupon_code']);
    $cart_total = floatval($_POST['cart_total']);
    
    $result = OpenSheets_Database::validate_coupon($coupon_code, $cart_total);
    
    if ($result['valid']) {
        if (!session_id()) {
            session_start();
        }
        $_SESSION['applied_coupon'] = $result['coupon'];
        
        wp_send_json_success(array(
            'discount' => $result['discount'],
            'message' => $result['message']
        ));
    } else {
        wp_send_json_error(array(
            'message' => $result['message']
        ));
    }
}
add_action('wp_ajax_opensheets_apply_coupon', 'opensheets_apply_coupon');
add_action('wp_ajax_nopriv_opensheets_apply_coupon', 'opensheets_apply_coupon');

function opensheets_place_order() {
    check_ajax_referer('opensheets_nonce', 'nonce');
    
    if (!session_id()) {
        session_start();
    }
    
    $cart = $_SESSION['opensheets_cart'] ?? array();
    if (empty($cart)) {
        wp_send_json_error(array('message' => __('Cart is empty', 'opensheets')));
        return;
    }
    
    // Prepare order data
    $order_data = array(
        'customer_name' => sanitize_text_field($_POST['customer_name']),
        'customer_email' => sanitize_email($_POST['customer_email']),
        'customer_phone' => sanitize_text_field($_POST['customer_phone']),
        'customer_address' => sanitize_textarea_field($_POST['customer_address']),
        'payment_method' => sanitize_text_field($_POST['payment_method']),
        'notes' => sanitize_textarea_field($_POST['notes'] ?? ''),
        'items' => array(),
        'subtotal' => 0,
        'shipping_cost' => 50,
        'discount_amount' => 0,
    );
    
    // Process cart items
    foreach ($cart as $product_id => $quantity) {
        $product = get_post($product_id);
        if (!$product) continue;
        
        $price = get_post_meta($product_id, '_exam_price', true);
        $sku = get_post_meta($product_id, '_exam_sku', true);
        $total_price = $price * $quantity;
        
        $order_data['items'][] = array(
            'product_id' => $product_id,
            'product_name' => $product->post_title,
            'product_sku' => $sku,
            'quantity' => $quantity,
            'unit_price' => $price,
            'total_price' => $total_price,
        );
        
        $order_data['subtotal'] += $total_price;
    }
    
    // Apply coupon if exists
    if (isset($_SESSION['applied_coupon'])) {
        $coupon = $_SESSION['applied_coupon'];
        $coupon_result = OpenSheets_Database::validate_coupon($coupon['code'], $order_data['subtotal']);
        if ($coupon_result['valid']) {
            $order_data['discount_amount'] = $coupon_result['discount'];
        }
    }
    
    // Free shipping threshold
    $settings = get_option('opensheets_settings', array());
    $free_shipping_min = $settings['free_shipping_min'] ?? 500;
    if ($order_data['subtotal'] >= $free_shipping_min) {
        $order_data['shipping_cost'] = 0;
    }
    
    $order_data['total_amount'] = $order_data['subtotal'] + $order_data['shipping_cost'] - $order_data['discount_amount'];
    
    // Create order
    $order_id = OpenSheets_Database::create_order($order_data);
    
    if ($order_id) {
        // Use coupon if applied
        if (isset($_SESSION['applied_coupon']) && $order_data['discount_amount'] > 0) {
            OpenSheets_Database::use_coupon(
                $_SESSION['applied_coupon']['id'],
                $order_id,
                $order_data['customer_email'],
                $order_data['discount_amount']
            );
        }
        
        // Clear cart and coupon
        unset($_SESSION['opensheets_cart']);
        unset($_SESSION['applied_coupon']);
        
        wp_send_json_success(array(
            'order_id' => $order_id,
            'message' => __('Order placed successfully', 'opensheets')
        ));
    } else {
        wp_send_json_error(array('message' => __('Failed to create order', 'opensheets')));
    }
}
add_action('wp_ajax_opensheets_place_order', 'opensheets_place_order');
add_action('wp_ajax_nopriv_opensheets_place_order', 'opensheets_place_order');

function opensheets_get_cart() {
    if (!session_id()) {
        session_start();
    }
    
    $cart = isset($_SESSION['opensheets_cart']) ? $_SESSION['opensheets_cart'] : array();
    $cart_items = array();
    $total = 0;
    
    foreach ($cart as $product_id => $quantity) {
        $product = get_post($product_id);
        if ($product) {
            $price = get_post_meta($product_id, '_exam_price', true);
            $cart_items[] = array(
                'id' => $product_id,
                'title' => $product->post_title,
                'price' => $price,
                'quantity' => $quantity,
                'subtotal' => $price * $quantity
            );
            $total += $price * $quantity;
        }
    }
    
    wp_send_json_success(array(
        'items' => $cart_items,
        'total' => $total,
        'count' => array_sum($cart)
    ));
}
add_action('wp_ajax_opensheets_get_cart', 'opensheets_get_cart');
add_action('wp_ajax_nopriv_opensheets_get_cart', 'opensheets_get_cart');

// Theme customizer
function opensheets_customize_register($wp_customize) {
    // Store Settings Section
    $wp_customize->add_section('opensheets_store', array(
        'title' => __('Store Settings', 'opensheets'),
        'priority' => 30,
    ));
    
    // Store Phone
    $wp_customize->add_setting('opensheets_phone', array(
        'default' => '085-5555555',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('opensheets_phone', array(
        'label' => __('Store Phone', 'opensheets'),
        'section' => 'opensheets_store',
        'type' => 'text',
    ));
    
    // Store LINE ID
    $wp_customize->add_setting('opensheets_line', array(
        'default' => '@opensheets',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('opensheets_line', array(
        'label' => __('LINE ID', 'opensheets'),
        'section' => 'opensheets_store',
        'type' => 'text',
    ));
}
add_action('customize_register', 'opensheets_customize_register');

// Helper functions
function opensheets_get_cart_count() {
    if (!session_id()) {
        session_start();
    }
    
    $cart = isset($_SESSION['opensheets_cart']) ? $_SESSION['opensheets_cart'] : array();
    return array_sum($cart);
}

function opensheets_format_price($price) {
    return number_format($price, 2) . ' ฿';
}

// Admin menu customization
function opensheets_admin_menu() {
    add_menu_page(
        __('OPEN SHEETS Dashboard', 'opensheets'),
        __('OPEN SHEETS', 'opensheets'),
        'manage_options',
        'opensheets-dashboard',
        'opensheets_dashboard_page',
        'dashicons-store',
        3
    );
    
    add_submenu_page(
        'opensheets-dashboard',
        __('Sales Reports', 'opensheets'),
        __('Reports', 'opensheets'),
        'manage_options',
        'opensheets-reports',
        'opensheets_reports_page'
    );
}
add_action('admin_menu', 'opensheets_admin_menu');

// Dashboard page callback
function opensheets_dashboard_page() {
    echo '<div class="wrap">';
    echo '<h1>' . __('OPEN SHEETS Dashboard', 'opensheets') . '</h1>';
    echo '<div class="dashboard-widgets-wrap">';
    echo '<div class="metabox-holder">';
    
    // Quick stats
    $total_products = wp_count_posts('exam_product')->publish;
    $total_orders = wp_count_posts('exam_order')->publish;
    
    echo '<div class="postbox">';
    echo '<h2 class="hndle">' . __('Quick Stats', 'opensheets') . '</h2>';
    echo '<div class="inside">';
    echo '<p><strong>' . __('Total Products:', 'opensheets') . '</strong> ' . $total_products . '</p>';
    echo '<p><strong>' . __('Total Orders:', 'opensheets') . '</strong> ' . $total_orders . '</p>';
    echo '</div>';
    echo '</div>';
    
    echo '</div>';
    echo '</div>';
    echo '</div>';
}

// Reports page callback
function opensheets_reports_page() {
    echo '<div class="wrap">';
    echo '<h1>' . __('Sales Reports', 'opensheets') . '</h1>';
    echo '<p>' . __('Sales reports and analytics will be displayed here.', 'opensheets') . '</p>';
    echo '</div>';
}

// Database class inclusion
require_once get_template_directory() . '/includes/class-opensheets-database.php';

function opensheets_update_stock() {
    check_ajax_referer('opensheets_admin_nonce', 'nonce');
    
    if (!current_user_can('manage_options')) {
        wp_send_json_error(array('message' => 'Unauthorized'));
        return;
    }
    
    $product_id = intval($_POST['product_id']);
    $new_stock = intval($_POST['stock']);
    
    $current_stock = get_post_meta($product_id, '_exam_stock', true) ?: 0;
    $change = $new_stock - $current_stock;
    
    OpenSheets_Database::update_product_stock($product_id, $change, 'admin_update');
    
    wp_send_json_success(array('message' => __('Stock updated', 'opensheets')));
}
add_action('wp_ajax_opensheets_update_stock', 'opensheets_update_stock');

function opensheets_update_order_status() {
    check_ajax_referer('opensheets_admin_nonce', 'nonce');
    
    if (!current_user_can('manage_options')) {
        wp_send_json_error(array('message' => 'Unauthorized'));
        return;
    }
    
    $order_id = intval($_POST['order_id']);
    $status = sanitize_text_field($_POST['status']);
    
    $result = OpenSheets_Database::update_order_status($order_id, $status);
    
    if ($result) {
        wp_send_json_success(array('message' => __('Order status updated', 'opensheets')));
    } else {
        wp_send_json_error(array('message' => __('Failed to update order status', 'opensheets')));
    }
}
add_action('wp_ajax_opensheets_update_order_status', 'opensheets_update_order_status');

?>
