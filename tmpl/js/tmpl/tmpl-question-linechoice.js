/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){
	
	var tParams = yLearnTmpl.getTmplParams();
	var secImgExists = tParams.backImage.length > 1 ? true : false;
	
	// To be called after the images are loaded
	var afterLoad = function (){
		
		// Setting loaded images
		$('#back-image0').attr('src', yLearnTmpl.getImageExt(
									  tParams.backImage[0].img));
		if( secImgExists ){
			$('#back-image1').attr('src', yLearnTmpl.getImageExt(
										  tParams.backImage[1].img));
			$('#back-image1').hide();
		}
		
		// Setting dynamic elements from templates
		yLearnTmpl.updateImgsForRetina( tParams.answers );
		var slImgsTmpl = "{{#answers}}" + $('#tmpl-valueimg').html() + "{{/answers}}";
		var slImgsHtml = Mustache.to_html( slImgsTmpl, tParams );
		$('#slider-graphic').append( slImgsHtml );
		for (var i=0; i<tParams.answers.length; i++) {
			tParams.answers[i].con_text1 = tParams.answers[i].order*3 + 2;
			tParams.answers[i].con_text2 = tParams.answers[i].order*3 + 3;
			tParams.answers[i].con_text3 = tParams.answers[i].order*3 + 4;
			tParams.answers[i].tooltip_toppos = 
				100 - 120*(tParams.answers[i].order+1)/tParams.answers.length;
		}
		var responsesTmpl = "{{#answers}}" + $('#tmpl-responses').html() + "{{/answers}}";
		var responsesHtml = Mustache.to_html( responsesTmpl, tParams );
		$('.response-wrapper').append( responsesHtml );
		var tooltipsTmpl = "{{#answers}}" + $('#tmpl-tooltips').html() + "{{/answers}}";
		var tooltipsHtml = Mustache.to_html( tooltipsTmpl, tParams );
		$('.slider-tooltips').append( tooltipsHtml );
		
		$('.answ-pop-tooltip').hide();
		$('#answ-pop-tooltip0').show();
		$('.slider-graphic-img').hide();
		$('#slider-graphic-img0').show();
		
		// Calling loader callback
		yLearnTmpl.loadPage();
		
	}
	
	var slideEvent = function(value){
		if( secImgExists ){
			$('#back-image1').fadeTo( 1, 1/(tParams.answers.length-1) * value );
		}
		var decVal = Math.round(value);
		if( decVal != curImgVal ){
			$('#slider-graphic-img'+curImgVal).hide();
			$('#slider-graphic-img'+decVal).show();
			$('#answ-pop-tooltip'+curImgVal).fadeOut(200);
			$('#answ-pop-tooltip'+decVal).fadeIn(200);
			curImgVal = decVal;
		}
	}
	
	// Presets
	var imgToLoad = [tParams.backImage[0].img];
	if( secImgExists ) imgToLoad.push( tParams.backImage[1].img );
	yLearnTmpl.setBgColor( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );	
	}
	$(".response-wrapper").hide();
	yLearnTmpl.loadImages( imgToLoad, afterLoad );
	
	// Slider
	var curImgVal = 0;
	$("#slider-control").noUiSlider({
		start: 0,
		orientation: "vertical",
		direction: "rtl",
		range: {
			'min': 0,
			'max': tParams.answers.length -1
		}
	});
	
	$("#slider-control").on({
		slide: function(){
			slideEvent( $(this).val() );
		}
	});
	
	// Submit answer button
	$('#submit-answer').click(function(){
		$('.response-wrapper').fadeIn(function(){
			yLearnTmpl.pageResized();
			var scrollToY = Math.round(
				$('#question-response'+curImgVal).position().top + 60);
			window.parent.$.scrollTo( { top: scrollToY+'px' }, 1000, 
				{'axis':'y',
				 onAfter: function(){
					yLearnTmpl.actionDone();
				}
				});
		});
	});

});