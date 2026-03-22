/**
 * Welcome template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){

	var tParams = yLearnTmpl.getTmplParams();
	let revealLevel = 1;
	const maxRevealLevel = 3;
	const disTopClass = "slide-disappear-top";
	const disBottomClass = "slide-disappear-bottom";

	yLearnTmpl.setBgColor( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
	}

	if (tParams.image != null) {
		$('#theimage').attr('src', '../files/'+tParams.image);
		$('#theimage').load(function() {
			yLearnTmpl.pageResized();
		});
	}

	$('#arrow-next').click(function() {
		if (revealLevel < maxRevealLevel) {
			$('#theimage').removeClass('img-stage' + (revealLevel));
			$('#theimage').addClass('img-stage' + (revealLevel+1));
			$('#slide' + revealLevel).addClass(disTopClass);
			$('#slide' + (revealLevel+1)).removeClass(disTopClass);
			$('#slide' + (revealLevel+1)).removeClass(disBottomClass);
			revealLevel ++;
			$('#arrow-prev').css('opacity', 1);
		}
		if (revealLevel == maxRevealLevel) {
			$(this).css('opacity', 0.2);
		}
	});

	$('#arrow-prev').click(function() {
		if (revealLevel > 1) {
			$('#theimage').removeClass('img-stage' + (revealLevel));
			$('#theimage').addClass('img-stage' + (revealLevel-1));
			$('#slide' + revealLevel).addClass(disBottomClass);
			$('#slide' + (revealLevel-1)).removeClass(disTopClass);
			$('#slide' + (revealLevel-1)).removeClass(disBottomClass);
			revealLevel --;
			$('#arrow-next').css('opacity', 1);
		}
		if (revealLevel == 1) {
			$(this).css('opacity', 0.2);
		}
	});

	// Setting the theme and the background
	if( typeof tParams.backColor !== 'undefined'){
		yLearnTmpl.setBackground( tParams.backColor );
	}
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
	}

	yLearnTmpl.loadPage();

});
