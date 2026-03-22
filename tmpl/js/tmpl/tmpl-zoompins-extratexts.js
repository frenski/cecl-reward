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
	var timeBetweenTexts = 5000;
	var timeBetweenTextsClick = 2000;
	
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
									  tParams.backImage[0].img));
		
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
		
		var extextTmpl = "{{#extratexts}}" + $('#tmpl-extratexts').html() + "{{/extratexts}}";
		var extextTmplHtml = Mustache.to_html( extextTmpl, tParams );
		$('.back-image-wrapper').append( extextTmplHtml );
		$('.extratext').hide();
		
		// Adding events to the newly added elements
		$('.pin').click(function(){
			$('.pic-zoom').hide();
			$('.description').hide();
			var id = $(this).data('pin-id');
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
		
		for (var i=0; i<tParams.extratexts.length; i++) {
			$("#admin-hidden").append('<div><span id="content_text30'+i+'" class="edit-text"></span></div>');
		}
		
		// Calling loader callback
		yLearnTmpl.loadPage(function(){
			
			curTextId = 0;
			
			if (tParams.extratextClick) {
				
				var nextTextPin = function (){
					$('#extratextpin' + curTextId).removeClass('anim-blink');
					$('#extratextpin' + curTextId).fadeOut(function(){
						$('#extratextpin' + curTextId).removeClass('anim-blink');
					});
					$('#extratext' + curTextId).fadeIn();
					$('#extratext' + (curTextId-1)).fadeOut();
					curTextId ++;
					setTimeout(function(){
						if (curTextId < tParams.extratexts.length) {
							$('#extratextpin' + curTextId).fadeIn();
							$('#extratextpin' + curTextId).addClass('anim-blink');
						} else {
							$('.pin').fadeIn();
							$('.pin').addClass('anim-blink');
							$('.pin').click(function(){
								$('#extratext' + (curTextId-1)).fadeOut();
							})
						}
					}, timeBetweenTextsClick);
				}
				
				$('.extratextpin').each(function(){
					var id = $(this).data('extratextpin-id');
					var lefPos = $('#extratext'+id).width()/2-$(this).width()/2+$(this).position().left;
					$(this).css({'left':lefPos+"px"});
				});
				$('.extratextpin').hide();
				$('.pin').hide();
				$('.extratextpin').click(function(){
					nextTextPin();
				})
				$('#extratextpin0').fadeIn().addClass('anim-blink');
			} else {
				$('.pin').addClass('anim-blink');
				$('#extratext0').fadeIn();
				setInterval(function(){
					$('#extratext'+curTextId).fadeOut(function(){
						curTextId ++;
						if(curTextId == tParams.extratexts.length) curTextId = 0;
						$('#extratext'+curTextId).fadeIn();
					});
				},timeBetweenTexts);
			}
			
		});
		
		
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
	});

});