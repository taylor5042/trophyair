/**
 * Utility functions for Trophy Air website
 * Based on ZeroFour template by HTML5 UP
 * Provides navigation list generation, panel functionality, and form polyfills
 */
(function($) {

	/**
	 * Generate an indented list of links from a nav element.
	 * Creates flat HTML links with depth classes for mobile navigation panel.
	 * @return {string} HTML string of navigation links
	 */
	$.fn.navList = function() {
		var $this = $(this),
			$a = $this.find('a'),
			b = [];

		$a.each(function() {
			var $link = $(this),
				indent = Math.max(0, $link.parents('li').length - 1),
				href = $link.attr('href'),
				target = $link.attr('target'),
				hasTarget = target !== undefined && target !== '',
				hasHref = href !== undefined && href !== '';

			b.push(
				'<a class="link depth-' + indent + '"' +
				(hasTarget ? ' target="' + target + '"' : '') +
				(hasHref ? ' href="' + href + '"' : '') +
				'><span class="indent-' + indent + '"></span>' +
				$link.text() +
				'</a>'
			);
		});

		return b.join('');
	};

	/**
	 * Panel-ify an element.
	 * Converts an element into a slide-out panel with touch/click handling.
	 * Supports swipe-to-close, click-outside-to-close, and escape key.
	 * @param {object} userConfig - Configuration options
	 * @return {jQuery} jQuery object
	 */
	$.fn.panel = function(userConfig) {
		// Handle empty or multiple element selections
		if (this.length === 0) {
			return this;
		}

		if (this.length > 1) {
			this.each(function() {
				$(this).panel(userConfig);
			});
			return this;
		}

		// Initialize variables
		var $this = $(this),
			$body = $('body'),
			$window = $(window),
			id = $this.attr('id');

		// Merge user config with defaults
		var config = $.extend({
			delay: 0,              // Animation delay in ms
			hideOnClick: false,    // Hide panel when clicking links
			hideOnEscape: false,   // Hide panel on ESC key
			hideOnSwipe: false,    // Hide panel on swipe gesture
			resetScroll: false,    // Reset scroll position on hide
			resetForms: false,     // Reset forms on hide
			side: null,            // Panel position: 'left', 'right', 'top', 'bottom'
			target: $this,         // Element to toggle visibility class on
			visibleClass: 'visible'
		}, userConfig);

		// Ensure target is a jQuery object
		if (typeof config.target !== 'jQuery') {
			config.target = $(config.target);
		}

		// -------------------------------------------------------------------------
		// Panel Methods
		// -------------------------------------------------------------------------

		/**
		 * Hide the panel and optionally reset scroll/forms
		 * @param {Event} event - Optional event to cancel
		 */
		$this._hide = function(event) {
			// Already hidden? Bail.
			if (!config.target.hasClass(config.visibleClass)) {
				return;
			}

			// Cancel event if provided
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}

			// Hide panel
			config.target.removeClass(config.visibleClass);

			// Post-hide cleanup after animation
			window.setTimeout(function() {
				if (config.resetScroll) {
					$this.scrollTop(0);
				}
				if (config.resetForms) {
					$this.find('form').each(function() {
						this.reset();
					});
				}
			}, config.delay);
		};

		// Apply vendor-specific scroll fixes
		$this
			.css('-ms-overflow-style', '-ms-autohiding-scrollbar')
			.css('-webkit-overflow-scrolling', 'touch');

		// -------------------------------------------------------------------------
		// Event Handlers: Hide on Click
		// -------------------------------------------------------------------------
		if (config.hideOnClick) {
			$this.find('a').css('-webkit-tap-highlight-color', 'rgba(0,0,0,0)');

			$this.on('click', 'a', function(event) {
				var $a = $(this),
					href = $a.attr('href'),
					target = $a.attr('target');

				// Ignore empty/self-referencing links
				if (!href || href === '#' || href === '' || href === '#' + id) {
					return;
				}

				event.preventDefault();
				event.stopPropagation();
				$this._hide();

				// Navigate after panel animation completes
				window.setTimeout(function() {
					if (target === '_blank') {
						window.open(href);
					} else {
						window.location.href = href;
					}
				}, config.delay + 10);
			});
		}

		// -------------------------------------------------------------------------
		// Event Handlers: Touch/Swipe
		// -------------------------------------------------------------------------
		$this.on('touchstart', function(event) {
			$this.touchPosX = event.originalEvent.touches[0].pageX;
			$this.touchPosY = event.originalEvent.touches[0].pageY;
		});

		$this.on('touchmove', function(event) {
			if ($this.touchPosX === null || $this.touchPosY === null) {
				return;
			}

			var diffX = $this.touchPosX - event.originalEvent.touches[0].pageX,
				diffY = $this.touchPosY - event.originalEvent.touches[0].pageY,
				th = $this.outerHeight(),
				ts = $this.get(0).scrollHeight - $this.scrollTop();

			// Check for swipe-to-hide gesture
			if (config.hideOnSwipe) {
				var result = false,
					boundary = 20,  // Max perpendicular movement
					delta = 50;     // Min swipe distance

				// Determine if swipe matches panel side
				switch (config.side) {
					case 'left':
						result = (Math.abs(diffY) < boundary) && (diffX > delta);
						break;
					case 'right':
						result = (Math.abs(diffY) < boundary) && (diffX < -delta);
						break;
					case 'top':
						result = (Math.abs(diffX) < boundary) && (diffY > delta);
						break;
					case 'bottom':
						result = (Math.abs(diffX) < boundary) && (diffY < -delta);
						break;
				}

				if (result) {
					$this.touchPosX = null;
					$this.touchPosY = null;
					$this._hide();
					return false;
				}
			}

			// Prevent overscroll bounce
			if (($this.scrollTop() < 0 && diffY < 0) ||
				(ts > (th - 2) && ts < (th + 2) && diffY > 0)) {
				event.preventDefault();
				event.stopPropagation();
			}
		});

		// Prevent events inside panel from bubbling to body
		$this.on('click touchend touchstart touchmove', function(event) {
			event.stopPropagation();
		});

		// Hide panel when clicking self-referencing anchor
		$this.on('click', 'a[href="#' + id + '"]', function(event) {
			event.preventDefault();
			event.stopPropagation();
			config.target.removeClass(config.visibleClass);
		});

		// -------------------------------------------------------------------------
		// Body Event Handlers
		// -------------------------------------------------------------------------

		// Hide panel on body click/tap (outside panel)
		$body.on('click touchend', function(event) {
			$this._hide(event);
		});

		// Toggle panel visibility
		$body.on('click', 'a[href="#' + id + '"]', function(event) {
			event.preventDefault();
			event.stopPropagation();
			config.target.toggleClass(config.visibleClass);
		});

		// -------------------------------------------------------------------------
		// Window Event Handlers
		// -------------------------------------------------------------------------

		// Hide on ESC key
		if (config.hideOnEscape) {
			$window.on('keydown', function(event) {
				if (event.keyCode === 27) {
					$this._hide(event);
				}
			});
		}

		return $this;
	};

	/**
	 * Apply "placeholder" attribute polyfill to forms.
	 * Note: Modern browsers support placeholder natively; this is for legacy support.
	 * @return {jQuery} jQuery object
	 */
	$.fn.placeholder = function() {
		// Browser natively supports placeholders? Bail.
		if (typeof (document.createElement('input')).placeholder !== 'undefined') {
			return $(this);
		}

		// Handle empty or multiple element selections
		if (this.length === 0) {
			return this;
		}

		if (this.length > 1) {
			this.each(function() {
				$(this).placeholder();
			});
			return this;
		}

		// Vars.
		var $this = $(this);

		// Text, TextArea.
		$this.find('input[type=text],textarea')
			.each(function() {
				var i = $(this);

				if (i.val() === '' || i.val() === i.attr('placeholder')) {
					i
						.addClass('polyfill-placeholder')
						.val(i.attr('placeholder'));
				}
			})
			.on('blur', function() {
				var i = $(this);

				if (i.attr('name').match(/-polyfill-field$/)) {
					return;
				}

				if (i.val() === '') {
					i
						.addClass('polyfill-placeholder')
						.val(i.attr('placeholder'));
				}
			})
			.on('focus', function() {
				var i = $(this);

				if (i.attr('name').match(/-polyfill-field$/)) {
					return;
				}

				if (i.val() === i.attr('placeholder')) {
					i
						.removeClass('polyfill-placeholder')
						.val('');
				}
			});

		// Password.
		$this.find('input[type=password]')
			.each(function() {
				var i = $(this);
				var x = $(
					$('<div>')
						.append(i.clone())
						.remove()
						.html()
						.replace(/type="password"/i, 'type="text"')
						.replace(/type=password/i, 'type=text')
				);

				if (i.attr('id') !== '') {
					x.attr('id', i.attr('id') + '-polyfill-field');
				}

				if (i.attr('name') !== '') {
					x.attr('name', i.attr('name') + '-polyfill-field');
				}

				x.addClass('polyfill-placeholder')
					.val(x.attr('placeholder')).insertAfter(i);

				if (i.val() === '') {
					i.hide();
				} else {
					x.hide();
				}

				i
					.on('blur', function(event) {
						event.preventDefault();

						var x = i.parent().find('input[name=' + i.attr('name') + '-polyfill-field]');

						if (i.val() === '') {
							i.hide();
							x.show();
						}
					});

				x
					.on('focus', function(event) {
						event.preventDefault();

						var i = x.parent().find('input[name=' + x.attr('name').replace('-polyfill-field', '') + ']');

						x.hide();

						i
							.show()
							.focus();
					})
					.on('keypress', function(event) {
						event.preventDefault();
						x.val('');
					});
			});

		// Events.
		$this
			.on('submit', function() {
				$this.find('input[type=text],input[type=password],textarea')
					.each(function(event) {
						var i = $(this);

						if (i.attr('name').match(/-polyfill-field$/)) {
							i.attr('name', '');
						}

						if (i.val() === i.attr('placeholder')) {
							i.removeClass('polyfill-placeholder');
							i.val('');
						}
					});
			})
			.on('reset', function(event) {
				event.preventDefault();

				$this.find('select')
					.val($('option:first').val());

				$this.find('input,textarea')
					.each(function() {
						var i = $(this),
							x;

						i.removeClass('polyfill-placeholder');

						switch (this.type) {
							case 'submit':
							case 'reset':
								break;

							case 'password':
								i.val(i.attr('defaultValue'));

								x = i.parent().find('input[name=' + i.attr('name') + '-polyfill-field]');

								if (i.val() === '') {
									i.hide();
									x.show();
								} else {
									i.show();
									x.hide();
								}

								break;

							case 'checkbox':
							case 'radio':
								i.attr('checked', i.attr('defaultValue'));
								break;

							case 'text':
							case 'textarea':
								i.val(i.attr('defaultValue'));

								if (i.val() === '') {
									i.addClass('polyfill-placeholder');
									i.val(i.attr('placeholder'));
								}

								break;

							default:
								i.val(i.attr('defaultValue'));
								break;
						}
					});
			});

		return $this;
	};

	/**
	 * Moves elements to/from the first positions of their respective parents.
	 * Useful for responsive layouts where element order needs to change.
	 * @param {jQuery|string} $elements - Elements or selector to move
	 * @param {boolean} condition - If true, moves to top; if false, restores original position
	 */
	$.prioritize = function($elements, condition) {
		var key = '__prioritize';

		// Ensure $elements is a jQuery object
		if (typeof $elements !== 'jQuery') {
			$elements = $($elements);
		}

		$elements.each(function() {
			var $e = $(this),
				$parent = $e.parent(),
				$p;

			// No parent? Skip.
			if ($parent.length === 0) {
				return;
			}

			if (!$e.data(key)) {
				// Element not yet moved
				if (!condition) {
					return;
				}

				// Store reference to previous sibling for restoration
				$p = $e.prev();
				if ($p.length === 0) {
					return; // Already at top
				}

				$e.prependTo($parent);
				$e.data(key, $p);
			} else {
				// Element was previously moved
				if (condition) {
					return;
				}

				// Restore to original position
				$p = $e.data(key);
				$e.insertAfter($p);
				$e.removeData(key);
			}
		});
	};

})(jQuery);