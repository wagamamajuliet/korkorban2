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