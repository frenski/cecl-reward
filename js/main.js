/**
 * Main init jasvascript
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


/**
 * Instantiates the yLearn class
 */
var yLearn = new YLearn( YLEARN_CONFIG, YLEARN_CONF_ENV, YLEARN_THEME_VARS, NAVVARS, LMSVARS );


/**
 * Document ready
 */

$(document).ready(function(){

	var domConf = YLEARN_CONFIG.dom;
	var arrVis = {
		'left': true,
		'right': true
	}

	var saveProgress = function() {
		$.get(YLEARN_CONFIG.env[parent.YLEARN_CONF_ENV].trackerSaveUrl
			+ yLearn.getCurrentPage());
	}

	// A function to hide the navigation arrows
	var hideArrVis = function(dir) {
		var curPage = yLearn.getCurrentPage();
		var seqPage = (dir == 'left') ?
			yLearn.getPrevPage(curPage): yLearn.getNextPage(curPage);
		if( seqPage == -1 && arrVis[dir] ) {
			$('.'+domConf.navPages+'-'+dir).fadeOut();
			arrVis[dir] = false;
		}
	}

	// A function to hide the navigation arrows
	var showArrVis = function(dir) {
		var curPage = yLearn.getCurrentPage();
		var seqPage = (dir == 'left') ?
			yLearn.getPrevPage(curPage): yLearn.getNextPage(curPage);
		if( seqPage != -1 && !arrVis[dir] ) {
			$('.'+domConf.navPages+'-'+dir).fadeIn();
			arrVis[dir] = true;
		}
	}

	// A function to update all the arrows visibility
	var updateArrVis = function() {
		hideArrVis('left');
		hideArrVis('right');
		showArrVis('left');
		showArrVis('right');
	}


	// A function to ipdate module titles
	var updateModuleTitles = function(){
		var modTitles = yLearn.getModuleTitles();
		$(YLEARN_CONFIG.dom.titleMain).text(modTitles.mainTitle);
		$(YLEARN_CONFIG.dom.titleSub).text(modTitles.subTitle);
		// $(YLEARN_CONFIG.dom.slidingMenuLinks)

		var unitLiTmpl = '<li id="sliding-menu-unit{{UNIT_ID}}" class="sliding-menu-unit"><a href="#page={{UNIT_PAGE}}">{{UNIT}}</a></li>';
		var subunitLiTmpl = '<li class="sliding-menu-subunit"><a href="#page={{SUBUNIT_PAGE}}">{{SUBUNIT}}</a></li>';

		for (var i=0; i<modTitles.module.sections.length; i++) {
			var unitHtml = modTitles.module.sections[i].title + '<ul>';
			for (var j=0; j<modTitles.module.sections[i].subsections.length; j++) {
				subunitHtmlFinal = subunitLiTmpl.replace('{{SUBUNIT}}',
					modTitles.module.sections[i].subsections[j].title)
					.replace('{{SUBUNIT_PAGE}}',
					modTitles.module.sections[i].subsections[j].startPage)
				unitHtml += subunitHtmlFinal;
			}
			unitHtml += '</ul>';
			let fPage = yLearn.getModileFirstPage(i);
			unitHtmlFinal = unitLiTmpl
				.replace('{{UNIT}}', unitHtml)
				.replace('{{UNIT_ID}}', i)
				.replace('{{UNIT_PAGE}}', fPage.id);
			$(YLEARN_CONFIG.dom.slidingMenuLinks).append(unitHtmlFinal);

		}

	}


	// A function to update the section title on the top
	var updateUnitTitle = function() {

		var modTitles = yLearn.getModuleTitles();
		var curPage = yLearn.getCurrentPage();
		var curSec = yLearn.getCurrentSection();

		if( YLEARN_CONFIG.schema.leftIndicatorsType == 'section' ){
			// var pageStat = yLearn.getPageUnitStatus( curPage, true );
			var pageSecTitle = modTitles.module.sections[curSec].title;
		}else{
			// var pageStat = yLearn.getPageSectionStatus( curPage, false );
			var pageSecTitle = modTitles.module.title;
		}

		$('.sliding-menu-unit').removeClass('sliding-menu-unit-current');
		$('#sliding-menu-unit'+curSec).addClass('sliding-menu-unit-current');
	}


	// Updates the icon for the indicators of the units
	var updateUnitIcons = function() {
		var curUnitId = NAVVARS.moduleId;
		if( YLEARN_CONFIG.schema.leftIndicatorsType == 'section' ){
			curUnitId = yLearn.getCurrentSection() + 1;
		}
		$('.'+YLEARN_CONFIG.dom.leftIndicatorItem).text(curUnitId);
	}

	// A function to reset the background color of the main-content element
	// that might have been changed by some pages
	var resetBackColour = function(){
		$('.'+YLEARN_CONFIG.dom.mainContainer).css('background','#fff');
	}

	// A function to call the updates when changing a page
	var pageChangeUpdate = function(){
		updateUnitTitle();
		updateArrVis();
		updateUnitIcons();
	}

	// A function that loads the template into the iframe
	var pageLoad = function ( page ){
		$('.nav-pages-item-in').remove();
		resetBackColour();
		var tmplUrl = yLearn.generateTmplUrl( yLearn.getCurrentPage() );
		$('#'+YLEARN_CONFIG.dom.tmplWrapper).attr('src', tmplUrl);
		NAVVARS.tmplParams = page.tmplParams;
	}

	// To be called after the template / frame has loaded the content
	var iframeResize = function () {
		var tmplFr = document.getElementById(YLEARN_CONFIG.dom.tmplWrapper);
		if(tmplFr) {
			var newH = tmplFr.contentWindow.document.body.scrollHeight + 60;
			$(".main").height(newH);
			tmplFr.height = newH + "px";
			$(window).trigger('resize');
	    }
	}

	var addExtraTmplClasses = function (clList) {
		var tmplFr = document.getElementById(YLEARN_CONFIG.dom.tmplWrapper);
		if(tmplFr) {
			for (var i=0; i<clList.length; i++) {
				tmplFr.contentWindow.document.body.classList.add(clList[i]);
			}
		}
	}

	// To be called after the template has been loaded
	var tmplLoad = function(){
		iframeResize();
		var clList = [];
		if (LMSVARS.isRtl) {
			clList.push('rtl');
		}
		addExtraTmplClasses(clList);
	}

	// To be called after the action required by the user has finished
	var actionDone = function(el){
		if( yLearn.getNextPage( yLearn.getCurrentPage() ) ){
			if (typeof el === 'string') {
				if (el === '') {
					$('.'+YLEARN_CONFIG.dom.mainContainer).append(
						'<a href="#" class="nav-pages-item-in nav-pages-item-inner-arrow anim-blink'+
						' nav-pages-right">&gt;</a>');
				} else {
					$('.'+YLEARN_CONFIG.dom.mainContainer).append(
						'<a href="#" class="nav-pages-item-in nav-pages-item-inner-text anim-blink'+
						' nav-pages-right">'+txt+'</a>');
				}
			} else {
				el.click (function(){
					clickRight();
				});
			}
			$('.nav-pages-item-in').hide();
			$('.nav-pages-item-in').delay(1000).fadeIn(1000);
		}
	}

	// A function to call the popup with the wrong page message
	var wrongPageUI = function(){
		$('.'+YLEARN_CONFIG.dom.popupFull).fadeIn();
		var modTitles = yLearn.getModuleTitles();
		$('.'+YLEARN_CONFIG.dom.popupFull+'-message')
			.text(modTitles.sysMessages.wrongPage);
	}

	// A function to load the unit indicators on the left side
	var addUnitIndicators = function(){
		for ( var i=YLEARN_CONFIG.schema.units.length-1; i>=0; i-- ){
			$( YLEARN_CONFIG.dom.leftIndicatorsWrapper ).prepend(
				'<a href="#" class="'+YLEARN_CONFIG.dom.leftIndicatorItem + ' '
				+ YLEARN_CONFIG.dom.leftIndicatorItem + (i + 1) +'"></a>');
		}
	}

	// A function to add the admin markup if is admin
	var addAdminMarkup = function(){
		if( LMSVARS.isAdmin ) {
			$('body').append('<div id="admin-indicator">Admin mode</div>');
		}
	}

	var clickRight = function(){
		if( yLearn.goToPage( yLearn.getNextPage( yLearn.getCurrentPage() ) ) ){
			hideArrVis('right');
			showArrVis('left');
			updateUnitTitle();
			updateUnitIcons();
		}
		saveProgress();
		return false;
	}

	var clickLeft = function(){
		if( yLearn.goToPage( yLearn.getPrevPage( yLearn.getCurrentPage() ) ) ){
			hideArrVis('left');
			showArrVis('right');
			updateUnitTitle();
			updateUnitIcons();
		}
		saveProgress();
		return false;
	}

	var navHideShowHide = function() {
		$('.'+domConf.navPages+'-left').fadeOut();
		$('.'+domConf.navPages+'-right').fadeOut();
	}

	var navHideShowShow = function() {
		$('.'+domConf.navPages+'-left').fadeIn();
		$('.'+domConf.navPages+'-right').fadeIn();
		updateArrVis();
	}

	var menuHideShow = function() {
		$(YLEARN_CONFIG.dom.slidingMenuWrapper)
			.toggleClass(YLEARN_CONFIG.dom.slidingMenuWrapperVisible);
		$('#'+YLEARN_CONFIG.dom.slidingMenuButton)
			.toggleClass(YLEARN_CONFIG.dom.slidingMenuButtonOpen);
		return false;
	}


	/**
	 * Init calls
	 */

	$.ajaxSetup ({ cache: false }); //can be removed for production

	// Updates root URL for the wrong page popup
	$('.'+YLEARN_CONFIG.dom.popupFull).hide();
	$('.'+YLEARN_CONFIG.dom.popupFull).attr('href',YLEARN_CONFIG.urls.rootUrl);

	// Adds the left-hand indicators
	// addUnitIndicators();

	// Adds the admin code
	addAdminMarkup();

	// Inits the library
	yLearn.initModule( updateModuleTitles, pageLoad,
					   pageChangeUpdate, wrongPageUI,
					   tmplLoad, iframeResize,
					   actionDone, navHideShowHide, navHideShowShow);

	updateUnitIcons();

	/**
	 * DOM Events
	 */

	$( document ).on( "click", '.nav-pages-right', clickRight );
	$( document ).on( "click", '.nav-pages-left', clickLeft );

	$( document ).on( "click" , '.'+YLEARN_CONFIG.dom.leftIndicatorItem,
		function(e) {
		e.preventDefault();
		menuHideShow();
	});

	$( document ).on( "click" , '#'+YLEARN_CONFIG.dom.slidingMenuButton,
		function(e) {
		e.preventDefault();
		menuHideShow();
	});

	$( document ).on( "click", YLEARN_CONFIG.dom.slidingMenuSubunit + ' a',
		function(){
		$(YLEARN_CONFIG.dom.slidingMenuSubunitButton)
			.toggleClass(YLEARN_CONFIG.dom.slidingMenuSubunitButtonClose);
		// menuHideShow();
	})

	$( document ).on( "click", YLEARN_CONFIG.dom.slidingMenuSubunitButton,
		function(){
		$(YLEARN_CONFIG.dom.slidingMenuSubunitButton)
			.toggleClass(YLEARN_CONFIG.dom.slidingMenuSubunitButtonClose);
		// menuHideShow();
	})

	$( document ).on( "click", '#' + YLEARN_CONFIG.dom.audioSwitch, function(){
		yLearn.toggleAudio();
	});


});
