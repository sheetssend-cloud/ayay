<?php
/**
 * The template for displaying single exam products
 *
 * @package OpenSheets
 */

get_header(); ?>

<main id="primary" class="site-main">
    <div class="container">
        <?php while (have_posts()) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class('single-product'); ?>>
                <div class="product-layout">
                    <div class="product-images">
                        <?php if (has_post_thumbnail()) : ?>
                            <div class="main-image">
                                <?php the_post_thumbnail('product-large'); ?>
                            </div>
                        <?php endif; ?>
                    </div>

                    <div class="product-summary">
                        <header class="entry-header">
                            <h1 class="entry-title"><?php the_title(); ?></h1>
                            
                            <div class="product-meta">
                                <?php
                                $categories = get_the_terms(get_the_ID(), 'exam_category');
                                if ($categories && !is_wp_error($categories)) :
                                ?>
                                    <div class="product-categories">
                                        <span class="label"><?php _e('หมวดหมู่:', 'opensheets'); ?></span>
                                        <?php foreach ($categories as $category) : ?>
                                            <a href="<?php echo get_term_link($category); ?>" class="category-link">
                                                <?php echo $category->name; ?>
                                            </a>
                                        <?php endforeach; ?>
                                    </div>
                                <?php endif; ?>
                                
                                <?php
                                $levels = get_the_terms(get_the_ID(), 'exam_level');
                                if ($levels && !is_wp_error($levels)) :
                                ?>
                                    <div class="product-levels">
                                        <span class="label"><?php _e('ระดับ:', 'opensheets'); ?></span>
                                        <?php foreach ($levels as $level) : ?>
                                            <span class="level-tag"><?php echo $level->name; ?></span>
                                        <?php endforeach; ?>
                                    </div>
                                <?php endif; ?>
                            </div>
                        </header>

                        <div class="product-price">
                            <?php
                            $price = get_post_meta(get_the_ID(), '_exam_price', true);
                            if ($price) :
                            ?>
                                <span class="price"><?php echo opensheets_format_price($price); ?></span>
                            <?php endif; ?>
                        </div>

                        <div class="product-description">
                            <?php the_content(); ?>
                        </div>

                        <div class="product-details">
                            <?php
                            $sku = get_post_meta(get_the_ID(), '_exam_sku', true);
                            $stock = get_post_meta(get_the_ID(), '_exam_stock', true);
                            ?>
                            
                            <?php if ($sku) : ?>
                                <div class="product-sku">
                                    <span class="label"><?php _e('รหัสสินค้า:', 'opensheets'); ?></span>
                                    <span class="value"><?php echo esc_html($sku); ?></span>
                                </div>
                            <?php endif; ?>
                            
                            <?php if ($stock) : ?>
                                <div class="product-stock">
                                    <span class="label"><?php _e('คงเหลือ:', 'opensheets'); ?></span>
                                    <span class="value"><?php echo esc_html($stock); ?> <?php _e('ชิ้น', 'opensheets'); ?></span>
                                </div>
                            <?php endif; ?>
                        </div>

                        <form class="cart-form">
                            <div class="quantity-selector">
                                <label for="quantity"><?php _e('จำนวน:', 'opensheets'); ?></label>
                                <input type="number" id="quantity" name="quantity" value="1" min="1" max="<?php echo $stock ?: 999; ?>" class="quantity-input">
                            </div>
                            
                            <button type="button" class="btn btn-primary add-to-cart-btn" data-product-id="<?php the_ID(); ?>">
                                <?php _e('เพิ่มลงตะกร้า', 'opensheets'); ?>
                            </button>
                        </form>

                        <div class="product-actions">
                            <button type="button" class="btn btn-secondary wishlist-btn">
                                <?php _e('เพิ่มในรายการโปรด', 'opensheets'); ?>
                            </button>
                            
                            <div class="share-buttons">
                                <span class="share-label"><?php _e('แชร์:', 'opensheets'); ?></span>
                                <a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo urlencode(get_permalink()); ?>" target="_blank" class="share-btn facebook">
                                    <?php _e('Facebook', 'opensheets'); ?>
                                </a>
                                <a href="https://line.me/R/msg/text/?<?php echo urlencode(get_the_title() . ' ' . get_permalink()); ?>" target="_blank" class="share-btn line">
                                    <?php _e('LINE', 'opensheets'); ?>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="product-tabs">
                    <div class="tab-nav">
                        <button class="tab-btn active" data-tab="description"><?php _e('รายละเอียด', 'opensheets'); ?></button>
                        <button class="tab-btn" data-tab="reviews"><?php _e('รีวิว', 'opensheets'); ?></button>
                        <button class="tab-btn" data-tab="shipping"><?php _e('การจัดส่ง', 'opensheets'); ?></button>
                    </div>
                    
                    <div class="tab-content">
                        <div id="description" class="tab-pane active">
                            <?php the_content(); ?>
                        </div>
                        
                        <div id="reviews" class="tab-pane">
                            <?php comments_template(); ?>
                        </div>
                        
                        <div id="shipping" class="tab-pane">
                            <h3><?php _e('ข้อมูลการจัดส่ง', 'opensheets'); ?></h3>
                            <p><?php _e('จัดส่งทั่วประเทศไทย ใช้เวลา 2-3 วันทำการ', 'opensheets'); ?></p>
                            <p><?php _e('ค่าจัดส่ง 50 บาท (ฟรีเมื่อซื้อครบ 500 บาท)', 'opensheets'); ?></p>
                        </div>
                    </div>
                </div>
            </article>

            <section class="related-products">
                <h2><?php _e('สินค้าที่เกี่ยวข้อง', 'opensheets'); ?></h2>
                <div class="products-grid">
                    <?php
                    $related_products = new WP_Query(array(
                        'post_type' => 'exam_product',
                        'posts_per_page' => 4,
                        'post__not_in' => array(get_the_ID()),
                        'tax_query' => array(
                            array(
                                'taxonomy' => 'exam_category',
                                'field' => 'term_id',
                                'terms' => wp_get_post_terms(get_the_ID(), 'exam_category', array('fields' => 'ids')),
                            ),
                        ),
                    ));
                    
                    if ($related_products->have_posts()) :
                        while ($related_products->have_posts()) : $related_products->the_post();
                            get_template_part('template-parts/content', 'product-card');
                        endwhile;
                        wp_reset_postdata();
                    endif;
                    ?>
                </div>
            </section>

        <?php endwhile; ?>
    </div>
</main>

<?php get_footer(); ?>
