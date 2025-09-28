<?php
/**
 * The template for displaying exam product archives
 *
 * @package OpenSheets
 */

get_header(); ?>

<main id="primary" class="site-main">
    <div class="container">
        <header class="page-header">
            <h1 class="page-title">
                <?php
                if (is_tax()) {
                    single_term_title();
                } else {
                    _e('หนังสือเตรียมสอบ', 'opensheets');
                }
                ?>
            </h1>
            
            <?php if (is_tax() && term_description()) : ?>
                <div class="archive-description">
                    <?php echo term_description(); ?>
                </div>
            <?php endif; ?>
        </header>

        <div class="shop-toolbar">
            <div class="results-count">
                <?php
                global $wp_query;
                $total = $wp_query->found_posts;
                printf(_n('แสดง %d สินค้า', 'แสดง %d สินค้า', $total, 'opensheets'), $total);
                ?>
            </div>
            
            <div class="shop-filters">
                <form method="get" class="filter-form">
                    <select name="orderby" onchange="this.form.submit()">
                        <option value=""><?php _e('เรียงตาม', 'opensheets'); ?></option>
                        <option value="price_low" <?php selected(isset($_GET['orderby']) ? $_GET['orderby'] : '', 'price_low'); ?>>
                            <?php _e('ราคา: ต่ำ → สูง', 'opensheets'); ?>
                        </option>
                        <option value="price_high" <?php selected(isset($_GET['orderby']) ? $_GET['orderby'] : '', 'price_high'); ?>>
                            <?php _e('ราคา: สูง → ต่ำ', 'opensheets'); ?>
                        </option>
                        <option value="name" <?php selected(isset($_GET['orderby']) ? $_GET['orderby'] : '', 'name'); ?>>
                            <?php _e('ชื่อ A-Z', 'opensheets'); ?>
                        </option>
                        <option value="date" <?php selected(isset($_GET['orderby']) ? $_GET['orderby'] : '', 'date'); ?>>
                            <?php _e('ใหม่ล่าสุด', 'opensheets'); ?>
                        </option>
                    </select>
                </form>
            </div>
        </div>

        <div class="shop-content">
            <aside class="shop-sidebar">
                <div class="widget filter-widget">
                    <h3 class="widget-title"><?php _e('หมวดหมู่', 'opensheets'); ?></h3>
                    <?php
                    $categories = get_terms(array(
                        'taxonomy' => 'exam_category',
                        'hide_empty' => true,
                    ));
                    if ($categories && !is_wp_error($categories)) :
                    ?>
                        <ul class="category-filter">
                            <?php foreach ($categories as $category) : ?>
                                <li>
                                    <a href="<?php echo get_term_link($category); ?>" 
                                       class="<?php echo (is_tax('exam_category', $category->term_id)) ? 'active' : ''; ?>">
                                        <?php echo $category->name; ?>
                                        <span class="count">(<?php echo $category->count; ?>)</span>
                                    </a>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endif; ?>
                </div>

                <div class="widget filter-widget">
                    <h3 class="widget-title"><?php _e('ระดับการสอบ', 'opensheets'); ?></h3>
                    <?php
                    $levels = get_terms(array(
                        'taxonomy' => 'exam_level',
                        'hide_empty' => true,
                    ));
                    if ($levels && !is_wp_error($levels)) :
                    ?>
                        <ul class="level-filter">
                            <?php foreach ($levels as $level) : ?>
                                <li>
                                    <a href="<?php echo get_term_link($level); ?>"
                                       class="<?php echo (is_tax('exam_level', $level->term_id)) ? 'active' : ''; ?>">
                                        <?php echo $level->name; ?>
                                        <span class="count">(<?php echo $level->count; ?>)</span>
                                    </a>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endif; ?>
                </div>

                <div class="widget filter-widget">
                    <h3 class="widget-title"><?php _e('ช่วงราคา', 'opensheets'); ?></h3>
                    <form method="get" class="price-filter">
                        <div class="price-inputs">
                            <input type="number" name="min_price" placeholder="<?php _e('ราคาต่ำสุด', 'opensheets'); ?>" 
                                   value="<?php echo isset($_GET['min_price']) ? esc_attr($_GET['min_price']) : ''; ?>">
                            <span>-</span>
                            <input type="number" name="max_price" placeholder="<?php _e('ราคาสูงสุด', 'opensheets'); ?>" 
                                   value="<?php echo isset($_GET['max_price']) ? esc_attr($_GET['max_price']) : ''; ?>">
                        </div>
                        <button type="submit" class="btn btn-secondary"><?php _e('กรอง', 'opensheets'); ?></button>
                    </form>
                </div>
            </aside>

            <div class="shop-main">
                <?php if (have_posts()) : ?>
                    <div class="products-grid">
                        <?php while (have_posts()) : the_post(); ?>
                            <?php get_template_part('template-parts/content', 'product-card'); ?>
                        <?php endwhile; ?>
                    </div>

                    <?php
                    the_posts_pagination(array(
                        'prev_text' => __('« ก่อนหน้า', 'opensheets'),
                        'next_text' => __('ถัดไป »', 'opensheets'),
                    ));
                    ?>

                <?php else : ?>
                    <div class="no-products">
                        <h2><?php _e('ไม่พบสินค้า', 'opensheets'); ?></h2>
                        <p><?php _e('ขออภัย ไม่พบสินค้าที่ตรงกับเงื่อนไขที่คุณค้นหา', 'opensheets'); ?></p>
                        <a href="<?php echo get_post_type_archive_link('exam_product'); ?>" class="btn btn-primary">
                            <?php _e('ดูสินค้าทั้งหมด', 'opensheets'); ?>
                        </a>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</main>

<?php get_footer(); ?>
