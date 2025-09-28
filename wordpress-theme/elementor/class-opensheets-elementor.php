<?php
/**
 * OPEN SHEETS Elementor Integration
 *
 * @package OpenSheets
 */

if (!defined('ABSPATH')) {
    exit;
}

class OpenSheets_Elementor {
    
    public function __construct() {
        add_action('elementor/widgets/widgets_registered', array($this, 'register_widgets'));
        add_action('elementor/elements/categories_registered', array($this, 'add_elementor_widget_categories'));
        add_action('elementor/frontend/after_enqueue_styles', array($this, 'enqueue_elementor_styles'));
        add_action('elementor/preview/enqueue_styles', array($this, 'enqueue_elementor_styles'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_elementor_scripts'));
    }
    
    public function add_elementor_widget_categories($elements_manager) {
        $elements_manager->add_category(
            'opensheets',
            array(
                'title' => __('OPEN SHEETS', 'opensheets'),
                'icon' => 'fa fa-book',
            )
        );
    }
    
    public function register_widgets() {
        // Include widget files
        require_once get_template_directory() . '/elementor/widgets/product-grid.php';
        require_once get_template_directory() . '/elementor/widgets/product-carousel.php';
        require_once get_template_directory() . '/elementor/widgets/product-categories.php';
        require_once get_template_directory() . '/elementor/widgets/cart-widget.php';
        require_once get_template_directory() . '/elementor/widgets/featured-products.php';
        require_once get_template_directory() . '/elementor/widgets/product-search.php';
        require_once get_template_directory() . '/elementor/widgets/testimonials.php';
        require_once get_template_directory() . '/elementor/widgets/store-info.php';
        
        // Register widgets
        \Elementor\Plugin::instance()->widgets_manager->register_widget_type(new \OpenSheets_Product_Grid_Widget());
        \Elementor\Plugin::instance()->widgets_manager->register_widget_type(new \OpenSheets_Product_Carousel_Widget());
        \Elementor\Plugin::instance()->widgets_manager->register_widget_type(new \OpenSheets_Product_Categories_Widget());
        \Elementor\Plugin::instance()->widgets_manager->register_widget_type(new \OpenSheets_Cart_Widget());
        \Elementor\Plugin::instance()->widgets_manager->register_widget_type(new \OpenSheets_Featured_Products_Widget());
        \Elementor\Plugin::instance()->widgets_manager->register_widget_type(new \OpenSheets_Product_Search_Widget());
        \Elementor\Plugin::instance()->widgets_manager->register_widget_type(new \OpenSheets_Testimonials_Widget());
        \Elementor\Plugin::instance()->widgets_manager->register_widget_type(new \OpenSheets_Store_Info_Widget());
    }
    
    public function enqueue_elementor_styles() {
        wp_enqueue_style('opensheets-elementor', get_template_directory_uri() . '/elementor/css/elementor.css', array(), '1.0.0');
    }
    
    public function enqueue_elementor_scripts() {
        if (\Elementor\Plugin::$instance->frontend->is_elementor_preview()) {
            wp_enqueue_script('opensheets-elementor', get_template_directory_uri() . '/elementor/js/elementor.js', array('jquery'), '1.0.0', true);
        }
    }
}

// Initialize Elementor integration
new OpenSheets_Elementor();
?>
