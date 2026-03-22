/**
 * Review point - fill in the blank template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){

	let tParams = yLearnTmpl.getTmplParams();
	const playerBadgeTopEl = document.getElementById("lt-player-popup");
	const playerBadgeTop = lottie.loadAnimation({
		container: playerBadgeTopEl,
		renderer: 'svg',
		loop: false,
		autoplay: false,
		path: 'img/lottie/success-badge1.json'
	});

	// yLearnTmpl.playInstructionVoice(2);

	// Presets
	yLearnTmpl.setBgColor( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
	}

	var tItems = [];

	for (var i=0; i<tParams.answers.length+1; i++) {
		tItems.push('<span class="edit-text" id="content_text10'+
					 (i)+'"></span>');
	}


	var finished = function(res) {

		const score = Math.round((res.correct_answers/res.all_answers)*100);
		// const correctRat =

		$('#response-score-perc').text(score + '%');
		$('#response-score').text($('#content_text_score').text()
				.replace('%s', res.correct_answers)
				.replace('%s', res.all_answers));


    setTimeout(function() {
			window.parent.$.scrollTo( { top: '0px'}, 500, {'axis':'y'} );
			$('.popup-container')
				.addClass('anim-appear-fadein')
				.css('display','block');

			$('.popup-general')
				.addClass('anim-appear-scale anim-delay-05');

			if (score >= 80) {
				setTimeout(function(){
					playerBadgeTop.play();
				}, 1000);
			}

			setTimeout(function(){
				$('#popup-general-button').fadeIn('fast');
				yLearnTmpl.actionDone($('#popup-general-button'));
			}, 2000);

		}, (res.wrong_answers + 1) * 1000);
  }

	$('#fillblank').quizyFillBlankFree({
		textItems: tItems,
		correctAnswers: tParams.answers,
		blockSize: tParams.itemSize,
		onFinishCall: function (res) {
			finished (res);
		}
	});


	yLearnTmpl.loadPage(function(){

	});


});
