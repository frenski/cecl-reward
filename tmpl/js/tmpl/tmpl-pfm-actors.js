/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){
	
	var tParams = yLearnTmpl.getTmplParams();
	var allImages = {'images':[]};
	var winRatio = 1;
	var animTimeOut = null;
	var spriteAnimFrame = 100;
	
	var animScene = function ( el, adata ){
    	frameLoop ++;
    	el.css('background-position','-'+(frameLoop*adata.frameWidth)+'px 0');

    	if ( frameLoop < parseInt(adata.framesCount)-1 ) {
      		animTimeOut = setTimeout(function() {
        		animScene( el,adata );
      		}, spriteAnimFrame);
		}else{
			loop ++;
			if(loop<adata.loops){
				frameLoop = 0;
				el.css('background-position','0 0');
	        	animScene( el,adata );
			}
		}

  	}

	var resetAnim = function(el){
		el.css('background-position','0 0');
		loop = 0;
		frameLoop = 0;
		clearTimeout(animTimeOut);
	}

	// To be called after the images are loaded
	var afterLoad = function (){
		
		// $('.title-image').css('background-image', 
		// 	'url('+topImages.images[0].img+')');
		// Calling loader callback
		
		$('#circle1').css("background-image",
			"url('../files/"+tParams.allImages[0].img+".png')");
		$('#circle2').css("background-image",
			"url('../files/"+tParams.allImages[0].img+".png')");
		$('#icon0').css("background-image",
			"url('../files/"+tParams.allImages[1].img+".png')");
		$('#icon1').css("background-image",
			"url('../files/"+tParams.allImages[2].img+".png')");
		$('#icon2').css("background-image",
			"url('../files/"+tParams.allImages[3].img+".png')");
		$('#icon3').css("background-image",
			"url('../files/"+tParams.allImages[4].img+".png')");
		
		$('#label0').fadeIn(1000,function(){
			resetAnim($('#circle1'));
			animScene($('#circle1'), {
				'frameWidth': 175,
				'loops':1,
				'framesCount': 28
			});	
		});
		
		setTimeout(function(){
			$('#icon1').fadeIn();
			$('#label1').fadeIn();
		}, 4000);
		
		setTimeout(function(){
			$('#icon2').fadeIn();
			$('#label2').fadeIn();
		}, 5000);
		
		setTimeout(function(){
			resetAnim($('#circle2'));
			animScene($('#circle2'), {
				'frameWidth': 175,
				'loops':1,
				'framesCount': 28
			});
		}, 6000);
		
		setTimeout(function(){
			$('#icon3').fadeIn();
			$('#label3').fadeIn();
		}, 7000);
		
		setTimeout(function(){
			$('#info-section').fadeIn();
		}, 9000);
		
		yLearnTmpl.loadPage();
		
	}

	// Presets
	yLearnTmpl.setBgColor( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );	
	}
	
	winRatio = yLearnTmpl.updateImgsForRetina( tParams.allImages );
	var imgToLoad = [];
	yLearnTmpl.importArrayImages(allImages, tParams.allImages, 'png', imgToLoad);
	
	
	// Adding events to the newly added elements
	
	$('.pin').click(function(){
		var id = $(this).data('pin-id');
		$(this).removeClass('anim-blink');
		$("#description").animate({'opacity':1}, 500);
	});
	
	// loading the page
	yLearnTmpl.loadImages( imgToLoad, afterLoad, 'png' );
	

});