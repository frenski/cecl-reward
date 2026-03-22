/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){
	
	var tParams = yLearnTmpl.getTmplParams();
	var firstClick = true;
	var clicked = [];
	var selected = -1;
	var fadeVal = 0.5;
	var textShapeType = ( typeof(tParams.textShapeType)!=='undefined' ) ? tParams.textShapeType : 'circle';
	if (textShapeType=='circle') {
		var txtWrapper = $('#text-wrapper-circ');
	} else {
		var txtWrapper = $('#text-wrapper-sq');
	}
	
	var txtEnd = $('#text-end');
	$('.text-wrapper').hide();
	txtEnd.hide();
	
	var wrapperWidth = 480;
	var wrapperRadius = 150
	
	
	// To be called after the images are loaded
	var afterLoad = function (){
		
		if ($( window ).width() <= 480) {
			wrapperWidth = $( window ).width();
			wrapperRadius = $( window ).width() * 0.38;
			$('#images-wrapper').css('width',$( window ).width()+'px');
		}
		
		yLearnTmpl.playInstructionVoice(1);
		
		// Setting dynamic elements from templates
		
		var zoomsTmpl = "{{#images}}" + $('#tmpl-images').html() + "{{/images}}";
		var zoomsTmplHtml = Mustache.to_html( zoomsTmpl, tParams );
		$('#images-wrapper').append( zoomsTmplHtml );
		
		var descTmpl = "{{#images}}" + $('#tmpl-descriptions').html() + "{{/images}}";
		var descTmplHtml = Mustache.to_html( descTmpl, tParams );
		$('#admin-hidden').append( descTmplHtml );
		
		$(".icon").height(tParams.iconSize)
				  .width(tParams.iconSize)
		
		
		arrangeCircle('icon', 'arrange-circle-wrapper', wrapperWidth, wrapperRadius, tParams.startAngle);
		setTimeout(function(){
			$(".icon").fadeTo("slow", fadeVal);
		}, 1000);
		
		$(".icon").mouseover(function(){
			$(this).fadeTo("fast", 1);
		});
		$(".icon").mouseout(function(){
			if(!$(this).hasClass("icon-selected")) {
				$(this).fadeTo("fast", fadeVal);
			}
		});
		$(".icon").click(function(){
			var id = $(this).data("icon-id");
			$("#icon"+selected).fadeTo("fast", fadeVal);
			selected = id;
			$(".icon").removeClass('icon-selected');
			$(this).addClass('icon-selected');
			var showText = function() {
				firstClick = false;
				txtWrapper.children('span').html($('#content_text20'+id).html());
				txtWrapper.fadeIn();
			}
			if (firstClick) {
				showText();
			} else {
				txtWrapper.fadeOut(function(){
					$(this).fadeTo("fast",1);
					showText();
				})
			}
			
			if (clicked.indexOf(id) === -1) {
				clicked.push(id);
			}
			
			yLearnTmpl.playInstructionVoice(200+id);
			
			if (clicked.length == tParams.images.length) {
				var lastId = clicked[clicked.length-1];
				var lDelay = 1000;
				if (typeof tParams.images[lastId].voiceLength !== 'undefiend') {
					lDelay = tParams.images[lastId].voiceLength * 1000;
				}
				setTimeout(function(){
					if (typeof tParams.desplayEndTextVoice !=='undefined' 
							&& tParams.desplayEndTextVoice) {
						yLearnTmpl.playInstructionVoice(2);
					}
					txtEnd.fadeIn();
				}, lDelay);
			}
			
		});
		
		// Calling loader callback
		yLearnTmpl.loadPage();
		
	}

	// Presets
	
	if( typeof tParams.backColor !== 'undefined'){
		yLearnTmpl.setBgColor( tParams.backColor );
	}
	
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );	
	}
	
	var imgToLoad = [];
	for (var i=0; i<tParams.images.length; i++){
		imgToLoad.push( tParams.images[i].img );
	}
	yLearnTmpl.loadImages( imgToLoad, afterLoad, 'png' );

});