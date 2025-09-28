<?php
/**
 * Template part for displaying product cards
 *
 * @package OpenSheets
 */

$price = get_post_meta(get_the_ID(), '_exam_price', true);
$stock = get_post_meta(get_the_ID(), '_exam_stock', true);
$sku = get_post_meta(get_the_ID(), '_exam_sku', true);
?>

<div class="product-card">
    <div class="product-image">
        <a href="<?php the_permalink(); ?>">
            <?php if (has_post_thumbnail()) : ?>
                <?php the_post_thumbnail('product-thumb'); ?>
            <?php else : ?>
                <div class="placeholder-image">
                    <span class="placeholder-text"><?php _e('ไม่มีรูปภาพ', 'opensheets'); ?></span>
                </div>
            <?php endif; ?>
        </a>
        
        <?php if ($stock && $stock < 5) : ?>
            <span class="stock-badge low-stock"><?php _e('เหลือน้อย', 'opensheets'); ?></span>
        <?php elseif (!$stock || $stock == 0) : ?>
            <span class="stock-badge out-of-stock"><?php _e('หมด', 'opensheets'); ?></span>
        <?php endif; ?>
    </div>

    <div class="product-info">
        <div class="product-categories">
            <?php
            $categories = get_the_terms(get_the_ID(), 'exam_category');
            if ($categories && !is_wp_error($categories)) :
                $category = array_shift($categories);
            ?>
                <a href="<?php echo get_term_link($category); ?>" class="category-link">
                    <?php echo $category->name; ?>
                </a>
            <?php endif; ?>
        </div>

        <h3 class="product-title">
            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
        </h3>

        <div class="product-excerpt">
            <?php echo wp_trim_words(get_the_excerpt(), 15); ?>
        </div>

        <div class="product-meta">
            <?php if ($sku) : ?>
                <span class="product-sku"><?php _e('รหัส:', 'opensheets'); ?> <?php echo esc_html($sku); ?></span>
            <?php endif; ?>
            
            <?php
            $levels = get_the_terms(get_the_ID(), 'exam_level');
            if ($levels && !is_wp_error($levels)) :
            ?>
                <div class="product-levels">
                    <?php foreach ($levels as $level) : ?>
                        <span class="level-tag"><?php echo $level->name; ?></span>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>

        <div class="product-price">
            <?php if ($price) : ?>
                <span class="price"><?php echo opensheets_format_price($price); ?></span>
            <?php endif; ?>
        </div>

        <div class="product-actions">
            <?php if ($stock && $stock > 0) : ?>
                <div class="quantity-controls">
                    <input type="number" class="quantity-input" value="1" min="1" max="<?php echo $stock; ?>">
                </div>
                
                <button type="button" class="btn btn-primary add-to-cart-btn" data-product-id="<?php the_ID(); ?>">
                    <?php _e('เพิ่มลงตะกร้า', 'opensheets'); ?>
                </button>
            <?php else : ?>
                <button type="button" class="btn btn-secondary" disabled>
                    <?php _e('สินค้าหมด', 'opensheets'); ?>
                </button>
            <?php endif; ?>
            
            <button type="button" class="btn btn-outline wishlist-btn" data-product-id="<?php the_ID(); ?>">
                <i class="icon-heart"></i>
            </button>
        </div>
    </div>
</div>
