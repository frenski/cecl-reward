/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){
	
	var tParams = yLearnTmpl.getTmplParams();


	// Presets
	
	yLearnTmpl.setBgColor( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );	
	}
	
	switch(tParams.noteType) {
		case "question":
			var nType = "?";
		break;
		case "important":
			var nType = "!";
		break;
		default:
			var nType = "?";
		break;
	}
	
	$('#pin').text(nType);
	
	
	// Adding events to the newly added elements
	
	$('.pin').click(function(){
		$(this).removeClass('anim-blink');
		$('#note').animate({'opacity':1},500);
	});
	
	yLearnTmpl.loadPage();
	

});