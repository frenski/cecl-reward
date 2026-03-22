/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){
	
	var tParams = yLearnTmpl.getTmplParams();
	
	// To be called after the images are loaded
	var afterLoad = function (){
		
		yLearnTmpl.playInstructionVoice(2);
		
		// Setting loaded images
		$('#back-image-main').attr('src', yLearnTmpl.getImageExt(
									  tParams.backImage[0].img, 'png'));
		
		// Setting dynamic elements from templates
		var pinsTmpl = "{{#pins}}" + $('#tmpl-pins').html() + "{{/pins}}";
		var pinsTmplHtml = Mustache.to_html( pinsTmpl, tParams );
		$('.back-image-wrapper').append( pinsTmplHtml );
		
		// Adding events to the newly added elements
		$('.pin').click(function(){
			$('.pic-zoom').hide();
			$('.description').hide();
			var id = $(this).data('pin-id');
			$('#description'+id).fadeIn(function(){
				window.parent.$.scrollTo( 
					{ top: $('#back-image-main').height()+'px' }, 
					500, {'axis':'y'});
			});
			$('#pic-zoom'+id).fadeIn(function(){
				resetAnim($(this));
				animScene($(this), tParams.pins[id]);
			});
			$(this).removeClass('anim-blink');
		});
		
		// Calling loader callback
		yLearnTmpl.loadPage();
		
	}

	// Presets
	
	yLearnTmpl.setBgColor( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );	
	}
	
	yLearnTmpl.loadImages( [tParams.backImage[0].img], afterLoad, 'png' );

});