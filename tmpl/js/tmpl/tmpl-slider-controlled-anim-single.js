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
	const step = 2;

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
		loop: false,
		autoplay: false,
		path: tParams.animation,
		initialSegment:tParams.introSegment,
		onComplete: function(){
			console.log('onComplete');
			yLearnTmpl.pageResized();
		}
	});

	const framesCount = tParams.loopSegment[1]-tParams.loopSegment[0];

	mainAnim.addEventListener('data_ready', function(){
		yLearnTmpl.pageResized();
	});

	$('#slider-wrapper').addClass('anim-delay-' + tParams.sliderAppearDelay);

	setTimeout(function(){
		arrElJQ.fadeIn();
	}, tParams.arrowAppearDelay * 1000);

	mainAnim.playSegments(tParams.introSegment,true);

	if (tParams.hasOwnProperty("fontSize")) {
		$('.popup-specific').css('font-size', tParams.fontSize);
	}

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

	$(document).on('input', '#item-slider', function() {
		let val = parseInt($(this).val());
		mainAnim.goToAndStop(tParams.loopSegment[0]+val,true);
		let ratio = val/framesCount;
		$('#deg-indicator').css('top', (65 - ratio * 20) + '%');
		$('#degrees-num').text(val/step);
	});

	$('#guess-submit').click(function(){
		window.parent.$.scrollTo( { top: '0px'}, 500, {'axis':'y'} );
		$('.popup-container')
			.addClass('anim-appear-fadein')
			.css('display','block');

		$('.popup-general')
			.addClass('anim-appear-scale anim-delay-05');

		yLearnTmpl.actionDone($('#popup-general-button'));
	});

	// loading the page
	yLearnTmpl.loadPage();


});
