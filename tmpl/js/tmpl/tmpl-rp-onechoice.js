/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){

	let tParams = yLearnTmpl.getTmplParams();
	let answerItems = {'answers':[]};
	let selectedAnswers = [];

	let resCorrectJQ = $('#lt-player-correct');
	const resCorrectEl = document.getElementById("lt-player-correct");
	const resCorrect = lottie.loadAnimation({
		container: resCorrectEl,
		renderer: 'svg',
		loop: false,
		autoplay: false,
		path: 'img/lottie/response1-correct.json'
	});
	let resWrongJQ = $('#lt-player-wrong');
	const resWrongEl = document.getElementById("lt-player-wrong");
	const resWrong = lottie.loadAnimation({
		container: resWrongEl,
		renderer: 'svg',
		loop: false,
		autoplay: false,
		path: 'img/lottie/response1-wrong.json'
	});
	let resNullJQ = $('#lt-player-attention');
	const resNullEl = document.getElementById("lt-player-attention");
	const resNull = lottie.loadAnimation({
		container: resNullEl,
		renderer: 'svg',
		loop: false,
		autoplay: false,
		path: 'img/lottie/response1-attention.json'
	});
	let answerIconResponses = [];

	// yLearnTmpl.playInstructionVoice(2);

	var selectQuestion = function(el, id) {
		if (selectedAnswers[id]) {
			selectedAnswers[id] = false
		} else {
			selectedAnswers[id] = true;
		}
		el.children('.answer-left')
			.toggleClass('element-background-dark')
			.toggleClass('element-background-verydark');
		el.children('.answer-right')
			.toggleClass('element-background-verylight')
			.toggleClass('element-background-dark');
	}

	// Setting dynamic elements from templates
	for (var i=0; i<tParams.answers.length; i++) {
		answerItems.answers[i] = {'id':i,
								  // 'correct':
									// 	(typeof(tParams.answers[i].correct !=='undefined')
									// 	&& tParams.answers[i].correct) ? true:false,
									'correct':tParams.answers[i].correct,
									'ico':tParams.answers[i].ico,
								  'textId':100+i,
								  'responseTextContenId':200+i,
								  'sequenceTextId':300+i };
		selectedAnswers[i] = false;
	}

	var answerTmpl = "{{#answers}}" + $('#tmpl-answer').html()
	 				   + "{{/answers}}";
	var answerHtml = Mustache.to_html( answerTmpl, answerItems );
	$('.answers-wrapper').append( answerHtml );


	$('.answer').click(function(){
		let id = $(this).data('answer');
		let self = $(this);
		$(this).removeClass('opacity0 anim-appear-margin-bottom anim-delay-1');
		$(this).addClass('anim-pulsate');
		setTimeout(function(){
			self.removeClass('anim-pulsate');
			if (typeof(answerItems.answers[id].correct) === 'undefined'){
				resNullJQ.show();
				resNull.play();
				setTimeout(function(){
					resNullJQ.fadeOut('slow');
					resNull.stop();
					if (tParams.extraNote) {
						setTimeout(function(){
							$('#extranote').addClass('note-display');
						}, 200);
					}
				}, 3000);
			} else {
				if (answerItems.answers[id].correct) {
					resCorrectJQ.show();
					resCorrect.play();
					setTimeout(function(){
						resCorrectJQ.fadeOut('slow');
						resCorrect.stop();
						if (tParams.extraNote) {
							setTimeout(function(){
								$('#extranote').addClass('note-display');
							}, 200);
						}
					}, 3000);
				} else {
					resWrongJQ.show();
					resWrong.play();
					setTimeout(function(){
						resWrongJQ.fadeOut('slow');
						resWrong.stop();
						if (tParams.extraNote) {
							setTimeout(function(){
								$('#extranote').addClass('note-display');
							}, 200);
						}
					}, 3000);
				}
			}
		}, 2000);
	});

	$('#popup-general-button').hide();

	// Setting the theme and the background
	if( typeof tParams.backColor !== 'undefined'){
		yLearnTmpl.setBgColor( tParams.backColor );
	}
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
	}

	// loading the page
	yLearnTmpl.loadPage();


});
