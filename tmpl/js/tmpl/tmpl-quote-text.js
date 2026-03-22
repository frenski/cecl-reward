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
	if (tParams.author_pic != null) {
		$('.avatar').css('background-image','url(../files/'+tParams.author_pic+')');
	} else {
		$('.avatar').remove();
	}
	
	if (tParams.backColorBottom != null) {
		$('#text-container').css('background-color',"#"+tParams.backColorBottom);
	}
	
	
	
	yLearnTmpl.loadPage();

});