<?php
/**
 * Product Carousel Elementor Widget
 *
 * @package OpenSheets
 */

if (!defined('ABSPATH')) {
    exit;
}

class OpenSheets_Product_Carousel_Widget extends \Elementor\Widget_Base {
    
    public function get_name() {
        return 'opensheets_product_carousel';
    }
    
    public function get_title() {
        return __('Product Carousel', 'opensheets');
    }
    
    public function get_icon() {
        return 'eicon-slider-push';
    }
    
    public function get_categories() {
        return array('opensheets');
    }
    
    public function get_script_depends() {
        return array('swiper');
    }
    
    public function get_style_depends() {
        return array('swiper');
    }
    
    protected function _register_controls() {
        // Content Section
        $this->start_controls_section(
            'content_section',
            array(
                'label' => __('Content', 'opensheets'),
                'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
            )
        );
        
        $this->add_control(
            'posts_per_page',
            array(
                'label' => __('Number of Products', 'opensheets'),
                'type' => \Elementor\Controls_Manager::NUMBER,
                'default' => 8,
                'min' => 1,
                'max' => 50,
            )
        );
        
        $this->add_control(
            'slides_to_show',
            array(
                'label' => __('Slides to Show', 'opensheets'),
                'type' => \Elementor\Controls_Manager::NUMBER,
                'default' => 4,
                'min' => 1,
                'max' => 8,
            )
        );
        
        $this->add_control(
            'slides_to_scroll',
            array(
                'label' => __('Slides to Scroll', 'opensheets'),
                'type' => \Elementor\Controls_Manager::NUMBER,
                'default' => 1,
                'min' => 1,
                'max' => 4,
            )
        );
        
        $this->add_control(
            'autoplay',
            array(
                'label' => __('Autoplay', 'opensheets'),
                'type' => \Elementor\Controls_Manager::SWITCHER,
                'default' => 'yes',
            )
        );
        
        $this->add_control(
            'autoplay_speed',
            array(
                'label' => __('Autoplay Speed (ms)', 'opensheets'),
                'type' => \Elementor\Controls_Manager::NUMBER,
                'default' => 3000,
                'condition' => array(
                    'autoplay' => 'yes',
                ),
            )
        );
        
        $this->add_control(
            'show_arrows',
            array(
                'label' => __('Show Arrows', 'opensheets'),
                'type' => \Elementor\Controls_Manager::SWITCHER,
                'default' => 'yes',
            )
        );
        
        $this->add_control(
            'show_dots',
            array(
                'label' => __('Show Dots', 'opensheets'),
                'type' => \Elementor\Controls_Manager::SWITCHER,
                'default' => 'no',
            )
        );
        
        $this->end_controls_section();
        
        // Responsive Section
        $this->start_controls_section(
            'responsive_section',
            array(
                'label' => __('Responsive', 'opensheets'),
                'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
            )
        );
        
        $this->add_control(
            'slides_tablet',
            array(
                'label' => __('Slides on Tablet', 'opensheets'),
                'type' => \Elementor\Controls_Manager::NUMBER,
                'default' => 2,
                'min' => 1,
                'max' => 4,
            )
        );
        
        $this->add_control(
            'slides_mobile',
            array(
                'label' => __('Slides on Mobile', 'opensheets'),
                'type' => \Elementor\Controls_Manager::NUMBER,
                'default' => 1,
                'min' => 1,
                'max' => 2,
            )
        );
        
        $this->end_controls_section();
    }
    
    protected function render() {
        $settings = $this->get_settings_for_display();
        
        $args = array(
            'post_type' => 'exam_product',
            'posts_per_page' => $settings['posts_per_page'],
            'orderby' => 'date',
            'order' => 'DESC',
        );
        
        $products = new WP_Query($args);
        
        if ($products->have_posts()) :
            $carousel_id = 'carousel-' . $this->get_id();
        ?>
            <div class="opensheets-product-carousel">
                <div class="swiper-container" id="<?php echo esc_attr($carousel_id); ?>">
                    <div class="swiper-wrapper">
                        <?php while ($products->have_posts()) : $products->the_post(); ?>
                            <div class="swiper-slide">
                                <?php get_template_part('template-parts/content', 'product-card'); ?>
                            </div>
                        <?php endwhile; ?>
                    </div>
                    
                    <?php if ($settings['show_arrows'] === 'yes') : ?>
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                    <?php endif; ?>
                    
                    <?php if ($settings['show_dots'] === 'yes') : ?>
                        <div class="swiper-pagination"></div>
                    <?php endif; ?>
                </div>
            </div>
            
            <script>
            jQuery(document).ready(function($) {
                var swiper = new Swiper('#<?php echo esc_js($carousel_id); ?>', {
                    slidesPerView: <?php echo esc_js($settings['slides_to_show']); ?>,
                    slidesPerGroup: <?php echo esc_js($settings['slides_to_scroll']); ?>,
                    spaceBetween: 30,
                    <?php if ($settings['autoplay'] === 'yes') : ?>
                    autoplay: {
                        delay: <?php echo esc_js($settings['autoplay_speed']); ?>,
                        disableOnInteraction: false,
                    },
                    <?php endif; ?>
                    <?php if ($settings['show_arrows'] === 'yes') : ?>
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    <?php endif; ?>
                    <?php if ($settings['show_dots'] === 'yes') : ?>
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    <?php endif; ?>
                    breakpoints: {
                        768: {
                            slidesPerView: <?php echo esc_js($settings['slides_tablet']); ?>,
                        },
                        480: {
                            slidesPerView: <?php echo esc_js($settings['slides_mobile']); ?>,
                        }
                    }
                });
            });
            </script>
            
        <?php
        wp_reset_postdata();
        endif;
    }
}
?>
