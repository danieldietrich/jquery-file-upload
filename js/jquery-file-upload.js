/*
 * author: daniel dietrich
 */
(function($) {

	$.fn.fileupload = function(options) {
		
		// default arguments
		var settings = {
			action: '',
			onSubmit: function(fileName) {},
			onReceive: function(response) {},
			onUsupportedFileExtension: function(currentExtension, validExtensions) {},
			validExtensions: undefined
		}

		// merge custom options with default arguments
		if (options) {
			$.extend(settings, options)
		}

		// apply function to this (= jquery collection of input elements)
		return this.each(function() {

			// current input element
			var input = $(this)

			// initialize once
			if (!input.data('fileupload-initialized')) {

				// Create an iframe to submit through, using a semi-unique ID
				var frameId = 'fileupload-iframe-' + input.attr("id"),
					iframe = '<iframe width="0" height="0" style="display:none" name="' + frameId + '" id="' + frameId + '" />',
					form = '<form action="' + settings.action + '" method="POST" enctype="multipart/form-data" target="' + frameId + '" style="margin:0;padding:0" />'

				// wrap input element with form
				input.wrap( form )

				// add iframe to body
				$('body').after( iframe )

				// propagate content of iframe when loaded
				$('#' + frameId).load(function() {
					var response, responseStr = this.contentWindow.document.body.textContent
					try {
						response = JSON.parse(responseStr)
					} catch (e) {
						response = responseStr
					}
					settings.onReceive.apply(input, [ response ])
					this.contentWindow.document.body.innerHtml = "" // free memory
					input.data('fileupload-busy', false)
				})

				// register onChange handler on file input field
				input.change(function() {
					if (input.data('fileupload-busy') !== true) {
						var file = input.val()
						if (file) {
							var extension = file.split('.').pop().toLowerCase()
							var isExtensionValid = !settings.validExtensions || $.inArray(extension, settings.validExtensions) >= 0
							if (isExtensionValid) {
								settings.onSubmit.apply(input, [ file ])
								input.data('fileupload-busy', true)
								input.parents('form:first').submit(function(e) {
									e.stopPropagation()
								}).submit()
							} else {
								settings.onUnsupportedFileExtension.apply(input, [ extension, settings.validExtensions.join(", ") ])
							}
						}
					}
				})

				// mark as initialized
				input.data('fileupload-initialized', true)
			}
		})
	}
})(jQuery)
