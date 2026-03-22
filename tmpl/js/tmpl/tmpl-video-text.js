/**
 * Welcome template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){
	
	yLearnTmpl.playInstructionVoice(0);
	
	var tParams = yLearnTmpl.getTmplParams();
	yLearnTmpl.setBgColor( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );	
	}
	var video = YLEARN_TMPL_CONFIG.videoTmpls[tParams.video_provider]
		.replace('{{ url }}',tParams.video_url);
		
	$('.video-overlay').click(function(){
		$('.video-container').append(video);
		$(this).fadeOut('fast');
	})
	
	$('#button-show-text').click(function(){
		$('.video-text-transcript').fadeIn(function(){
			yLearnTmpl.pageResized();
		});
	})
	
	yLearnTmpl.loadPage();

});