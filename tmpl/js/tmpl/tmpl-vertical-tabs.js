/**
 * Welcome template script
 * @author Yane Frenski / http://yane.fr/
 */


$(document).ready( function(){

	var tParams = yLearnTmpl.getTmplParams();

	yLearnTmpl.setBackground( tParams.backColor );
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
	}

	const itemsTmpl = "{{#tabs}}" + $('#tmpl-slides').html() + "{{/tabs}}";
	const itemsTmplHtml = Mustache.to_html( itemsTmpl, tParams );
	$('#images-wrapper').append( itemsTmplHtml );

	if (tParams.image1 != null) {
		$('#theimage1').attr('src','../files/'+tParams.image1);
	}

	$('#tab-icon0').addClass('tab-icon-selected');
	$('.tab-text').hide();
	$('#tab-text0').show();

	$('.tab-icon').click(function() {
		$('.tab-icon').removeClass('tab-icon-selected');
		$(this).addClass('tab-icon-selected');
		let id = $(this).data('id');
		$('.tab-text').fadeOut();
		$('#tab-text'+id).fadeIn();
	});


	$('#theimage1').load(function() {
		yLearnTmpl.pageResized();
	});

	yLearnTmpl.loadPage();

});
