/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */

$(document).ready( function(){

	let tParams = yLearnTmpl.getTmplParams();

	const idPrefSlide = "slide";
	const disTopClass = "slide-disappear-top";
	const disBottomClass = "slide-disappear-bottom"
	let animsList = [];
	let curSlide = -1;
	let playedList = [];
	const animCount = tParams.slides.length;

	const playerBadgeTopEl = document.getElementById("lt-player");
	const playerBadgeTop = lottie.loadAnimation({
		container: playerBadgeTopEl,
		renderer: 'svg',
		loop: true,
		autoplay: true,
		path: 'img/lottie/fire.json'
	});

	const itemsTmpl = "{{#slides}}" + $('#tmpl-slides').html() + "{{/slides}}";
	const itemsTmplHtml = Mustache.to_html( itemsTmpl, tParams );
	$('.slides-container').append( itemsTmplHtml );

	tParams.slides.forEach(function(sl) {
		const wrapperElJQ = $('#'+idPrefSlide+sl.order);

		animsList.push({
			'wrapperElJQ': wrapperElJQ
		});

	});

	$('#arrow-up').hide();

	let changeSlide = function (slId) {
		if (curSlide >-1) {
			if (slId > curSlide) {
				animsList[curSlide].wrapperElJQ.addClass(disTopClass);
			} else if (slId < curSlide) {
				animsList[curSlide].wrapperElJQ.addClass(disBottomClass);
			}
		}
		if (curSlide == 0 && slId == 1) $('#arrow-up').show();
		if (curSlide == 1 && slId == 0) $('#arrow-up').hide();
		if (curSlide == (animCount-2) && slId == (animCount-1)) $('#arrow-down').hide();
		if (curSlide == (animCount-1) && slId == (animCount-2)) $('#arrow-down').show();
		curSlide = slId;
		let sl = animsList[slId];
		sl.wrapperElJQ.removeClass(disTopClass);
		sl.wrapperElJQ.removeClass(disBottomClass);
	}

	let activateDownArr = function(del) {
		let delay = (typeof del === 'undefined')? 0:del;
		setTimeout(function(){
			$('#arrow-down').addClass('anim-pulsate');
		}, delay);
	}

	let deactivateDownArr = function () {
		$('#arrow-down').removeClass('anim-pulsate');
	}

	changeSlide(0);

	activateDownArr(3000);

	$('#arrow-up').click(function (){
		if (curSlide > 0) {
			changeSlide (curSlide-1);
		}
	});

	$('#arrow-down').click(function (){
		deactivateDownArr ();
		if (curSlide < (animsList.length-1)) {
			changeSlide (curSlide+1);
			if (curSlide < (animsList.length-1)) activateDownArr(2000);
		}
	});

	yLearnTmpl.pageResized();

	// Setting the theme and the background
	if( typeof tParams.backColor !== 'undefined'){
		yLearnTmpl.setBackground( tParams.backColor );
	}
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
	}

	// loading the page
	yLearnTmpl.loadPage();


});
