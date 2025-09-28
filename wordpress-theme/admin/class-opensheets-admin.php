<?php
/**
 * OPEN SHEETS Admin Class
 *
 * @package OpenSheets
 */

if (!defined('ABSPATH')) {
    exit;
}

class OpenSheets_Admin {
    
    public function __construct() {
        add_action('admin_menu', array($this, 'add_admin_menus'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
        add_action('wp_ajax_opensheets_get_stats', array($this, 'get_dashboard_stats'));
        add_action('wp_ajax_opensheets_export_orders', array($this, 'export_orders'));
        add_action('admin_init', array($this, 'handle_bulk_actions'));
    }
    
    public function add_admin_menus() {
        // Main dashboard
        add_menu_page(
            __('OPEN SHEETS', 'opensheets'),
            __('OPEN SHEETS', 'opensheets'),
            'manage_options',
            'opensheets-dashboard',
            array($this, 'dashboard_page'),
            'dashicons-store',
            3
        );
        
        // Orders management
        add_submenu_page(
            'opensheets-dashboard',
            __('จัดการคำสั่งซื้อ', 'opensheets'),
            __('คำสั่งซื้อ', 'opensheets'),
            'manage_options',
            'opensheets-orders',
            array($this, 'orders_page')
        );
        
        // Inventory management
        add_submenu_page(
            'opensheets-dashboard',
            __('จัดการสต็อก', 'opensheets'),
            __('สต็อกสินค้า', 'opensheets'),
            'manage_options',
            'opensheets-inventory',
            array($this, 'inventory_page')
        );
        
        // Reports
        add_submenu_page(
            'opensheets-dashboard',
            __('รายงานยอดขาย', 'opensheets'),
            __('รายงาน', 'opensheets'),
            'manage_options',
            'opensheets-reports',
            array($this, 'reports_page')
        );
        
        // Coupons
        add_submenu_page(
            'opensheets-dashboard',
            __('จัดการคูปอง', 'opensheets'),
            __('คูปอง', 'opensheets'),
            'manage_options',
            'opensheets-coupons',
            array($this, 'coupons_page')
        );
        
        // Settings
        add_submenu_page(
            'opensheets-dashboard',
            __('ตั้งค่าร้านค้า', 'opensheets'),
            __('ตั้งค่า', 'opensheets'),
            'manage_options',
            'opensheets-settings',
            array($this, 'settings_page')
        );
    }
    
    public function enqueue_admin_scripts($hook) {
        if (strpos($hook, 'opensheets') !== false) {
            wp_enqueue_style('opensheets-admin', get_template_directory_uri() . '/admin/css/admin.css', array(), '1.0.0');
            wp_enqueue_script('opensheets-admin', get_template_directory_uri() . '/admin/js/admin.js', array('jquery'), '1.0.0', true);
            wp_enqueue_script('chart-js', 'https://cdn.jsdelivr.net/npm/chart.js', array(), '3.9.1', true);
            
            wp_localize_script('opensheets-admin', 'opensheets_admin', array(
                'ajax_url' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('opensheets_admin_nonce'),
            ));
        }
    }
    
    public function dashboard_page() {
        ?>
        <div class="wrap opensheets-admin">
            <h1><?php _e('OPEN SHEETS Dashboard', 'opensheets'); ?></h1>
            
            <div class="opensheets-dashboard">
                <div class="dashboard-stats">
                    <div class="stat-card">
                        <div class="stat-icon">📊</div>
                        <div class="stat-content">
                            <h3 id="total-sales">0 ฿</h3>
                            <p><?php _e('ยอดขายรวม', 'opensheets'); ?></p>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">📦</div>
                        <div class="stat-content">
                            <h3 id="total-orders">0</h3>
                            <p><?php _e('คำสั่งซื้อทั้งหมด', 'opensheets'); ?></p>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">📚</div>
                        <div class="stat-content">
                            <h3 id="total-products"><?php echo wp_count_posts('exam_product')->publish; ?></h3>
                            <p><?php _e('สินค้าทั้งหมด', 'opensheets'); ?></p>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">⚠️</div>
                        <div class="stat-content">
                            <h3 id="low-stock">0</h3>
                            <p><?php _e('สินค้าใกล้หมด', 'opensheets'); ?></p>
                        </div>
                    </div>
                </div>
                
                <div class="dashboard-charts">
                    <div class="chart-container">
                        <h3><?php _e('ยอดขายรายเดือน', 'opensheets'); ?></h3>
                        <canvas id="sales-chart"></canvas>
                    </div>
                    
                    <div class="chart-container">
                        <h3><?php _e('สินค้าขายดี', 'opensheets'); ?></h3>
                        <canvas id="products-chart"></canvas>
                    </div>
                </div>
                
                <div class="dashboard-recent">
                    <div class="recent-orders">
                        <h3><?php _e('คำสั่งซื้อล่าสุด', 'opensheets'); ?></h3>
                        <div id="recent-orders-list">
                             Orders will be loaded via AJAX 
                        </div>
                    </div>
                    
                    <div class="quick-actions">
                        <h3><?php _e('การดำเนินการด่วน', 'opensheets'); ?></h3>
                        <div class="action-buttons">
                            <a href="<?php echo admin_url('post-new.php?post_type=exam_product'); ?>" class="button button-primary">
                                <?php _e('เพิ่มสินค้าใหม่', 'opensheets'); ?>
                            </a>
                            <a href="<?php echo admin_url('admin.php?page=opensheets-orders'); ?>" class="button">
                                <?php _e('จัดการคำสั่งซื้อ', 'opensheets'); ?>
                            </a>
                            <a href="<?php echo admin_url('admin.php?page=opensheets-inventory'); ?>" class="button">
                                <?php _e('ตรวจสอบสต็อก', 'opensheets'); ?>
                            </a>
                            <button id="export-data" class="button">
                                <?php _e('ส่งออกข้อมูล', 'opensheets'); ?>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }
    
    public function orders_page() {
        $orders = get_posts(array(
            'post_type' => 'exam_order',
            'posts_per_page' => 20,
            'post_status' => 'any',
        ));
        ?>
        <div class="wrap opensheets-admin">
            <h1><?php _e('จัดการคำสั่งซื้อ', 'opensheets'); ?></h1>
            
            <div class="orders-filters">
                <select id="order-status-filter">
                    <option value=""><?php _e('สถานะทั้งหมด', 'opensheets'); ?></option>
                    <option value="pending"><?php _e('รอดำเนินการ', 'opensheets'); ?></option>
                    <option value="processing"><?php _e('กำลังดำเนินการ', 'opensheets'); ?></option>
                    <option value="completed"><?php _e('เสร็จสิ้น', 'opensheets'); ?></option>
                    <option value="cancelled"><?php _e('ยกเลิก', 'opensheets'); ?></option>
                </select>
                
                <input type="date" id="order-date-from" placeholder="<?php _e('จากวันที่', 'opensheets'); ?>">
                <input type="date" id="order-date-to" placeholder="<?php _e('ถึงวันที่', 'opensheets'); ?>">
                
                <button id="filter-orders" class="button"><?php _e('กรอง', 'opensheets'); ?></button>
                <button id="export-orders" class="button"><?php _e('ส่งออก Excel', 'opensheets'); ?></button>
            </div>
            
            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th><?php _e('เลขที่คำสั่งซื้อ', 'opensheets'); ?></th>
                        <th><?php _e('ลูกค้า', 'opensheets'); ?></th>
                        <th><?php _e('ยอดรวม', 'opensheets'); ?></th>
                        <th><?php _e('สถานะ', 'opensheets'); ?></th>
                        <th><?php _e('วันที่', 'opensheets'); ?></th>
                        <th><?php _e('การดำเนินการ', 'opensheets'); ?></th>
                    </tr>
                </thead>
                <tbody>
                    <?php if ($orders) : ?>
                        <?php foreach ($orders as $order) : ?>
                            <?php
                            $order_data = get_post_meta($order->ID, '_order_data', true);
                            $status = get_post_meta($order->ID, '_order_status', true) ?: 'pending';
                            ?>
                            <tr>
                                <td><strong>#<?php echo $order->ID; ?></strong></td>
                                <td>
                                    <?php echo esc_html($order_data['customer_name'] ?? 'N/A'); ?><br>
                                    <small><?php echo esc_html($order_data['customer_email'] ?? ''); ?></small>
                                </td>
                                <td><?php echo opensheets_format_price($order_data['total'] ?? 0); ?></td>
                                <td>
                                    <select class="order-status-select" data-order-id="<?php echo $order->ID; ?>">
                                        <option value="pending" <?php selected($status, 'pending'); ?>><?php _e('รอดำเนินการ', 'opensheets'); ?></option>
                                        <option value="processing" <?php selected($status, 'processing'); ?>><?php _e('กำลังดำเนินการ', 'opensheets'); ?></option>
                                        <option value="completed" <?php selected($status, 'completed'); ?>><?php _e('เสร็จสิ้น', 'opensheets'); ?></option>
                                        <option value="cancelled" <?php selected($status, 'cancelled'); ?>><?php _e('ยกเลิก', 'opensheets'); ?></option>
                                    </select>
                                </td>
                                <td><?php echo get_the_date('d/m/Y H:i', $order); ?></td>
                                <td>
                                    <a href="<?php echo admin_url('admin.php?page=opensheets-order-detail&order_id=' . $order->ID); ?>" class="button button-small">
                                        <?php _e('ดูรายละเอียด', 'opensheets'); ?>
                                    </a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php else : ?>
                        <tr>
                            <td colspan="6"><?php _e('ไม่มีคำสั่งซื้อ', 'opensheets'); ?></td>
                        </tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
        <?php
    }
    
    public function inventory_page() {
        $products = get_posts(array(
            'post_type' => 'exam_product',
            'posts_per_page' => -1,
            'post_status' => 'publish',
        ));
        ?>
        <div class="wrap opensheets-admin">
            <h1><?php _e('จัดการสต็อกสินค้า', 'opensheets'); ?></h1>
            
            <div class="inventory-actions">
                <button id="bulk-update-stock" class="button button-primary"><?php _e('อัปเดตสต็อกแบบกลุ่ม', 'opensheets'); ?></button>
                <button id="export-inventory" class="button"><?php _e('ส่งออกรายงานสต็อก', 'opensheets'); ?></button>
            </div>
            
            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th><input type="checkbox" id="select-all"></th>
                        <th><?php _e('รูปภาพ', 'opensheets'); ?></th>
                        <th><?php _e('ชื่อสินค้า', 'opensheets'); ?></th>
                        <th><?php _e('รหัสสินค้า', 'opensheets'); ?></th>
                        <th><?php _e('ราคา', 'opensheets'); ?></th>
                        <th><?php _e('สต็อกปัจจุบัน', 'opensheets'); ?></th>
                        <th><?php _e('สถานะ', 'opensheets'); ?></th>
                        <th><?php _e('การดำเนินการ', 'opensheets'); ?></th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($products as $product) : ?>
                        <?php
                        $stock = get_post_meta($product->ID, '_exam_stock', true);
                        $price = get_post_meta($product->ID, '_exam_price', true);
                        $sku = get_post_meta($product->ID, '_exam_sku', true);
                        $stock_status = $stock > 10 ? 'in-stock' : ($stock > 0 ? 'low-stock' : 'out-of-stock');
                        ?>
                        <tr>
                            <td><input type="checkbox" class="product-checkbox" value="<?php echo $product->ID; ?>"></td>
                            <td>
                                <?php if (has_post_thumbnail($product->ID)) : ?>
                                    <?php echo get_the_post_thumbnail($product->ID, array(50, 50)); ?>
                                <?php else : ?>
                                    <div class="no-image">📚</div>
                                <?php endif; ?>
                            </td>
                            <td>
                                <strong><?php echo $product->post_title; ?></strong><br>
                                <small><a href="<?php echo get_edit_post_link($product->ID); ?>"><?php _e('แก้ไข', 'opensheets'); ?></a></small>
                            </td>
                            <td><?php echo esc_html($sku); ?></td>
                            <td><?php echo opensheets_format_price($price); ?></td>
                            <td>
                                <input type="number" class="stock-input" value="<?php echo $stock; ?>" 
                                       data-product-id="<?php echo $product->ID; ?>" min="0">
                            </td>
                            <td>
                                <span class="stock-status <?php echo $stock_status; ?>">
                                    <?php
                                    switch ($stock_status) {
                                        case 'in-stock':
                                            _e('มีสินค้า', 'opensheets');
                                            break;
                                        case 'low-stock':
                                            _e('เหลือน้อย', 'opensheets');
                                            break;
                                        case 'out-of-stock':
                                            _e('หมด', 'opensheets');
                                            break;
                                    }
                                    ?>
                                </span>
                            </td>
                            <td>
                                <button class="button button-small update-stock-btn" data-product-id="<?php echo $product->ID; ?>">
                                    <?php _e('อัปเดต', 'opensheets'); ?>
                                </button>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        <?php
    }
    
    public function reports_page() {
        ?>
        <div class="wrap opensheets-admin">
            <h1><?php _e('รายงานยอดขาย', 'opensheets'); ?></h1>
            
            <div class="reports-filters">
                <select id="report-period">
                    <option value="7days"><?php _e('7 วันที่ผ่านมา', 'opensheets'); ?></option>
                    <option value="30days"><?php _e('30 วันที่ผ่านมา', 'opensheets'); ?></option>
                    <option value="3months"><?php _e('3 เดือนที่ผ่านมา', 'opensheets'); ?></option>
                    <option value="1year"><?php _e('1 ปีที่ผ่านมา', 'opensheets'); ?></option>
                    <option value="custom"><?php _e('กำหนดเอง', 'opensheets'); ?></option>
                </select>
                
                <div id="custom-date-range" style="display: none;">
                    <input type="date" id="report-date-from">
                    <input type="date" id="report-date-to">
                </div>
                
                <button id="generate-report" class="button button-primary"><?php _e('สร้างรายงาน', 'opensheets'); ?></button>
                <button id="export-report" class="button"><?php _e('ส่งออก PDF', 'opensheets'); ?></button>
            </div>
            
            <div class="reports-content">
                <div class="report-summary">
                    <div class="summary-card">
                        <h3 id="report-total-sales">0 ฿</h3>
                        <p><?php _e('ยอดขายรวม', 'opensheets'); ?></p>
                    </div>
                    <div class="summary-card">
                        <h3 id="report-total-orders">0</h3>
                        <p><?php _e('จำนวนคำสั่งซื้อ', 'opensheets'); ?></p>
                    </div>
                    <div class="summary-card">
                        <h3 id="report-avg-order">0 ฿</h3>
                        <p><?php _e('ยอดเฉลี่ยต่อคำสั่งซื้อ', 'opensheets'); ?></p>
                    </div>
                </div>
                
                <div class="report-charts">
                    <div class="chart-container">
                        <h3><?php _e('กราฟยอดขายรายวัน', 'opensheets'); ?></h3>
                        <canvas id="daily-sales-chart"></canvas>
                    </div>
                    
                    <div class="chart-container">
                        <h3><?php _e('สินค้าขายดีอันดับ 10', 'opensheets'); ?></h3>
                        <canvas id="top-products-chart"></canvas>
                    </div>
                </div>
                
                <div class="report-tables">
                    <div class="table-container">
                        <h3><?php _e('รายละเอียดยอดขายรายวัน', 'opensheets'); ?></h3>
                        <table id="daily-sales-table" class="wp-list-table widefat fixed striped">
                            <thead>
                                <tr>
                                    <th><?php _e('วันที่', 'opensheets'); ?></th>
                                    <th><?php _e('จำนวนคำสั่งซื้อ', 'opensheets'); ?></th>
                                    <th><?php _e('ยอดขาย', 'opensheets'); ?></th>
                                </tr>
                            </thead>
                            <tbody>
                                 Data will be loaded via AJAX 
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }
    
    public function coupons_page() {
        ?>
        <div class="wrap opensheets-admin">
            <h1><?php _e('จัดการคูปอง', 'opensheets'); ?></h1>
            
            <div class="coupon-actions">
                <button id="add-new-coupon" class="button button-primary"><?php _e('เพิ่มคูปองใหม่', 'opensheets'); ?></button>
            </div>
            
            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th><?php _e('รหัสคูปอง', 'opensheets'); ?></th>
                        <th><?php _e('ประเภท', 'opensheets'); ?></th>
                        <th><?php _e('ส่วนลด', 'opensheets'); ?></th>
                        <th><?php _e('เงื่อนไข', 'opensheets'); ?></th>
                        <th><?php _e('วันหมดอายุ', 'opensheets'); ?></th>
                        <th><?php _e('สถานะ', 'opensheets'); ?></th>
                        <th><?php _e('การดำเนินการ', 'opensheets'); ?></th>
                    </tr>
                </thead>
                <tbody id="coupons-list">
                     Coupons will be loaded via AJAX 
                </tbody>
            </table>
            
             Add/Edit Coupon Modal 
            <div id="coupon-modal" class="opensheets-modal" style="display: none;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 id="modal-title"><?php _e('เพิ่มคูปองใหม่', 'opensheets'); ?></h2>
                        <span class="close">&times;</span>
                    </div>
                    <div class="modal-body">
                        <form id="coupon-form">
                            <input type="hidden" id="coupon-id" name="coupon_id">
                            
                            <div class="form-group">
                                <label for="coupon-code"><?php _e('รหัสคูปอง', 'opensheets'); ?></label>
                                <input type="text" id="coupon-code" name="coupon_code" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="discount-type"><?php _e('ประเภทส่วนลด', 'opensheets'); ?></label>
                                <select id="discount-type" name="discount_type">
                                    <option value="percentage"><?php _e('เปอร์เซ็นต์', 'opensheets'); ?></option>
                                    <option value="fixed"><?php _e('จำนวนเงิน', 'opensheets'); ?></option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="discount-value"><?php _e('ค่าส่วนลด', 'opensheets'); ?></label>
                                <input type="number" id="discount-value" name="discount_value" step="0.01" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="minimum-amount"><?php _e('ยอดขั้นต่ำ', 'opensheets'); ?></label>
                                <input type="number" id="minimum-amount" name="minimum_amount" step="0.01">
                            </div>
                            
                            <div class="form-group">
                                <label for="expiry-date"><?php _e('วันหมดอายุ', 'opensheets'); ?></label>
                                <input type="date" id="expiry-date" name="expiry_date">
                            </div>
                            
                            <div class="form-group">
                                <label for="usage-limit"><?php _e('จำนวนครั้งที่ใช้ได้', 'opensheets'); ?></label>
                                <input type="number" id="usage-limit" name="usage_limit" min="1">
                            </div>
                            
                            <div class="form-actions">
                                <button type="submit" class="button button-primary"><?php _e('บันทึก', 'opensheets'); ?></button>
                                <button type="button" class="button cancel-btn"><?php _e('ยกเลิก', 'opensheets'); ?></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }
    
    public function settings_page() {
        if (isset($_POST['save_settings'])) {
            $this->save_settings();
        }
        
        $settings = get_option('opensheets_settings', array());
        ?>
        <div class="wrap opensheets-admin">
            <h1><?php _e('ตั้งค่าร้านค้า', 'opensheets'); ?></h1>
            
            <form method="post" action="">
                <?php wp_nonce_field('opensheets_settings', 'opensheets_settings_nonce'); ?>
                
                <table class="form-table">
                    <tr>
                        <th scope="row"><?php _e('ชื่อร้านค้า', 'opensheets'); ?></th>
                        <td>
                            <input type="text" name="store_name" value="<?php echo esc_attr($settings['store_name'] ?? 'OPEN SHEETS'); ?>" class="regular-text">
                        </td>
                    </tr>
                    
                    <tr>
                        <th scope="row"><?php _e('เบอร์โทรศัพท์', 'opensheets'); ?></th>
                        <td>
                            <input type="text" name="store_phone" value="<?php echo esc_attr($settings['store_phone'] ?? '085-5555555'); ?>" class="regular-text">
                        </td>
                    </tr>
                    
                    <tr>
                        <th scope="row"><?php _e('LINE ID', 'opensheets'); ?></th>
                        <td>
                            <input type="text" name="store_line" value="<?php echo esc_attr($settings['store_line'] ?? '@opensheets'); ?>" class="regular-text">
                        </td>
                    </tr>
                    
                    <tr>
                        <th scope="row"><?php _e('ที่อยู่ร้านค้า', 'opensheets'); ?></th>
                        <td>
                            <textarea name="store_address" rows="3" class="large-text"><?php echo esc_textarea($settings['store_address'] ?? ''); ?></textarea>
                        </td>
                    </tr>
                    
                    <tr>
                        <th scope="row"><?php _e('ค่าจัดส่ง', 'opensheets'); ?></th>
                        <td>
                            <input type="number" name="shipping_cost" value="<?php echo esc_attr($settings['shipping_cost'] ?? '50'); ?>" step="0.01" class="small-text"> ฿
                        </td>
                    </tr>
                    
                    <tr>
                        <th scope="row"><?php _e('ฟรีค่าจัดส่งเมื่อซื้อครบ', 'opensheets'); ?></th>
                        <td>
                            <input type="number" name="free_shipping_min" value="<?php echo esc_attr($settings['free_shipping_min'] ?? '500'); ?>" step="0.01" class="small-text"> ฿
                        </td>
                    </tr>
                    
                    <tr>
                        <th scope="row"><?php _e('การแจ้งเตือนสต็อกต่ำ', 'opensheets'); ?></th>
                        <td>
                            <input type="number" name="low_stock_threshold" value="<?php echo esc_attr($settings['low_stock_threshold'] ?? '5'); ?>" min="1" class="small-text"> <?php _e('ชิ้น', 'opensheets'); ?>
                        </td>
                    </tr>
                </table>
                
                <p class="submit">
                    <input type="submit" name="save_settings" class="button-primary" value="<?php _e('บันทึกการตั้งค่า', 'opensheets'); ?>">
                </p>
            </form>
        </div>
        <?php
    }
    
    private function save_settings() {
        if (!wp_verify_nonce($_POST['opensheets_settings_nonce'], 'opensheets_settings')) {
            return;
        }
        
        $settings = array(
            'store_name' => sanitize_text_field($_POST['store_name']),
            'store_phone' => sanitize_text_field($_POST['store_phone']),
            'store_line' => sanitize_text_field($_POST['store_line']),
            'store_address' => sanitize_textarea_field($_POST['store_address']),
            'shipping_cost' => floatval($_POST['shipping_cost']),
            'free_shipping_min' => floatval($_POST['free_shipping_min']),
            'low_stock_threshold' => intval($_POST['low_stock_threshold']),
        );
        
        update_option('opensheets_settings', $settings);
        
        echo '<div class="notice notice-success"><p>' . __('การตั้งค่าถูกบันทึกแล้ว', 'opensheets') . '</p></div>';
    }
    
    public function get_dashboard_stats() {
        check_ajax_referer('opensheets_admin_nonce', 'nonce');
        
        // Calculate stats
        $orders = get_posts(array(
            'post_type' => 'exam_order',
            'posts_per_page' => -1,
            'post_status' => 'any',
        ));
        
        $total_sales = 0;
        $total_orders = count($orders);
        
        foreach ($orders as $order) {
            $order_data = get_post_meta($order->ID, '_order_data', true);
            $total_sales += $order_data['total'] ?? 0;
        }
        
        // Low stock products
        $products = get_posts(array(
            'post_type' => 'exam_product',
            'posts_per_page' => -1,
            'meta_query' => array(
                array(
                    'key' => '_exam_stock',
                    'value' => 5,
                    'compare' => '<',
                    'type' => 'NUMERIC',
                ),
            ),
        ));
        
        $low_stock = count($products);
        
        wp_send_json_success(array(
            'total_sales' => $total_sales,
            'total_orders' => $total_orders,
            'low_stock' => $low_stock,
        ));
    }
    
    public function export_orders() {
        check_ajax_referer('opensheets_admin_nonce', 'nonce');
        
        // Generate CSV export
        $orders = get_posts(array(
            'post_type' => 'exam_order',
            'posts_per_page' => -1,
            'post_status' => 'any',
        ));
        
        $csv_data = array();
        $csv_data[] = array('Order ID', 'Customer Name', 'Email', 'Total', 'Status', 'Date');
        
        foreach ($orders as $order) {
            $order_data = get_post_meta($order->ID, '_order_data', true);
            $status = get_post_meta($order->ID, '_order_status', true);
            
            $csv_data[] = array(
                $order->ID,
                $order_data['customer_name'] ?? '',
                $order_data['customer_email'] ?? '',
                $order_data['total'] ?? 0,
                $status,
                get_the_date('Y-m-d H:i:s', $order),
            );
        }
        
        wp_send_json_success(array(
            'csv_data' => $csv_data,
            'filename' => 'orders_' . date('Y-m-d') . '.csv',
        ));
    }
    
    public function handle_bulk_actions() {
        if (isset($_POST['bulk_action']) && $_POST['bulk_action'] === 'update_stock') {
            if (isset($_POST['product_ids']) && isset($_POST['stock_values'])) {
                foreach ($_POST['product_ids'] as $index => $product_id) {
                    $stock_value = intval($_POST['stock_values'][$index]);
                    update_post_meta($product_id, '_exam_stock', $stock_value);
                }
                
                add_action('admin_notices', function() {
                    echo '<div class="notice notice-success"><p>' . __('สต็อกสินค้าถูกอัปเดตแล้ว', 'opensheets') . '</p></div>';
                });
            }
        }
    }
}

// Initialize admin class
new OpenSheets_Admin();
?>
