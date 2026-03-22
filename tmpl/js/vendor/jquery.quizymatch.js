(function($) {
  $.fn.quizyMatch = function(options) {

    var opts = $.extend({}, $.fn.quizyMatch.defaults, options);
    var lItems = opts.leftItems;
    var rItems = opts.rightItems;
	  var lImgItems = opts.leftItemsImgs;
    var pref = opts.idPrefix;
    var colsWidth = { l:opts.colLeftWidth, c:opts.colCenterWidth, r:opts.colRightWidth };
    var selectedLeft = -1, selectedRight = -1;
    var matchedItems = [];
    var matches = opts.matches;
    var lineAttr = {stroke: '#ccc', 'stroke-width': 3};
    var lineAttrCorrect = {stroke: '#93B43F'};
    var lineAttrWrong = {stroke: '#C41C55'};
    var lines = [];
    var resultText = opts.resultText;
    var onAfterSubmit = opts.onAfterSubmit;

    // Appending the columns
    $(this).append('<div id="quizymatch-svgcontainer"></div>'+
                  '<div id="'+pref+'-coll" style="width:'+colsWidth.l+
                  ';" class="'+pref+'-col"></div>'+
                  '<div id="'+pref+'-colc" style="width:'+colsWidth.c+
                  ';" class="'+pref+'-col">&nbsp;</div>'+
                  '<div id="'+pref+'-colr" style="width:'+colsWidth.r+
                  ';" class="'+pref+'-col"></div>'+
                  '<div style="clear:both;"></div>');

   //  Adding the items

    for(var i=0; i<lItems.length; i++){
	  var imgToAppend = '';
	  var extraClass = '';
	  // console.log(lImgItems[i]);
	  if (typeof lImgItems[i] !== 'undefined') {
		extraClass = pref+"-itemright-withimg";
		imgToAppend = '<div class="'+pref+'-itemleft-img" style="background-image:url(\''+lImgItems[i]+'\');"></div>'
	  }
      $(this).children('#'+pref+'-coll').append(
        '<div id="'+pref+'-itemleft'+i+'" class="'+pref+'-itemleft '+extraClass+'" >'+lItems[i]+
		imgToAppend + '<div id="'+pref+'-dotleft'+i+'" class="'+pref+'-dotconnector"></div></div>');
    }

    for(var i=0; i<rItems.length; i++){
      $(this).children('#'+pref+'-colr').append(
        '<div id="'+pref+'-itemright'+i+'" class="'+pref+'-itemright" >'+rItems[i]+
        '<div id="'+pref+'-dotright'+i+'" class="'+pref+'-dotconnector"></div></div>');
    }

    // Appending the submit button

    $(this).append('<div id="'+pref+'-submit" class="pagetheme-background">'+opts.submitText+'</div><div id="'+pref+'-result"></div>');

    // Adding the canvas
    canv = new Raphael(document.getElementById(pref+'-svgcontainer'),"100%", "100%");

    $('.'+pref+'-itemleft').mousedown(function(e){
      e.preventDefault();
      if ( selectedLeft > -1 ) {
        deselectItem ( 'left' );
        removeActiveLine ( );
      }
      selectItem ( 'left' , getId ( $(this).attr('id'), '-itemleft' ) );
      if(selectedRight > -1){
        matchSelected ( 'right' );
      }else{
        createLine (selectedLeft, 'left');
      }
    });

    $('.'+pref+'-itemright').mousedown(function(e){
      e.preventDefault();
      if ( selectedRight > -1 ) {
        deselectItem ( 'right' );
        removeActiveLine ( );
      }
      selectItem ( 'right', getId ( $(this).attr('id'), '-itemright' ) );
      if(selectedLeft > -1){
        matchSelected ( 'left' );
      }else{
        createLine (selectedRight, 'right');
      }

    });

    $('.'+pref+'-itemleft').mouseup(function(e){
      e.stopPropagation();
      if(selectedRight>-1){
        selectItem ( 'left', getId ( $(this).attr('id'), '-itemleft' ) );
        matchSelected ( 'left' );
      }
    });

    $('.'+pref+'-itemright').mouseup(function(e){
      e.stopPropagation();
      if(selectedLeft>-1){
        selectItem ( 'right', getId ( $(this).attr('id'), '-itemright' ) );
        matchSelected ( 'right' );
      }
    });

    $(window).mouseup(function(){
      if ( (selectedRight!=-1) || (selectedLeft!=-1) ) {
        removeActiveLine();
      }
      deselectItem ( 'right' );
      deselectItem ( 'left' );
    });

    $(this).mousemove(function(e){
      var parentOffset = $('#'+pref+'-svgcontainer').parent().offset();
      var relX = e.pageX - parentOffset.left;
      var relY = e.pageY - parentOffset.top;
      if(selectedLeft>-1){
        changeLine( selectedLeft, 'left', relX, relY );
      }
      if(selectedRight>-1){
        changeLine( selectedRight, 'right', relX, relY);
      }
    });

    $('#'+pref+'-submit').click(function(){
      var correctMatches = [];
      for ( var i=0; i<matchedItems.length; i++ ){
        if( matches.indexOf(matchedItems[i])!=-1 ){
          correctMatches.push(matchedItems[i]);
          lines[i].attr( lineAttrCorrect );
        }else{
          lines[i].attr( lineAttrWrong );
        }
      }
      for ( var i=0; i<matches.length; i++ ){
        if( correctMatches.indexOf(matches[i])==-1 ){
          var newdots = matches[i].split(":");
          connectDots(parseInt(newdots[0]), parseInt(newdots[1]));
        }
      }
      if( (typeof resultText) !== 'string' ) resultText = resultText.text();
      resultText = resultText.replace('%s', correctMatches.length)
                             .replace('%s', matches.length);
      $('#'+pref+'-result').append(resultText);
      $('.'+pref+'-itemright').unbind('mouseup').unbind('mousedown').addClass('quizymatch-item-noclick');
      $('.'+pref+'-itemleft').unbind('mouseup').unbind('mousedown').addClass('quizymatch-item-noclick');

      if (typeof onAfterSubmit === 'function') {
        onAfterSubmit(correctMatches.length, matches.length);
      }

    });

    var getId = function ( domId, sufix ){
      var id = domId.substring((pref+sufix).length,domId.length);
      return parseInt(id);
    };

    var removeActiveLine = function () {
      lines[lines.length-1].remove();
      lines.pop();
    }

    var selectItem = function ( side, id ){
      if ( side == 'left' ){
        selectedLeft = id;
      }else if ( side == 'right' ){
        selectedRight = id;
      }
      $('#'+pref+'-item'+side+id).addClass('quizymatch-selected'+side)
    }

    var deselectItem = function ( side ){
      if ( side == 'left' ){
        selectedLeft = -1;
        $('.'+pref+'-itemleft').removeClass('quizymatch-selectedleft');
      }else if ( side == 'right' ){
        selectedRight = -1;
        $('.'+pref+'-itemright').removeClass('quizymatch-selectedright');
      }
    }

    // Checks if the user has already selected the
    var matchSelected = function ( side ){
      var selected = -1;
      for ( var i=0; i<matchedItems.length; i++){
        if ( matchedItems[i] == selectedLeft+":"+selectedRight ){
          selected = i;
        }
      }
      if ( selected == -1 ){
        matchedItems.push(selectedLeft+':'+selectedRight);
        fixLine(selectedLeft, selectedRight);
      }else{
        lines[selected].remove();
        lines.splice(selected,1)
        matchedItems.splice(selected,1);
        removeActiveLine ();
      }
      selectedRight = -1;
      selectedLeft = -1;
      $('.'+pref+'-itemleft').removeClass('quizymatch-selectedleft');
      $('.'+pref+'-itemright').removeClass('quizymatch-selectedright');
    }

    var getDotPos = function (lr,id){
      var pos = { x: Math.floor($('#'+pref+'-item'+lr+id).position().left +
                   $('#'+pref+'-dot'+lr+id).position().left) +8,
                   y: Math.floor($('#'+pref+'-item'+lr+id).position().top +
                    $('#'+pref+'-dot'+lr+id).position().top) +10
                   };
      return pos;
    }

    var createLine = function (d1 , side){
      var ld = getDotPos(side, d1);
      // var rd = getDotPos('right', d2);
      var conLine = canv.path("M"+ld.x+","+ld.y);
      conLine.attr(lineAttr);
      lines.push(conLine);
    }

    var changeLine = function (d1, side, cp_x,cp_y){
      var ld = getDotPos(side, d1);
      // var rd = getDotPos('right', d2);
      lines[lines.length-1].attr({path:"M"+ld.x+","+ld.y+"L"+cp_x+","+cp_y});
    }

    var fixLine = function (d1,d2){
      var ld = getDotPos('left', d1);
      var rd = getDotPos('right', d2);
      lines[lines.length-1].attr({path:"M"+ld.x+","+ld.y+"L"+rd.x+","+rd.y});
    }

    var connectDots = function (d1,d2){
      var ld = getDotPos('left', d1);
      var rd = getDotPos('right', d2);
      var conLine = canv.path("M"+ld.x+","+ld.y);

      conLine.attr(lineAttr);
      conLine.animate({path:"M"+ld.x+","+ld.y+"L"+rd.x+","+rd.y}, 300, 'easeOut');
      lines.push(conLine);
    }


  }

  $.fn.quizyMatch.defaults = {  matches:['0:1','1:0','1:1','2:1','3:0'],
                                separator:";",
                                colLeftWidth:'50%', colCenterWidth:'20%', colRightWidth: '30%',
                                leftItems: ['left1', 'left2', 'left3', 'left4', 'left5'],
								                leftItemsImgs: [],
                                rightItems: ['right1', 'right2', 'right3'],
                                idPrefix: 'quizymatch',
                                submitText: 'Submit',
                                onAfterSubmit: function (){},
                                resultText: 'You got %s out of %s'}

})(jQuery);
