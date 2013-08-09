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
	Platform.addDOMClass();
	init();	
});
