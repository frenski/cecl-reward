/**
 * Welcome template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){

	var tParams = yLearnTmpl.getTmplParams();

	const disLeftClass = "itm-disappear-left";
	const disRightClass = "itm-disappear-right";
	const imgCount = tParams.images.length;
	let imgsList = [];
	let curSlide = -1;
	let rightClicks = 0;
	let itms = {'images':[]};

	yLearnTmpl.setBgColor( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
	}


	for (var i=0; i<imgCount; i++) {
		itms.images.push (
			{"id":i,
			 "url": '../files/' + tParams.images[i].url,
			});
	}

	var itemsTmpl = "{{#images}}" + $('#tmpl-texts').html() + "{{/images}}";
	var itemsTmplHtml = Mustache.to_html( itemsTmpl, itms );
	$('.image-items-wrapper').append( itemsTmplHtml );

	let changeSlide = function (slId) {
		if (curSlide == 0 && slId == 1) $('#arrow-left').show();
		if (curSlide == 1 && slId == 0) $('#arrow-left').hide();
		if (curSlide == (imgCount-2) && slId == (imgCount-1)) $('#arrow-right').hide();
		if (curSlide == (imgCount-1) && slId == (imgCount-2)) $('#arrow-right').show();
		if (curSlide >-1) {
			if (slId > curSlide) {
				$('#img-item' + curSlide).addClass(disLeftClass);
			} else if (slId < curSlide) {
				$('#img-item' + curSlide).addClass(disRightClass);
			}
		}
		curSlide = slId;
		$('#img-item' + slId).removeClass(disLeftClass);
		$('#img-item' + slId).removeClass(disRightClass);
	}

	let activateRightArr = function (del){
		let delay = (typeof del === 'undefined')? 0:del;
		setTimeout(function(){
			$('#arrow-right').addClass('anim-pulsate');
		}, delay);
	}

	let deactivateRightArr = function () {
		$('#arrow-right').removeClass('anim-pulsate');
	}

	changeSlide(0);
	activateRightArr(3000);
	$('#arrow-left').hide();

	$('#arrow-left').click(function (){
		if (curSlide > 0) {
			changeSlide (curSlide-1);
		}
	});

	$('#arrow-right').click(function (){
		rightClicks ++;
		deactivateRightArr ();
		if (curSlide < (tParams.images.length-1)) {
			changeSlide (curSlide+1);
			if ((curSlide < (tParams.images.length-1)) && rightClicks < imgCount) {
				activateRightArr(2000);
			}
		}
	});

	$('#img-item-img0').load(function(){
		yLearnTmpl.pageResized();
	});

	yLearnTmpl.loadPage();

});
