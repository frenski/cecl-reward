/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){
	
	var tParams = yLearnTmpl.getTmplParams();
	yLearnTmpl.playInstructionVoice(1);

	// Presets
	
	yLearnTmpl.setBgColor( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );	
	}
	
	yLearnTmpl.updateImgsForRetina( tParams.iconImages );
	$('#icon-col0')
		.css("background-image","url('../files/"+tParams.iconImages[0].img+".png')");
	$('#icon-col1')
		.css("background-image","url('../files/"+tParams.iconImages[1].img+".png')");
	$('#icon-col2')
		.css("background-image","url('../files/"+tParams.iconImages[2].img+".png')");
	
	
	// Adding events to the newly added elements
	
	$('.pin').click(function(){
		var id = $(this).data('pin-id');
		yLearnTmpl.playInstructionVoice(id+2);
		$(this).removeClass('anim-blink');
		$("#desc-col"+id).animate({'opacity':1},500);
	});
	
	yLearnTmpl.loadPage();
	

});