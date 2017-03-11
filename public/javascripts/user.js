$(document).ready(function(){
    $("a,#male,#female,button").focus(function(){this.blur()});

    if ($('#sex').html()=='male') {
        $('#male').attr('checked','checked')
    }else{
        $('#female').attr('checked','checked')
    }

    var nowTime='';

    $('#male').click(function(){
        $('#sex').html('male')
        $('#set_img').val('/images/male.png')
    });

    $('#female').click(function(){
        $('#sex').html('female')
        $('#set_img').val('/images/female.png')
    });

    $('#head_a_p').click(function(){
        nowTime=Date.now();
        $('#timeNow').val(nowTime);
        $('#updateImage').trigger('click');
    })

    $('#updateImage').on('change',function(){

        $('#formUI').submit();

        if($('#sex').html()=='male'){
            $('.header_pic').attr('src','/images/male.png')
            $('#head_pic').attr('src','/images/male.png')
            $('#image').attr('src','/images/male.png')
        }else{
            $('.header_pic').attr('src','/images/female.png')
            $('#head_pic').attr('src','/images/female.png')
            $('#image').attr('src','/images/female.png')
        }
        
        setTimeout(function(){
            $('.header_pic').attr('src','/images/upload/'+$('#_id').val()+nowTime+'.png')
            $('#head_pic').attr('src','/images/upload/'+$('#_id').val()+nowTime+'.png')
            $('#image').attr('src','/images/upload/'+$('#_id').val()+nowTime+'.png')
        },1000)
    });

    $('#save').click(function(){

        let _id = $('#_id').val();
        let name = $('#name').val();
        let email = $('#email').val();
        let sex = $('#sex').html();
        let autograph = $('#autograph').val();

        $.ajax({
            url:'http://localhost:3000/user/updateUser',
            data:{
                    '_id' : _id,
                    'name' : name,
                    'email' : email,
                    'sex' : sex,
                    'autograph' : autograph,
            },
            type:'post',
            success:function(data){
                $('#msg').html(data);
                $('.msg_wrap').show();
                setTimeout(function(){
                    $('.msg_wrap').hide();
                },3000);
            }
        });
    });

});