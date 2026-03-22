/**
 * Line choice template script
 * @author Yane Frenski / http://yane.fr/
 */


 (function($) {
   $.fn.quizyDragDropOrd = function(options) {

     var opts = $.extend({}, $.fn.quizyDragDropOrd.defaults, options);

     var anItemsOrderArr = opts.anItemsCorrect.split(opts.separator);
     var anItemsArr = opts.anItems.split(opts.separator);
     var anNum = anItemsArr.length;
     var phNum = anItemsOrderArr.length;
     var anCount = 0;
 		 var soundEnabled  = opts.addSoundFx;
		 let answerIconResponses = [];
		 let resultAns = [];

     var el1 = $('#'+opts.elementPhId);
     var el2 = $('#'+opts.elementAnId);

     for(var i=0; i<phNum; i++){
       var phSpanHtml = '<span class="edit-text" id="content_text3"></span>';
       if(i>0) phSpanHtml = '<span class="content_text3" id="content_text3"></span>';
       var dividerAppend = '<div class="height10 width10 line-dot-v centered"></div><div class="arrow-dot-v arrow-dot-down centered "></div>';
       if (i==phNum-1) dividerAppend='';
       el1.append('<div id="'+opts.phId +i+ '" class="droppable-element ph-droptarget centered">'+phSpanHtml+'</div><div class="'+opts.phId+'-hint right"><span class="content_text' + (opts.dynTextStart+anItemsOrderArr.indexOf(i.toString()))+'">'+anItemsArr[anItemsOrderArr.indexOf(i.toString())]+'</span></div>'+dividerAppend);
     }

     var elToAppend = el2;
     for(var i=0; i<anNum; i++){
       var colId = (i%2 == 0) ? 1 : 2;
       elToAppend.append('<div id="'+opts.answerId+i+'" class="button-box width80per button-box-fixed46 centered solid-darkgray round-corners-standard draggable-element ph-dropelement element-gradien-dark active-element-hover-shadow active-element-hover-scale relaive"><div id="lt-answer-response'+i+'" class="animicon-response-inline absolute"></div><span class="edit-text" id="content_text'+(opts.dynTextStart+i)+'">'+anItemsArr[i]+'</span></div><div class="height10">&nbsp;</div>');
       $('#'+opts.answerId+i).append('<div id="'+opts.checkId+i+'" class="badge-yn badge-no '+opts.checkId+'"></div>');
			 const playerRes = document.getElementById('lt-answer-response'+i);
			 answerIconResponses.push(playerRes);
     }

     $('.draggable-element').draggable( {
       cursor: 'move',
       containment: 'document',
       stop: handleDragStop,
       revert: true
     });

     $('.droppable-element').droppable( {
       drop: handleDropOn,
       hoverClass: 'ph-droptarget-hover'
     });

     for(var i=0; i<anNum; i++){
       $('#'+opts.checkId+i).position( { of: $('#'+opts.answerId+i), my: 'center top', at: 'right top' } );
       $('#'+opts.checkId+i).hide();
     }


     function handleDragStop( event, ui ) {
       var offsetXPos = parseInt( ui.offset.left );
       var offsetYPos = parseInt( ui.offset.top );
     }

     function handleDropOn( event, ui ) {
       $(this).droppable( 'disable' );
       ui.draggable.addClass('ph-dropelement-disabled');
       ui.draggable.draggable( 'disable' );
			 ui.draggable.removeClass('active-element-hover-shadow active-element-hover-scale');
       ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
       ui.draggable.draggable( 'option', 'revert', false );
       var idAttr = $(this).attr('id');
       var dropId = idAttr.substring(opts.phId.length,idAttr.length);
       idAttr = ui.draggable.attr('id');
       var dragId = idAttr.substring(opts.answerId.length,idAttr.length);
       if(anItemsOrderArr[dragId]==dropId){
         $('#'+opts.checkId+dragId).removeClass('badge-no').addClass('badge-yes');
				 resultAns[dragId] = true;
       } else {
				 resultAns[dragId] = false;
			 }
       anCount++;
 			// if(soundEnabled) triggerSoundFx('-drop', 0, 0.8, $('#page-audio-container'));
       if(anCount == phNum){
 				// if(soundEnabled) triggerSoundFx('-win', 400, 0.8, $('#page-audio-container'));
				answerIconResponses.forEach(function(aRes, idx) {
          let aResPl = null;
  				if (resultAns[idx]) {
  					aResPl = lottie.loadAnimation({
  						container: aRes,
  						renderer: 'svg',
  						loop: false,
  						autoplay: false,
  						path: 'img/lottie/response1-correct.json'
  					});
  				} else {
  					aResPl = lottie.loadAnimation({
  						container: aRes,
  						renderer: 'svg',
  						loop: false,
  						autoplay: false,
  						path: 'img/lottie/response1-wrong.json'
  					});
  				}
					setTimeout(function() {
						window.parent.$.scrollTo(
							{ top: ($('#lt-answer-response'+idx).offset().top - 100) + 'px' },
							500, {'axis':'y'} );
						if (aResPl) aResPl.play();
					}, idx*1000);

					setTimeout(function(){
						$('.'+opts.phId+'-hint').fadeIn();
					}, (answerIconResponses.length + 2)*1000);

				});
       }
     }

   }

   $.fn.quizyDragDropOrd.defaults = {elementPhId: 'unord-dragdrop-ph', elementAnId: 'ord-dragdrop-an', answerId:'d-answer', phId: 'd-nest', checkId:'d-check', anItems: 'Item1;Item2;Item3;Item4;Item5', anItemsCorrect:'0;1;2;3;4', cols:1, separator:';', addSoundFx: true }

 })(jQuery);


$(document).ready( function(){

	let tParams = yLearnTmpl.getTmplParams();

	let ddItems = '';
	for (var i=0; i<tParams.itemsNum; i++){
		ddItems = ddItems + 'i'+ i;
		if(i < tParams.itemsNum-1) ddItems = ddItems+';';
	}

	$('#main').quizyDragDropOrd({
			dynTextStart:4,
			anItems: ddItems,
			anItemsCorrect: tParams.correctItems,
			separator: ';',
			cols: 2
	});

	// $('#popup-general-button').hide();

	// Setting the theme and the background
	if( typeof tParams.backColor !== 'undefined'){
		yLearnTmpl.setBgColor( tParams.backColor );
	}
	if( typeof tParams.theme !== 'undefined'){
		yLearnTmpl.setPageTheme( tParams.theme );
	}

	// loading the page
	yLearnTmpl.loadPage();


});
