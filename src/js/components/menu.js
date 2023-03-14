$( document ).ready(function() {
	$("body" ).on( "click", ".icon-sub-menu", function() {
	  	$(this).toggleClass('active');
	  	$(this).next(".sub-menu").toggleClass('show');
	});
	$("body" ).on( "click", ".open-menu", function() {
	  	$(".menu").toggleClass('active');
	});
});