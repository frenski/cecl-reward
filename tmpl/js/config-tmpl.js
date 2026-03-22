/**
 * templates config file
 * @author Yane Frenski / http://yane.fr/
 */

var YLEARN_TMPL_CONFIG = {};

YLEARN_TMPL_CONFIG.urls = {
	'contentUrl': '../lang/',
	'filesUrl': '../files/',
	'musicUrl': '../audio/music/',
	'voiceUrl': '../audio/voice/',
	'soundFxUrl': '../audio/effects/',
	'adminPutText': parent.YLEARN_CONFIG.env[parent.YLEARN_CONF_ENV].adminUrl+
		'?act=put_text&lang='+parent.YLEARN_CONFIG.lms.lang+'&course='+parent.YLEARN_CONFIG.lms.courseId+
		'&module={{moduleId}}&sec={{sectionId}}&page={{pageId}}',
 	'adminPutOrder': parent.YLEARN_CONFIG.env[parent.YLEARN_CONF_ENV].adminTmpl+'&act=order_list&course='+
		parent.YLEARN_CONFIG.lms.courseId+'&module={{moduleId}}&section={{sectionId}}',
  	'adminHidePage': parent.YLEARN_CONFIG.env[parent.YLEARN_CONF_ENV].adminTmpl+'&act=hide_page&course='+
		parent.YLEARN_CONFIG.lms.courseId+'&module={{moduleId}}&section={{sectionId}}&page={{pageId}}',
	'voiceUrl': '../voice/{{lang}}',
	'voiceTextUrl': '../voice/{{lang}}/voicetext{{moduleId}}-{{sectionId}}-{{pageId}}.json',
	'voiceDir': '../voice/{{lang}}/voicefiles{{moduleId}}-{{sectionId}}-{{pageId}}-',
	'soundsUrl': '../sounds/'
}

YLEARN_TMPL_CONFIG.dom = {
	'parentMainContainer': 'main-container',
	'animBlink': 'anim-blink',
	'triggerToggle': 'trigger-to-toggle',
	'triggerShow': 'trigger-to-show',
	'triggerPopup': 'trigger-to-popup',
	'popupGeneral': 'popup-general',
	'voiceFile':'voicefile',
	'soundFx':'soundfx',
	'soundfxContainer':'soundfx-container',
	'voiceContainer':'voice-container',
	'musicContainer':'music-container'
}

YLEARN_TMPL_CONFIG.videoTmpls = {
	'youtube':'<iframe src="//www.youtube.com/embed/{{ url }}?autoplay=1&controls=1&modestbranding=1&showinfo=0&rel=0&cc_load_policy=1&cc_lang_pref='+parent.YLEARN_CONFIG.lms.lang+'" frameborder="0" allowfullscreen></iframe>'
}
