/**
 * Welcome template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){
	
	var tParams = yLearnTmpl.getTmplParams();
	yLearnTmpl.setBgColor( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );	
	}
	if (tParams.author_pic != null) {
		$('.avatar').css('background-image','url(../files/'+tParams.author_pic+')');
	} else {
		$('.avatar').remove();
	}
	
	for (var i=0; i<tParams.data.length; i++) {
		var dataEl = tParams.data[i];
		$("#admin-hidden").append('<div><span id="content_text'+dataEl.label+'" class="edit-text"></span></div>');
	}
	
	yLearnTmpl.loadPage(function(){
		for (var i=0; i<tParams.data.length; i++) {
			tParams.data[i].label = $("#content_text"+tParams.data[i].label).text();
		}
		Morris.Donut({
	  		element: 'thechart',
	  		data: tParams.data,
			colors:tParams.colors
		});
	});

});