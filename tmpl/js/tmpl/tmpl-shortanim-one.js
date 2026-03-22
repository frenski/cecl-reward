/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){

	let tParams = yLearnTmpl.getTmplParams();
	const arrEl = document.getElementById('lt-player-arrow');
	const arrElJQ = $("#lt-player-arrow");

	const manimEl = document.getElementById('lt-player-main');
	const manimElJQ = $("#lt-player-main");

	if (tParams.hasOwnProperty('extraStyle')) {
		manimEl.style = tParams.extraStyle;
	}

	const arrowAnim = lottie.loadAnimation({
	  container: arrEl,
	  renderer: 'svg',
	  loop: true,
	  autoplay: false,
	  path: 'img/lottie/dot-arrow-click-'+tParams.theme+'.json',
		initialSegment:[0,40]
	});

	let mainAnim = lottie.loadAnimation({
		container: manimEl,
		renderer: 'svg',
		loop: true,
		autoplay: false,
		path: tParams.animation,
		initialSegment:[tParams.introSegment[0],tParams.loopSegment[1]],
		onComplete: function(){
			console.log('onComplete');
			yLearnTmpl.pageResized();
		}
	});

	mainAnim.addEventListener('data_ready', function(){
		yLearnTmpl.pageResized();
	});

	arrElJQ.hide();

	setTimeout(function(){
		arrElJQ.fadeIn();
		arrowAnim.play();
	}, tParams.arrowAppearDelay * 1000);

	mainAnim.playSegments([tParams.introSegment,tParams.loopSegment],true);

	if (tParams.hasOwnProperty("fontSize")) {
		$('.popup-specific').css('font-size', tParams.fontSize);
	}

	arrElJQ.click(function(){
		arrowAnim.loop = false;
		arrowAnim.playSegments([41,114], true);
		$('#theimage').addClass('anim-disappear-perspective-left');
		setTimeout (function(){
			$('.popup-general').addClass('anim-appear-scale anim-delay-05');
			setTimeout(function(){
				yLearnTmpl.pageResized();
			}, 500);
		}, 750);
		$(this).removeClass('button-type-element');
	});

	if (tParams.image != null) {
		$('#theimage').attr('src','../files/'+tParams.image);
	}

	if (tParams.image != null) {
		$('#theimage-replace').attr('src','../files/'+tParams.imageReplace);
	}

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
