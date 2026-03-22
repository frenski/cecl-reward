/**
 * config file
 * @author Yane Frenski / http://yane.fr/
 */

// var YLEARN_CONF_ENV = 'local';
var YLEARN_CONFIG = {};

YLEARN_CONFIG.lms = {
	'courseId': (typeof LMSVARS.courseId === 'undefined') ? 'en' : LMSVARS.courseId,
	'lang': (typeof LMSVARS.userlang === 'undefined') ? 'en' : LMSVARS.userlang,
	'isAdmin': (typeof LMSVARS.isAdmin === 'undefined') ? false : LMSVARS.isAdmin,
 	'isRtl': (typeof LMSVARS.isRtl === 'undefined') ? false : LMSVARS.isRtl
}

YLEARN_CONFIG.env = {
	'local': {
		'rootUrl':'http://localhost/agoralms/ccourses/'+YLEARN_CONFIG.lms.courseId+'/',
		'adminUrl':'http://localhost/agoralms/customadmin/admin-api.php',
	  	'adminTmpl':'http://localhost/agoralms/customadmin/tmpl_config.php?course='+YLEARN_CONFIG.lms.courseId,
		'trackerSaveUrl':'http://localhost/agoralms/customtracker/recorder.php?courseid='+YLEARN_CONFIG.lms.courseId+'&pageid='
	},
	'staging': {
		'rootUrl':'http://78.47.222.66/agoralms/ccourses/'+YLEARN_CONFIG.lms.courseId+'/',
		'adminUrl':'http://78.47.222.66/agoralms/customadmin/admin-api.php',
	  	'adminTmpl':'http://78.47.222.66/agoralms/customadmin/tmpl_config.php?course='+YLEARN_CONFIG.lms.courseId,
		'trackerSaveUrl':'http://78.47.222.66/agoralms/customtracker/recorder.php?courseid='+YLEARN_CONFIG.lms.courseId+'&pageid='
	},
	'production': {
		'rootUrl':'https://learn.agora-parl.org/ccourses/'+YLEARN_CONFIG.lms.courseId+'/',
		'adminUrl':'https://learn.agora-parl.org/customadmin/admin-api.php',
	  	'adminTmpl':'https://learn.agora-parl.org/customadmin/tmpl_config.php?course='+YLEARN_CONFIG.lms.courseId,
		'trackerSaveUrl':'https://learn.agora-parl.org/ccourses/customtracker/recorder.php?courseid='+YLEARN_CONFIG.lms.courseId+'&pageid='
	}
}

YLEARN_CONFIG.urls = {
	'rootUrl': 'http://localhost/agoralms/ccourses/13/',
	'schemaUrl': 'modules/'+NAVVARS.moduleId+'/schema-'+YLEARN_CONFIG.lms.lang+'.json',
	'titlesUrl': 'lang/'+YLEARN_CONFIG.lms.lang+'/titles.json',
	'contentUrl': 'lang/'+YLEARN_CONFIG.lms.lang+'/',
	'tmplUrl': 'tmpl/',
	'tmplUrlArgs':'page_id,section_id,module_id,lang,is_admin,theme,callback,resize_callback,done_callback,navigation_hide_show,audio',
	'musicUrl':'audio/music/',
	'soundsEfxUrl':'audio/effects/'
}

YLEARN_CONFIG.schema = {
	'leftIndicatorsType': 'section',
	'leftIndicatorsFirst': 0,
	'units': [
		{"title":"Section 1", "theme":"yellow"},
		{"title":"Section 2", "theme":"yellow"},
		{"title":"Section 3", "theme":"yellow"},
		{"title":"Section 4", "theme":"yellow"},
		{"title":"Section 5", "theme":"yellow"},
		{"title":"Section 6", "theme":"yellow"},
		{"title":"Section 7", "theme":"yellow"},
		{"title":"Section 8", "theme":"yellow"}
  ]
}

YLEARN_CONFIG.dom = {
	'mainContainer': 'main-container',
	'leftIndicatorsWrapper': '.section-indicators',
	'leftIndicatorItem': 'section-indicator',
	'leftIndicatorSVG': '#section-indicator-svg',
	'navPages': 'nav-pages',
	'pageIndicator': 'page-indicator',
	'titleMain': '.title-main',
	'titleSub': '.title-subtitle',
	'titleSection': 'title-section',
	'titleModule': 'title-module',
	'popupFull': 'popup-fullscreen',
	'tmplWrapper': 'tmpl-wrapper',
	'audioSwitch': 'audioswitch',
	'slidingMenu': '.sliding-menu',
	'slidingMenuWrapper': '.sliding-menu-wrapper',
	'slidingMenuWrapperVisible': 'sliding-menu-wrapper-vis',
	'slidingMenuLinks': '#sliding-menu-links',
	'slidingMenuSubunit':'.sliding-menu-subunit',
	'slidingMenuSubunitButton':'#menu-button',
	'slidingMenuSubunitButtonClose':'menu-button-close',
	'slidingMenuButton':'sliding-menu-button',
	'slidingMenuButtonOpen':'sliding-menu-button-open'
}
