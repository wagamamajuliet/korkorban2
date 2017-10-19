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