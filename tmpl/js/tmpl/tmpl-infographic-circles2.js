/**
 * Welcome template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){
	
	var tParams = yLearnTmpl.getTmplParams();
	yLearnTmpl.setBgColor( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );	
	}
	// if (tParams.author_pic != null) {
	// 	$('.avatar').css('background-image','url(../files/'+tParams.author_pic+')');
	// } else {
	// 	$('.avatar').remove();
	// }
	
	// Setting dynamic elements from templates
	var sliderTitlesTmpl = "{{#infData}}" + $('#tmpl-slider-titles').html() + "{{/infData}}";
	var sliderTitlesTmplHtml = Mustache.to_html( sliderTitlesTmpl, tParams );
	$('#slider-titles').append( sliderTitlesTmplHtml );
	
	var slidersTmpl = "{{#infData}}" + $('#tmpl-sliders').html() + "{{/infData}}";
	var slidersTmplHtml = Mustache.to_html( slidersTmpl, tParams );
	$('#sliders').append( slidersTmplHtml );
	
	var infographicsTmpl = "{{#infItems}}" + $('#tmpl-infographics').html() + "{{/infItems}}";
	var infographicsTmplHtml = Mustache.to_html( infographicsTmpl, tParams );
	$('#infographics').append( infographicsTmplHtml );

	var adminTitlesTmpl = "{{#infData}}" + $('#tmpl-admin-titles').html() + "{{/infData}}";
	var adminTitlesTmplHtml = Mustache.to_html( adminTitlesTmpl, tParams );
	$('#admin-hidden').append( adminTitlesTmplHtml );
	
	// Setting up the canvases
	var canvWidth = 125;
	var canvHeight = 125;
	
	var canvases = [];
	var canvasCircs = []
	
	var arcFunc = function ( xloc, yloc, value, total, R ) {
	    var alpha = 360 / total * value,
	        a = (90 - alpha) * Math.PI / 180,
	        x = xloc + R * Math.cos(a),
	        y = yloc - R * Math.sin(a),
	        path;
	    if (total == value) {
	        path = [
	            ["M", xloc, yloc - R],
	            ["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
	        ];
	    } else {
	        path = [
	            ["M", xloc, yloc - R],
	            ["A", R, R, 0, +(alpha > 180), 1, x, y]
	        ];
	    }
	    return {
	        path: path
	    };
	};
	
	
	var leftIndicatorAttr = {
		'circStroke': 4,
		'circRadius': 60,
		'circX': 62.5,
		'circY': 62.5,
		'circColor': '#d2e7e3',
		'backCircAlpha': 0.2,
		'frontCircAlpha': 1
	}
	
	for (var i=0; i<tParams.infItems.length; i++) {
		var el = document.getElementById('infg-canvas' + i);
		canvases[i] = new Raphael( el, canvWidth, canvHeight );
		var canv = canvases[i];
		
		// from Rahael - arc generation
		canv.customAttributes.arc = arcFunc;

		// adds the bottom circle
		canv.path().attr({
		    'stroke': leftIndicatorAttr.circColor,
		    'stroke-width': leftIndicatorAttr.circStroke,
			'opacity': leftIndicatorAttr.backCircAlpha,
		    arc: [leftIndicatorAttr.circX,
				  leftIndicatorAttr.circY, 
				  100, 
				  100,
				  leftIndicatorAttr.circRadius]
		});

		// make the top circle/arc
		canvasCircs[i] = canv.path().attr({
		    'stroke': leftIndicatorAttr.circColor,
		    'stroke-width': leftIndicatorAttr.circStroke,
			'opacity': leftIndicatorAttr.frontCircAlpha,
		    arc: [leftIndicatorAttr.circX,
				  leftIndicatorAttr.circY, 
				  0, 
				  100,
				  leftIndicatorAttr.circRadius]
		});
	}
	
	
	var selected = -1;
	
	var changeData = function (id) {
		$('#indicator-dot').animate({'left':tParams.infData[id].dotPos + '%'});
		for (var i=0; i<tParams.infData[id].data.length; i++) {
			canvasCircs[i].animate({
		    	arc: [leftIndicatorAttr.circX, 
					  leftIndicatorAttr.circY,
					  tParams.infData[id].data[i],
					  100, 
					  leftIndicatorAttr.circRadius]
			}, 1000, "bounce");
			$("#infg-label"+i).text(tParams.infData[id].data[i] + "%");
			$('#selected-title').html($('#content_text30'+id).html());
			$('#selected-source').html($('#content_text40'+id).html());
		}
	}
	
	$('.slider-button').click(function(){
		
		var id = parseInt($(this).data("button-id"));
		$(this).removeClass('anim-blink');
		if (id!=selected) {
			changeData (id);
			selected = id;
		}
		
	});
	
	
	yLearnTmpl.loadPage(function(){
		changeData(0);
	});

});