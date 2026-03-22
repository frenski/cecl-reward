/**
 * Welcome template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){

	var tParams = yLearnTmpl.getTmplParams();

	const playerBadgeTopEl = document.getElementById("lt-player");
	// playerBadgeTop.load("img/lottie/congrats1.json");
	// playerBadgeTop.play();

	const playerBadgeTop = lottie.loadAnimation({
		container: playerBadgeTopEl,
		renderer: 'svg',
		loop: true,
		autoplay: true,
		path: 'img/lottie/congrats1.json'
	});


	// flagAnim.play();


	yLearnTmpl.setBackground( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
	}

	$('#theimage').load(function(){

		yLearnTmpl.pageResized();
	});

	yLearnTmpl.loadPage();

});
