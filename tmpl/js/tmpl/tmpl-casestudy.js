/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */

$(document).ready( function(){
	
	var tParams = yLearnTmpl.getTmplParams();
	
	var loop = 0;
	var loopsCount = 100;
	var framesCount = 40;
	var frameLoop = 0;
	var spriteAnimFrame = 40;
	var frameWidth = 200;
	var loopDealy = 2000;
	
	// Anim function - TODO add this as a function to the library
	var animScene = function ( el, animCallback ){
    	frameLoop ++;
    	el.css('background-position','-'+(frameLoop*frameWidth)+'px 0');

    	if ( frameLoop < framesCount-1 ) {
      		animTimeOut = setTimeout(function() {
        		animScene( el, animCallback );
      		}, spriteAnimFrame);
		}else{
			loop ++;
			if(loop<loopsCount){
				frameLoop = 0;
				el.css('background-position','0 0');
				setTimeout(function(){
					animScene( el, animCallback );
				}, loopDealy);
			}else{
				if (typeof animCallback === 'function') {
					animCallback();
				}
			}
		}
  	}
	

	// Presets
	
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );	
	}
	
	yLearnTmpl.loadImages( [tParams.image, 'parrot-casestudy'], function() {
		$('#casestudy-header').css('background-image',"url(../files/"+tParams.image+".png"+")");
		animScene($('#parrot'));
		yLearnTmpl.loadPage();
	}, 'png' );
	
	
	
	
	

});