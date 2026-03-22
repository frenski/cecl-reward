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

	const transcript = (tParams.hasOwnProperty('transcript') && tParams.transcript === false) ? false:true;

	var slidesTmpl = "{{#slides}}" + $('#tmpl-slides').html() + "{{/slides}}";
	var slidesHtml = Mustache.to_html( slidesTmpl,  tParams);
	$('.prezzideo-slides').append( slidesHtml );

	var transcripts = {'items':[]};
	tParams.slides.forEach(function(sl, idx) {
		transcripts.items.push({'id':idx});
	})

	var transTmpl = "{{#items}}" + $('#tmpl-transcripts').html() + "{{/items}}";
	var transHtml = Mustache.to_html( transTmpl,  transcripts);
	$('#transcript-container_1').append( transHtml );

	$('.prezzideo').attr('data-urlid',tParams.video_url);

	// prezzideo.init();
	prezzideo.init('player-container', { videoProvider: 'youtube', transcriptID:'transcript-container_1' });

	$('.video-overlay').click(function(){
		$('.video-container').append(video);
		$(this).fadeOut('fast');
	})

	if (!transcript) {
		$('#transcript-container_1').hide();
		$('.prezzideo-transcript-title').hide();
		$('.video-container')
			.removeClass('width80per')
			.addClass('width100per');
	}

	yLearnTmpl.loadPage();

});
