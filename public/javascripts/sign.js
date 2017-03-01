$(document).ready(function(){
	$("a,button,#male,#female").focus(function(){this.blur()});

$('#male').click(function(){
	$('#set_img').val('/images/male.png')
});

$('#female').click(function(){
	$('#set_img').val('/images/female.png')
});





	$("#signinPanel").hide();

	$("#signupBtn").click(function(){
		$("#signupPanel").show();
		$("#signinPanel").hide();
		$(this).parent('li').addClass('active');	
		$("#signinBtn").parent('li').removeClass('active');
	});

	$("#signinBtn").click(function(){
		$("#signinPanel").show();
		$("#signupPanel").hide();
		$(this).parent('li').addClass('active');
		$("#signupBtn").parent('li').removeClass('active');	
	});

	$("#name_tail").hide();
	$('#name_alert').hide().html('');
	$('#email_alert').hide().html('');
	$('#password_alert').hide().html('');
    

    $('#name_up').on('input propertychange', function() {
        $.ajax({
        	url:'http://localhost:3000/verifyName',
        	data:{name:$('#name_up').val()},
        	type:'POST',
        	success:function(data){
        		console.log(data)
        		 $("#name_tail")[0].className='';
                 if(data[0]){
                    $("#name_tail").show().addClass('glyphicon-remove text-danger tail glyphicon');
                    $('#name_up').attr('onf','false');
                    $('#name_alert').show().html('name is already taken');
                 }else if($('#name_up').val()){
                    $("#name_tail").show().addClass('glyphicon-ok text-success tail glyphicon');
                    $('#name_alert').hide().html('');
                    $('#name_up').attr('onf','true');
                 }
        	}
        })
    });

    $('#email_up').on('input propertychange', function() {
        $.ajax({
        	url:'http://localhost:3000/verifyEmail',
        	data:{email:$('#email_up').val()},
        	type:'POST',
        	success:function(data){
        		console.log(data)
        		 $('#email_tail')[0].className='';
                 if(data[0]){
                    $('#email_tail').show().addClass('glyphicon-remove text-danger tail glyphicon');
                    $('#email_up').attr('onf','false');
                    $('#email_alert').show().html('email is already taken');
                 }else if($('#email_up').val()){
                    $('#email_tail').show().addClass('glyphicon-ok text-success tail glyphicon');
                    $('#email_alert').hide().html('');
                    $('#email_up').attr('onf','true');
                 }
        	}
        })
    });

    $('#signup_submit').click(function(){
    	var returnVal=true;

    	$('#name_alert').hide().html('')
		$('#email_alert').hide().html('')
		$('#password_alert').hide().html('')

    	var nameOnf=$('#name_up').attr('onf');
    	var emailOnf=$('#email_up').attr('onf');
    	
    	if(!$('#name_up').val()){
          $('#name_alert').show().html('Incorrect username')
    	  returnVal=false;
    	};
    	if(nameOnf=='false'){
			$('#name_alert').show().html('name is already taken');
    		returnVal=false;
    	};
    	if(!$('#email_up').val()){
          $('#email_alert').show().html('Incorrect email');
    	  returnVal=false;
    	};
    	if(emailOnf=='false'){
          $('#email_alert').show().html('email is already taken');
    	  returnVal=false;
    	};
    	if(!$('#password_up').val()){
          $('#password_alert').show().html('Incorrect password')
    	  returnVal=false;
    	};

    	if (!returnVal) { return false;}
    });


	$('#nm_alert').hide();
	$('#pd_alert').hide();	

    $('#signin_submit').click(function(){
        var returnVal=true;
    	$('#nm_alert').hide().html('');;
		$('#pd_alert').hide().html('');;
		
		if(!$('#name_in').val()){ 
			$('#nm_alert').show().html('Incorrect username.');
			returnVal=false
		};
    	if(!$('#password_in').val()){ 

    		$('#pd_alert').show().html('Incorrect password.');
    		returnVal=false
    	};
    	$.ajax({
    		url:'http://localhost:3000/user/signin',
    		data:{name:$('#name_in').val(),password:$('#password_in').val()},
    		type:'POST',
    		success:function(data){
    			if(data=='toIndex'){
    				window.open('http://localhost:3000/index','_self')
    			}else if(data=='not'){
					$('#nm_alert').show().html('user is not exsit!');;
    			}else if(data=='wrong'){
					$('#pd_alert').show().html('password is wrong!');;
    			}
    		}
    	})
    	if (!returnVal) { return false;}
    })






	//定义画布宽高和生成点的个数
		var WIDTH = 2000, HEIGHT = 1000, POINT = 70;
		
		var canvas = document.getElementById('canvas');
		canvas.width = WIDTH,
		canvas.height = HEIGHT;
		var context = canvas.getContext('2d');
		context.strokeStyle = 'rgba(0,0,0,0.02)',
		context.strokeWidth = 1,
		context.fillStyle = 'rgba(0,0,0,0.05)';
		var circleArr = [];

		//线条：开始xy坐标，结束xy坐标，线条透明度
		function Line (x, y, _x, _y, o) {
			this.beginX = x,
			this.beginY = y,
			this.closeX = _x,
			this.closeY = _y,
			this.o = o;
		}
		//点：圆心xy坐标，半径，每帧移动xy的距离
		function Circle (x, y, r, moveX, moveY) {
			this.x = x,
			this.y = y,
			this.r = r,
			this.moveX = moveX,
			this.moveY = moveY;
		}
		//生成max和min之间的随机数
		function num (max, _min) {
			var min = arguments[1] || 0;
			return Math.floor(Math.random()*(max-min+1)+min);
		}
		// 绘制原点
		function drawCricle (cxt, x, y, r, moveX, moveY) {
			var circle = new Circle(x, y, r, moveX, moveY)
			cxt.beginPath()
			cxt.arc(circle.x, circle.y, circle.r, 0, 2*Math.PI)
			cxt.closePath()
			cxt.fill();
			return circle;
		}
		//绘制线条
		function drawLine (cxt, x, y, _x, _y, o) {
			var line = new Line(x, y, _x, _y, o)
			cxt.beginPath()
			cxt.strokeStyle = 'rgba(0,0,0,'+ o +')'
			cxt.moveTo(line.beginX, line.beginY)
			cxt.lineTo(line.closeX, line.closeY)
			cxt.closePath()
			cxt.stroke();

		}
		//初始化生成原点
		function init () {
			circleArr = [];
			for (var i = 0; i < POINT; i++) {
				circleArr.push(drawCricle(context, num(WIDTH), num(HEIGHT), num(15, 2), num(10, -10)/40, num(10, -10)/40));
			}
			draw();
		}

		//每帧绘制
		function draw () {
			context.clearRect(0,0,canvas.width, canvas.height);
			for (var i = 0; i < POINT; i++) {
				drawCricle(context, circleArr[i].x, circleArr[i].y, circleArr[i].r);
			}
			for (var i = 0; i < POINT; i++) {
				for (var j = 0; j < POINT; j++) {
					if (i + j < POINT) {
						var A = Math.abs(circleArr[i+j].x - circleArr[i].x),
							B = Math.abs(circleArr[i+j].y - circleArr[i].y);
						var lineLength = Math.sqrt(A*A + B*B);
						var C = 1/lineLength*7-0.009;
						var lineOpacity = C > 0.03 ? 0.03 : C;
						if (lineOpacity > 0) {
							drawLine(context, circleArr[i].x, circleArr[i].y, circleArr[i+j].x, circleArr[i+j].y, lineOpacity);
						}
					}
				}
			}
		}

		//调用执行
		window.onload = function () {
			init();
			setInterval(function () {
				for (var i = 0; i < POINT; i++) {
					var cir = circleArr[i];
					cir.x += cir.moveX;
					cir.y += cir.moveY;
					if (cir.x > WIDTH) cir.x = 0;
					else if (cir.x < 0) cir.x = WIDTH;
					if (cir.y > HEIGHT) cir.y = 0;
					else if (cir.y < 0) cir.y = HEIGHT;
					
				}
				draw();
			}, 16);
		}
	
})