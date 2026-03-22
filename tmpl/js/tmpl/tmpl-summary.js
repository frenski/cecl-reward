/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){
	
	messagesShown = 0;
	var tParams = yLearnTmpl.getTmplParams();
	yLearnTmpl.playInstructionVoice(0);
	
	
	// To be called after the images are loaded
	var afterLoad = function (){
		
		// Setting dynamic elements from templates
		var messagesTmpl = "{{#messages}}" + $('#tmpl-messages').html() + "{{/messages}}";
		var messagesTmplHtml = Mustache.to_html( messagesTmpl, tParams );
		$('#messages-wrapper').append( messagesTmplHtml );
		
		$('#start-pin').click(function(){
			yLearnTmpl.playInstructionVoice(100+messagesShown);
			if (messagesShown == tParams.messages.length-1) {
				$('#message'+messagesShown).children('p').css({'background-color':'#88aa14', 'color':'white'});
				$(this).removeClass('anim-blink');
				$(this).remove();
				yLearnTmpl.playInstructionVoice(1);
				setTimeout(function(){
					yLearnTmpl.actionDone();	
				}, 500);
			}
			$('#message'+messagesShown).fadeIn();
			yLearnTmpl.pageResized();
			window.parent.$.scrollTo( 
				{ top: $('#messages-wrapper').height()+'px' }, 
				500, {'axis':'y'});
			messagesShown ++;
			
		});
		
		// Calling loader callback
		yLearnTmpl.loadPage();
		
	}
	

	// Presets
	
	yLearnTmpl.setBgColor( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );	
	}
	
	afterLoad();

});