<?php
/**
 * Product Grid Elementor Widget
 *
 * @package OpenSheets
 */

if (!defined('ABSPATH')) {
    exit;
}

class OpenSheets_Product_Grid_Widget extends \Elementor\Widget_Base {
    
    public function get_name() {
        return 'opensheets_product_grid';
    }
    
    public function get_title() {
        return __('Product Grid', 'opensheets');
    }
    
    public function get_icon() {
        return 'eicon-products';
    }
    
    public function get_categories() {
        return array('opensheets');
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
            'columns',
            array(
                'label' => __('Columns', 'opensheets'),
                'type' => \Elementor\Controls_Manager::SELECT,
                'default' => '4',
                'options' => array(
                    '2' => __('2 Columns', 'opensheets'),
                    '3' => __('3 Columns', 'opensheets'),
                    '4' => __('4 Columns', 'opensheets'),
                    '5' => __('5 Columns', 'opensheets'),
                ),
            )
        );
        
        $this->add_control(
            'category',
            array(
                'label' => __('Category', 'opensheets'),
                'type' => \Elementor\Controls_Manager::SELECT2,
                'multiple' => true,
                'options' => $this->get_product_categories(),
                'default' => array(),
            )
        );
        
        $this->add_control(
            'orderby',
            array(
                'label' => __('Order By', 'opensheets'),
                'type' => \Elementor\Controls_Manager::SELECT,
                'default' => 'date',
                'options' => array(
                    'date' => __('Date', 'opensheets'),
                    'title' => __('Title', 'opensheets'),
                    'menu_order' => __('Menu Order', 'opensheets'),
                    'rand' => __('Random', 'opensheets'),
                ),
            )
        );
        
        $this->add_control(
            'order',
            array(
                'label' => __('Order', 'opensheets'),
                'type' => \Elementor\Controls_Manager::SELECT,
                'default' => 'DESC',
                'options' => array(
                    'ASC' => __('Ascending', 'opensheets'),
                    'DESC' => __('Descending', 'opensheets'),
                ),
            )
        );
        
        $this->add_control(
            'show_pagination',
            array(
                'label' => __('Show Pagination', 'opensheets'),
                'type' => \Elementor\Controls_Manager::SWITCHER,
                'default' => 'no',
            )
        );
        
        $this->end_controls_section();
        
        // Style Section
        $this->start_controls_section(
            'style_section',
            array(
                'label' => __('Style', 'opensheets'),
                'tab' => \Elementor\Controls_Manager::TAB_STYLE,
            )
        );
        
        $this->add_responsive_control(
            'column_gap',
            array(
                'label' => __('Column Gap', 'opensheets'),
                'type' => \Elementor\Controls_Manager::SLIDER,
                'size_units' => array('px', 'em', 'rem'),
                'range' => array(
                    'px' => array(
                        'min' => 0,
                        'max' => 100,
                    ),
                ),
                'default' => array(
                    'unit' => 'px',
                    'size' => 30,
                ),
                'selectors' => array(
                    '{{WRAPPER}} .opensheets-product-grid' => 'gap: {{SIZE}}{{UNIT}};',
                ),
            )
        );
        
        $this->add_control(
            'card_background',
            array(
                'label' => __('Card Background', 'opensheets'),
                'type' => \Elementor\Controls_Manager::COLOR,
                'default' => '#ffffff',
                'selectors' => array(
                    '{{WRAPPER}} .product-card' => 'background-color: {{VALUE}};',
                ),
            )
        );
        
        $this->add_group_control(
            \Elementor\Group_Control_Border::get_type(),
            array(
                'name' => 'card_border',
                'selector' => '{{WRAPPER}} .product-card',
            )
        );
        
        $this->add_control(
            'card_border_radius',
            array(
                'label' => __('Border Radius', 'opensheets'),
                'type' => \Elementor\Controls_Manager::DIMENSIONS,
                'size_units' => array('px', '%'),
                'selectors' => array(
                    '{{WRAPPER}} .product-card' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ),
            )
        );
        
        $this->add_group_control(
            \Elementor\Group_Control_Box_Shadow::get_type(),
            array(
                'name' => 'card_shadow',
                'selector' => '{{WRAPPER}} .product-card',
            )
        );
        
        $this->end_controls_section();
    }
    
    protected function render() {
        $settings = $this->get_settings_for_display();
        
        $args = array(
            'post_type' => 'exam_product',
            'posts_per_page' => $settings['posts_per_page'],
            'orderby' => $settings['orderby'],
            'order' => $settings['order'],
        );
        
        if (!empty($settings['category'])) {
            $args['tax_query'] = array(
                array(
                    'taxonomy' => 'exam_category',
                    'field' => 'term_id',
                    'terms' => $settings['category'],
                ),
            );
        }
        
        if ($settings['show_pagination'] === 'yes') {
            $args['paged'] = get_query_var('paged') ? get_query_var('paged') : 1;
        }
        
        $products = new WP_Query($args);
        
        if ($products->have_posts()) :
        ?>
            <div class="opensheets-product-grid" style="display: grid; grid-template-columns: repeat(<?php echo esc_attr($settings['columns']); ?>, 1fr);">
                <?php while ($products->have_posts()) : $products->the_post(); ?>
                    <?php get_template_part('template-parts/content', 'product-card'); ?>
                <?php endwhile; ?>
            </div>
            
            <?php if ($settings['show_pagination'] === 'yes') : ?>
                <div class="elementor-pagination">
                    <?php
                    echo paginate_links(array(
                        'total' => $products->max_num_pages,
                        'current' => max(1, get_query_var('paged')),
                        'prev_text' => __('« Previous', 'opensheets'),
                        'next_text' => __('Next »', 'opensheets'),
                    ));
                    ?>
                </div>
            <?php endif; ?>
            
        <?php
        wp_reset_postdata();
        else :
        ?>
            <div class="no-products-found">
                <p><?php _e('No products found.', 'opensheets'); ?></p>
            </div>
        <?php
        endif;
    }
    
    private function get_product_categories() {
        $categories = get_terms(array(
            'taxonomy' => 'exam_category',
            'hide_empty' => false,
        ));
        
        $options = array();
        if (!is_wp_error($categories)) {
            foreach ($categories as $category) {
                $options[$category->term_id] = $category->name;
            }
        }
        
        return $options;
    }
}
?>
