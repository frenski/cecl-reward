/**
 * Welcome template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){
	
	var tParams = yLearnTmpl.getTmplParams();
	
	yLearnTmpl.setBgColor( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );	
	}
	
	if (tParams.icon != null) {
		$('#theicon').css('background-image','url(../files/'+tParams.icon+'.png)');
	}
	
	yLearnTmpl.loadPage(function(){
		$('#text-desc').hide();
	});
	
	$('#theicon').click(function(){
		yLearnTmpl.playInstructionVoice(2);
		$('#text-desc').fadeIn();
		$(this).removeClass('anim-blink');
	})

});