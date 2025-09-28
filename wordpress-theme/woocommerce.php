<?php
/**
 * WooCommerce compatibility template
 * This file provides basic WooCommerce integration if needed
 */

get_header(); ?>

<div class="container mx-auto px-4 py-8">
    <?php woocommerce_content(); ?>
</div>

<?php get_footer(); ?>
