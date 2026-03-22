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

	$('#theimage2').load(function() {
		setTimeout(function(){
			$('#theimage1').addClass('image-anim');
			setTimeout(function(){
				$('#thetext1').find('span').addClass('text-anim');
				setTimeout(function(){
					$('#theimage2').addClass('image-anim');
					setTimeout(function(){
						$('#thetext2').find('span').addClass('text-anim');
						if (typeof tParams.extraText !== 'undefined' && tParams.extraText){
							setTimeout(function(){
								$('#extra-text').addClass('show-extra-text');
							}, 4000)
						}
					}, 2000);
				}, 5000);
			}, 2000);
		}, 1000);
	});

	yLearnTmpl.loadPage();

});
