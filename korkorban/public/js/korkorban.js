//cart/
		    $('.cartClick').on('click', function() {
		      $('.cartModal').css('display','block');
		    });
		    $('.closeBtnCartmodal').on('click', function() {
		      $('.cartModal').css('display','none');
		    });
//index/
    for (var i = 1; i < 11; i++) {
      (function(j) {
        $('.slider'+ j).each(function() {
          var $this = $(this);
          var $group = $this.find('.slide_group'+ j);
          var $slides = $this.find('.slide'+ j);
          var bulletArray = [];
          var currentIndex = 0;
          var timeout;
          
          function move(newIndex) {
            var animateLeft, slideLeft;
            
            advance();
            
            if ($group.is(':animated') || currentIndex === newIndex) {
              return;
            }
            
            bulletArray[currentIndex].removeClass('active');
            bulletArray[newIndex].addClass('active');
            
            if (newIndex > currentIndex) {
              slideLeft = '100%';
              animateLeft = '-100%';
            } else {
              slideLeft = '-100%';
              animateLeft = '100%';
            }
            
            $slides.eq(newIndex).css({
              display: 'block',
              left: slideLeft
            });
            $group.animate({
              left: animateLeft
            }, function() {
              $slides.eq(currentIndex).css({
                display: 'none'
              });
              $slides.eq(newIndex).css({
                left: 0
              });
              $group.css({
                left: 0
              });
              currentIndex = newIndex;
            });
          }
          
          function advance() {
            clearTimeout(timeout);
            timeout = setTimeout(function() {
              if (currentIndex < ($slides.length - 1)) {
                move(currentIndex + 1);
              } else {
                move(0);
              }
            }, 4000);
          }
          
          $('.next_btn'+ j).on('click', function() {
            if (currentIndex < ($slides.length - 1)) {
              move(currentIndex + 1);
            } else {
              move(0);
            }
          });
          
          $('.previous_btn'+ j).on('click', function() {
            if (currentIndex !== 0) {
              move(currentIndex - 1);
            } else {
              move(3);
            }
          });
          
          $.each($slides, function(index) {
            var $button = $('<a class="slide_btn"'+ j+'>&bull;</a>');
            
            if (index === currentIndex) {
              $button.addClass('active');
            }
            $button.on('click', function() {
              move(index);
            }).appendTo('.slide_buttons'+ j);
            bulletArray.push($button);
          });
          
          advance();
        });
      })(i);
    }
    //ladyproduct/
    		var numberlength = 14;

		for (var i = 1; i < numberlength; i++) {
		  (function(j) {
		    $('.ladyProduct' + j).on('click', function() {
		      $('.simpleModal' + j).css('display','block');
		    });
			$('.closeBtn' + j).on('click', function() {
		      $('.simpleModal' + j).css('display','none');
		    });
		  })(i);
		}

	//nav
			for (var i = 1; i < 11; i++) {
		  (function(j) {
		  	for (var y = 1; y < 11; y++) {
		  		$('.product' + y).css('display','none');
		  		$('.product' + 1).css('display','block');
			    $('.korkorban-li' + j).on('click', function() {
			    	for (var z = 1; z < 11; z++) {
			    		$('.product' + z).css('display','none');
			    		$('.product' + j).css('display','block');
			    		$('.korkorban-li' + z).css('color','gray');
			    		$('.korkorban-li' + z).css('font-weight','normal');
			    		$('.korkorban-li' + z).removeClass('korkorban-li-bottom');
			    		$('.korkorban-li' + j).addClass('korkorban-li-bottom');
			      		$('.korkorban-li' + j).css('color','#6a4057');
			      		$('.korkorban-li' + j).css('font-weight','700');
			      	}
			    });
			}
		  })(i);
		}
	//scroll/
	$(function() {

  $(document).ready(function() {

    var scrollOffset = $('.scroll').offset();

    $(window).scroll(function() {
      if ($(document).scrollTop() > scrollOffset.top) {
        $('.downprofile').css('display','block');
        $('.scroll').addClass('scroll-fixed');
          for (var z = 1; z < 11; z++) {
            $('.korkorban-li' + z).removeClass('korkorban-li-bottom');
          }
      }
      else {
        $('.downprofile').css('display','none');
        $('.scroll').removeClass('scroll-fixed');
      }
    });
  } );

});