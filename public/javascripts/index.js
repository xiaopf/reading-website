$(document).ready(function(){
	$('#toTop').hide();
	$(window).scroll(function(){
	    if(($(window).scrollTop())>10){
	    	if($('#toTop')[0].style.display=='none'){
				$('#toTop').show();
	    	}
		}else{
			$('#toTop').hide();
		}
	});
});