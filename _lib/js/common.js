/* ------------------------------------------------------------------------------ */
/* webfonts */
/* ------------------------------------------------------------------------------ */
WebFontConfig = { 
	google: 		{ families: [ 'Merriweather:400,700:latin', 'Montserrat:400,700:latin' ] },
	loading: 		function() { console.log('wf loading'); },
	active: 		function() { console.log('wf active'); },
	inactive: 		function() { console.log('wf inactive'); },
	fontloading: 	function( familyName, fvd ) { console.log( familyName, fvd, 'loading' ); },
	fontactive: 	function( familyName, fvd ) { console.log( familyName, fvd, 'active' ); },
	fontinactive: 	function( familyName, fvd ) { console.log( familyName, fvd, 'inactive' ); } 
};
/* ------------------------------------------------------------------------------ */
/* init */
/* ------------------------------------------------------------------------------ */
var SelectNav, Slideshows, StaticAudios, StaticVideos;
function init(){
	
	//layout assistance
	insertFirstLastChild('#navItems, #sideNav, #sideNav ul');
	
	//interactions	
	SelectNav = new initSelectNav();
	
	//media
	Slideshows = initSlideshows();
	
	//template specific functions
	if ( $('body#home').length ) {
		initHome();
	} else {
		//enhance forms
		
		//media
		StaticAudios = new initStaticAudios();
		StaticVideos = new initStaticVideos();		
	}

	//css3pie rendering
	//initCSS3PIE();
	
	//debug
	displayDebugInfo('#debugInfo');
	
}
function initHome(){
	
	//layout assistance
	
}
/* DOM.ready */
$(document).ready(function(){
	initWebFontLoader();
	Platform.addDOMClass();
	init();	
});
