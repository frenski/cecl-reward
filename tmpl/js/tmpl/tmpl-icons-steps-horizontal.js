/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){

	var tParams = yLearnTmpl.getTmplParams();

	// To be called after the images are loaded
	var afterLoad = function (){

		// Setting dynamic elements from templates
		let clickedId = 0;
		let clickedItems = [0];
		const animDelay = 2000;

		for (var i=0; i< tParams.allIcons.length; i++) {
			if (i < tParams.allIcons.length-1) {
				tParams.allIcons[i].last = "";
				tParams.allIcons[i].lastClass = "";
			} else {
				tParams.allIcons[i].last = "hidden";
				tParams.allIcons[i].lastClass = "bulletandarrow-last";
			}
		}

		var bulletsTmpl =
			"{{#allIcons}}" + $('#tmpl-bullets').html() + "{{/allIcons}}";
		var bulletsTmplHtml = Mustache.to_html( bulletsTmpl, tParams );
		$('#bullets-wrapper').append( bulletsTmplHtml );

		var descTmpl =
			"{{#allIcons}}" + $('#tmpl-descriptions').html() + "{{/allIcons}}";
		var descTmplHtml = Mustache.to_html( descTmpl, tParams );
		$('#description-wrapper').append( descTmplHtml );

		$('#bullet0').addClass('button-enlarge');
		$('#description0').fadeIn();

		const unitSize = 460/( tParams.allIcons.length*2 - 1);
		$('.bulletandarrow').width(unitSize*2);
		$('.bulletandarrow-last').width(unitSize);

		setTimeout(function(){
			$('#bullet1').addClass('anim-pulsate');
		}, animDelay*2);

		// Adding events to the newly added elements
		$('.bullet').click(function() {
			const id = $(this).data('bullet-id');
			clickedId = id;
			if (clickedItems.indexOf(id) === -1) clickedItems.push(id);
			$('.description').fadeOut();
			$('#description'+id).fadeIn();
			$('.bullet').removeClass('button-enlarge');
			$(this).removeClass('anim-pulsate');
			$(this).addClass('button-enlarge');
			setTimeout(function(){
				const nextId = clickedId + 1;
				if (nextId != clickedId  && nextId < tParams.allIcons.length && clickedItems.indexOf(nextId) === -1) {
					$('#bullet' + nextId).addClass('anim-pulsate');
				}
			}, animDelay);
		});

		// Calling loader callback
		yLearnTmpl.loadPage();

	}

	// Presets
	yLearnTmpl.setBackground( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
	}

	afterLoad();

});
