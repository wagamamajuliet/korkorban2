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