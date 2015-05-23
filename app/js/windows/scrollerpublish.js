
var PublishController = function(id, container, ui, scroller) {

	var block = $(
				'<div class="publish-controller">Hello World' +
				'</div>'
				).appendTo(container),
		optionsButton = block.find('.publish-options-button'),

		options = $(
				'<div class="publish-options">' +
					'<span class="close-button"></span>' +
					'<strong class="i18n" data-i18n="[html]windows.publish.options"></strong>' +
				'</div>'
				).appendTo(container),
		scrollCheckbox = options.find('.publish-scroll').prop('checked', true),
		optionsCloseButton = options.find('.close-button'),


		publish = block.find('publish')[0],

		currenttime = block.find('.publish-currenttime'),
		duration = block.find('.publish-duration'),
		title = block.find('.publish-title'),
		subtitle = block.find('.publish-subtitle'),



		textInfo = null,
        publishInfo = null,
		locationInfo = null,
		sectionid = '',
		fragmentid = '',
		fragmentpublishData = null,
		sectionHeight = 0,
		sectionNode = null,
		haspublish = false;
		//publishDataManager = new publishDataManager();


	options.find('.i18n').i18n();

	if (ui != null) {
        if (typeof sofia.customConfigs.publishServerPath === 'undefined') {
            ui.hide();
        }
		block.hide();
	}
	options.hide();


	// OPTIONS
	optionsButton.on('click', function() {
		if (options.is(':visible')) {
			options.hide();

			$(document).off('click', doc_click);
		} else {
			options.show();

			setTimeout(function() {
				$(document).on('click', doc_click);
			});
		}
	});
	optionsCloseButton.on('click', function() {
		options.hide();
		$(document).off('click', doc_click);
	});


	// click off functionality
	function doc_click(e) {

		var target = $(e.target),
			clickedOnOptions = false;

		// go through all nested clicked elements
		while (target != null && target.length > 0) {

			if (target[0] == options[0]) {
				clickedOnOptions = true;
				break;
			}

			target = target.parent();
		}

		//return;
		if (!clickedOnOptions) {
			e.preventDefault();

			options.hide();
			$(document).off('click', doc_click);

			return false;
		}
	}

	// MAIN
	if (ui != null) {
		ui.on('click', function() {
			if (block.is(':visible')) {
				block.hide();
			} else {
				block.show();
			}
		});
	}

	if (scroller != null) {
		
		function updateLocation(e) {
	
			var newLocationInfo = e.data;
	
			//// //console.log('AUDIO:locationchange', e, newLocationInfo);
	
			// found a fragment
			if (newLocationInfo != null) {
	
				locationInfo = newLocationInfo;

			}
		}
		
		scroller.on('locationchange', updateLocation);
	}


	function setTextInfo(newTextInfo) {
		if (textInfo == null || textInfo.id != newTextInfo.id) {

			// reset
			title.html('');
			subtitle.html('');

			textInfo = newTextInfo;


			if (textInfo.type == 'bible') {

			}

		}
		// attempt to load
	}


	function size(width, height) {

		block.outerWidth(width);
	}

	//$(window).on('resize')

	function close() {
		ext.clearListeners();

		block.remove();
		options.remove();

		block = null;
		options = null;
	}

	var ext = {
		setTextInfo: setTextInfo,
		size: size,
		close: close
	}
	ext = $.extend(true, ext, EventEmitter);

	return ext;
}
