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

	let aggDelayTotal = 0;

	let itms = {'messages':[]};
	for (var i=0; i<tParams.textBlocks.length; i++) {
		aggDelayTotal += tParams.textBlocks[i].appearDelay;
		itms.messages.push (
			{"id":i,
			 "backColor": tParams.textBlocks[i].backColor,
		 	 "appearDelay":  tParams.textBlocks[i].appearDelay
			});
	}

	var itemsTmpl = "{{#messages}}" + $('#tmpl-texts').html() + "{{/messages}}";
	var itemsTmplHtml = Mustache.to_html( itemsTmpl, itms );
	$('.text-items-wrapper').append( itemsTmplHtml );

	let appearTexts = function() {

		let aggDelay = 0;

		for (let i=0; i<tParams.textBlocks.length; i++) {
			aggDelay += itms.messages[i].appearDelay;
			setTimeout(function () {
				$('#text-block'+i).addClass('text-block-appear');
			}, aggDelay*1000);
		}
	}

	if (tParams.image != null) {
		$('#theimage').attr('src','../files/'+tParams.image);
		$('#theimage').load(function(){
			$('#theimage').addClass('image-scale');
			$('#theimage').css('transition', 'all '+ (aggDelayTotal+3)+'s linear');
			yLearnTmpl.pageResized();
			appearTexts();
		})
	}




	yLearnTmpl.loadPage();

});
