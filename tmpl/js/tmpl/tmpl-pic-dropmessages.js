/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){
	
	var currentMessage = -1;
	var tParams = yLearnTmpl.getTmplParams();
	
	yLearnTmpl.playInstructionVoice(2);
	
	var nextMessageAppear = function() {
		currentMessage ++;
		$('#message'+currentMessage).show( "drop", {direction: tParams.appearPosition} );
		yLearnTmpl.playInstructionVoice(100+currentMessage);
		// $('#dummy-target').css({
		// 	'top': (tParams.disappearTargetPosition.top + 
		// 			tParams.disappearTargetStep.top * currentMessage) + '%',
		// 	'left': (tParams.disappearTargetPosition.left + 
		// 			tParams.disappearTargetStep.left * currentMessage) + '%'
		// });
	}
	
	var currentMessageDisappear = function() {
		$('#dummy-target'+currentMessage).tooltip({
			content: $("#content_text10"+currentMessage).text()
		});
		$('#message'+currentMessage).effect( 
			"transfer", 
			{ to: $('#dummy-target'+currentMessage), className:"border-dotted" },
			750, 
			function(){
				$('#back-image-main').attr('src', yLearnTmpl.getImageExt(
											  tParams.backImage[currentMessage+1].img, "png"));
				if (currentMessage < tParams.messages.length - 1) {
					nextMessageAppear();
				} else {
					yLearnTmpl.actionDone();
				}
			
		}).dequeue().hide('drop', {direction: "down"}, 300, function(){
			$(this).remove();
		});
	}
	
	// To be called after the images are loaded
	var afterLoad = function (){
		
		// Setting loaded images
		$('#back-image-main').attr('src', yLearnTmpl.getImageExt(
									  tParams.backImage[0].img,"png"));
		
		// Setting dynamic elements from templates
		var messagesTmpl = "{{#messages}}" + $('#tmpl-messages').html() + "{{/messages}}";
		var messagesTmplHtml = Mustache.to_html( messagesTmpl, tParams );
		$('.back-image-wrapper').append( messagesTmplHtml );
		
		// Setting up the button type
		switch(tParams.buttonType) {
			case "question":
				var bType = "?";
			break;
			case "important":
				var bType = "!";
			break;
			default:
				var bType = "?";
			break;
		}
		$('.pin').text(bType);
		
		// Adding events to the newly added elements
		$('.pin').click(function(){
			currentMessageDisappear();
		});
		
		
		$('#start-pin').click(function(){
			$(this).removeClass('anim-blink');
			$(this).fadeOut(function(){
				nextMessageAppear();
			})
			
		})
		
		// Calling loader callback
		yLearnTmpl.loadPage(function(){
			
			if ($( window ).width()<= 480) {
				var extraMargin = $('#title-page').height()-40;
				$('#back-image-main').css('margin-top', extraMargin+'px');
				$('.dummy-target').each(function(){
					$(this).css('top', $(this).position().top+(extraMargin-60)+'px');
				});
				$('.message').css('font-size', '0.8em');
			}
			
		});
		
	}
	
	for (var i=0; i<tParams.messages.length; i++) {
		
		$('.back-image-wrapper').append('<div id="dummy-target'+i+'" class="dummy-target absolute"></div>');
		
		$('#dummy-target'+i).css(
			{'width' : tParams.disappearTargetSize.width+'%', 
			 'height': tParams.disappearTargetSize.height+'%',
			 'top'  : (tParams.disappearTargetPosition.top + 
						tParams.disappearTargetStep.top * i) + '%',
			 'left' : (tParams.disappearTargetPosition.left + 
						tParams.disappearTargetStep.left * i) + '%',
			 'cursor': 'help'
			});
		$('#dummy-target'+i).attr('title',"");
	}

	// Presets
	
	yLearnTmpl.setBgColor( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );	
	}
	
	var imgToLoad = [];
	for (var i = 0; i < tParams.backImage.length; i++) {
		imgToLoad.push(tParams.backImage[i].img);
	}
	yLearnTmpl.loadImages( imgToLoad, afterLoad, "png");

});