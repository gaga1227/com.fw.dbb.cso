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
/* initIsotope */
/* ------------------------------------------------------------------------------ */
function initIsotope(){
	//vars
	var $container = $('.isotopeContainer'),
		colW = 320,
		isotopeIsOn = false;
	//update handler
	function update(){
		//check mq
		var isotopeOn = !Modernizr.mq(mqStates.max400);
		//toggle isotope
		if (isotopeOn) {
			//check flag
			if (isotopeIsOn) return '[isotope] already on';
			//update flag
			isotopeIsOn = true;
			//imagesLoaded
			$container.imagesLoaded(function(){
				//isotope
				$container.isotope({
					itemSelector:	'.item.tile',
					layoutMode:		'masonry',
					masonry:		{ columnWidth: colW }
				}, function($items){
					console.log('[isotope] anim complete');	
				});
				console.log('[isotope] initialised');
				
			});	
		} else {
			//check flag
			if (!isotopeIsOn) return '[isotope] already off';
			//update flag
			isotopeIsOn = false;
			//destroy
			$container.isotope('destroy');
			console.log('[isotope] destroyed');
		}	
	}
	//init call
	update();
	//bind update to window resize
	$(window).bind('resize', update);
}
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
	}
	if ( $('body.landing').length ) {
		initLanding();
	} else {
		//media
		StaticAudios = new initStaticAudios();
		StaticVideos = new initStaticVideos();
		
		//form
		initDatepicker();
	}
	
	//debug
	displayDebugInfo('#debugInfo');
	
}
function initHome(){
	
	//layout assistance
	
}
function initLanding(){
	
	//isotope tiles
	initIsotope();
	
}
/* DOM.ready */
$(document).ready(function(){
	console.log('dom ready');
	initWebFontLoader();
	Platform.addDOMClass();
	init();	
});




