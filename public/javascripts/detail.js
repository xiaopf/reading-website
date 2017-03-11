$(document).ready(function(){
    $("a,button").focus(function(){this.blur()});

	Date.prototype.Format = function (fmt) { //author: meizz 
	    var o = {
	        "M+": this.getMonth() + 1, //月份 
	        "d+": this.getDate(), //日 
	        "h+": this.getHours(), //小时 
	        "m+": this.getMinutes(), //分 
	        "s+": this.getSeconds(), //秒 
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	        "S": this.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	}

	let book_id =$('#bookTitle').attr('_id');
	let from_id =$('#header_a').attr('_id');

	let src     =$('.header_pic').attr('src');
	let name    =$('#header_a').attr('name');

	var to_id,to_name;
	 
	$('#reply_btn').click(function(){

		let r_con = $('#reply_content').val();

		$.ajax({
			type:'post',
			data:{
				'book_id'      :book_id,
				'reply_from_id':from_id,
				'reply_content':r_con,
			},
			url:'http://localhost:3000/addDiscuss',
			success:function(discuss_id){	
                  
			        $('#content')[0].innerHTML+=
			        '<div class="item new">'+
				        '<img src="'+src+'" class="r_head_pic"><div class="r_name_con"><a href="#">'+name +'</a><p class="r_content">'+r_con+'</p>'+	
					        '<div class="r_info"><p class="time">'+new Date().Format("yyyy-MM-dd hh:mm:ss")+'</p>&nbsp'+
						        '<button type="button" class="r_btn" _id="'+from_id+'" name="'+name +'"  data-toggle="modal" data-target="#myModal">&nbsp<span class="glyphicon glyphicon-share-alt"></span>&nbsp回复</button>'+
						        
						        '<button type="button" class="z_btn" discuss_id="'+discuss_id+'" z_toggle="z">'+
							        '<span class="glyphicon glyphicon-thumbs-up"></span><span class="z">&nbsp赞&nbsp</span>	'+
						        '</button>'+

						        '<button type="button" class="c_btn" discuss_id="'+discuss_id+'" c_toggle="c">'+
				               		'<span class="glyphicon glyphicon-thumbs-down"></span><span class="c">&nbsp踩&nbsp</span>'+
			               		'</button>'+

			               		'<button type="button" class="d_btn" discuss_id="<%= item._id%>">'+
				               		'<span class="glyphicon glyphicon-trash"></span><span class="c">&nbsp删除</span>'+
			               		'</button>'+


								'<div class="z_c">'+
								   		'<p class="z_con"><span class="z_count"><span class="like_count">0</span></span>&nbsp赞</p>&nbsp/&nbsp'+
										'<p class="c_con"><span class="c_count"><span class="unlike_count">0</span></span>&nbsp踩</p>'+                       	
								'</div>'+

					        '</div>'+
				        '</div>'+
			        '</div>';
			}
		});

		$('#reply_content').val('');
	});




	$('#content').on('click','.r_btn',function(){
		
		to_id =$(this).attr('_id');
		to_name =$(this).attr('name');

		$('#myModalLabel')[0].innerHTML='回复：'+to_name;


	});

	$('#modal_reply_btn').click(function(){
		
		let r_con   =$('#modal_reply_con').val();

		$.ajax({
			type:'post',
			data:{
				'book_id'      :book_id,
				'reply_from_id':from_id,
				'reply_to_id'  :to_id,
				'reply_content':r_con,
			},
			url:'http://localhost:3000/addDiscuss',
			success:function(discuss_id){
			        $('#content')[0].innerHTML+=
					'<div class="item">'+
					    '<img src="'+src+'" class="r_head_pic">'+
					    '<div class="r_name_con">'+
					        '<a href="#">'+name +'</a>&nbsp&nbsp回复：<a href="#">'+to_name+'</a>'+
					        '<p class="r_content">'+r_con+'</p>	'+
					        '<div class="r_info">'+
						        '<p class="time">'+new Date().Format("yyyy-MM-dd hh:mm:ss")+'</p>&nbsp'+
						        '<button type="button" class="r_btn" _id="'+from_id+'" name="'+name +'"  data-toggle="modal" data-target="#myModal">&nbsp<span class="glyphicon glyphicon-share-alt"></span>&nbsp回复</button>'+
						        
						        '<button type="button" class="z_btn" discuss_id="'+discuss_id+'" z_toggle="z">'+
							        '<span class="glyphicon glyphicon-thumbs-up"></span><span class="z">&nbsp赞&nbsp</span>	'+
						        '</button>'+

						        '<button type="button" class="c_btn" discuss_id="'+discuss_id+'" c_toggle="c">'+
				               		'<span class="glyphicon glyphicon-thumbs-down"></span><span class="c">&nbsp踩&nbsp</span>'+
			               		'</button>'+

			               		'<button type="button" class="d_btn" discuss_id="<%= item._id%>">'+
				               		'<span class="glyphicon glyphicon-trash"></span><span class="c">&nbsp删除</span>'+
			               		'</button>'+

								'<div class="z_c">'+
								   		'<p class="z_con"><span class="z_count"><span class="like_count">0</span></span>&nbsp赞</p>&nbsp/&nbsp'+
										'<p class="c_con"><span class="c_count"><span class="unlike_count">0</span></span>&nbsp踩</p>'+                       	
								'</div>'+

					        '</div>'+
					    '</div>'+
					'</div>';
			}
		});

		$('#modal_reply_con').val('');
	});



	$('#content').on('click','.z_btn',function(){

		let discuss_id=$(this).attr('discuss_id');
		let count=parseInt($(this).siblings('.z_c').find('.like_count').html());

		let from_id_arr;

		if($(this).attr('z_toggle')=='z'){
            count++;
            from_id_arr=['push',from_id]
			$(this).siblings('.z_c').find('.like_count').html(count);
	        $(this).find('.z').html('&nbsp取消赞');	
	        $(this).attr('z_toggle','nz')		
		}else{
            count--;
            from_id_arr=['remove',from_id]
			$(this).siblings('.z_c').find('.like_count').html(count);
			$(this).find('.z').html('&nbsp赞');
			$(this).attr('z_toggle','z')
		};

		$.ajax({
			type:'get',
			data:{
				discuss_id:discuss_id,
				count:count,
				from_id_arr:from_id_arr,
			},
			url:'http://localhost:3000/upadateLike',
		});

	});



	$('#content').on('click','.c_btn',function(){

		let discuss_id=$(this).attr('discuss_id');
        let count=parseInt($(this).siblings('.z_c').find('.unlike_count').html());
        let from_id_arr;

		if($(this).attr('c_toggle')=='c'){
            count++;
            from_id_arr=['push',from_id]
			$(this).siblings('.z_c').find('.unlike_count').html(count);
	        $(this).find('.c').html('&nbsp取消踩');	
	        $(this).attr('c_toggle','nc')	  
		}else{
            count--;
            from_id_arr=['remove',from_id]
			$(this).siblings('.z_c').find('.unlike_count').html(count);
			$(this).find('.c').html('&nbsp踩');
			$(this).attr('c_toggle','c')
		};

		$.ajax({
			type:'get',
			data:{
				discuss_id:discuss_id,
				count:count,
				from_id_arr:from_id_arr,
			},
			url:'http://localhost:3000/upadateUnlike',
		});

	});


	$('#content').on('click','.d_btn',function(){
		let discuss_id=$(this).attr('discuss_id');

		if(confirm('Are you sure?')){
			$(this).parent().parent().parent().remove();
			$.ajax({
				type:'delete',
				data:{discuss_id:discuss_id,},
				url:'http://localhost:3000/deleteDiscuss',
				success:function(data){
					console.log(data)
				};
			});
		};
	});
});



