<?php
/**
 * Store Info Elementor Widget
 *
 * @package OpenSheets
 */

if (!defined('ABSPATH')) {
    exit;
}

class OpenSheets_Store_Info_Widget extends \Elementor\Widget_Base {
    
    public function get_name() {
        return 'opensheets_store_info';
    }
    
    public function get_title() {
        return __('Store Information', 'opensheets');
    }
    
    public function get_icon() {
        return 'eicon-info-box';
    }
    
    public function get_categories() {
        return array('opensheets');
    }
    
    protected function _register_controls() {
        // Content Section
        $this->start_controls_section(
            'content_section',
            array(
                'label' => __('Store Information', 'opensheets'),
                'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
            )
        );
        
        $this->add_control(
            'show_logo',
            array(
                'label' => __('Show Logo', 'opensheets'),
                'type' => \Elementor\Controls_Manager::SWITCHER,
                'default' => 'yes',
            )
        );
        
        $this->add_control(
            'show_name',
            array(
                'label' => __('Show Store Name', 'opensheets'),
                'type' => \Elementor\Controls_Manager::SWITCHER,
                'default' => 'yes',
            )
        );
        
        $this->add_control(
            'show_description',
            array(
                'label' => __('Show Description', 'opensheets'),
                'type' => \Elementor\Controls_Manager::SWITCHER,
                'default' => 'yes',
            )
        );
        
        $this->add_control(
            'description_text',
            array(
                'label' => __('Description', 'opensheets'),
                'type' => \Elementor\Controls_Manager::TEXTAREA,
                'default' => __('ศูนย์รวมหนังสือเตรียมสอบคุณภาพสูง พร้อมบริการที่ดีที่สุด', 'opensheets'),
                'condition' => array(
                    'show_description' => 'yes',
                ),
            )
        );
        
        $this->add_control(
            'show_contact',
            array(
                'label' => __('Show Contact Info', 'opensheets'),
                'type' => \Elementor\Controls_Manager::SWITCHER,
                'default' => 'yes',
            )
        );
        
        $this->add_control(
            'show_social',
            array(
                'label' => __('Show Social Links', 'opensheets'),
                'type' => \Elementor\Controls_Manager::SWITCHER,
                'default' => 'yes',
            )
        );
        
        $this->add_control(
            'facebook_url',
            array(
                'label' => __('Facebook URL', 'opensheets'),
                'type' => \Elementor\Controls_Manager::URL,
                'placeholder' => 'https://facebook.com/opensheets',
                'condition' => array(
                    'show_social' => 'yes',
                ),
            )
        );
        
        $this->add_control(
            'line_url',
            array(
                'label' => __('LINE URL', 'opensheets'),
                'type' => \Elementor\Controls_Manager::URL,
                'placeholder' => 'https://line.me/ti/p/@opensheets',
                'condition' => array(
                    'show_social' => 'yes',
                ),
            )
        );
        
        $this->add_control(
            'instagram_url',
            array(
                'label' => __('Instagram URL', 'opensheets'),
                'type' => \Elementor\Controls_Manager::URL,
                'placeholder' => 'https://instagram.com/opensheets',
                'condition' => array(
                    'show_social' => 'yes',
                ),
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
        
        $this->add_control(
            'text_align',
            array(
                'label' => __('Alignment', 'opensheets'),
                'type' => \Elementor\Controls_Manager::CHOOSE,
                'options' => array(
                    'left' => array(
                        'title' => __('Left', 'opensheets'),
                        'icon' => 'eicon-text-align-left',
                    ),
                    'center' => array(
                        'title' => __('Center', 'opensheets'),
                        'icon' => 'eicon-text-align-center',
                    ),
                    'right' => array(
                        'title' => __('Right', 'opensheets'),
                        'icon' => 'eicon-text-align-right',
                    ),
                ),
                'default' => 'center',
                'selectors' => array(
                    '{{WRAPPER}} .store-info-widget' => 'text-align: {{VALUE}};',
                ),
            )
        );
        
        $this->add_group_control(
            \Elementor\Group_Control_Typography::get_type(),
            array(
                'name' => 'name_typography',
                'label' => __('Store Name Typography', 'opensheets'),
                'selector' => '{{WRAPPER}} .store-name',
            )
        );
        
        $this->add_control(
            'name_color',
            array(
                'label' => __('Store Name Color', 'opensheets'),
                'type' => \Elementor\Controls_Manager::COLOR,
                'default' => '#2563eb',
                'selectors' => array(
                    '{{WRAPPER}} .store-name' => 'color: {{VALUE}};',
                ),
            )
        );
        
        $this->add_group_control(
            \Elementor\Group_Control_Typography::get_type(),
            array(
                'name' => 'description_typography',
                'label' => __('Description Typography', 'opensheets'),
                'selector' => '{{WRAPPER}} .store-description',
            )
        );
        
        $this->add_control(
            'description_color',
            array(
                'label' => __('Description Color', 'opensheets'),
                'type' => \Elementor\Controls_Manager::COLOR,
                'default' => '#6b7280',
                'selectors' => array(
                    '{{WRAPPER}} .store-description' => 'color: {{VALUE}};',
                ),
            )
        );
        
        $this->end_controls_section();
    }
    
    protected function render() {
        $settings = $this->get_settings_for_display();
        $store_settings = get_option('opensheets_settings', array());
        ?>
        
        <div class="store-info-widget">
            <?php if ($settings['show_logo'] === 'yes' && has_custom_logo()) : ?>
                <div class="store-logo">
                    <?php the_custom_logo(); ?>
                </div>
            <?php endif; ?>
            
            <?php if ($settings['show_name'] === 'yes') : ?>
                <h2 class="store-name">
                    <?php echo esc_html($store_settings['store_name'] ?? 'OPEN SHEETS'); ?>
                </h2>
            <?php endif; ?>
            
            <?php if ($settings['show_description'] === 'yes' && !empty($settings['description_text'])) : ?>
                <p class="store-description">
                    <?php echo esc_html($settings['description_text']); ?>
                </p>
            <?php endif; ?>
            
            <?php if ($settings['show_contact'] === 'yes') : ?>
                <div class="store-contact">
                    <?php if (!empty($store_settings['store_phone'])) : ?>
                        <div class="contact-item">
                            <i class="icon-phone"></i>
                            <span><?php echo esc_html($store_settings['store_phone']); ?></span>
                        </div>
                    <?php endif; ?>
                    
                    <?php if (!empty($store_settings['store_line'])) : ?>
                        <div class="contact-item">
                            <i class="icon-line"></i>
                            <span><?php echo esc_html($store_settings['store_line']); ?></span>
                        </div>
                    <?php endif; ?>
                    
                    <?php if (!empty($store_settings['store_address'])) : ?>
                        <div class="contact-item">
                            <i class="icon-location"></i>
                            <span><?php echo esc_html($store_settings['store_address']); ?></span>
                        </div>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
            
            <?php if ($settings['show_social'] === 'yes') : ?>
                <div class="store-social">
                    <?php if (!empty($settings['facebook_url']['url'])) : ?>
                        <a href="<?php echo esc_url($settings['facebook_url']['url']); ?>" 
                           target="<?php echo $settings['facebook_url']['is_external'] ? '_blank' : '_self'; ?>"
                           class="social-link facebook">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                    <?php endif; ?>
                    
                    <?php if (!empty($settings['line_url']['url'])) : ?>
                        <a href="<?php echo esc_url($settings['line_url']['url']); ?>" 
                           target="<?php echo $settings['line_url']['is_external'] ? '_blank' : '_self'; ?>"
                           class="social-link line">
                            <i class="fab fa-line"></i>
                        </a>
                    <?php endif; ?>
                    
                    <?php if (!empty($settings['instagram_url']['url'])) : ?>
                        <a href="<?php echo esc_url($settings['instagram_url']['url']); ?>" 
                           target="<?php echo $settings['instagram_url']['is_external'] ? '_blank' : '_self'; ?>"
                           class="social-link instagram">
                            <i class="fab fa-instagram"></i>
                        </a>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
        </div>
        
        <?php
    }
}
?>
