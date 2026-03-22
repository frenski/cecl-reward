/**
 * Welcome template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){

	var tParams = yLearnTmpl.getTmplParams();
	const noteEl = document.getElementById('lt-player-icon');

	const iconAnim = lottie.loadAnimation({
		container: noteEl,
		renderer: 'svg',
		loop: true,
		autoplay: true,
		path: 'img/lottie/important-note2.json'
	});

	yLearnTmpl.setBackground( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
	}

	if (tParams.hasOwnProperty ('extraNoteIco')) {
		$('#extranote').prepend ('<img src="../files/'+tParams.extraNoteIco +'">');
	}

	noteEl.addEventListener("click", function(){
		iconAnim.stop();
		$('#thenote').addClass('note-display');
		if (tParams.extraNote) {
			setTimeout(function(){
					$('#extranote').addClass('note-display');
						yLearnTmpl.pageResized();
			}, 3000)
		}
	});

	if (tParams.hasOwnProperty('secIcon')) {
		$('#section-icon').show();
		$('#section-icon-img').attr('src', tParams.secIcon);
	}


	iconAnim.play();

	yLearnTmpl.loadPage();

});
