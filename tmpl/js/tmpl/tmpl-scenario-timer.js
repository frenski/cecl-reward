/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){

	var tParams = yLearnTmpl.getTmplParams();

	const playerTimerEl = document.getElementById("lt-timer");
	const playerTimer = lottie.loadAnimation({
		container: playerTimerEl,
		renderer: 'svg',
		loop: false,
		autoplay: false,
		path: 'img/lottie/timer-90sec.json'
	});

	playerTimer.setSpeed(2);

	const numberPins = (tParams.hasOwnProperty('pinType') && tParams.pinType == 'number') ? true : false
	// console.log(numberPins);
	// Setting loaded images
	$('#back-image-main').attr('src', tParams.backImage);

	// To be called after the images are loaded
	$('#back-image-main').load(function (){

		// Setting dynamic elements from templates
		var pinsTmpl = "{{#pins}}" + $('#tmpl-pins').html() + "{{/pins}}";
		var pinsTmplHtml = Mustache.to_html( pinsTmpl, tParams );
		$('.back-image-wrapper').append( pinsTmplHtml );

		for (var i=0; i<tParams.pins.length; i++) {
			$("#admin-hidden").append('<div><span id="content_text20'+i+'" class="edit-text"></span></div>');
		}

		// Adding events to the newly added elements

		// Calling loader callback
		yLearnTmpl.loadPage(function(){

			if (numberPins) {
				$('.lottie-bulb').hide();
				$('.number').show();
				$('.number').addClass('anim-pulsate');
			} else {
				for (var i=0; i < tParams.pins.length; i++) {
					const elBulb = document.getElementById('pin-bulb'+i);
					const bulb = lottie.loadAnimation({
						container: elBulb,
						renderer: 'svg',
						loop: true,
						autoplay: true,
						path: 'img/lottie/bulb2.json'
					});
				}

			}

			$(".pin-tooltip").each(function(){
				var id = $(this).parent().data('pin-id');
				$(this).attr('title', $('#content_text20'+id).text());
			});

			// $(".pin-tooltip").mouseenter(function(){
			// 	console.log("aaa");
			// 	$(this).css('z-index', 10000);
			// });

			$('#answers-submit').click(function(){
				$(this).fadeOut();
				playerTimer.play();
				setTimeout(function(){
					$('.pin').fadeIn();
				}, 45000);
			});

			$('.dummypin').click(function(){
				// var id = $(this).data('pin-id');
				$(this).parent().find('.pin-tooltip').fadeIn();
				$(this).removeClass('anim-pulsate');
				$(this).removeClass('button-type-element');
				$(this).off();
			});

			if ($( window ).width()<= 480) {
				var extraMargin = $('#title-page').height()-40;
				$('#back-image-main').css('margin-top', extraMargin+'px');
			}


			// $('.pin-tooltip').tooltip()

		});

	});

	// Presets

	yLearnTmpl.setBackground( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
	}


});
