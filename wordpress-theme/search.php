<?php
/**
 * Search Results Template
 */

get_header();

$search_query = get_search_query();
$search_results = new WP_Query(array(
    'post_type' => array('exam_product', 'post'),
    's' => $search_query,
    'posts_per_page' => 12
));
?>

<div class="container mx-auto px-4 py-8">
    <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">ผลการค้นหา</h1>
        <p class="text-gray-600">
            ค้นหา: "<strong><?php echo esc_html($search_query); ?></strong>" 
            พบ <?php echo $search_results->found_posts; ?> รายการ
        </p>
    </div>
    
    <?php if ($search_results->have_posts()): ?>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <?php while ($search_results->have_posts()): $search_results->the_post(); ?>
                <?php if (get_post_type() === 'exam_product'): ?>
                    <div class="bg-white rounded-lg shadow-md overflow-hidden">
                        <div class="relative">
                            <?php if (has_post_thumbnail()): ?>
                                <img src="<?php echo get_the_post_thumbnail_url(get_the_ID(), 'medium'); ?>" 
                                     alt="<?php the_title(); ?>" 
                                     class="w-full h-48 object-cover">
                            <?php else: ?>
                                <div class="w-full h-48 bg-gray-200 flex items-center justify-center">
                                    <i class="fas fa-book text-gray-400 text-4xl"></i>
                                </div>
                            <?php endif; ?>
                        </div>
                        
                        <div class="p-4">
                            <h3 class="font-semibold text-lg mb-2">
                                <a href="<?php the_permalink(); ?>" class="hover:text-blue-600">
                                    <?php the_title(); ?>
                                </a>
                            </h3>
                            
                            <p class="text-gray-600 text-sm mb-3">
                                <?php echo wp_trim_words(get_the_content(), 15); ?>
                            </p>
                            
                            <?php 
                            $price = get_post_meta(get_the_ID(), '_price', true);
                            if ($price): 
                            ?>
                                <div class="flex items-center justify-between">
                                    <span class="text-blue-600 font-bold text-xl">
                                        <?php echo number_format($price); ?> บาท
                                    </span>
                                    
                                    <button class="add-to-cart-btn bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                            data-product-id="<?php echo get_the_ID(); ?>">
                                        เพิ่มในตะกร้า
                                    </button>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                <?php else: ?>
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <h3 class="font-semibold text-lg mb-2">
                            <a href="<?php the_permalink(); ?>" class="hover:text-blue-600">
                                <?php the_title(); ?>
                            </a>
                        </h3>
                        
                        <p class="text-gray-600 text-sm mb-3">
                            <?php echo wp_trim_words(get_the_content(), 20); ?>
                        </p>
                        
                        <div class="flex items-center justify-between text-sm text-gray-500">
                            <span><?php echo get_the_date(); ?></span>
                            <a href="<?php the_permalink(); ?>" class="text-blue-600 hover:underline">
                                อ่านเพิ่มเติม
                            </a>
                        </div>
                    </div>
                <?php endif; ?>
            <?php endwhile; ?>
        </div>
        
        <div class="mt-8 flex justify-center">
            <?php
            echo paginate_links(array(
                'total' => $search_results->max_num_pages,
                'prev_text' => '<i class="fas fa-chevron-left"></i> ก่อนหน้า',
                'next_text' => 'ถัดไป <i class="fas fa-chevron-right"></i>',
                'class' => 'pagination'
            ));
            ?>
        </div>
    <?php else: ?>
        <div class="text-center py-12">
            <i class="fas fa-search text-gray-300 text-6xl mb-4"></i>
            <h2 class="text-xl font-semibold text-gray-600 mb-2">ไม่พบผลการค้นหา</h2>
            <p class="text-gray-500 mb-6">ลองค้นหาด้วยคำอื่น หรือดูสินค้าทั้งหมด</p>
            <a href="<?php echo home_url('/products'); ?>" 
               class="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">
                ดูสินค้าทั้งหมด
            </a>
        </div>
    <?php endif; ?>
</div>

<?php 
wp_reset_postdata();
get_footer(); 
?>
