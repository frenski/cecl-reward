/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */

var mapSet = {
	name : "world_countries",
	defaultArea: {
		attrs : {
			stroke : "#fff",
			"stroke-width" : 0,
			fill : "#4f3f1e",
			cursor: "default"
		},
		attrsHover : {
		  fill: "#5e491e",
		  cursor: "default"
		}
	}
};

$(document).ready( function(){

	var tParams = yLearnTmpl.getTmplParams();
	yLearnTmpl.setBgColor( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
	}

	$("#themap").mapael({
		map : mapSet,
		areas: tParams.areas['areas'],
		plots: tParams.areas['plots']
	});

	// Setting the theme and the background
	if( typeof tParams.backColor !== 'undefined'){
		yLearnTmpl.setBackground( tParams.backColor );
	}
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
	}

	yLearnTmpl.loadPage();


});
