/**
 * The common eLearning library for the actions within the templates,
 * for i.e: loading language files, user interactions etc...
 * @author Yane Frenski / http://yane.fr/
 */


/**
 * Class declaration
 */

function YLearnTmpl ( conf ) {

	this.config = conf;

	this.contentUrl = conf.urls.contentUrl;

	this.navVars = {
		'moduleId': 0,
		'sectionId': 0,
		'pageId': 0
	};
	this.isAdmin = false;
	this.lang = 'en';
	this.theme = '';
	this.parentLoadCallback = null;
	this.parentResizeCallback = null;
	this.parentActionDone = null;
	this.parentNavShowHide = null;
	this.domCallback = null;
	this.content = null;
	this.tmplParams = null;
	this.audioEnabled = true;

	this.textEditUrl = '';

}


/*********************************
 * GENERIC INIT METHODS
 *********************************/


/**
 * An API method to initiate the Template
 */

YLearnTmpl.prototype.initTemplate = function ( domCallback ) {

	this.domCallback = domCallback;
	this.getArgs( );

}


/**
 * A method to init all the params
 */

YLearnTmpl.prototype.getArgs = function ( ) {

	var hs = this.getLocHash();
	var that = this;

	if( hs.hasOwnProperty('module_id') ) this.navVars.moduleId = hs.module_id;
	if( hs.hasOwnProperty('section_id') ) this.navVars.sectionId = hs.section_id;
	if( hs.hasOwnProperty('page_id') ) this.navVars.pageId = hs.page_id;
	if( hs.hasOwnProperty('lang') ) this.lang = hs.lang;
	if( hs.hasOwnProperty('theme') ) this.theme = hs.theme;
	if( hs.hasOwnProperty('callback') ) this.parentLoadCallback = hs.callback;
	if( hs.hasOwnProperty('resize_callback') )
		this.parentResizeCallback = hs.resize_callback;
	if( hs.hasOwnProperty('done_callback') )
		this.parentActionDone = hs.done_callback;
	if( hs.hasOwnProperty('navigation_hide_show') )
		this.parentNavShowHide = hs.navigation_hide_show;

	if( hs.hasOwnProperty('tmpl_params') ){
		this.tmplParams = hs.tmpl_params;
	}else{
		if( typeof parent.NAVVARS.tmplParams !== 'undefined' ){
			this.tmplParams = parent.NAVVARS.tmplParams;
		}
	}

	if( hs.hasOwnProperty('is_admin') ){
		this.isAdmin = (hs.is_admin == 'true') ? true:false;
		if (this.isAdmin == true) {
			$('body').addClass('admin-active')
		}
	}

	if( hs.hasOwnProperty('audio') ){
		this.audioEnabled = (hs.audio == 'true') ? true:false;
	}

	// Setting the vars based on the arguments passed
	this.textEditUrl = this.config.urls.adminPutText
		.replace('{{moduleId}}', this.navVars.moduleId)
		.replace('{{sectionId}}', this.navVars.sectionId)
		.replace('{{pageId}}', this.navVars.pageId);

	this.contentUrl += this.lang + '/content'+
					 + this.navVars.moduleId + '-'
					 + this.navVars.sectionId + '-'
					 + this.navVars.pageId
					 + '.json';

}

YLearnTmpl.prototype.browserIsIE = function() {

	var ieVer = null;

	if (/MSIE 10/i.test(navigator.userAgent)) {
	   // This is internet explorer 10
	   ieVer = 'IE10';
	}

	if (/MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) {
	    // This is internet explorer 9 or 11
	    ieVer = 'IE9';
	}

	if (/Edge\/\d./i.test(navigator.userAgent)){
	   // This is Microsoft Edge
	   ieVer = 'Microsoft Edge';
	}

	return ieVer;

}


/**
 * A method to call the callbacks, since the page has been loaded
 */

YLearnTmpl.prototype.loadPage = function (callback) {

	var that = this;

	$.getJSON( this.contentUrl, function(json){

		that.content = json;

		that.loadTexts(callback);
		that.presetAnimations();
		that.enableAudio();

	});

}


/**
 * A method to get the hash params
 */

YLearnTmpl.prototype.getLocHash = function () {

	if (location.hash.length < 2) return null;
	var hash = {};
	var hashParts = location.hash.substr(1).split("&");
	for (var i=0; i<hashParts.length; i++) {
		var kv = hashParts[i];
		if (kv.match(/^(.+?)=(\d+)$/))
			hash[RegExp.$1] = parseInt(RegExp.$2);
		else if (kv.match(/^(.+?)=(\d+\.\d+)$/))
			hash[RegExp.$1] = parseFloat(RegExp.$2);
		else if (kv.match(/^(.+?)=(.*)$/))
			hash[RegExp.$1] = decodeURIComponent(RegExp.$2);
		else
			hash[RegExp.$1] = RegExp.$2;
    }

    return hash;

}


// An API method to call parent callback
YLearnTmpl.prototype.getParentCallback = function() {

	return this.parentLoadCallback;

}


// An method to get the content texts
YLearnTmpl.prototype.getTextContent = function() {

	return this.content.texts;

}


// An API method to set the texts
YLearnTmpl.prototype.loadTexts = function(callback) {
	var contentTexts = this.getTextContent();
	var that = this;
	$.each( contentTexts, function(key,cText) {
		$('span#'+key).html(cText);
		$('span.'+key).html(cText);
		that.pageResized();
	});

	if(this.isAdmin) {
		$('.edit-text').editable(this.textEditUrl, {
			      type      : 'textarea',
			      cancel    : 'Cancel',
			      submit    : 'OK',
			      event     : "dblclick",
				  cssclass : 'jeditable-style',
			      indicator : '<img src="../img/activity-indicator1.gif" />',
			      tooltip   : 'Double click to edit'
			    });
	}

	if (typeof this.domCallback === 'function') {
		this.domCallback();
	}

	if (typeof callback === 'function') {
		callback();
	}


}


// An API method to preload the images
YLearnTmpl.prototype.loadImages = function( imgs, loadCallback, ext) {

	if (typeof(ext)==='undefined') ext = '';

	var that = this;
	var img = new Image();
	img.src = this.getImageExt( imgs[0], ext );
	if( imgs.length > 1 ) {
 		img.onload = function() {
			imgs.shift();
			that.loadImages( imgs, loadCallback, ext);
		}
	} else {
		img.onload = function() {
			loadCallback();
		}
	}

}


// An API method to set the proper image
YLearnTmpl.prototype.getImageExt = function( img, ext ){

	if (typeof(ext)==='undefined') ext = '';

	if ( ext !='' ) {
		var imgname = img + '.' + ext;
	}else{
		var imgname = $('html').hasClass('svg') ? img + '.svg' : img + '.png';
	}
	imgname = this.config.urls.filesUrl + imgname;
	return imgname;

}

// An API method to import images from an array in the params
YLearnTmpl.prototype.importArrayImages = function( imgArray, tmplArray, ext, loadArray){

	if (typeof(ext)==='undefined') ext = '';

	for (var i=0; i<tmplArray.length; i++){
		if ( typeof loadArray != 'undefined' ) loadArray.push( tmplArray[i].img );
		imgArray.images[i]={
			'img':yLearnTmpl.getImageExt(tmplArray[i].img, ext),
			'order':tmplArray[i].order
		};
	}

}

// An API method to set the background colour
YLearnTmpl.prototype.setBgColor = function( color ){

	// if( color[0] != '#' ) color = '#' + color;
	$( '.' + this.config.dom.parentMainContainer, parent.document)
		.css('background-color', color);

}


YLearnTmpl.prototype.setBackground = function( color ){

	$( '.' + this.config.dom.parentMainContainer, parent.document)
		.css('background', color);

}

// An API method to set the teheme
YLearnTmpl.prototype.setPageTheme = function( theme ){

	if( theme ){
		$('body').addClass('pagetheme-'+theme);
	}

}

// An API method to get template params
YLearnTmpl.prototype.getTmplParams = function( color ){

	return this.tmplParams;

}


// An API method to get current lang
YLearnTmpl.prototype.getLang = function( ){

	return this.lang;

}

// An API Method to update the images for high resolution displays
YLearnTmpl.prototype.updateImgsForRetina = function ( imgs ){

	if( window.devicePixelRatio > 1 ){
		for( var i=0; i<imgs.length; i++ ){
			if( imgs[i].img.slice(-3) !='@2x' ) imgs[i].img += '@2x';
		}
		return 2;
	} else {
		return 1;
	}

}

// A method for resizing the parent window when adding new stuff
YLearnTmpl.prototype.pageResized = function( ){

	var parResCallback = parent.window["yLearn"][this.parentResizeCallback];
	if(typeof parResCallback === 'function') {
	    parResCallback();
	}

}

// A method to call after an action has been done
YLearnTmpl.prototype.actionDone = function(params){
	var parDoneCallback = parent.window["yLearn"][this.parentActionDone];
	if(typeof parDoneCallback === 'function') {
	    parDoneCallback(params);
	}

}

// A method for hiding the navogation
YLearnTmpl.prototype.hideParentNavigation = function( ){

	var hideNavFunc = parent.window["yLearn"][this.parentNavShowHide+'Hide'];
	if(typeof hideNavFunc === 'function') {
	    hideNavFunc();
	}

}

// A method for showing the navigation
YLearnTmpl.prototype.showParentNavigation = function( ){

	var showNavFunc = parent.window["yLearn"][this.parentNavShowHide+'Show'];
	if(typeof showNavFunc === 'function') {
	    showNavFunc();
	}

}


/*********************************
 * BASIC UI ANIMATIONS
 *********************************/

YLearnTmpl.prototype.UIAnimation = {

	"sequenceLayerImages": function(el, first, last, duration, delay, callback){

		var swapImages = function(old_id, new_id){
			$('#'+el+old_id).delay(delay).fadeOut(duration*2);
			$('#'+el+new_id).delay(delay).fadeIn(duration, function(){
				if( new_id<(last) ){
					swapImages( old_id+1, new_id+1 );
				}else{
					if (typeof(callback) == "function") callback()
				}
			});
		}
		swapImages(first,first+1);

	},

	"rotate": function(el_sel, s_angle, e_angle, duration, img_fallback, callback) {

	    var elem = $(el_sel);

		if( $('html').hasClass('csstransforms') ){
	    	$({deg: s_angle}).animate({deg: e_angle}, {
	        	duration: duration,
	        	step: function(now) {
	            	elem.css({
	                	transform: 'rotate(' + now + 'deg)'
	            	});
	        	},
				complete: function(){
					if (typeof(callback) == "function") callback();
				}
	    	});
		}else{
			elem.css('background-image',img_fallback);
		}

	},

	"scale": function(el_sel, start, end, duration, callback) {

	    var elem = $(el_sel);

		if( $('html').hasClass('csstransforms') ){
	    	$({scale: start}).animate({scale: end}, {
	        	duration: duration,
	        	step: function(now) {
	            	elem.css({
	                	transform: 'scale(' + now + ',' + now + ')'
	            	});
	        	},
				complete: function(){
					if (typeof(callback) == "function") callback();
				}
	    	});
		}

	},

	"showScaleRotate": function(el_sel, rotation, scale, duration, callback) {

	    var elem = $(el_sel);

		if( $('html').hasClass('csstransforms') ){
			var scaleVal=0, degVal=0;
			$({scale: scale, deg:0}).animate({scale: 1, deg:rotation}, {
		        duration: duration,
		        step: function(now, fx) {
					if(fx.prop=='scale'){
						scaleVal = now;
					}else if(fx.prop=='deg'){
						degVal = now;
					}
					elem.css({transform: 'rotate('+degVal+'deg) scale('+scaleVal+','+scaleVal+')'});
		        },
				complete: function(){
					if (typeof(callback) == "function") callback();
				}
		    });
		}

	}

}


/**
 * A method to call the CSS selectors preset animations and interactions
 */

YLearnTmpl.prototype.presetAnimations = function () {

	// BLINKING ELEMENS
	// Creates the blinking funcionality (to be replaced with css3 later)
	var blinkSpeed1 = 150, blinkSpeed2 = 350, fadeSpeed = 1000, blinkInt = 700;
    var intID, that=this;
	var showAnimSpeed = 1000; triggerAnimSpeed = 500;

    intID = setInterval ( RepeatCall, blinkInt );

    function RepeatCall()
    {
      $('.'+that.config.dom.animBlink)
			.fadeTo(blinkSpeed2,0.2)
			.fadeTo(blinkSpeed1,1);
    }


	// TOGGLING ELEMENTS
	//  animation for elements that need to be clicked and other to be shown
    var trigerShowId = this.config.dom.triggerShow;
    var trigerToggleId = this.config.dom.triggerToggle;
	var trigerPopupId = this.config.dom.triggerPopup;
	var popupGeneral = this.config.dom.popupGeneral;

	$( document ).on( 'click', '.'+trigerShowId, function() {
		var idAttr = $(this).attr('id');
		var id = idAttr.substring(trigerShowId.length,idAttr.length);
		// if we also want to hide smt at the same time:
		if($(this).hasClass('trigger-to-hide')){
			$('.block-to-hide').fadeOut(showAnimSpeed);
			$('.block-to-show'+id).delay(showAnimSpeed).fadeIn(showAnimSpeed);
		}else{
			$('.block-to-show'+id).fadeIn(showAnimSpeed);
		}

		// If we also want to reactivate some arrows
		if($(this).hasClass('trigger-to-activate')){
			$('.arrow-to-activate'+id).addClass("arrow-clickable anim-blink");
		}
		// If we also want to disactivate some arrows
		if($(this).hasClass('trigger-to-disactivate')){
			$('.arrow-to-disactivate'+id).removeClass("arrow-clickable anim-blink");
		}

	});

	$( document ).on( 'click', '.'+trigerToggleId, function() {
		var idAttr = $(this).attr('id');
		var id = idAttr.substring(trigerToggleId.length,idAttr.length);
		if ($('.to-untoggle').length > 0){
			$('.to-untoggle').slideToggle(triggerAnimSpeed, function(){
				$('.block-to-toggle'+id).slideToggle(triggerAnimSpeed);
			});
			$('.to-untoggle').removeClass('to-untoggle');
		}else{
			$('.block-to-toggle'+id).slideToggle(triggerAnimSpeed);
      	}
		$('.block-to-toggle'+id).addClass('to-untoggle');
	});

	$( document ).on( 'click', '.'+trigerPopupId, function() {
		var popEl = $('.'+popupGeneral);
		var dataId = trigerPopupId+'-data';
		var idAttr = $(this).attr('id');
		var id = idAttr.substring(trigerPopupId.length,idAttr.length);
		var dataEl = $('.'+dataId+id);
		var popPosY = Math.round($(this).position().top - 50);

		popEl.attr('title', id);
		$('.'+popupGeneral+'-title').html(dataEl.children('.'+dataId+'-title').html());
		$('.'+popupGeneral+'-content').html(dataEl.children('.'+dataId+'-content').html());

		window.parent.$.scrollTo( { top: popPosY+'px' }, 500,
			{'axis':'y',
			 onAfter: function(){
				popEl.parent().fadeIn(function(){
					popEl.animate({
					    opacity: 1,
					    top: popPosY
					});
				});
			}
		});

	});

	$( document ).on( 'click', '.'+popupGeneral+'-close', function() {
		var popEl = $('.'+popupGeneral);
		var id = popEl.attr('title');
		popEl.animate({
		    opacity: 0,
		    top: 0
		}, function(){
			popEl.parent().fadeOut();
		});
		return false;
	});


}

/*********************************
 * AUDIO METHODS
 *********************************/


// Adds audio to the dom
YLearnTmpl.prototype.addAudio = function (filename, el, ifLoop, extraClass, autoplay){

	var filename = filename
		.replace('{{moduleId}}', this.navVars.moduleId)
		.replace('{{sectionId}}', this.navVars.sectionId)
		.replace('{{pageId}}', this.navVars.pageId)
		.replace('{{lang}}', this.lang);
	console.log(filename);
	if( this.audioEnabled && !$('html').hasClass('oldie') ){
		var autoplayTag="autoplay";
		if ( autoplay === false ){
			autoplayTag = "";
		}

		var audioFilesToadd =
			'<source src="'+filename+'.mp3" type="audio/mpeg">'
		+ '<source src="'+filename+'.wav" type="audio/wav">'
		+ '<source src="'+filename+'.ogg" type="audio/ogg">';

		if (this.browserIsIE() != null) {
			audioFilesToadd = '';
		}

		var loop = ( ifLoop!==undefined && ifLoop ) ? ' loop' : '';
		var extraClass = ( extraClass!==undefined && extraClass ) ? extraClass : '';
	    el.append('<audio '+autoplayTag+loop+' class="'+extraClass+'">'
		+ audioFilesToadd + '<object>'
		+ '<param name="autostart" value="true">'
		+ '<param name="src" value="'+filename+'.mp3">'
		+ '<param name="autoplay" value="true">'
		+ '<param name="controller" value="false">'
		+ '<embed src="'+filename+'.mp3" controller="false" autoplay="true"'
		+ ' autostart="true" type="audio/mpeg"></embed></object></audio>');
	}

}

// Clears up the audio containers
YLearnTmpl.prototype.clearAudio = function(el){
	if ( el.length > 0) el.empty();
}

// Triggers voice by adding an audio file to the dom
YLearnTmpl.prototype.triggerVoice = function( id, delay, autoplay ){
	var that = this;
	var el = $('#' + this.config.dom.voiceContainer);
	this.stopVoice();
	setTimeout(function() {
	  	that.addAudio(that.config.urls.voiceDir+id+'/v', el,
			false, that.config.dom.voiceFile, autoplay);
  }, delay);
}


// Stop voice
YLearnTmpl.prototype.stopVoice = function() {
	$('.' + this.config.dom.voiceFile).remove();
}

// Triggers sound fx by adding an audio file to the dom
YLearnTmpl.prototype.triggerSoundFx = function( id, delay, volume ){
	var that = this;
	if (this.audioEnabled) {
		var el = $('#' + this.config.dom.soundfxContainer);
		setTimeout(function() {
	  		that.addAudio(
				that.config.urls.soundFxUrl + 'efx' + id, el, false, '', true);
			$('#' + that.config.dom.soundfxContainer+' audio').prop('volume', volume);
		}, delay);
	}
}

// Enables the audio
YLearnTmpl.prototype.enableAudio = function(){
	this.audioEnabled = true;
	if(typeof this.tmplParams.backgroundMusic === 'string') {
		this.addAudio( this.config.urls.musicUrl +
			this.tmplParams.backgroundMusic,
			$('#' + this.config.dom.musicContainer), true, '', true );
	}
}

// Disables the audio
YLearnTmpl.prototype.disableAudio = function(){
	this.audioEnabled = false;
	this.clearAudio( $('#' + this.config.dom.voiceContainer) );
	this.clearAudio( $('#' + this.config.dom.musicContainer) );
	this.clearAudio( $('#' + this.config.dom.soundfxContainer) );
}

// Enables or disables audio
YLearnTmpl.prototype.toggleAudio = function(){
    if (this.audioEnabled){
		this.disableAudio();
    }else{
		this.enableAudio();
    }
}

YLearnTmpl.prototype.playInstructionVoice = function (iId) {
	this.triggerVoice( iId, 100, true );
}
