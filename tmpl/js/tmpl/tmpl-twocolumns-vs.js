/**
 * Welcome template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){

	var tParams = yLearnTmpl.getTmplParams();

	const arrEl = document.getElementById('lt-player-arrow');
	const arrElJQ = $("#lt-player-arrow");

	const arrowAnim = lottie.loadAnimation({
		container: arrEl,
		renderer: 'svg',
		loop: true,
		autoplay: false,
		path: 'img/lottie/arrows-vs-white.json',
		initialSegment:[0,30]
	});

	arrowAnim.play();

	arrElJQ.click(function(){
		$(this).removeClass('button-type-element');
		$('#column-first').removeClass('vscolumn-hidden');
		arrowAnim.playSegments([[31,91],[71,91]], true);
		$(this).click(function(){
			arrowAnim.loop = false;
			$('#column-second').removeClass('vscolumn-hidden');

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

		});
	});

	yLearnTmpl.setBackground( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
	}

	if (typeof(tParams.ico1) !== 'undefined' && tParams.ico1) {
		$('#col-img1').attr('src','../files/'+tParams.ico1);
		$('#col-img1').load(function(){
			yLearnTmpl.pageResized();
		});
	} else {
		$('#col-img1').remove();
	}

	if (typeof(tParams.ico2) !== 'undefined' && tParams.ico2) {
		$('#col-img2').attr('src','../files/'+tParams.ico2);
		$('#col-img2').load(function(){
			yLearnTmpl.pageResized();
		});
	} else {
		$('#col-img2').remove();
	}

	// $('#column-first').css('background-color', tParams.colorLeft );

	// yLearnTmpl.pageResized();
	yLearnTmpl.loadPage();

});
