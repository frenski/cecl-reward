/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){

	let tParams = yLearnTmpl.getTmplParams();
	const arrEl = document.getElementById('lt-player-arrow');
	const arrElJQ = $("#lt-player-arrow");

	const arrowAnim = lottie.loadAnimation({
	  container: arrEl,
	  renderer: 'svg',
	  loop: true,
	  autoplay: false,
	  path: 'img/lottie/dot-arrow-click-'+tParams.theme+'.json',
		initialSegment:[0,40]
	});

	arrowAnim.play();

	arrElJQ.click(function(){
		arrowAnim.loop = false;
		arrowAnim.playSegments([41,114], true);
		$('#theimage').addClass('anim-disappear-perspective-left');
		setTimeout (function(){
			$('.popup-general')
				.addClass('anim-appear-scale anim-delay-05');
		}, 750);
		setTimeout (function(){
			// $('#section-footnote').fadeIn();
			if (tParams.extraText) {
					$('#section-footnote').removeClass('footer-section-initpos');
			}
		}, 3000);
	});

	if (tParams.hasOwnProperty("fontSize")) {
		$('.popup-general').css('font-size', tParams.fontSize);
	}

	if (tParams.image != null) {
		$('#theimage').attr('src','../files/'+tParams.image);
	}

	if (tParams.image != null) {
		$('#theimage-replace').attr('src','../files/'+tParams.imageReplace);
	}

	$('#theimage').load(function(){
		yLearnTmpl.pageResized();
	});


	// Setting the theme and the background
	if( typeof tParams.backColor !== 'undefined'){
		yLearnTmpl.setBackground( tParams.backColor );
	}
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
	}

	// loading the page
	yLearnTmpl.loadPage();


});
