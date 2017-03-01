$(document).ready(function(){
	$("a,button").focus(function(){this.blur()});

	$('.delete').click(function(){
		if(confirm('Are you sure?')){
			$(this).parent().parent().hide();	
		};	
		var _id=$(this).attr('bookId');
		console.log(_id)
		$.ajax({
			url:'http://localhost:3000/admin/bookList/deleteBook',
			data:{'id':_id},
			type:'DELETE',
			success:function(data){
				console.log(data);
			}
		})
	});


})