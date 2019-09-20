$(document).ready(function () {

	$.ajax({
		url: '/',
		type: 'GET',
		success: function (result) {
			// console.log(result);
			
			// console.log(result.posts.length);
			// console.log(result.user);
			
		// for(let i=0; i < result.posts.length; i++) { 
		// 	// console.log(result.posts[i].author_ID.userName);

		// 	$("#showallpostsuser").append('<div class="col-12 col-md-6 col-xl-4 mt-5 d-flex justify-content-center"><div class="card" style="width: 18rem;"><img src="../../uploads/articleImage/'+result.posts[i].articleImage+'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">'+result.posts[i].articleTitle+' </h5><p class="card-text showMore">'+result.posts[i].articleContent+'</p></div><ul class="list-group list-group-flush"><li class="list-group-item">author name : '+result.posts[i].author_ID.userName+' </li><li class="list-group-item" style="font-size: 12px;">create date : '+result.posts[i].created_at.slice(0,10)+'</li><li hidden id="'+result.posts[i]._id+'" class="list-group-item ids"></li></ul><div class="card-body"><a class="btn btn-primary" href="../user/showpost'+result.posts[i]._id+'" role="button" id="moreInfo">more info</a><br></div></div></div>');
			
		// 	// $("#messages-view-post").append('behnam');
		// 		}
				},
		error: function (err) {
			console.log(err);
		}
	})
});

(function ($) {

    "use strict";

	enableSwiper();
	
	$('[data-nav-menu]').on('click', function(event){
		
		var $this = $(this),
			visibleHeadArea = $this.data('nav-menu');
		
		$(visibleHeadArea).toggleClass('visible');
		
	});
	

})(jQuery);


function enableSwiper(){
	
	if ( isExists('.swiper-container') ) {
		
		$('.swiper-container').each(function (index) {
			
			var swiperDirection 			= $(this).data('swiper-direction'),
				swiperSlidePerView			= $(this).data('swiper-slides-per-view'),
				swiperBreakpoints			= $(this).data('swiper-breakpoints'),
				swiperSpeed					= $(this).data('swiper-speed'),
				swiperCrossFade				= $(this).data('swiper-crossfade'),
				swiperLoop					= $(this).data('swiper-loop'),
				swiperAutoplay 				= $(this).data('swiper-autoplay'),
				swiperMousewheelControl 	= $(this).data('swiper-wheel-control'),
				swipeSlidesPerview 			= $(this).data('slides-perview'),
				swiperMargin 				= parseInt($(this).data('swiper-margin')),
				swiperSlideEffect 			= $(this).data('slide-effect'),
				swiperAutoHeight 			= $(this).data('autoheight'),
				swiperScrollbar 			= ($(this).data('scrollbar') ? $(this).find('.swiper-scrollbar') : null);
				swiperScrollbar 			= (isExists(swiperScrollbar) ? swiperScrollbar : null);
				
			
			var swiper = new Swiper($(this)[0], {
				pagination			: $(this).find('.swiper-pagination'),
				
				
				slidesPerView		: ( swiperSlidePerView ? swiperSlidePerView : 1 ),
				direction			: ( swiperDirection ? swiperDirection : 'horizontal'),
				loop				: ( swiperLoop ? swiperLoop : false),
				nextButton			: '.swiper-button-next',
				prevButton			: '.swiper-button-prev',
				autoplay			: ( swiperAutoplay ? swiperAutoplay : false),
				paginationClickable	: true,
				spaceBetween		: ( swiperMargin ? swiperMargin : 0),
				mousewheelControl	: ( (swiperMousewheelControl) ? swiperMousewheelControl : false),
				scrollbar			: ( swiperScrollbar ? swiperScrollbar : null ),
				scrollbarHide		: false,
				speed				: ( swiperSpeed ? swiperSpeed : 1000 ),
				autoHeight			: ( (swiperAutoHeight == false) ? swiperAutoHeight : true ),
				effect				: ( swiperSlideEffect ? swiperSlideEffect : 'coverflow' ),
				fade				: { crossFade: swiperCrossFade ? swiperCrossFade : false },
				breakpoints			: {
											1200: { slidesPerView: swiperBreakpoints ? 3 : 1, },
											992: { slidesPerView: swiperBreakpoints ? 2 : 1, },
											580: { slidesPerView: 1, }
											
										},
			});
			
		});
		
	}
}

function isExists(elem){
	if ($(elem).length > 0) { 
		return true;
	}
	return false;
}



$('#carouselExample').on('slide.bs.carousel', function (e) {

  
    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 4;
    var totalItems = $('.carousel-item').length;
    
    if (idx >= totalItems-(itemsPerSlide-1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i=0; i<it; i++) {
            // append slides to end
            if (e.direction=="left") {
                $('.carousel-item').eq(i).appendTo('.carousel-inner');
            }
            else {
                $('.carousel-item').eq(0).appendTo('.carousel-inner');
            }
        }
    }
});


  $('#carouselExample').carousel({ 
                interval: 2000
        });


  $(document).ready(function() {
/* show lightbox when clicking a thumbnail */
    $('a.thumb').click(function(event){
      event.preventDefault();
      var content = $('.modal-body');
      content.empty();
        var title = $(this).attr("title");
        $('.modal-title').html(title);        
        content.html($(this).html());
        $(".modal-profile").modal({show:true});
    });

  });