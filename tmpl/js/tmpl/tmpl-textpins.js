/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){

	var tParams = yLearnTmpl.getTmplParams();
	var secImgExists = tParams.backImage.length > 1 ? true : false;

	const sequencial = (typeof tParams.sequencial !== 'undefined'
											&& tParams.sequencial) ? true:false;
	let arrEls = [];
	let arrElsJQ = [];
	let arrAnims = [];

	// To be called after the images are loaded
	var afterLoad = function (){

		// Setting loaded images
		$('#back-image-main').attr('src', yLearnTmpl.getImageExt(
									  tParams.backImage[0].img, 'png'));

		// Setting dynamic elements from templates
		var pinsTmpl = "{{#pins}}" + $('#tmpl-pins').html() + "{{/pins}}";
		var pinsTmplHtml = Mustache.to_html( pinsTmpl, tParams );
		$('.back-image-wrapper').append( pinsTmplHtml );

		let descItems = {'items':[]};

		for (var i=0; i<tParams.pins.length; i++) {
			const descWidth = (tParams.pins[i].hasOwnProperty ('descWidth') &&
				tParams.pins[i].descWidth !='') ? 'width: ' + tParams.pins[i].descWidth : '';
			console.log()
			descItems.items[i] = {
										'order':tParams.pins[i].order,
										'descTop':tParams.pins[i].descTop,
										'descLeft':tParams.pins[i].descLeft,
										'descWidth': descWidth
									};
		}

		var descTmpl = "{{#items}}" + $('#tmpl-descriptions').html() + "{{/items}}";
		var descTmplHtml = Mustache.to_html( descTmpl, descItems );
		$('#description-wrapper').append( descTmplHtml );

		tParams.pins.forEach(function(pn, idx) {
			const arrEl = document.getElementById('lt-player-arrow' + pn.order);
			const arrElJQ = $("#lt-player-arrow" + pn.order);
			arrEls.push(arrEl);
			arrElsJQ.push(arrElJQ);
			const arrowAnim = lottie.loadAnimation({
				container: arrEl,
				renderer: 'svg',
				loop: true,
				autoplay: false,
				path: 'img/lottie/dot-arrow-click-'+tParams.theme+'.json',
				initialSegment:[0,40]
			});
			arrAnims.push(arrowAnim)
			arrowAnim.play();
		})

		if (sequencial) {
			$('.lt-player-arrow').hide();
			if (arrEls.length > 0) $('#lt-player-arrow0').fadeIn();
		}

		// Adding events to the newly added elements
		$('.lt-player-arrow').click(function(){
			var id = $(this).data('id');
			arrAnims[id].loop = false;
			arrAnims[id].playSegments([41,114], true);
			// $('.description').hide();
			setTimeout(function(){
				$('#description'+id).fadeIn();
				if (sequencial && id < (arrEls.length-1)) $('#lt-player-arrow'+(id+1)).fadeIn();
			},1500);

		});

		// Calling loader callback
		yLearnTmpl.loadPage(function(){

			if ($( window ).width()<= 480) {
				var extraMargin = $('#title-page').height()-40;
				$('#back-image-main').css('margin-top', extraMargin+'px');
				$('.pin').each(function(){
					$(this).css('top', $(this).position().top+(extraMargin-10)+'px');
				});
			}

		});

	}

	// Presets

	if( typeof tParams.backColor !== 'undefined'){
		yLearnTmpl.setBackground( tParams.backColor );
	}

	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
	}

	var imgToLoad = [];
	yLearnTmpl.loadImages( [tParams.backImage[0].img], afterLoad, 'png');

});
