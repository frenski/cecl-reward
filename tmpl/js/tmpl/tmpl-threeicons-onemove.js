/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){
	
	var tParams = yLearnTmpl.getTmplParams();
	
	// To be called after the images are loaded
	var afterLoad = function (){
		
		for(var i=0; i<3; i++){
			$('.icon'+i).css('background-image'
				,"url('../files/"+tParams.icons[i].img+".png')");
		}
		
		// Adding events to the newly added elements
		$('#action-arrow').click(function(){
			$(this).removeClass('anim-blink');
			$('.qm').fadeOut();
			$("#description").fadeIn();
			$("#icon0-0").addClass("icon-pos0");
			$("#icon0-1").addClass("icon-pos1");
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
	for (var i=0; i<tParams.icons.length; i++){
		imgToLoad.push( tParams.icons[i].img );
	}
	yLearnTmpl.loadImages( imgToLoad, afterLoad, 'png' );

});