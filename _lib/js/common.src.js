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
		var isotopeRequired = Modernizr.mediaqueries ? !Modernizr.mq(mqStates.max400) : $(window).width() > 400;
		//toggle isotope
		if (isotopeRequired) {
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
/* initClickLoading */
/* ------------------------------------------------------------------------------ */
function initClickLoading(){
	//vars
	var $container = $('.isotopeContainer'),
		$btnLoad = $('#btnLoadMore'),
		loadingCls = 'loading',
		errorCls = 'error',
		url = 'ajax-items.html';
	
	//loadMoreItem
	function loadMoreItem(targetURL){
		//vars
		var request,
			thisObj = this,
			url = targetURL;
	
		//abort if no url or in request already
		if (!url || this.inRequest) return false;
	
		//otherwise set in request status and show loader
		this.inRequest = true;
	
		//show loader
		$btnLoad.removeClass(errorCls);
		$btnLoad.addClass(loadingCls);
	
		//make request call
		request = $.ajax({
			url:		url,
			type:		'GET',
			dataType:	'html',
			success:	function(data, textStatus, jqXHR) {
							//alert('getPage: success');
							console.log('[loadMoreItem]: success');
							//apply data
							addNewItems(data);
						},
			complete:	function(jqXHR, textStatus) {
							//alert('getPage: complete');
							console.log('[loadMoreItem]: complete');
							thisObj.inRequest = false;
							//hide loader
							$btnLoad.removeClass(loadingCls);
						},
			error:		function(jqXHR, textStatus, errorThrown) {
							//alert('getPage: error', textStatus, errorThrown);
							console.log('[loadMoreItem]: error', textStatus, errorThrown);
							$btnLoad.addClass(errorCls);
						}
		});
	}	
	
	//addNewItems
	function addNewItems(data){
		//console.log(data);
		var $newItems = $(data),
			isotopeRequired = Modernizr.mediaqueries ? !Modernizr.mq(mqStates.max400) : $(window).width() > 400;
		//adding to DOM
		$container.append($newItems)
		if (isotopeRequired) {
			$container.imagesLoaded(function(){
				$container.isotope('appended', $newItems);
			});
		}
	}
	
	//bind behavior
	$btnLoad.click(function(e){
		e.preventDefault();
		loadMoreItem(url);
	});
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
	
	//initClickLoading
	initClickLoading();
	
}
/* DOM.ready */
$(document).ready(function(){
	console.log('dom ready');
	initWebFontLoader();
	Platform.addDOMClass();
	init();	
});




