/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){

	let tParams = yLearnTmpl.getTmplParams();
	let itList = {'items':[]};
	let curItem = 0;
	const itmCount = tParams.icons.length;

	// Setting dynamic elements from templates
	for (var i=0; i<tParams.icons.length; i++) {
		const visibleNum = (tParams.icons[i].hasOwnProperty ('withNumber')
			&& !tParams.icons[i].withNumber) ? 'hidden': 'visible';
		itList.items[i] = {'id':i,
								  'image':tParams.icons[i].image,
								  'textId':100+i,
									'visibleNum': visibleNum};
	}

	var itemsTmpl = "{{#items}}" + $('#tmpl-items').html()
	 				   + "{{/items}}";
	var itemsHtml = Mustache.to_html( itemsTmpl, itList );
	$('#items-list').append( itemsHtml );

	var descTmpl =
		"{{#items}}" + $('#tmpl-descriptions').html() + "{{/items}}";
	var descTmplHtml = Mustache.to_html( descTmpl, itList );
	$('#description-wrapper').append( descTmplHtml );


	var sliderEl = document.getElementById('items-list');

	var slider = new Bee3D(sliderEl, {
  	effect: 'arc',
		listeners: {
			keys: true
		},
		navigation: {
			enabled: true
		},
		onChange: function(itm){
			const id = itm.index;
			$('#description'+curItem).fadeOut('fast', function(){
				$('#description'+id).fadeIn();
				curItem = id;
				if (curItem == 0) {
					$('.bee3D--nav__prev').hide();
				} else {
					$('.bee3D--nav__prev').show();
				}
				if (curItem == itmCount-1) {
					$('.bee3D--nav__next').hide();
				} else {
					$('.bee3D--nav__next').show();
				}
			});
		}
	});

	$('.bee3D--nav__prev').hide();

	// Setting the theme and the background
	if( typeof tParams.backColor !== 'undefined'){
		yLearnTmpl.setBackground( tParams.backColor );
	}
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
	}

	$('#description0').fadeIn();

	// loading the page
	yLearnTmpl.loadPage();


});
