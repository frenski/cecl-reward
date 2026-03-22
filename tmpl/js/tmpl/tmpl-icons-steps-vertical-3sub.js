/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){
	
	var tParams = yLearnTmpl.getTmplParams();
	
	// To be called after the images are loaded
	var afterLoad = function (){
		
		// Setting dynamic elements from templates
		
		for (var i=0; i< tParams.allIcons.length; i++) {
			if (i < tParams.allIcons.length-1) {
				tParams.allIcons[i].last = "";
			} else {
				tParams.allIcons[i].last = "hidden";
			}
		}

		var bulletsTmpl = "{{#allIcons}}" + $('#tmpl-bullets').html() + "{{/allIcons}}";
		var bulletsTmplHtml = Mustache.to_html( bulletsTmpl, tParams );
		$('#bullets-wrapper').append( bulletsTmplHtml );
		
		var descTmpl = "{{#allIcons}}" + $('#tmpl-descriptions').html() + "{{/allIcons}}";
		var descTmplHtml = Mustache.to_html( descTmpl, tParams );
		$('#description-wrapper').append( descTmplHtml );
		
		$('#bullet0').addClass('element-special-background button80x80 attachedarrow-right');
		$('#description0').fadeIn();
		$('#description-sub0-0').fadeIn();
		$('#bullet-separator0-0').addClass('attachedarrow-up attachedarrow-gray')
		$('#bullet-title0-0').addClass('pagetheme-text-special')
		
		// Adding events to the newly added elements
		$('.bullet').click(function() {
			var id = $(this).data('bullet-id');
			$('.description').fadeOut();
			$('#description'+id).fadeIn();
			$('.bullet').removeClass('element-special-background button80x80 attachedarrow-right');
			$('#bullet'+id).addClass('element-special-background button80x80 attachedarrow-right')
			$('.description-sub').hide();
			$('#description-sub'+id+'-0').fadeIn();
			$('.bullet-separator').removeClass('attachedarrow-up attachedarrow-gray')
			$('#bullet-separator'+id+'-0').addClass('attachedarrow-up attachedarrow-gray')
			$('.bullet-title').removeClass('pagetheme-text-special')
			$('#bullet-title'+id+'-0').addClass('pagetheme-text-special')
		});
		
		$('.bullet-sub').click(function(){
			var id = $(this).data('bullet-sub-id');
			$('.bullet-separator').removeClass('attachedarrow-up attachedarrow-gray')
			$('#bullet-separator'+id).addClass('attachedarrow-up attachedarrow-gray')
			$('.description-sub').hide();
			$('#description-sub'+id).fadeIn();
			$('.bullet-title').removeClass('pagetheme-text-special')
			$('#bullet-title'+id).addClass('pagetheme-text-special')
		});
		
		// Calling loader callback
		yLearnTmpl.loadPage();
		
	}

	// Presets
	yLearnTmpl.setBgColor( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );	
	}
	
	afterLoad();

});