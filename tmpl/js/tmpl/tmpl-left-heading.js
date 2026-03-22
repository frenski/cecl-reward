/**
 * Welcome template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){

	var tParams = yLearnTmpl.getTmplParams();

	yLearnTmpl.setBackground( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
	}

	if (tParams.image1 != null) {
		$('#theimage1').attr('src','../files/'+tParams.image1);
	}

	if (tParams.image2 != null) {
		$('#theimage2').attr('src','../files/'+tParams.image2);
	}

	$('#theimage1').load(function() {
		setTimeout(function(){
			$('#thetext2').find('span').addClass('text-anim');
		}, 2000);
	});

	yLearnTmpl.loadPage();

});
