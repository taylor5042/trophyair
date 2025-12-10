/**
 * Trophy Air - Main JavaScript
 * Based on ZeroFour template by HTML5 UP (html5up.net | @ajlkn)
 * Free for personal and commercial use under the CCA 3.0 license
 *
 * Handles:
 * - Responsive breakpoint detection
 * - Page load animations
 * - Desktop dropdown navigation
 * - Mobile slide-out navigation panel
 */
(function($) {

	$(function() {
		var $window = $(window),
			$body = $('body');

		// =====================================================================
		// Responsive Breakpoints
		// Defines viewport width ranges for responsive CSS/JS behavior
		// =====================================================================
		breakpoints({
			xlarge: ['1281px', '1680px'],
			large:  ['981px',  '1280px'],
			medium: ['737px',  '980px'],
			small:  [null,     '736px']
		});

		// =====================================================================
		// Page Load Animation
		// Removes preload class after brief delay to trigger CSS transitions
		// =====================================================================
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

		// =====================================================================
		// Desktop Dropdown Navigation
		// Initializes dropotron plugin for hover-activated submenus
		// =====================================================================
		$('#nav > ul').dropotron({
			offsetY: -22,
			mode: 'fade',
			noOpenerFade: true,
			speed: 300,
			detach: false
		});

		// =====================================================================
		// Mobile Navigation
		// Creates title bar and slide-out panel for small screens
		// =====================================================================

		// Title bar with hamburger menu toggle
		$('<div id="titleBar">' +
			'<a href="#navPanel" class="toggle"></a>' +
			'<span class="title">' + $('#logo').html() + '</span>' +
		'</div>').appendTo($body);

		// Slide-out navigation panel
		$('<div id="navPanel">' +
			'<nav>' + $('#nav').navList() + '</nav>' +
		'</div>')
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'left',
				target: $body,
				visibleClass: 'navPanel-visible'
			});
	});

})(jQuery);