/**
 * Welcome template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){

	var tParams = yLearnTmpl.getTmplParams();


	if (typeof tParams.withIntroVoice !== 'undefined' &&
		tParams.withIntroVoice ) {
		yLearnTmpl.playInstructionVoice(0);
	}

	yLearnTmpl.setBackground( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
	}

	if (tParams.image != null) {
		$('#theimage').attr('src','../files/'+tParams.image);
	}

	if (typeof tParams.pinIcon !== 'undefined' && tParams.pinIcon) {
		$('#pin').css('background-image',"url('../files/"+tParams.pinIcon + "')");
	}

	if (typeof tParams.imgSize !== 'undefined') {
		$('#theimage').css('width', tParams.imgSize);
	}

	if( typeof tParams.url !== 'undefined'){
		$("#theimage").addClass("button-type-element");
		$('#theimage').click(function(){
			var win = window.open(tParams.url, '_blank');
			win.focus();
		})
	}

	$("#pin").click(function(){
		if (typeof tParams.excludeImageVoice !== 'undefined'
			&& tParams.excludeImageVoice) {
		} else {
			yLearnTmpl.playInstructionVoice(2);
		}

		$("#theimage").removeClass('an-hidden');
		if (tParams.withText) {
			setTimeout(function(){
				$("#thetext").removeClass('an-hidden');
				yLearnTmpl.pageResized();
			}, 2000);
		}

		if (tParams.withDYK) {
			setTimeout(function(){
				$('#lt-player-icon').fadeIn();
				const noteEl = document.getElementById('lt-player-icon');
				const iconAnim = lottie.loadAnimation({
					container: noteEl,
					renderer: 'svg',
					loop: true,
					autoplay: true,
					path: 'img/lottie/bulb1.json'
				});
				$('#lt-player-icon').click(function(){
					$('.popup-general').addClass('anim-appear-scale anim-delay-05');
					$(this).removeClass('button-type-element');
					iconAnim.stop();
				});
			}, 3000);

		}

		$(this).removeClass("anim-pulsate");
		$(this).removeClass("button-type-element");
		yLearnTmpl.pageResized();
	});

	yLearnTmpl.loadPage(function(){
		$('#lt-player-icon').hide();
	});

});
