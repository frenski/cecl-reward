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
	
	if (tParams.video_url != null) {
		var video = YLEARN_TMPL_CONFIG.videoTmpls[tParams.video_provider]
			.replace('{{ url }}',tParams.video_url);

		$('.video-overlay').click(function(){
			$('.video-container').append(video);
			$(this).fadeOut('fast');
		});
	} else {
		$('.video-container').hide();
	}
	
	yLearnTmpl.loadPage();

});