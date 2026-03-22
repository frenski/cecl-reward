/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){

	let tParams = yLearnTmpl.getTmplParams();
	let itList = {'items':[]};

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
	const playerBadgeTopEl = document.getElementById("lt-player-popup");
	const playerBadgeTop = lottie.loadAnimation({
		container: playerBadgeTopEl,
		renderer: 'svg',
		loop: false,
		autoplay: false,
		path: 'img/lottie/success-badge1.json'
	});

	// Setting dynamic elements from templates
	for (var i=0; i<tParams.sliders.length; i++) {
		var range_texts = "";
		if (tParams.sliders[i].max > tParams.sliders[i].min) {
			let rList = {'rangetexts':[]};
			console.log(tParams.sliders[i].min, tParams.sliders[i].max, tParams.sliders[i].step);
			let ix = 0;
			for (var j=tParams.sliders[i].min; j<=tParams.sliders[i].max; j++) {
				let display = 'none';
				if (ix == 0) {
					display = 'block'
				}
				rList.rangetexts[ix] = {
					'i_id': i,
					"r_id": j,
					"ix_id": ix,
					"display": display
				};
				ix++;
				// range_texts += '<span id="content_text50'+i+'_'+j+'" class="edit-text"></span>';
			}
			var rangeTmpl = "{{#rangetexts}}" + $('#tmpl-range-texts').html()
								 + "{{/rangetexts}}";
			var rangeHtml = Mustache.to_html( rangeTmpl, rList );
			range_texts = rangeHtml;
		}

		itList.items[i] = {
			'id':i,
			"min": tParams.sliders[i].min,
			"default": tParams.sliders[i].default,
			"max": tParams.sliders[i].max,
			"step": tParams.sliders[i].step,
			"correct": tParams.sliders[i].correct,
			"range_texts":range_texts
		};

	}

	var itemsTmpl = "{{#items}}" + $('#tmpl-items').html()
	 				   + "{{/items}}";
	var itemsHtml = Mustache.to_html( itemsTmpl, itList );
	$('.items-wrapper').append( itemsHtml );

	$('.item-slider').change(function() {
		const id = parseInt($(this).data('id'));
		$('#item-question-wrapper'+id).addClass('passed-item');

		$(this).prop( "disabled", true );
		$(this).css( "cursor", 'not-allowed' );

		console.log($(this).offset().top, $('.popup-general-topanim').width()/2)
		let topPos = $(this).offset().top - ($('.popup-general-topanim').width()/2)*(id+1);
		$('.popup-general-topanim').offset({ top: topPos});

		if (tParams.sliders[id].correct === null) {
			resNullJQ.show();
			resNull.play();
			setTimeout(function(){
				resNullJQ.fadeOut('slow');
				resNull.stop();
			}, 3000);
		} else {
			if (tParams.sliders[id].correct === parseInt($(this).val())) {
				resCorrectJQ.show();
				resCorrect.play();
				setTimeout(function(){
					resCorrectJQ.fadeOut('slow');
					resCorrect.stop();
				}, 3000);
			} else {
				resWrongJQ.show();
				resWrong.play();
				setTimeout(function(){
					resWrongJQ.fadeOut('slow');
					resWrong.stop();
				}, 3000);
			}
		}

		setTimeout(function(){
			$('#item-text'+id).removeClass('item-text-hidden');
			if (id < (tParams.sliders.length-1)) {
				setTimeout(function(){
					$('#item'+(id+1)).addClass('anim-appear-margin-bottom');
					window.parent.$.scrollTo(
						{ top: ($('#item'+(id+1)).offset().top - 100) + 'px' },
						500, {'axis':'y'} );
				}, 3000);
			} else {
				setTimeout(function() {
					// SHOW END OF ACTION

				}, 3000);
			}
		}, 3000);

	});

	setTimeout(function(){
		$('#item0').addClass('anim-appear-margin-bottom');
	}, 2000);

	const itemSliderH = document.querySelectorAll(".item-slider");

	itemSliderH.forEach((slItem) => {
	  slItem.addEventListener("input", function() {
			console.log("Daa");
			const sId = this.dataset.id;
			const val = parseInt(this.value);
			const max = parseFloat(this.getAttribute('max'));
			const min = parseFloat(this.getAttribute('min'));
			const range = max - min;
			$('.content_text50_'+sId).css('display', 'none');
			$('#content_text50'+sId + '_' + val).css('display', 'block');
			// respInd.style.marginLeft = ( -43 + (this.offsetWidth-37)*(valAdj/range))+ "px";
			const respSlInd = document.getElementById('resp-sl-ind'+sId);
			respSlInd.style.left = 'calc(' + (20 + ((min + val)/max)*60) + '% - ' + respSlInd.offsetWidth/2 + 'px)';
			// const qIds = qId.split('-');
			// const qIdTopL = qIds[0];
			// const qIdSecL = qIds[1];
		});
	});




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
