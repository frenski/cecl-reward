<?php

require_once("../../config.php");

$course_id = 17;
$lang = 'en';
$available_lang = array ('en','es','fr', 'ar');
if(isset($SESSION->lang)&&$SESSION->lang!='') {
   $lang = $SESSION->lang;
} elseif(isset($USER->lang)&&$USER->lang!='') {
   $lang = $USER->lang;
}

if (strpos($lang, '_utf8') !== false) {
	$lang = explode('_', $lang)[0];
}

if (!in_array($lang, $available_lang)) {
    $lang = 'en';
}

// Gets user rols / if has teacher/manager capabilites
$admin = false;
$context = get_context_instance(CONTEXT_COURSE, $course_id);

if (has_capability('moodle/role:manage', $context, $USER->id, false)) {
  $admin = true;
}

$is_admin = $admin ? 'true' : 'false';

$is_rtl = ($lang == 'ar') ? 'true' : 'false';

?>


<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie10 lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie10 lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie10 lt-ie9" lang=""> <![endif]-->
<!--[if IE 9]>         <html class="no-js lt-ie10" lang=""> <![endif]-->
<!--[if gt IE 9><!--> <html class="no-js" lang=""> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>eCourse on Budgeting</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="apple-touch-icon" href="apple-touch-icon.png">

		<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300italic,300,400italic' rel='stylesheet' type='text/css'>
		<link href='https://fonts.googleapis.com/css?family=Quicksand:700' rel='stylesheet' type='text/css'>
		<link href="https://fonts.googleapis.com/css?family=Raleway:300" rel="stylesheet">
    <?php
      if ($lang=='ar') {
        echo '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Markazi+Text:wght@400..700&family=Noto+Kufi+Arabic:wght@100..900&display=swap" rel="stylesheet">';
      }
    ?>
    <link rel="stylesheet" href="css/normalize.min.css">
    <link rel="stylesheet" href="css/main.css">
		<link rel="stylesheet" href="css/themes/theme-yellow.css">
		<link rel="stylesheet" href="css/custom.css">

        <script src="js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
    </head>

    <body class="clearfix whole-container">

		<div id="audioswitch" class="audioswitch-enabled"></div>

		<div class="header-container">

			<header class="clearfix">
				<div class="title">
					<h1 class="title-main">Title</h1>
					<span class="title-subtitle">Subtitle</span>
				</div>
				<h2 class="title-module">Module title</h2>
				<div class="section-indicators">
					<div id="section-indicator-svg" class=""></div>
				</div>
			</header>

			<footer class="header-footer">
			</footer>

		</div>


		<div class="sliding-menu-wrapper">
			<div class="sliding-menu">
				<ul id="sliding-menu-links">
				</ul>
			</div>
		</div>


        <div class="main-container relative">

			<nav class="nav-pages">
                <ul>
                    <li><a href="#" class="nav-pages-item nav-pages-left">&lt;</a></li>
                    <li><a href="#" class="nav-pages-item nav-pages-right">&gt;</a></li>
                </ul>
            </nav>

            <div class="main clearfix">
				<iframe id="tmpl-wrapper" name="tmpl-wrapper" src="about:blank" frameBorder="0" height="350" scrolling="no">

				</iframe>
            </div> <!-- #main -->

        </div> <!-- #main-container -->

		<a class="popup-fullscreen" href="/">
			<div class="popup-fullscreen-message">
			</div>
		</a>


    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.2.min.js"><\/script>')</script>
		<script src="js/vendor/raphael-min.js"></script>
		<script src="js/vendor/jquery.scrollTo-min.js"></script>

		<script>
			var LMSVARS = {};
			LMSVARS.courseId = <?php echo $course_id; ?>;
			LMSVARS.userlang = "<?php echo $lang; ?>";
			LMSVARS.isAdmin = <?php echo $is_admin; ?>;
			LMSVARS.isRtl = <?php echo $is_rtl; ?>;
			var NAVVARS = {};
			NAVVARS.moduleId = 1;
			NAVVARS.sectionId = 0;
			NAVVARS.pageId = 0;
			NAVVARS.tmplParams = null;
		</script>

		<script src="js/env.js"></script>
		<script src="js/config.js"></script>
    <script src="js/init.js"></script>
		<script src="js/themes/theme-yellow.js"></script>
		<script src="js/lib/ylearn.js"></script>
    <script src="js/main.js"></script>

        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script>
            (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
            function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
            e=o.createElement(i);r=o.getElementsByTagName(i)[0];
            e.src='//www.google-analytics.com/analytics.js';
            r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
            ga('create','UA-XXXXX-X','auto');ga('send','pageview');
        </script>
    </body>
</html>
