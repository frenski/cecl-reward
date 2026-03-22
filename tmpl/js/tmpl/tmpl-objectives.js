/**
 * Welcome template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){

	var tParams = yLearnTmpl.getTmplParams();

	if (typeof tParams.withIntroVoice !== 'undefined' &&
		tParams.withIntroVoice ) {
		yLearnTmpl.playInstructionVoice(0);
	}

	yLearnTmpl.setBgColor( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
	}

	let itms = {'messages':[]};
	for (var i=0; i<tParams.messages.length; i++) {
		itms.messages.push (
			{'order':tParams.messages[i].order,
			 'delay': 3 + parseInt(tParams.messages[i].order)}
		);
	}

	console.log(itms.messages, tParams.messages)

	var itemsTmpl = "{{#messages}}" + $('#tmpl-messages').html() + "{{/messages}}";
	var itemsTmplHtml = Mustache.to_html( itemsTmpl, itms );
	$('.text-items-wrapper').append( itemsTmplHtml );

	// $("#pin").click(function(){
	// 	if (typeof tParams.excludeImageVoice !== 'undefined'
	// 		&& tParams.excludeImageVoice) {
	// 	} else {
	// 		yLearnTmpl.playInstructionVoice(2);
	// 	}
	//
	// 	$("#theimage").fadeIn(function(){
	// 		if (tParams.withText) {
	// 			$("#thetext").fadeIn();
	// 			yLearnTmpl.pageResized();
	// 		}
	// 	});
	// 	$(this).removeClass("anim-blink");
	// 	$(this).remove();
	// 	yLearnTmpl.pageResized();
	// });

	yLearnTmpl.loadPage();

});
