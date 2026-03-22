/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){
	
	var tParams = yLearnTmpl.getTmplParams();
	var allImages = {'images':[]};
	var winRatio = 1;
	var animTimeOut = null;
	var spriteAnimFrame = 60;
	
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
		
		// Loading images
		$('#circle1').css("background-image",
			"url('../files/"+tParams.allImages[0].img+".png')");
		$('#circle2').css("background-image",
			"url('../files/"+tParams.allImages[1].img+".png')");
		$('#icon0').css("background-image",
			"url('../files/"+tParams.allImages[2].img+".png')");
		$('#icon1').css("background-image",
			"url('../files/"+tParams.allImages[3].img+".png')");
		$('#icon2').css("background-image",
			"url('../files/"+tParams.allImages[4].img+".png')");
		$('#icon3').css("background-image",
			"url('../files/"+tParams.allImages[4].img+".png')");
		$('#icon4').css("background-image",
			"url('../files/"+tParams.allImages[4].img+".png')");
		$('#flag0').css("background-image",
			"url('../files/"+tParams.allImages[5].img+".png')");
		$('#flag1').css("background-image",
			"url('../files/"+tParams.allImages[6].img+".png')");
		$('#flag2').css("background-image",
			"url('../files/"+tParams.allImages[7].img+".png')");
		$('#flag3').css("background-image",
			"url('../files/"+tParams.allImages[8].img+".png')");
		$('#flag4').css("background-image",
			"url('../files/"+tParams.allImages[9].img+".png')");
		$('#flag5').css("background-image",
			"url('../files/"+tParams.allImages[10].img+".png')");
			
		yLearnTmpl.loadPage();
		
		setTimeout(function(){
			$('#icon0').fadeIn();
			$('#label0').fadeIn();
		}, 500);
		
		setTimeout(function(){
			$('#icon1').fadeIn();
			$('#label1').fadeIn();
			$('#label11').fadeIn();
		}, 1500);
		
		setTimeout(function(){
			$('#label11').fadeOut();
			resetAnim($('#circle1'));
			animScene($('#circle1'), {
				'frameWidth': 175,
				'loops':1,
				'framesCount': 28
			});
		}, 4500);
		
		setTimeout(function(){
			$('#flag0').fadeIn();
		}, 6500);
		
		setTimeout(function(){
			$('#flag1').fadeIn();
		}, 7000);
		
		setTimeout(function(){
			$('#flag2').fadeIn();
		}, 7500);
		
		setTimeout(function(){
			$('#flag3').fadeIn();
		}, 8000);
		
		setTimeout(function(){
			$('#flag4').fadeIn();
		}, 8500);
		
		setTimeout(function(){
			$('#flag5').fadeIn();
		}, 9000);
		
		setTimeout(function(){
			$('#label2').fadeIn();
		}, 9500);
		
		setTimeout(function(){
			$('#icon1').animate({ top: "-=50"});
			$('#label1').animate({ top: "-=50"});
			$('#label2').animate({ top: "-=50"});
			$('#circle1').animate({ top: "-=50"});
			$('#flag0').animate({ top: "-=50"});
			$('#flag1').animate({ top: "-=50"});
			$('#flag2').animate({ top: "-=50"});
			$('#flag3').animate({ top: "-=50"});
			$('#flag4').animate({ top: "-=50"});
			$('#flag5').animate({ top: "-=50"});
		}, 10500);
		
		setTimeout(function(){
			resetAnim($('#circle2'));
			animScene($('#circle2'), {
				'frameWidth': 225,
				'loops':1,
				'framesCount': 28
			});
		}, 11500);
		
		setTimeout(function(){
			$('#label3').fadeIn();
			$('#label31').fadeIn();
			$('#icon2').fadeIn();
			$('#icon3').fadeIn();
			$('#icon4').fadeIn();
		}, 15500);
		
		setTimeout(function(){
			$('#info-section').fadeIn();
			$('#label31').fadeOut();
		}, 17500);

		
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