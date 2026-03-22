/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){
	
	var tParams = yLearnTmpl.getTmplParams();
	var animImages = {'images':[]};
	var animImages180 = {'images':[]};
	
	// To be called after the images are loaded
	var afterLoad = function (){
		
		// Setting dynamic elements from templates
		var animImgTmpl = "{{#images}}" + $('#tmpl-animimages').html()
		 				   + "{{/images}}";
		var animImgHtml = Mustache.to_html( animImgTmpl, animImages );
		$('.anim-images-wrapper').append( animImgHtml );
		animImgHtml = Mustache.to_html( animImgTmpl, animImages180 );
		$('.anim-images-wrapper').append( animImgHtml );
		
		// Calling loader callback
		yLearnTmpl.loadPage();
		
		// Animations and interactions
		$('.welcome-anim-img').hide();
		$('#welcome-anim-img0').fadeIn(1500, function(){
			yLearnTmpl.UIAnimation.sequenceLayerImages(
				'welcome-anim-img', 0, 3, 700, 0, function(){
					$('#description-block0').fadeIn(function(){
						$('#button-rotation-wrapper').fadeIn();	
					});
				});
		});
		yLearnTmpl.UIAnimation.showScaleRotate('#welcome-anim-img0', 720, 0.1, 1500);
		
		var rotSAngle = 180;
		var rotEAngle = 0;
		var blockToHide = 1;
		var blockToShow = 0;
		var buttonBlocked = false;
		
		$('#button-rotation').click(function(){
			$(this).removeClass('anim-blink');
			if(!buttonBlocked){
				buttonBlocked = true;
				// Swaping values
				rotSAngle = [rotEAngle, rotEAngle = rotSAngle][0];
				blockToHide = [blockToShow, blockToShow = blockToHide][0];
				var fallbackImg = (rotEAngle==0) ? 
					tParams.animImgNoCSS3[1].img : tParams.animImgNoCSS3[0].img;
				$('#description-block'+blockToHide).fadeOut(function(){
					yLearnTmpl.UIAnimation.rotate(
						'.anim-images-wrapper', 
						rotSAngle, rotEAngle, 1000,
						yLearnTmpl.getImageExt(fallbackImg, 'png'),
						function(){
							var imgRotCallback = function(){
								$('#description-block'+blockToShow)
									.fadeIn(function(){
										buttonBlocked = false;
									});
							}
							if(rotEAngle==180){
								$('#welcome-anim-img3').fadeOut();
								yLearnTmpl.UIAnimation.sequenceLayerImages(
									'welcome-anim-img', 4, 7, 700, 0, imgRotCallback);
							}else{
								$('#welcome-anim-img7').fadeOut();
								yLearnTmpl.UIAnimation.sequenceLayerImages(
									'welcome-anim-img', 0, 3, 700, 0, imgRotCallback);
							}
					});
				});
			}
		});
		
	}
	
	// Presets
	yLearnTmpl.updateImgsForRetina( tParams.animImages );
	yLearnTmpl.updateImgsForRetina( tParams.animImages180 );
	var imgToLoad0 = [];
	var imgToLoad180 = [];
	yLearnTmpl.importArrayImages(animImages, tParams.animImages, 'png', imgToLoad0);
	yLearnTmpl.importArrayImages(animImages180, tParams.animImages180, 'png', imgToLoad180);
	
	var imgToLoadAll = imgToLoad0.concat(imgToLoad180);
	
	yLearnTmpl.setBgColor( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );	
	}
	
	$('#button-rotation-wrapper').hide();
	$('.description-block').hide();

	yLearnTmpl.loadImages( imgToLoadAll, afterLoad, 'png' );

});