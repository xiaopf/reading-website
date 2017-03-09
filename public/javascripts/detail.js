$(document).ready(function(){
    
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

        $('#content')[0].innerHTML+=
        '<div class="item">'+
	        '<img src="'+src+'" class="r_head_pic"><div class="r_name_con"><a href="#">'+name +'</a><p class="r_content">'+r_con+'</p>'+	
		        '<div class="r_info"><p class="time">'+new Date().Format("yyyy-MM-dd hh:mm:ss")+'</p>&nbsp'+
			        '<button type="button" class="r_btn" _id="'+from_id+'" name="'+name +'"  data-toggle="modal" data-target="#myModal"><span class="glyphicon glyphicon-share-alt"></span>&nbsp回复</button>'+
			        '<button type="button" class="z_btn"><span class="glyphicon glyphicon-thumbs-up"></span>&nbsp赞</button>'+
			        '<button type="button" class="c_btn"><span class="glyphicon glyphicon-thumbs-down"></span>&nbsp踩</button>'+
			        '<div class="z_c">'+
	               		'<p class="z_con"><span class="z_count">11</span>&nbsp赞</p>'+
	               		'<p class="c_con"><span class="c_count">11</span>&nbsp踩</p>'+                         	
                    '</div>'+
		        '</div>'+
	        '</div>'+
        '</div>';
		
		$.ajax({
			type:'post',
			data:{
				'book_id'      :book_id,
				'reply_from_id':from_id,
				'reply_content':r_con,
			},
			url:'http://localhost:3000/addDiscuss',
		});
		$('#reply_content').val('');
	});




	$('.r_btn').click(function(){
		to_id =$(this).attr('_id');
		to_name =$(this).attr('name');
	});

	$('#modal_reply_btn').click(function(){
		
		let r_con   =$('#modal_reply_con').val();

        $('#content')[0].innerHTML+=
		'<div class="item">'+
		    '<img src="'+src+'" class="r_head_pic">'+
		    '<div class="r_name_con">'+
		        '<a href="#">'+name +'</a>&nbsp回复：<a href="#">'+to_name+'</a>'+
		        '<p class="r_content">'+r_con+'</p>	'+
		        '<div class="r_info">'+
			        '<p class="time">'+new Date().Format("yyyy-MM-dd hh:mm:ss")+'</p>&nbsp'+
			        '<button type="button" class="r_btn"_id="'+from_id+'" name="'+name+'"  data-toggle="modal" data-target="#myModal"><span class="glyphicon glyphicon-share-alt"></span>&nbsp回复</button>'+
			        '<button type="button" class="z_btn"><span class="glyphicon glyphicon-thumbs-up"></span>&nbsp赞</button>'+
			        '<button type="button" class="c_btn"><span class="glyphicon glyphicon-thumbs-down"></span>&nbsp踩</button>'+
			        '<div class="z_c">'+
	               		'<p class="z_con"><span class="z_count">11</span>&nbsp赞</p>'+
	               		'<p class="c_con"><span class="c_count">11</span>&nbsp踩</p>'+                         	
                    '</div>'+
		        '</div>'+
		    '</div>'+
		'</div>';

		
		$.ajax({
			type:'post',
			data:{
				'book_id'      :book_id,
				'reply_from_id':from_id,
				'reply_to_id'  :to_id,
				'reply_content':r_con,
			},
			url:'http://localhost:3000/addDiscuss',
		});

		$('#modal_reply_con').val('');
	});



	$('.z_btn').click(function(){
		let _id=$(this).attr('discuss_id');
		let count=parseInt($('.like_count').html());

		if($(this).attr('z_toggle')=='z'){
            count++;
			$('.like_count').html(count);
	        $(this).find('.z').html('取消赞');	
	        $(this).attr('z_toggle','nz')		
		}else{
            count--;
			$('.like_count').html(count);
			$(this).find('.z').html('赞');
			$(this).attr('z_toggle','z')
		}



		$.ajax({
			type:'get',
			data:{
				_id:_id,
				count:count,
			},
			url:'http://localhost:3000/upadateLike',
		})

	});

	$('.c_btn').click(function(){
		let _id=$(this).attr('discuss_id');
        let count=parseInt($('.unlike_count').html());

		if($(this).attr('c_toggle')=='c'){
            count++;
			$('.unlike_count').html(count);
	        $(this).find('.c').html('取消踩');	
	        $(this).attr('c_toggle','nc')	  
		}else{
            count--;
			$('.unlike_count').html(count);
			$(this).find('.c').html('踩');
			$(this).attr('c_toggle','c')
		}



		$.ajax({
			type:'get',
			data:{
				_id:_id,
				count:count,
			},
			url:'http://localhost:3000/upadateUnlike',
		})

	});


})



