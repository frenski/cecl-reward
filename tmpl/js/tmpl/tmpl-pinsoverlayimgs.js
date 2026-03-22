/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){
	
	var tParams = yLearnTmpl.getTmplParams();
	
	// To be called after the images are loaded
	var afterLoad = function (){
		
		var clicked = {"1":false,"2":false};
		
		// Setting dynamic elements from templates
		var pinsTmpl = "{{#pins}}" + $('#tmpl-pins').html() + "{{/pins}}";
		var pinsTmplHtml = Mustache.to_html( pinsTmpl, tParams );
		$('#pins-wrapper').append( pinsTmplHtml );
		
		var zoomsTmpl = "{{#images}}" + $('#tmpl-images').html() + "{{/images}}";
		var zoomsTmplHtml = Mustache.to_html( zoomsTmpl, tParams );
		$('#pins-wrapper').append( zoomsTmplHtml );
		
		var descTmpl = "{{#pins}}" + $('#tmpl-descriptions').html() + "{{/pins}}";
		var descTmplHtml = Mustache.to_html( descTmpl, tParams );
		$('#description-wrapper').append( descTmplHtml );
		
		// shows the first image
		$('#pic0').fadeIn();
		
		// Adding events to the newly added elements
		$('.pin').click(function(){
			$(this).removeClass('anim-blink');
			$('.description').hide();
			var id = $(this).data('pin-id');
			$('#description'+id).fadeIn();
			var stringId = id.toString();
			if(!clicked[stringId]){
				var otherId = (stringId=="1") ? "2":"1";
				if( clicked[otherId] ){
					$("#pic3").fadeIn();
				}else{
					$("#pic"+id).fadeIn();
				}
				clicked[stringId] = true;
			}
		})
		
		// Calling loader callback
		yLearnTmpl.loadPage();
		
	}

	// Presets
	
	if( typeof tParams.backColor !== 'undefined'){
		yLearnTmpl.setBgColor( tParams.backColor );
	}
	
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );	
	}
	
	var imgToLoad = [];
	for (var i=0; i<tParams.images.length; i++){
		imgToLoad.push( tParams.images[i].img );
	}
	yLearnTmpl.loadImages( imgToLoad, afterLoad, 'png' );

});