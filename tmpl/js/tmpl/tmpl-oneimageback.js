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

	if (tParams.image != null) {
		$('#theimage').attr('src','../files/'+tParams.image+'.png');
	}

	if( typeof tParams.url !== 'undefined'){
		$("#theimage").addClass("button-type-element");
		$('#theimage').click(function(){
			var win = window.open(tParams.url, '_blank');
			win.focus();
		})
	}


	$("#pin").click(function(){
		$("#theimage").fadeIn(function(){
			if (tParams.withText) {
				$("#thetext").fadeIn();
				yLearnTmpl.pageResized();
			}
		});
		$(this).removeClass("anim-blink");
		$(this).remove();
		yLearnTmpl.pageResized();
		
	});

	yLearnTmpl.loadPage();

});
