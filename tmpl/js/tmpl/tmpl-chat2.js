/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */

 var chatWindow = new Bubbles(
	 document.getElementById("chat"), // ...passing HTML container element...
	 "chatWindow" // ...and name of the function as a parameter
 )


$(document).ready( function(){

	let tParams = yLearnTmpl.getTmplParams();

	if (tParams.hasOwnProperty("fontSize")) {
		$('.popup-specific').css('font-size', tParams.fontSize);
	}

	// Setting the theme and the background
	if( typeof tParams.backColor !== 'undefined'){
		yLearnTmpl.setBackground( tParams.backColor );
	}
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
	}

	if( typeof tParams.reference !== 'undefined'){
		// $('#reference-block').show();
		console.log("DDDDD");
		$('#reference-block-img').attr('src', '../files/'+tParams.reference);
	}

	yLearnTmpl.pageResized();

	// loading the page
	yLearnTmpl.loadPage();

	// conversation object defined separately, but just the same as in the
	// "Basic chat-bubble Example" (1-basics.html)

	if( typeof tParams.convo !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
		var convo = tParams.convo;
		chatWindow.talk(convo, "banana");
	}


});
