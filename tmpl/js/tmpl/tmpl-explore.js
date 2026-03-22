/**
 * Welcome template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){

	var tParams = yLearnTmpl.getTmplParams();

	if (typeof tParams.withIntroVoice !== 'undefined' &&
		tParams.withIntroVoice ) {
		yLearnTmpl.playInstructionVoice(0);
	}


	const playerBadgeTopEl = document.getElementById("lt-player");
	const playerBadgeTop = lottie.loadAnimation({
		container: playerBadgeTopEl,
		renderer: 'svg',
		loop: true,
		autoplay: true,
		path: 'img/lottie/iso-compass.json'
	});

	yLearnTmpl.setBackground( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
	}

	$('#theimage').load(function(){
		yLearnTmpl.pageResized();
	});

	yLearnTmpl.loadPage();

});
