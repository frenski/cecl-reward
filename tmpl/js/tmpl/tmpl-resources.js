/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){
	
	var tParams = yLearnTmpl.getTmplParams();
	var actionDone = false;
	
	// To be called after the images are loaded
	var afterLoad = function (){
		
		yLearnTmpl.loadPage();
		
	}
	
	// importing images
	var imgToLoad = [];
	for (var i=0; i<tParams.resources.length; i++) {
		imgToLoad.push(tParams.resources[i].img);
	}

	
	var resTmpl = "{{#resources}}" + $('#tmpl-resources').html()
	 				   + "{{/resources}}";
	var resHtml = Mustache.to_html( resTmpl, tParams );
	var resTextTmpl = "{{#resources}}" + $('#tmpl-resources-text').html()
	 				   + "{{/resources}}";
	var resTextHtml = Mustache.to_html( resTextTmpl, tParams );
	$('.resources-wrapper').append( resHtml );
	$('#admin-hidden').append( resTextHtml );
	
	
	$('.resource-item').mouseenter(function(){
		$(this).fadeTo("fast", 0.8);
	});
	
	$('.resource-item').mouseleave(function(){
		$(this).fadeTo("fast", 1);
	});
	

	// Setting the theme and the background
	if( typeof tParams.backColor != 'undefined'){
		yLearnTmpl.setBgColor( tParams.backColor );
	}
	if( typeof tParams.theme != 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );	
	}
	
	$('.resource-item').each(function(){
		if ($(this).attr('href') == '') {
			$(this).removeAttr( "href" );
		}
	});
	
	// if (!actionDone) {
	// 	actionDone = true;
	// 	setTimeout(function(){
	// 		yLearnTmpl.actionDone();
	// 	}, 30000);
	// }
	
	// loading the page
	// yLearnTmpl.loadImages( imgToLoad, afterLoad, 'png' );
	
	yLearnTmpl.loadPage();
	

});