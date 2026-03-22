/**
 * Welcome template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){
	
	var tParams = yLearnTmpl.getTmplParams();
	
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );	
	}
	
	$('.image-lang').each(function(){
		var img = $(this).attr('src'); 
		var img_pref = img.substring(0, img.length-4);
		var img_suff = img.substring(img.length-4, img.length);
		var imgname = img_pref+'-'+yLearnTmpl.getLang()+img_suff;
		$(this).attr('src', imgname);
	});
	
	yLearnTmpl.loadPage(function(){
		var txt = $('#content_text1').text()
		setTimeout(function(){
			yLearnTmpl.actionDone(txt);
		}, 2000);
		
		yLearnTmpl.playInstructionVoice(0);
		
	});

});