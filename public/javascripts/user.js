$(document).ready(function(){
$("a,button").focus(function(){this.blur()});



$('#save').click(function(){

    var returnVal=true;
    if(!$('#id').val()){returnVal=false}
        if(!$('#title').val()){returnVal=false}
            if(!$('#author').val()){returnVal=false}
                    if(!$('#summary').val()){returnVal=false}

    if(!returnVal){return false}
   
})


setTimeout(function(){window.close();},1000);






$('#getBook').click(function(){

 var i=0;
setInterval(function(){
    document.title=i;
    i++;
},1000);

    var Stid=$('#Stid').val();
    var Sdid=$('#Sdid').val();
    var id=$('#Sid').val();

    if(id){
        $('#form').removeAttr('target');

        getDate(id,false);
    }else{
        $('#form').attr('target','_blank');
    };



    if(!id&&Stid&&Sdid){
         console.log(Stid,Sdid)

        var num=Stid;
        var timer=setInterval(function(){
            if(num>=Sdid){
                clearInterval(timer);
            }else{
                getDate(top250[num],true);
                num++;
            };
        },2000);    
    }




    function getDate(id,auto){
        $.ajax({
            url:'https://api.douban.com/v2/book/'+id,
            cache:false,
            type:'GET',
            dataType:'jsonp',
            crossDomain:true,
            jsonp:'callback',
            success:function(data){
                console.log(data);
                
                $('#id').val(data.id);
                $('#title').val(data.title);

                $('#origin_title').val(data.origin_title);
                $('#subtitle').val(data.subtitle);

                
                $('#url').val(data.url);
                $('#alt').val(data.alt);
                $('#alt_title').val(data.alt_title);
                $('#binding').val(data.binding);
                $('#price').val(data.price);
                $('#ebook_price').val(data.ebook_price);
                $('#ebook_url').val(data.ebook_url);

                $('#large_image').val(data.images.large);
                $('#medium_image').val(data.images.medium);
                $('#small_image').val(data.images.small);
              
                $('#publisher').val(data.publisher);
                $('#pubdate').val(data.pubdate);
                $('#rating').val(data.rating.average);

                $('#numRaters').val(data.rating.numRaters);
                
                
                $('#pages').val(data.pages);
                $('#author_intro').val(data.author_intro);

                $('#isbn10').val(data.isbn10);
                $('#isbn13').val(data.isbn13);

                if(data.series){
                    $('#series_id').val(data.series.id);
                    $('#series_title').val(data.series.title);                    
                }



                
                $('#summary').val(data.summary);


                var authorLen=data.author.length,author='';
                for (let i = 0; i < authorLen; i++) {
                     author+=data.author[i]+'/';
                }
                $('#author').val(author.substring(0,author.length-1));


                var translatorLen=data.translator.length,translator='';
                for (let i = 0; i <  translatorLen; i++) {
                     translator+=data.translator[i]+'/';
                }
                $('#translator').val(translator.substring(0,translator.length-1));

                var tagLen=data.tags.length,tag='';
                for (let i = 0; i < tagLen; i++) {
                     tag+=data.tags[i].name+'/';
                }

                $('#tags').val(tag.substring(0,tag.length-1));

                  
                if(auto){
                    
                    $('#form').submit();
                };
               

            }   
        })      
    }
   					
})
















})