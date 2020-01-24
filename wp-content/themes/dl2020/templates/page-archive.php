 <?php
/**
 * Template Name: Archives 
 * Template Post Type: page
 *
 * @package dl2020
 */

get_header();
?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">
            <article class="page">
                <?php the_post(); ?>
                <h1 class="entry-title"><?php the_title(); ?></h1>
                
                <?php get_search_form(); ?>
                
                <h2>Archives by Month:</h2>
                <?php wp_get_archives('type=monthly'); ?>
                                
                <h2>Archives by Subject:</h2>
                <?php wp_list_categories(); ?>
            </article>
		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_sidebar();
get_footer();
