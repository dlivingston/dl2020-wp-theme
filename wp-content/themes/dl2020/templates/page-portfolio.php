 <?php
/**
 * Template Name: Portfolio 
 * Template Post Type: page
 *
 * @package dl2020
 */

get_header();
?>

	<div id="primary" class="content-area">
		<main id="portfolio_main" class="site-portfolio">
            <article class="page">
                <?php the_post(); ?>                
                <?php the_content(); ?>
                <section id="project_section"></section>
                <section id="featured_posts"></section>
            </article>
		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer();
