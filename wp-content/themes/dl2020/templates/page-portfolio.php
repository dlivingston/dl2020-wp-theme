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
		<main id="main" class="site-portfolio">
            <article class="page">
                <?php the_post(); ?>                
                <?php the_content(); ?>
                <!-- <section id="skills-list" data-scroll-view="">
                    <h2>Primary skills</h2>
                    <div class="meters">
                        <div class="meter-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" class="circle-meter" viewBox="0 0 120 120">
                                <circle class="circle-bg" cx="60" cy="60" r="54" />
                                <circle class="meter" data-meter-strength="100" cx="60" cy="60" r="54" />
                            </svg>
                            <h3>HTML</h3>
                        </div>
                        <div class="meter-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" class="circle-meter" viewBox="0 0 120 120">
                                <circle class="circle-bg" cx="60" cy="60" r="54" />
                                <circle class="meter" data-meter-strength="50" cx="60" cy="60" r="54" />
                            </svg>
                            <h3>CSS</h3>
                        </div>
                        <div class="meter-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" class="circle-meter" viewBox="0 0 120 120">
                                <circle class="circle-bg" cx="60" cy="60" r="54" />
                                <circle class="meter" data-meter-strength="80" cx="60" cy="60" r="54" />
                            </svg>
                            <h3>JavaScript</h3>
                        </div>
                        <div class="meter-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" class="circle-meter" viewBox="0 0 120 120">
                                <circle class="circle-bg" cx="60" cy="60" r="54" />
                                <circle class="meter" data-meter-strength="25" cx="60" cy="60" r="54" />
                            </svg>
                            <h3>UI/UX Design</h3>
                        </div>
                    </div>
                </section> -->
                <section id="project_section"></section>
                <section id="featured_posts"></section>
            </article>
		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer();
