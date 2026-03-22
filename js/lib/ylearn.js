/**
 * The common eLearning library for loading templates,
 * tracking pages, interactions, etc.
 * @author Yane Frenski / http://yane.fr/
 */


/**
 * Class declaration
 */

function YLearn (conf, env, theme_vars, nav_vars) {

	this.config = conf;
	this.themeVars = theme_vars;
	this.navVars = nav_vars;

	this.moduleSchema = null;
	this.moduleTitles = null;

	this.locationHash = '';
	this.hasTimeout = null;

	this.pageLoadCallback = null;
	this.tmplLoadCallback = null;
	this.resizeCallback = null;
	this.actionDoneCallback;
	this.audioEnabled = false;
	this.defaultMusicEnabled = false;
	this.navHideShowHide = null;
	this.navHideShowShow = null;

}


/*********************************
 * GENERIC INIT METHODS
 *********************************/


/**
 * A method to initiate the module
 */

YLearn.prototype.initModule = function ( moduleLoadCallback,
										 pageLoadCallback,
										 pageCCallback,
										 pageWCallback,
										 tlCallback,
 										 resCallback,
 										 adCallback,
										 navHideShowHide,
										 navHideShowShow){

	var that = this;
	this.pageLoadCallback = pageLoadCallback;
	this.tmplLoadCallback = tlCallback;
	this.resizeCallback = resCallback;
	this.navHideShowHide = navHideShowHide;
	this.navHideShowShow = navHideShowShow;
	this.actionDoneCallback = function(params) {
		adCallback(params);
	}

	// gets the json file for the schema
	$.getJSON( this.config.urls.schemaUrl, function( json ){

		// storing the schema
		that.moduleSchema = json;

		// sorting pages
		for ( var i=0, len=that.moduleSchema.sections.length; i<len; i++ ) {
			that.moduleSchema.sections[i].pages.sort( function( a, b ) {
				return parseFloat( a.order ) - parseFloat( b.order );
			});
		}

		// gets the json file for the titles
		$.getJSON( that.config.urls.titlesUrl, function( json ){

			that.moduleTitles = json;

			// Gets the init page location and loads the appropriate page
			that.checkLocHashPage( pageCCallback, pageWCallback, true );

			// calls the callback function if supplied
			if( typeof moduleLoadCallback === 'function' ){
				moduleLoadCallback();
			}

		});

	});

	this.enableAudio();

}



/*********************************
 * SCHEMA API METHODS
 *********************************/


/**
 * A method to get the section meta data (without the pages)
 */

YLearn.prototype.getSectionMetaData = function ( secId ) {

	var sec = {};
	sec.id = secId;
	sec.order = this.moduleSchema.sections[secId].order;
	sec.pageCount = this.countVisiblePages( secId );
	return sec;
}


/**
 * A method to get the module meta data (without the pages)
 */

YLearn.prototype.getModuleMetaData = function ( moduleId ) {

	var mod = {};
	mod.id = moduleId;
	mod.pageCount = this.moduleSchema.sections.length;
	return mod;

}


/**
 * A method to get the module titles
 */

YLearn.prototype.getModuleTitles = function ( ) {

	return this.moduleTitles;

}

/**
 * A method to get the count of the visible pages in a section
 * or in a whole module if secId set to null or is undefined
 */

YLearn.prototype.countVisiblePages = function ( secId ) {

	var visCount = 0;
	var minSec = 0; maxSec = this.moduleSchema.sections.length;

	var incVisCount = function( iteratedPage) {
		if( iteratedPage.visible ){
			visCount ++ ;
		}
	}

	if( typeof secId !== 'undefined' ){
		minSec = secId;
		maxSec = secId+1;
	}

	for( var j=minSec; j<maxSec; j++ ){
		for( var i=0; i<this.moduleSchema.sections[j].pages.length; i++ ){
			incVisCount( this.moduleSchema.sections[j].pages[i] );
		}
	}

	return visCount;

}

/**
 * A method to return a page if it exists
 * It also calculates page position in the array of both section and module
 */

YLearn.prototype.getPageById = function ( pageId ) {

	var pageModPosition = 0;
	var pageSecPosition = 0;
	var page = null;

	for ( var j=0; j<this.moduleSchema.sections.length; j++ ) {
		pageSecPosition = 0;
		for ( var i=0; i<this.moduleSchema.sections[j].pages.length; i++ ) {
			if ( this.moduleSchema.sections[j].pages[i].id == pageId ){
				page = this.moduleSchema.sections[j].pages[i];
				page.sectionId = j;
				page.secPosition = pageSecPosition;
				page.modPosition = pageSecPosition;
				for ( var c=j-1; c>=0; c-- ) {
					if ( this.moduleSchema.sections[c].order <
							this.moduleSchema.sections[j].order  ){
								page.modPosition +=  this.countVisiblePages( c );
							}
				}
			}
			if ( this.moduleSchema.sections[j].pages[i].visible ) {
				pageSecPosition ++;
			}
		}
		if ( page ){
			if( this.moduleSchema.sections[j].order <
					this.moduleSchema.sections[page.sectionId].order  ){
						page.modPosition +=  countVisiblePages( j );
					}
		}
	}

	return page;

}




/*********************************
 * NAVIGATION API METHODS
 *********************************/


/**
 * An API method to return current page id
 */

YLearn.prototype.getCurrentPage = function () {
	return this.navVars.pageId;
}

/**
 * An API method to return current section id
 */

YLearn.prototype.getCurrentSection = function () {
	return this.navVars.sectionId;
}


YLearn.prototype.getSectionFirstPage = function (secId) {
	return this.moduleSchema.sections[secId].pages[0].id;
}


/**
 * An API method to return the current page position withing a section
 * and the number of pages in the section or module
 */

YLearn.prototype.getPageUnitStatus = function ( pageId, for_section ) {

	var page = this.getPageById( pageId );
	var that = this;

	if( for_section ){
		return {
				"page": page.secPosition + 1,
				"ofpages": that.countVisiblePages( page.sectionId )
				};
	}else{
		return {
				"page": page.secPosition + 1,
				"ofpages": that.countVisiblePages( )
				};
	}


}


/**
 * A method to set the template parameters
 */

YLearn.prototype.setTmplParams = function ( tmpl_params ) {

	var params = null;
	this.navVars.tmplParams = null;
	NAVVARS.tmplParams = null;

	if( typeof tmpl_params!== 'undefined'){
		params = tmpl_params;
	}

	this.navVars.tmplParams = params;
	NAVVARS.tmplParams = params;

}


/**
 * A method to calculate user's progress as a percentage of the whole
 * section or module
 */

YLearn.prototype.calcProcess = function ( page, unit ) {

	if( unit == 'section' ){
		return 100 * ( ( page.secPosition+1 ) / this.countVisiblePages(
														page.sectionId ) );
	} else {
		return 100 * ( ( page.modPosition+1 ) / this.countVisiblePages() );
	}

}


/**
 * A method to get the next section
 */

YLearn.prototype.getNextSection = function ( curSecId ) {

	var nextOrder = 1000000;
	var nextSecId = -1;

	for( var i=0; i<this.moduleSchema.sections.length; i++ ){
		if ( curSecId!= i ){
			if ( this.moduleSchema.sections[i].order >
				 this.moduleSchema.sections[curSecId].order &&
				 this.moduleSchema.sections[i].order < nextOrder ) {
				nextOrder = this.moduleSchema.sections[i].order;
				nextSecId = i;
			}
		}
	}

	return nextSecId;

}


/**
 * A method to get the previus section
 */

YLearn.prototype.getPrevSection = function ( curSecId ) {

	var prevOrder = -1;
	var prevSecId = -1;

	for( var i=0; i<this.moduleSchema.sections.length; i++ ){
		if ( curSecId!= i ){
			if ( this.moduleSchema.sections[i].order <
				 this.moduleSchema.sections[curSecId].order &&
				 this.moduleSchema.sections[i].order > prevOrder ) {
				prevOrder = this.moduleSchema.sections[i].order;
				prevSecId = i;
			}
		}
	}

	return prevSecId;

}


/**
 * A method to get the next page
 */

YLearn.prototype.getNextPage = function ( curPageId ) {

	var curPage = this.getPageById( curPageId );

	if( typeof this.moduleSchema.sections[curPage.sectionId]
			.pages[curPage.secPosition+1] !== 'undefined' ){
		return this.moduleSchema.sections[curPage.sectionId]
				   .pages[curPage.secPosition+1].id;
	}else{
		var nextSecId = this.getNextSection( curPage.sectionId );
		while ( nextSecId != -1 &&
				this.moduleSchema.sections[nextSecId].pages.length == 0 ){
			nextSecId = this.getNextSection( nextSecId );
		}
		if( nextSecId > -1 ) {
			return this.moduleSchema.sections[nextSecId].pages[0].id;
		}else{
			return -1;
		}
	}

}


YLearn.prototype.getModileFirstPage = function ( modId ) {
  return this.moduleSchema.sections[modId].pages[0];
}


/**
 * A method to get the previous page
 */

YLearn.prototype.getPrevPage = function ( curPageId ) {

	var curPage = this.getPageById( curPageId );

	if( typeof this.moduleSchema.sections[curPage.sectionId]
			.pages[curPage.secPosition-1] !== 'undefined' ){
		return this.moduleSchema.sections[curPage.sectionId]
				   .pages[curPage.secPosition-1].id;
	}else{
		var prevSecId = this.getPrevSection( curPage.sectionId );
		while ( prevSecId != -1 &&
				this.moduleSchema.sections[prevSecId].pages.length == 0 ){
			prevSecId = this.getPrevSection( prevSecId );
		}
		if( prevSecId > -1 ) {
			return this.moduleSchema.sections[prevSecId]
				.pages[this.moduleSchema.sections[prevSecId].pages.length-1].id;
		}else{
			return -1;
		}
	}

}


/**
 * A method to take user to a certain page
 */

YLearn.prototype.goToPage = function ( pageId ) {

	var page = this.getPageById( pageId );

	if( page ){
		this.navVars.pageId = pageId;
		this.setTmplParams( page.tmplParams );
		if ( page.sectionId != this.navVars.sectionId ){
			this.navVars.sectionId = page.sectionId;
		}
		this.setLocHash( this.generateLocHash( pageId ) );
		if (typeof this.pageLoadCallback === 'function'){
			this.pageLoadCallback( page );
		}
    $('.'+this.config.dom.pageIndicator)
      .text((page.secPosition+1) + '/' + this.countVisiblePages(page.sectionId ));

		return true;
	}else{
		return false;
	}

}


/**
 * A method to get page's hash
 */

YLearn.prototype.getLocHash = function ( ) {

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


/**
 * A method to set page's hash
 */

YLearn.prototype.setLocHash = function ( hash ) {

	var hashStrings = [];

	for (var i in hash){
		hashStrings.push(encodeURIComponent(i) + "="
						 + encodeURIComponent(hash[i]));
	}

    var newHash = hashStrings.length ? "#" + hashStrings.join("&") : "";

    if (this.locationHash != newHash){
		location.hash = this.locationHash = newHash;
	}

}


/**
 * A method to generate page's hash
 */

YLearn.prototype.generateLocHash = function ( pageId ) {

	return { 'page': pageId };

}


/**
 * A method to check if hash locations page param has changed
 */

YLearn.prototype.checkLocHashPage = function ( correctCallback,
											   wrongCallback,
											   firstCall ) {

	var stateLocHash = location.hash == "#" ? "" : location.hash;
	var that = this;

	var callPage = function( page ){
		if( that.goToPage( page ) ){
			if( typeof correctCallback !== 'undefined' ){
				correctCallback();
			}
		}else{
			if( typeof wrongCallback !== 'undefined' ){
				clearTimeout(this.hasTimeout);
				wrongCallback();
			}
		}
	}

	if( stateLocHash != this.locationHash ){
		var hash = this.getLocHash();
		if( hash.page != this.navVars.pageId ){
			callPage( hash.page );
		}else{
			if( firstCall ){
				callPage( this.navVars.pageId );
			}
		}
	}else if( stateLocHash =='' && this.locationHash =='' ){
		callPage( this.navVars.pageId );
	}

	this.hasTimeout = setTimeout( function() {
		that.checkLocHashPage( correctCallback, wrongCallback, false );
	}, 500 );


}




/*********************************
 * PAGE LOADING METHODS
 *********************************/


/**
 * A method to generate template url when loading a page
 */

YLearn.prototype.generateTmplUrl = function ( pageId ) {

	var page = this.getPageById( pageId );
	return this.config.urls.tmplUrl + page.tmpl + '.html'
			+ this.generateTmplTime() + this.generateTmplArgs();

}


/**
 * A method to generate template UTC timestamp unique argument
 * in order to fake loading different page
 */

YLearn.prototype.generateTmplTime = function ( ) {

	return '?_=' + Date.now();

}


/**
 * A method to generate template hash arguments when loading a page
 */

YLearn.prototype.generateTmplArgs = function ( ) {

	var reqArgs = this.config.urls.tmplUrlArgs.split(',');
	var args = '';

	if( reqArgs.indexOf( 'page_id' ) !== -1){
		var pageArg = 'page_id=' + this.navVars.pageId;
		args += (args == '') ? '#'+ pageArg : '&' + pageArg;
	}

	if( reqArgs.indexOf( 'section_id' ) !== -1){
		var secArg = 'section_id=' + this.navVars.sectionId;
		args += (args == '') ? '#'+ secArg : '&' + secArg;
	}

	if( reqArgs.indexOf( 'module_id' ) !== -1){
		var modArg = 'module_id=' + this.navVars.moduleId;
		args += (args == '') ? '#'+ modArg : '&' + modArg;
	}

	if( reqArgs.indexOf( 'lang' ) !== -1){
		var langArg = 'lang=' + this.config.lms.lang;
		args += (args == '') ? '#'+ langArg : '&' + langArg;
	}

	if( reqArgs.indexOf( 'is_admin' ) !== -1){
		var adminArg = 'is_admin=' + this.config.lms.isAdmin;
		args += (args == '') ? '#'+ adminArg : '&' + adminArg;
	}

	if( reqArgs.indexOf( 'audio' ) !== -1){
		var adminArg = 'audio=' + this.audioEnabled;
		args += (args == '') ? '#'+ adminArg : '&' + adminArg;
	}

	if( reqArgs.indexOf( 'theme' ) !== -1){
		var themeArg = 'theme=' + this.config.schema.units[
									this.navVars.sectionId].theme;
		args += (args == '') ? '#'+ themeArg : '&' + themeArg;
	}

	if( reqArgs.indexOf( 'callback' ) !== -1){
		var callbackArg = 'callback=tmplLoadCallback';
		args += (args == '') ? '#'+ callbackArg : '&' + callbackArg;
	}

	if( reqArgs.indexOf( 'resize_callback' ) !== -1){
		var rCallbackArg = 'resize_callback=resizeCallback';
		args += (args == '') ? '#'+ rCallbackArg : '&' + rCallbackArg;
	}

	if( reqArgs.indexOf( 'done_callback' ) !== -1){
		var dCallbackArg = 'done_callback=actionDoneCallback';
		args += (args == '') ? '#'+ dCallbackArg : '&' + dCallbackArg;
	}

	if( reqArgs.indexOf( 'tmpl_params' ) !== -1){
		var page = this.getPageById( this.navVars.pageId );
		var tmplParArg = encodeURIComponent( JSON.stringify(page.tmplParams) );
		args += (args == '') ? '#'+ tmplParArg : '&' + tmplParArg;
	}

	if( reqArgs.indexOf( 'navigation_hide_show' ) !== -1){
		var navHideShowArg = 'navigation_hide_show=navHideShow';
		args += (args == '') ? '#'+ navHideShowArg : '&' + navHideShowArg;
	}

	return args;

}

/*********************************
 * AUDIO API METHODS
 *********************************/


// Adds audio to the dom
YLearn.prototype.addAudio = function (filename, el, ifLoop, extraClass, autoplay){
	var filename = filename
		.replace('{{moduleId}}', this.navVars.moduleId)
		.replace('{{sectionId}}', this.navVars.sectionId)
		.replace('{{pageId}}', this.navVars.pageId)
		.replace('{{lang}}', this.lang);
	if( this.audioEnabled && !$('html').hasClass('oldie') ){
		var autoplayTag="autoplay";
		if ( autoplay === false ){
			autoplayTag = "";
		}
		var loop = ( ifLoop!==undefined && ifLoop ) ? ' loop' : '';
		var extraClass = ( extraClass!==undefined && extraClass ) ? extraClass : '';
	    el.append('<audio '+autoplayTag+loop+' class="'+extraClass+'">'
		+ '<source src="'+filename+'.mp3" type="audio/mpeg">'
		+ '<source src="'+filename+'.ogg" type="audio/ogg">'
		+ '<source src="'+filename+'.wav" type="audio/wav">'
		+ '<object>'
		+ '<param name="autostart" value="true">'
		+ '<param name="src" value="'+filename+'.mp3">'
		+ '<param name="autoplay" value="true">'
		+ '<param name="controller" value="false">'
		+ '<embed src="'+filename+'.mp3" controller="false" autoplay="true"'
		+ ' autostart="true" type="audio/mpeg"></embed></object></audio>');
	}

}

// Enables audio
YLearn.prototype.enableAudio = function(){
	this.audioEnabled = true;
	$('#' + this.config.dom.audioSwitch)
		.addClass(this.config.dom.audioSwitch + '-enabled')
		.removeClass(this.config.dom.audioSwitch + '-disabled');
	if(this.defaultMusicEnabled){
		this.addAudio( this.config.urls.musicUrl + 'background-music',
			$('#' + this.config.dom.audioSwitch), true, '', true );
	}
	$('#' + this.config.dom.audioSwitch + ' audio').prop('volume', 0.08);
}

// Clears an audio from the dom
YLearn.prototype.clearAudio = function(el){
	if ( el.length > 0) el.empty();
}

// Disables audio
YLearn.prototype.disableAudio = function(){
	this.audioEnabled = false;
	$('#' + this.config.dom.audioSwitch)
		.removeClass(this.config.dom.audioSwitch + '-enabled')
		.addClass(this.config.dom.audioSwitch + '-disabled');
	this.clearAudio( $('#' + this.config.dom.audioSwitch) );
}

// Enables or disables audio
YLearn.prototype.toggleAudio = function(){
    if (this.audioEnabled){
		this.disableAudio();
    }else{
		this.enableAudio();
    }
}
