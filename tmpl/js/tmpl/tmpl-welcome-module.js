/**
 * Welcome template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){
	
	var tParams = yLearnTmpl.getTmplParams();
	
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );	
	}
	
	$('#parrot').hide();
	
	var afterLoad = function() {
		// Calling loader callback
		yLearnTmpl.loadPage();
		var pr = $('#parrot');
		pr.css('background-image',"url('../files/parrot-flyin.png')");
		pr.fadeIn(500).animate('top','0',function(){
			pr.animate({'top':'120px','left':'100px'}, 1200, function(){
				pr.animate({'top':'10px','left':'70px'}, 1000, function(){
					pr.animate({'top':'140px','left':'30px'}, 1000);
				});
			});
		})
		yLearnTmpl.loadPage();
	}
	
	yLearnTmpl.loadImages( ['parrot-flyin'], afterLoad, 'png' );
	

});