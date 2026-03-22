/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){
	
	var tParams = yLearnTmpl.getTmplParams();
	var secImgExists = tParams.backImage.length > 1 ? true : false;
	yLearnTmpl.playInstructionVoice(1);
	
	// To be called after the images are loaded
	var afterLoad = function (){
		
		// Setting loaded images
		$('#back-image-main').attr('src', yLearnTmpl.getImageExt(
									  tParams.backImage[0].img, 'png'));
		
		// Setting dynamic elements from templates
		var pinsTmpl = "{{#pins}}" + $('#tmpl-pins').html() + "{{/pins}}";
		var pinsTmplHtml = Mustache.to_html( pinsTmpl, tParams );
		$('.back-image-wrapper').append( pinsTmplHtml );
		
		for (var i=0; i<tParams.pins.length; i++) {
			$("#admin-hidden").append('<div><span id="content_text20'+i+'" class="edit-text"></span></div>');
		}

		// Adding events to the newly added elements
		
		// Calling loader callback
		yLearnTmpl.loadPage(function(){
			$(".pin-tooltip").each(function(){
				var id = $(this).parent().data('pin-id');
				$(this).attr('title', $('#content_text20'+id).text());
			});
			$(".pin-tooltip").tooltip({
			    position: { my: "right center", at: "right top" },
				tooltipClass: "ui-tooltip-small",
				open: function (event, ui) {
					var $element = $(event.target);
					ui.tooltip.click(function () {
						$element.tooltip('close');
					});
				}
			});
			
			$('.dummypin').click(function(){
				var id = $(this).data('pin-id');
				yLearnTmpl.playInstructionVoice(200+id);
				$(this).find('.pin-tooltip').tooltip('open');
			});
			
			if ($( window ).width()<= 480) {
				var extraMargin = $('#title-page').height()-40;
				$('#back-image-main').css('margin-top', extraMargin+'px');
			}
			
			
			// $('.pin-tooltip').tooltip()
			
		});
		
	}

	// Presets
	
	yLearnTmpl.setBgColor( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );	
	}
	
	var imgToLoad = [];
	yLearnTmpl.loadImages( [tParams.backImage[0].img], afterLoad, 'png');

});