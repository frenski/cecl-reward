/**
 * Welcome template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){
	
	var tParams = yLearnTmpl.getTmplParams();
	
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );	
	}
	
	// Setting dynamic elements from templates
	var orgTmpl = "{{#organisations}}" + $('#tmpl-organisations').html()
	 				   + "{{/organisations}}";
	var orgHtml = Mustache.to_html( orgTmpl, tParams );
	$('#organisations-wrapper').append( orgHtml );
	
	var orgAdminTmpl = "{{#organisations}}" + $('#tmpl-admin-org').html()
	 				   + "{{/organisations}}";
	var orgAdminHtml = Mustache.to_html( orgAdminTmpl, tParams );
	$('#admin-hidden').append( orgAdminHtml );
	
	// $('.learn-more-click').click(function(){
	// 	var id = $(this).data('learnmore-id');
	// 	$('#learn-more'+id).slideToggle();
	// });
	
	yLearnTmpl.loadPage(function(){
		var txt = $('#content_text1').text()
		setTimeout(function(){
			yLearnTmpl.actionDone(txt);
		}, 2000);
	});

});