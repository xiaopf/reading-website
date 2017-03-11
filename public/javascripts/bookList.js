$(document).ready(function(){

	$("a,button").focus(function(){this.blur()});

	$('.delete').click(function(){
		if(confirm('Are you sure?')){
			$(this).parent().parent().hide();	
			var _id=$(this).attr('bookId');

			$.ajax({
				url:'http://localhost:3000/admin/bookList/deleteBook',
				data:{'id':_id},
				type:'DELETE',
				success:function(data){
					$('#msg').html(data);
					$('.msg_wrap').show();
					setTimeout(function(){
						$('.msg_wrap').hide();
					},3000);
				}
			});

		};	
	});
})