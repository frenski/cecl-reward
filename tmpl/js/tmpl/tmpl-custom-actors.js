/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){

	let tParams = yLearnTmpl.getTmplParams();
	const butCount = 5;
	const butParlCount = 10;
	let callClickAnims = [];

	// Setting the theme and the background
	if( typeof tParams.backColor !== 'undefined'){
		yLearnTmpl.setBackground( tParams.backColor );
	}
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
	}

	for (let i=0; i<(butCount+butParlCount); i++) {
		const callToClickEl = document.getElementById('lt-player-callclick'+i);
		const callToClickElJQ = $("#lt-player-callclick");

		const callClickAnim = lottie.loadAnimation({
			container: callToClickEl,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			path: 'img/lottie/call-to-click.json',
			initialSegment:[0,120]
		});

		callClickAnims.push(callClickAnim);

	}


	$('.button-popup-l1').click(function() {
		let bId = $(this).data('id');
		console.log(bId);
		$('.popup-content').hide();
		$('#popup-content-l'+bId).show();
		$('#popup-content-r'+bId+'0').show();
		$('.popup-level1').addClass('popup-visible');
		callClickAnims[bId].stop();
		$('#lt-player-callclick'+bId).remove();
	});

	$('.parl-inst-button').click(function(){
		let bId = $(this).data('id');
		$('.popup-content-r').hide();
		$('#popup-content-r4'+bId).show();
		$('#lt-player-callclick'+(butCount+bId)).remove();
	});

	$('.popup-close').click(function() {
		$(this).parent().removeClass('popup-visible');
		return null;
	});

	// loading the page
	yLearnTmpl.loadPage(function(){
		// callClickAnim.play();
	});


});
