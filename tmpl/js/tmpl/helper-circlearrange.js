
// Implementation to be improved
var arrangeCircle = function(elementClass, wrapperClass, circleWidth, circleRadius, startAngle) {

  // Converts numeric degrees to radians
  if (typeof(Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function() {
      return this * Math.PI / 180;
    }
  }

    var width = ( typeof(circleWidth)!=='undefined' ) ? circleWidth : 200;
    // ie7 bug
    // if($.browser.msie && parseInt($.browser.version, 10) == 7) width=200;
    var height = ( typeof(circleHeight)!=='undefined' ) ? circleHeight : 200;
	var startAngle = ( typeof(startAngle)!=='undefined' ) ? startAngle : 0;
    var centreX = width/2 - $('.'+elementClass).width()/2;
    var centreY = height/2 - $('.'+elementClass).height()/2;
    var numEl = $('.'+elementClass).length;
    var angleStep = 360/numEl;
    var wrapperId = $('.'+wrapperClass).attr('id');
	var radius = ( typeof circleRadius !== 'undefined') ? 
		 circleRadius : parseInt( wrapperId.substring( wrapperClass.length, wrapperId.length));

    $('.'+elementClass).each(function(){
      var idAttr = $(this).attr('id');
      var id = idAttr.substring(elementClass.length,idAttr.length);
	  var angle = (parseInt(id)*angleStep + startAngle).toRad();
      var posX = centreX + radius * Math.cos(angle);
      var posY = centreY + radius * Math.sin(angle);
			if( $('body').hasClass('dir-rtl') ) posX += 14;
      $(this).css({
        top: centreX+"px",
        left: centreY+"px"
      });
      $(this).delay(200).animate({
          left: posX,
          top: posY
        }, 1500 );
    });

}