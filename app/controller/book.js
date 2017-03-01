var Book=require('../model/book.js');


exports.entry=function(req, res, next) {
    console.log('in')
    var user=req.session.user;
    if(!user){
       res.redirect('/index'); 
    }else{
      console.log('inner')

      res.render('entry',{
          title: 'X Read',
          name:user.name,
          src:user.image,
          book:false,
      }); 
   
    }

}



exports.newBook=function(req, res, next) {
  var reqBook=req.body;

  Book.findById(req.body._id,function(err,book){
       if(err){ console.log(err.stack)}
       if(book){

         console.log(book)

         for( let key in reqBook){
             if(key!='_id'){
              book[key]=reqBook[key];
             }
          }

          var date=new Date();
          var time=Date.now()+28800000;
          date.setTime(time);
          book.updatedAt=date;

          var _id=book._id;

          delete book._id;
      
          Book.update({_id:_id},book,function(err){
            if(err){return console.log(err);};
            res.redirect('/admin/bookList');
            // res.send('update successful!');
          })

          

          

       }else{

          var author=req.body.author.split('/');
          var translator=req.body.translator.split('/');
          var tags=req.body.tags.split('/');


           var book=new Book({

                            id:req.body.id,

                            title:req.body.title,
                            origin_title:req.body.origin_title,
                            subtitle:req.body.subtitle,

                            publisher:req.body.publisher,
                            binding:req.body.binding,
                            pages:req.body.pages,
                            pubdate:req.body.pubdate,
                            price:req.body.price,
                            ebook_price:req.body.ebook_price,
                            ebook_url:req.body.ebook_url,
                            large_image:req.body.large_image,
                            medium_image:req.body.medium_image,
                            small_image:req.body.small_image,
                            url:req.body.url,
                            alt:req.body.alt,
                            alt_title:req.body.alt_title,
                            isbn10:req.body.isbn10,
                            isbn13:req.body.isbn13,
                            author_intro:req.body.author_intro,
                            summary:req.body.summary,

                            author:author,
                            translator:translator,
                            tags:tags, 

                            rating:{
                              average:req.body.rating,
                              numRaters:req.body.numRaters,
                            },
                            
                            series:{
                              id:req.body.series_id,
                              title:req.body.series_title,
                            }

           });
           book.save(function (err, book) {
            if (err) {
              return console.error(err)
            }else{
              res.redirect('/admin/entry');
            };
          }) 
       }
  })


}; 

exports.index=function(req, res, next) {

    var user=req.session.user;


    if(!user){
        res.redirect('/');
    }else{
        Book.find({},function(err,books){

            if(err){return console.log(err)};

            if(books[0]){
                res.render('index', { 
                  title: 'X Read',
                  name:user[0].name,
                  src:user[0].image,
                  books:books,
                });      
            }
        })
    }
}


exports.detail=function(req, res, next) {
    var user=req.session.user;  

    if(!user){
        res.redirect('/');
    }else{

       Book.findOne({id:req.params.id},function(err,book){
          console.log(book);
          if(err){return console.log(err);};

          res.render('detail',{
              title: 'X Read',
              name:user[0].name,
              src:user[0].image,
              book:book,
          });  
        }); 
    }
 
}; 


exports.bookList=function(req, res, next) {
    var user=req.session.user;    
    if(!user){
        res.redirect('/');
    }else{
        Book.find({},function(err,books){

            if(err){return console.log(err)}

            if(books[0]){
                res.render('bookList', { 
                  title: 'X Read',
                  name:user[0].name,
                  src:user[0].image,
                  books:books,
                });      
            }
        })
    }
}




exports.deleteBook=function(req, res, next) {

    var _id=req.body.id;
    console.log(_id);
    var user=req.session.user;

    if(!user){
          res.redirect('/');
    }else{
      Book.remove({id:_id},function(err,book){

          if(err){return console.log(err)}      
          res.end('delete successful!')
      })
    }
}




exports.updateBook=function(req, res, next) {

    var _id=req.params.id;
    
    var user=req.session.user;
    if(!user){
          res.redirect('/');
    }else{

      Book.findOne({id:_id},function(err,book){
       

          if(err){return console.log(err)}   

          res.render('entry',{
              title: 'X Read',
              name:user.name,
              src:user.image,
              book:book,
          });
     
      })
    }
}










