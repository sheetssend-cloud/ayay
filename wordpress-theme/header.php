<?php
/**
 * The header for our theme
 *
 * @package OpenSheets
 */
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site">
    <header id="masthead" class="site-header">
        <div class="container">
            <div class="header-content">
                <div class="site-branding">
                    <?php if (has_custom_logo()) : ?>
                        <?php the_custom_logo(); ?>
                    <?php else : ?>
                        <a href="<?php echo esc_url(home_url('/')); ?>" class="site-logo">
                            <span class="logo-icon">O</span>
                            <span class="logo-text">OPEN SHEETS</span>
                        </a>
                    <?php endif; ?>
                </div>

                <nav id="site-navigation" class="main-navigation">
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'primary',
                        'menu_id'        => 'primary-menu',
                        'fallback_cb'    => 'opensheets_default_menu',
                    ));
                    ?>
                </nav>

                <div class="header-actions">
                    <div class="contact-info">
                        <span class="phone">
                            <i class="icon-phone"></i>
                            <?php echo get_theme_mod('opensheets_phone', '085-5555555'); ?>
                        </span>
                        <span class="line">
                            <i class="icon-line"></i>
                            <?php echo get_theme_mod('opensheets_line', '@opensheets'); ?>
                        </span>
                    </div>
                    
                    <div class="cart-icon">
                        <a href="<?php echo esc_url(home_url('/cart')); ?>" class="cart-link">
                            <i class="icon-cart"></i>
                            <span class="cart-count"><?php echo opensheets_get_cart_count(); ?></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <div id="content" class="site-content">
