/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){
	
	var tParams = yLearnTmpl.getTmplParams();
	yLearnTmpl.setBgColor( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );	
	}
	
	var infogramTmpl = '<script id="{{IG_ID}}" title="" src="//e.infogr.am/js/dist/embed.js?Zlk" type="text/javascript"></script></div>';
	
	var infogramHtml = infogramTmpl.replace("{{IG_ID}}",tParams.infogramId);
	
	$('#infogram-container').append(infogramHtml);
	
	yLearnTmpl.loadPage();
	
	

});