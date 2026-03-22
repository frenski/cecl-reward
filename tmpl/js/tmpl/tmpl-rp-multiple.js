/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){

	let tParams = yLearnTmpl.getTmplParams();
	let answerItems = {'answers':[]};
	let selectedAnswers = [];
	const playerBadgeTopEl = document.getElementById("lt-player-popup");
	const playerBadgeTop = lottie.loadAnimation({
		container: playerBadgeTopEl,
		renderer: 'svg',
		loop: true,
		autoplay: true,
		path: 'img/lottie/success-badge1.json'
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
								  'correct':tParams.answers[i],
								  'textId':100+i,
								  'responseTextContenId':200+i,
								  'responseTextTitleId':300+i,
								  'sequenceTextId':400+i };
		selectedAnswers[i] = false;
	}

	var answerTmpl = "{{#answers}}" + $('#tmpl-answer').html()
	 				   + "{{/answers}}";
	var answerHtml = Mustache.to_html( answerTmpl, answerItems );
	$('.answers-wrapper').append( answerHtml );

	answerItems.answers.forEach(function(answ) {
		const playerRes = document.getElementById('lt-answer-response'+answ.id);
  	answerIconResponses.push(playerRes);
	})

	$('.answer').click(function(){
		let id = $(this).data('answer');
		selectQuestion($(this), id);
	})


	$('#answers-submit').click(function(){

		// Setting up the correct answer
		let correctCount = 0;
		let correctResponse = "";
		const allAnswersCount = answerItems.answers.length;
		for (var i=0; i<allAnswersCount; i++) {
			if (answerItems.answers[i].correct == selectedAnswers[i]) {
				correctCount ++;
			}
			if (answerItems.answers[i].correct) {
				var seq = '<span class="button-type-element" title="'
										+ $("#content_text10" + i).text()+'">'
										+ $("#content_text40" + i).text() + '</span>';
				correctResponse += (correctResponse== "") ? seq : ', ' + seq;
			}
		}
		$('#answers-response-correct').html(correctResponse);
		var correctRatio = (Math.round (correctCount/allAnswersCount * 100));
		$("#content_text_answersresponsetext")
			.text($("#content_text_answersresponsetext").text()
				.replace('%s',correctRatio));

		// Scrolling and showing answer responses

		answerIconResponses.forEach(function(aRes, idx) {
			setTimeout(function() {
				let aResPl = null;
				if (answerItems.answers[idx].correct == selectedAnswers[idx]) {
					aResPl = lottie.loadAnimation({
						container: aRes,
						renderer: 'svg',
						loop: false,
						autoplay: false,
						path: 'img/lottie/response1-correct.json'
					});
				} else {
					aResPl = lottie.loadAnimation({
						container: aRes,
						renderer: 'svg',
						loop: false,
						autoplay: false,
						path: 'img/lottie/response1-wrong.json'
					});
				}
				window.parent.$.scrollTo(
					{ top: ($('#lt-answer-response'+idx).offset().top - 100) + 'px' },
					500, {'axis':'y'} );
					if (aResPl) aResPl.play();
			}, idx*1000);

		});


		// Finally-shows the popup
		setTimeout(function() {
			window.parent.$.scrollTo( { top: '0px'}, 500, {'axis':'y'} );
			$('.popup-container')
				.addClass('anim-appear-fadein')
				.css('display','block');

			$('.popup-general')
				.addClass('anim-appear-scale anim-delay-05');

			if (correctRatio >= 80) {
				setTimeout(function(){
					playerBadgeTop.play();
				}, 1000);
			}

			setTimeout(function(){
				$('#popup-general-button').fadeIn('fast');
				yLearnTmpl.actionDone($('#popup-general-button'));
			}, 3000);

		}, 1000 + allAnswersCount * 1000);

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
