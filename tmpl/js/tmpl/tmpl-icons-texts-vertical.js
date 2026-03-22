/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){

	let tParams = yLearnTmpl.getTmplParams();
	let itList = {'items':[]};

	// Setting dynamic elements from templates
	for (var i=0; i<tParams.icons.length; i++) {
		itList.items[i] = {'id':i,
								  'ico':tParams.icons[i].ico,
								  'textId':100+i};
	}

	var itemsTmpl = "{{#items}}" + $('#tmpl-items').html()
	 				   + "{{/items}}";
	var itemsHtml = Mustache.to_html( itemsTmpl, itList );
	$('.items-wrapper').append( itemsHtml );

	$('.item').click(function() {
		const id = parseInt($(this).data('id'));
		$(this).find('.icon').removeClass('anim-pulsate');
		$(this).find('.icon-text').removeClass('icon-text-hidden');
		setTimeout(function(){
			$('#icon'+(id+1)).addClass('icon-show');
			setTimeout(function(){
				$('#icon'+(id+1)).addClass('anim-pulsate');
			}, 2000);
		}, 2000);

	});

	setTimeout(function(){
		$('#icon0').addClass('icon-show');
		setTimeout(function(){
			$('#icon0').addClass('anim-pulsate');
		}, 2000);
	}, 1000);


	// answerItems.answers.forEach(function(answ) {
	// 	const playerRes = document.getElementById('lt-answer-response'+answ.id);
  // 	answerIconResponses.push(playerRes);
	// })
	//
	// $('.answer').click(function(){
	// 	let id = $(this).data('answer');
	// 	selectQuestion($(this), id);
	// })
	//
	//
	// $('#answers-submit').click(function(){
	//
	// 	// Setting up the correct answer
	// 	let correctCount = 0;
	// 	let correctResponse = "";
	// 	const allAnswersCount = answerItems.answers.length;
	// 	for (var i=0; i<allAnswersCount; i++) {
	// 		if (answerItems.answers[i].correct == selectedAnswers[i]) {
	// 			correctCount ++;
	// 		}
	// 		if (answerItems.answers[i].correct) {
	// 			var seq = '<span class="button-type-element" title="'
	// 									+ $("#content_text10" + i).text()+'">'
	// 									+ $("#content_text40" + i).text() + '</span>';
	// 			correctResponse += (correctResponse== "") ? seq : ', ' + seq;
	// 		}
	// 	}
	// 	$('#answers-response-correct').html(correctResponse);
	// 	var correctRatio = (Math.round (correctCount/allAnswersCount * 100));
	// 	$("#content_text_answersresponsetext")
	// 		.text($("#content_text_answersresponsetext").text()
	// 			.replace('%s',correctRatio));
	//
	// 	// Scrolling and showing answer responses
	//
	// 	answerIconResponses.forEach(function(aRes, idx) {
	// 		setTimeout(function() {
	// 			if (answerItems.answers[idx].correct == selectedAnswers[idx]) {
	// 				aRes.load('img/lottie/response1-correct.json');
	// 			} else {
	// 				aRes.load('img/lottie/response1-wrong.json');
	// 			}
	// 			window.parent.$.scrollTo(
	// 				{ top: ($('#lt-answer-response'+idx).offset().top - 100) + 'px' },
	// 				500, {'axis':'y'} );
	// 			aRes.play();
	// 		}, idx*1000);
	//
	// 	});
	//
	//
	// 	// Finally-shows the popup
	// 	setTimeout(function() {
	// 		window.parent.$.scrollTo( { top: '0px'}, 500, {'axis':'y'} );
	// 		$('.popup-container')
	// 			.addClass('anim-appear-fadein')
	// 			.css('display','block');
	//
	// 		$('.popup-general')
	// 			.addClass('anim-appear-scale anim-delay-05');
	//
	// 		if (correctRatio >= 80) {
	// 			setTimeout(function(){
	// 				playerBadgeTop.play();
	// 			}, 1000);
	// 		}
	//
	// 		setTimeout(function(){
	// 			$('#popup-general-button').fadeIn('fast');
	// 			yLearnTmpl.actionDone($('#popup-general-button'));
	// 		}, 3000);
	//
	// 	}, 1000 + allAnswersCount * 1000);
	//
	// });



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
