/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){

	let tParams = yLearnTmpl.getTmplParams();

	// Setting the theme and the background
	if( typeof tParams.backColor !== 'undefined'){
		yLearnTmpl.setBackground( tParams.backColor );
	}
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
	}

	yLearnTmpl.pageResized();

	// loading the page
	yLearnTmpl.loadPage();

	// conversation object defined separately, but just the same as in the
	// "Basic chat-bubble Example" (1-basics.html)

  if (typeof tParams.scenarioData !== 'undefined') {
    const game = new GameEngine(tParams.scenarioData);
  }

});
