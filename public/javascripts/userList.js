$(document).ready(function(){
	
	$("a,button").focus(function(){this.blur()});

	$('.delete').click(function(){
		if(confirm('Are you sure?')){
			$(this).parent().parent().hide();
				
			var name=$(this).attr('User');

			$.ajax({
				url:'http://localhost:3000/admin/userList/deleteUser',
				data:{'name':name},
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
});