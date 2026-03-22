/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){
	
	
	var tParams = yLearnTmpl.getTmplParams();
	
	// To be called after the images are loaded
	var afterLoad = function (){
		
		// Setting loaded images
		$('#back-image0').attr('src', yLearnTmpl.getImageExt(
									  tParams.animImages[5].img, 'png'));
		
		// Calling loader callback
		yLearnTmpl.playInstructionVoice(200);
		
		yLearnTmpl.loadPage();
		
	}
	
	// Presets
	var imgToLoad = [];
	for (var i=0; i<tParams.animImages.length; i++) {
		imgToLoad.push( tParams.animImages[i].img );
	}

	yLearnTmpl.setBgColor( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );	
	}
	$(".description").hide();
	yLearnTmpl.loadImages( imgToLoad, afterLoad, 'png' );
	
	// Slider
	var slider = document.getElementById('slider-control');
	var curDesc = -1;
	var slideEvent = function(value){
		if(curDesc > -1) {
			$('#description'+curDesc).fadeOut(100);
		}
		switch(value) {
			case 1:
				curDesc = 0;
				break;
			case (Math.ceil(tParams.animImages.length/2)+1):
				curDesc = 1;
				break;
			case tParams.animImages.length:
				curDesc = 2;
				break;
			default:
				curDesc = -1;
				break;
		}
		if(curDesc > -1) {
			$('#description'+curDesc).fadeIn(function(){
				yLearnTmpl.pageResized();
				setTimeout(function(){
					window.parent.$.scrollTo( 
						{ top: $('#back-image0').height()+'px' }, 
						300, {'axis':'y'});
				},200);
			});
		}
		$('#back-image0').attr('src', yLearnTmpl.getImageExt(
									  tParams.animImages[value-1].img, 'png'));
	}
	
	noUiSlider.create(slider, {
		start: 1,
		step:1,
		orientation: "horizontal",
		direction: "ltr",
		range: {
			'min': 1,
			'max': tParams.animImages.length
		}
	});
	
	slider.noUiSlider.on('update', function ( value, handle ) {
		slideEvent( parseInt(value[0]) );
	});
	
	$('#tip-left').click(function(){
		$(this).removeClass('anim-blink');
		slider.noUiSlider.set(1);
		yLearnTmpl.playInstructionVoice(200);
	});
	
	$('#tip-right').click(function(){
		$(this).removeClass('anim-blink');
		slider.noUiSlider.set(tParams.animImages.length);
		yLearnTmpl.playInstructionVoice(202);
	});
	
	$('#tip-mid').click(function(){
		$(this).removeClass('anim-blink');
		slider.noUiSlider.set((Math.ceil(tParams.animImages.length/2)+1));
		yLearnTmpl.playInstructionVoice(201);
	});

});