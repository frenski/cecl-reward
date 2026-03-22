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

	$('#theimage1').load(function() {
		$('#theimage1').addClass('image-anim');
		setTimeout(function(){
			$('#thearrow1').addClass('image-anim');
		}, 2000);
	});
	//
	// setTimeout(function(){
	// 	$('#thetext1').find('span').addClass('text-anim');
	// 	setTimeout(function(){
	// 		$('#theimage2').addClass('image-anim');
	// 		setTimeout(function(){
	// 			$('#thetext2').find('span').addClass('text-anim');
	// 			if (typeof tParams.extraText !== 'undefined' && tParams.extraText){
	// 				setTimeout(function(){
	// 					$('#extra-text').addClass('show-extra-text');
	// 				}, 4000)
	// 			}
	// 		}, 2000);
	// 	}, 5000);
	// }, 2000);

	$('#thearrow1').click(function(){
		$('#thetext1').find('span').addClass('text-anim');
		setTimeout(function(){
			console.log("wwww");
			$('#thearrow2').addClass('image-anim');
		}, 4000);
	})

	$('#thearrow2').click(function(){
		$('#thetext2').find('span').addClass('text-anim');
	})

	yLearnTmpl.loadPage();

});
