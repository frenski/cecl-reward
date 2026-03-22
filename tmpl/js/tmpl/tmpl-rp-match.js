/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){

	yLearnTmpl.playInstructionVoice(2);

	let tParams = yLearnTmpl.getTmplParams();
	let leftIImgs = [];

	const playerBadgeTopEl = document.getElementById("lt-player-popup");
	const playerBadgeTop = lottie.loadAnimation({
		container: playerBadgeTopEl,
		renderer: 'svg',
		loop: true,
		autoplay: false,
		path: 'img/lottie/success-badge3.json'
	});

	// Setting the theme and the background
	if( typeof tParams.backColor != 'undefined'){
		yLearnTmpl.setBgColor( tParams.backColor );
	}
	if( typeof tParams.theme != 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
	}

	var dynTextStart = 3;
	var matches=tParams.correctItems.split(',');
	var leftI = [];
	var rightI = [];

	for (var i=0; i<tParams.leftItems; i++){
		leftI.push('<span class="edit-text" id="content_text'+
                (dynTextStart+i)+'"></span>');
	}

	for (var i=0; i<tParams.rightItems; i++){
		rightI.push('<span class="edit-text" id="content_text'+
                (dynTextStart+tParams.leftItems+i)+'"></span>');
	}


	var afterLoad = function() {

		$('#matches-game').quizyMatch({
	    	matches: matches,
	    	leftItems: leftI,
				leftItemsImgs: leftIImgs,
	    	rightItems: rightI,
	    	colLeftWidth: tParams.colLeftWidth,
	    	colRightWidth: tParams.colRightWidth,
	    	colCenterWidth: tParams.colCenterWidth,
	    	submitText: '<span class="content_text300"></span>',
	    	resultText: $('#content_text200'),
				onAfterSubmit: function(correct, total) {

					window.parent.$.scrollTo( { top: '0px'}, 500, {'axis':'y'} );

					const score = Math.round((correct/total)*100);

					$('#response-score-perc').text(score + '%');
					$('#response-score').text($('#quizymatch-result').text());

					$('.popup-general')
						.addClass('anim-appear-margin-right anim-delay-05');

					$('#popup-general-button-close').click(function(){
						$('.popup-general').fadeOut();
					});

					setTimeout(function(){
						$('#popup-general-button').fadeIn('fast');
						yLearnTmpl.actionDone($('#popup-general-button'));
					}, 3000);

					if (score > 80) {
						setTimeout(function(){
							playerBadgeTop.play();
						}, 1000);
					}

				}
		});

		yLearnTmpl.loadPage();
	}

	if (typeof tParams.leftItemsImgs !=='undefined' && tParams.leftItemsImgs) {
		var imgToLoad = [];
		for (var i=0; i<tParams.leftItemsImgs.length; i++){
			imgToLoad.push( tParams.leftItemsImgs[i].img );
		}
		yLearnTmpl.loadImages( imgToLoad, function(){
			for (var i=0; i<tParams.leftItemsImgs.length; i++) {
				leftIImgs.push('../files/'+tParams.leftItemsImgs[i].img+'.png');
			}
			afterLoad();
		}, 'png' );
	} else {
		afterLoad();
	}

	$('#popup-general-button').hide();




});
