/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){
	
	var tParams = yLearnTmpl.getTmplParams();
	var sliderHeight = 200;
	
	// To be called after the images are loaded
	var afterLoad = function (){
		
		// Setting dynamic elements from templates
		for(var i=0; i<tParams.gifs.length; i++){
			var unit = sliderHeight/(tParams.gifs.length-1);
			tParams.gifs[i].posY = (tParams.gifs[i].order) * unit ;
		}
		var bulletsTmpl = "{{#gifs}}" + $('#tmpl-bullets').html() + "{{/gifs}}";
		var bulletsTmplHtml = Mustache.to_html( bulletsTmpl, tParams );
		$('#bullets-wrapper').append( bulletsTmplHtml );
		
		var gifsTmpl = "{{#gifs}}" + $('#tmpl-gifs').html() + "{{/gifs}}";
		var gifsTmplHtml = Mustache.to_html( gifsTmpl, tParams );
		$('#anim-wrapper').append( gifsTmplHtml );
		
		var descTmpl = "{{#gifs}}" + $('#tmpl-descriptions').html() + "{{/gifs}}";
		var descTmplHtml = Mustache.to_html( descTmpl, tParams );
		$('#description-wrapper').append( descTmplHtml );
		
		$('#gif0').fadeIn();
		$('#description0').fadeIn();
		
		// Adding events to the newly added elements
		$('.gif-button').click(function(){
			$('.pic-zoom').hide();
			$('.description').hide();
			var id = $(this).data('pin-id');
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
	
	var imgToLoad = [];
	yLearnTmpl.updateImgsForRetina(tParams.gifs);
	for (var i=0; i<tParams.gifs.length; i++){
		imgToLoad.push( tParams.gifs[i].img );
	}
	yLearnTmpl.loadImages( imgToLoad, afterLoad, 'gif' );
	
	// Slider
	$("#slider-control").noUiSlider({
		start: 0,
		step: 1,
		orientation: "vertical",
		direction: "ltr",
		range: {
			'min': 0,
			'max': tParams.gifs.length-1
		}
	});
	
	$("#slider-control").on({
		slide: function(){
			var id = parseInt($(this).val())
			$(".gif").hide();
			$(".description").hide();
			$("#gif"+id).fadeIn();
			$("#description"+id).fadeIn();
		}
	});

});