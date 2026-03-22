/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){
	
	var tParams = yLearnTmpl.getTmplParams();
	var secImgExists = tParams.backImage.length > 1 ? true : false;
	
	var loop = 0;
	var frameLoop = 0;
	var spriteAnimFrame = 70;
	var animTimeOut = null;
	
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
		
		// Setting loaded images
		$('#back-image-main').attr('src', yLearnTmpl.getImageExt(
									  tParams.backImage[0].img, 'png'));
		
		// Setting dynamic elements from templates
		var pinsTmpl = "{{#pins}}" + $('#tmpl-pins').html() + "{{/pins}}";
		var pinsTmplHtml = Mustache.to_html( pinsTmpl, tParams );
		$('.back-image-wrapper').append( pinsTmplHtml );
		
		var zoomsTmpl = "{{#pins}}" + $('#tmpl-zooms').html() + "{{/pins}}";
		var zoomsTmplHtml = Mustache.to_html( zoomsTmpl, tParams );
		$('#anim-wrapper').append( zoomsTmplHtml );
		
		var descTmpl = "{{#pins}}" + $('#tmpl-descriptions').html() + "{{/pins}}";
		var descTmplHtml = Mustache.to_html( descTmpl, tParams );
		$('#description-wrapper').append( descTmplHtml );
		
		// Adding events to the newly added elements
		$('.pin').click(function(){
			$('.pic-zoom').hide();
			$('.description').hide();
			var id = $(this).data('pin-id');
			yLearnTmpl.playInstructionVoice(200+id);
			$('#description'+id).fadeIn(function(){
				window.parent.$.scrollTo( 
					{ top: $('#back-image-main').height()+'px' }, 
					500, {'axis':'y'});
			});
			$('#pic-zoom'+id).fadeIn(function(){
				resetAnim($(this));
				animScene($(this), tParams.pins[id]);
			});
			$(this).removeClass('anim-blink');
		});
		
		// Calling loader callback
		yLearnTmpl.loadPage();
		
	}

	// Presets
	
	yLearnTmpl.setBgColor( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );	
	}
	
	var imgToLoad = [];
	yLearnTmpl.loadImages( [tParams.backImage[0].img], function(){
		for (var i=0; i<tParams.pins.length; i++){
			imgToLoad.push( tParams.pins[i].img );
		}
		yLearnTmpl.loadImages( imgToLoad, afterLoad, 'png' );
	}, 'png');

});