/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){
	
	var tParams = yLearnTmpl.getTmplParams();
	var loop = 0;
	var loopsCount = 30;
	var framesCount = 6;
	var frameLoop = 0;
	var spriteAnimFrame = 40;
	var frameWidth = 204;
	
	
	// Anim function
	var animScene = function ( el ){
    	frameLoop ++;
    	el.css('background-position','-'+(frameLoop*frameWidth)+'px 0');

    	if ( frameLoop < framesCount-1 ) {
      		animTimeOut = setTimeout(function() {
        		animScene( el );
      		}, spriteAnimFrame);
		}else{
			loop ++;
			if(loop<loopsCount){
				frameLoop = 0;
				el.css('background-position','0 0');
	        	animScene( el );
			}
		}
  	}

	
	// After load
	var afterLoad = function() {
		// Calling loader callback
		yLearnTmpl.loadPage(function(){
			var pr = $('#parrot');
			var prFying = $('#parrot-flying');
			var prIdle = $('#parrot-idle');
			var bubble1 = $('#bubble-dot1');
			var bubble2 = $('#bubble-dot2');
			var note = $("#note");
			var topDeviation = 95 + note.position().top + note.height();

			bubble1.css('top', (topDeviation + 5 ) + 'px');
			bubble2.css('top', (topDeviation + 25 ) + 'px');
			prFying.css('background-image',"url('../files/parrot-left-flyin.png')");
			prIdle.css('background-image',"url('../files/parrot-left-idle.png')");
			prIdle.hide();
			animScene(prFying);
			pr.fadeIn(500).animate('top','0',function(){
				pr.animate({'top':'220px','left':'40%'}, 2000, function(){
					pr.animate({'top':'180px','left':'45%'}, 900, function(){
						pr.animate({'top':(topDeviation+30)+'px','left':'39%'}, 1700, function(){
							prIdle.fadeIn('fast');
							prFying.fadeOut('fast', function(){
								bubble2.fadeIn(function(){
									bubble1.fadeIn(function(){
										$("#pin").addClass('anim-blink');
									});
								});	
							});
						});
					});
				});
			});
		});
	}
	
	yLearnTmpl.loadImages( ['parrot-left-flyin'], afterLoad, 'png' );
	

	// Presets
	
	yLearnTmpl.setBgColor( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );	
	}
	
	// Adding the templates data
	
	$('.pin').click(function(){
		$(this).removeClass('anim-blink');
		$('#note').animate({'opacity':1},500);
	});

	
	yLearnTmpl.loadPage();
	

});