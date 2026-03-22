/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){
	
	var tParams = yLearnTmpl.getTmplParams();
	var topImages = {'images':[]};
	var answerItems = {'answers':[]};
	
	// To be called after the images are loaded
	var afterLoad = function (){
		
		$('.title-image').css('background-image', 
			'url('+topImages.images[0].img+')');
		// Calling loader callback
		yLearnTmpl.loadPage();
		
	}
	
	// importing images
	yLearnTmpl.updateImgsForRetina( tParams.topImages );
	var imgToLoad = [];
	yLearnTmpl.importArrayImages(topImages, tParams.topImages, 'png', imgToLoad);
	
	// Setting dynamic elements from templates
	for(var i=0; i<tParams.answersCount; i++) {
		answerItems.answers[i] = {'id':i, 
								  'correct':0, 
								  'textId':100+i, 
								  'responseTextContenId':200+i,
								  'responseTextTitleId':300+i,
								  'sequenceTextId':400+i };
		if ( typeof tParams.correct != 'Int') {
			answerItems.answers[i].correct = tParams.correct[i];
		}else{
			if (i==tParams.answersCount) {
				answerItems.answers[i].correct = tParams.answersCount;
			}
		}
	}
	
	var answerTmpl = "{{#answers}}" + $('#tmpl-answer').html()
	 				   + "{{/answers}}";
	var answerHtml = Mustache.to_html( answerTmpl, answerItems );
	$('.scenario-answers-wrapper').append( answerHtml );
	
	answersAdminTmpl = "{{#answers}}" + $('#tmpl-answer-admin').html()
	 				   + "{{/answers}}";
	var answerAdminHtml = Mustache.to_html( answersAdminTmpl, answerItems );
	$('#admin-hidden').append( answerAdminHtml );
	
	$('.scenario-answer').mouseenter(function(){
		$(this).fadeTo("fast", 0.5);
	});
	
	$('.scenario-answer').mouseleave(function(){
		$(this).fadeTo("fast", 1);
	});
	
	// Setting the theme and the background
	if( typeof tParams.backColor !== 'undefined'){
		yLearnTmpl.setBgColor( tParams.backColor );	
	}
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );	
	}
	
	// loading the page
	yLearnTmpl.loadImages( imgToLoad, afterLoad, 'png' );
	

});