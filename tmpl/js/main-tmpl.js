/**
 * Main template init jasvascript
 * @author Yane Frenski / http://yane.fr/
 */


/**
 * IE Hacks
 */

// If missing date now function
if ( !Date.now ) {
	Date.now = function() { return new Date().getTime(); }
}

// If missing indexOf for the arrays
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(obj){
		for(var i=0; i<this.length; i++){
			if(this[i]==obj){
				return i;
			}
		}
		return -1;
	}
}



var yLearnTmpl = new YLearnTmpl( YLEARN_TMPL_CONFIG );

$(document).ready(function(){

	var unhidePage = function(){
		var parCallback =
			parent.window["yLearn"][yLearnTmpl.getParentCallback()];
		if(typeof parCallback === 'function') {
		    parCallback();
		}
		parent.window.scrollTo(0, 0);
		$('.loading-container').fadeOut();
	}

	/**
	 * Init calls
	 */

	$.ajaxSetup ({ cache: false }); //can be removed for production
	yLearnTmpl.initTemplate ( unhidePage );

	// Attaching audio button click event
	$("#audioswitch",parent.document).click(function(){
		yLearnTmpl.toggleAudio();
	});

});
