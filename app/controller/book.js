var Book=require('../model/book.js');
var User=require('../model/user.js');
var Discuss=require('../model/discuss.js');

exports.index=function(req, res, next) {
    var s_user=req.session.user;

    Book.find({},function(err,books){
        if(err){console.log(err);};
        User.findById(s_user._id,function(err,user){
            if(err){console.log(err);};
            if(books[0]){
                res.render('index', { 
                  title: 'X Read',
                  _id:s_user._id,
                  name:user.name,
                  src:user.image,
                  admin:user.admin,
                  books:books,
                });      
            };
        });
    });
};

exports.detail=function(req, res, next) {
    var s_user=req.session.user;  
    var p_id  =req.params.id;

    Book.findOne({id:p_id},function(err,book){
        if(err){console.log(err);};

        Discuss .find({book_id:book._id})
                .populate('reply_from_id')
                .populate('reply_to_id')
                .exec(function(err,discusses){
                    if(err){console.log(err);};

                    User.findById(s_user._id,function(err,user){
                        if(err){console.log(err);};
                        res.render('detail',{
                            title: 'X Read',
                            name:user.name,
                            _id:s_user._id,
                            src:user.image,
                            admin:user.admin,
                            book:book,
                            discusses:discusses,
                        });  
                    });
                });
    });      
}; 


exports.addDiscuss=function(req,res){
  var discuss=new Discuss(req.body);
  discuss.save(function(err){
    if (err) {console.error(err);};
  })
}




exports.upadateLike=function(req,res){
  var q_id=req.query._id;
  var q_count=req.query.count;

  Discuss.findById(q_id,function(err,discuss){
    discuss.like_count=q_count;
    let _id=discuss._id;
    delete discuss._id;
    Discuss.update({_id:_id},discuss,function(err){
      if (err) {console.error(err);};
    });
  });
}

exports.upadateUnlike=function(req,res){
  var q_id=req.query._id;
  var q_count=req.query.count;

  Discuss.findById(q_id,function(err,discuss){
    discuss.unlike_count=q_count;
    let _id=discuss._id;
    delete discuss._id;
    Discuss.update({_id:_id},discuss,function(err){
      if (err) {console.error(err);};
    });
  });

}


exports.search=function(req,res){
  var s_user=req.session.user;
  var sc=req.query.search_content;

  Book.find({
      $or:[{'title':new RegExp('.*'+sc+'.*','i')},{'author.0':new RegExp('.*'+sc+'.*','i')},{'isbn13':sc}]
  },function(err,books){
      User.findById(s_user._id,function(err,user){
        if(err){console.log(err);};
        res.render('search',{
              title: 'X Read',
              name:user.name,
              _id:s_user._id,
              src:user.image,
              admin:user.admin,
              books:books,
        });
     });
  });
};




exports.entry=function(req, res, next) {
 
    var s_user=req.session.user;

    User.findById(s_user._id,function(err,user){
        if(err){console.log(err);};
        res.render('entry',{
            title: 'X Read',
            _id:s_user._id,
            name:user.name,
            src:user.image,
            admin:user.admin,
            book:false,
        }); 
    }); 
};

exports.bookList=function(req, res, next) {

    var s_user=req.session.user;    
  
    Book.find({},function(err,books){
        if(err){console.log(err);};

        User.findById(s_user._id,function(err,user){
            if(err){console.log(err);};
            if(books[0]){
                res.render('bookList', { 
                  title: 'X Read',
                  _id:s_user._id,
                  name:user.name,
                  src:user.image,
                  admin:user.admin,
                  books:books,
                });      
            }else{
              res.end("no book is exsit!")
            };
        });            
    }); 
};

exports.updateBook=function(req, res, next) {

    var p_id=req.params.id;
    var s_user=req.session.user;

    Book.findOne({id:p_id},function(err,book){
        if(err){console.log(err);};   
        User.findById(s_user._id,function(err,user){
            if(err){console.log(err);};
            res.render('entry',{
                title: 'X Read',
                _id:s_user._id,
                name:user.name,
                src:user.image,
                admin:user.admin,
                book:book,
            });
        });     
    });
};



exports.newUpdateBook=function(req, res, next) {
    var reqBook=req.body;
    Book.findById(reqBook._id,function(err,book){
        if(err){console.log(err);};
        if(book){

            for(let key in reqBook){
                if(key!='_id'){
                    book[key]=reqBook[key];
                };
            };
            book.updatedAt=new Date();

            var _id=book._id;
            delete book._id;
        
            Book.update({_id:_id},book,function(err){
              if(err){console.log(err);};
              res.redirect('/admin/bookList');
            });

        }else{

            var author=reqBook.author.split('/');
            var translator=reqBook.translator.split('/');
            var tags=reqBook.tags.split('/');

            var book=new Book({

                  id:reqBook.id,
                  title:reqBook.title,
                  origin_title:reqBook.origin_title,
                  subtitle:reqBook.subtitle,
                  publisher:reqBook.publisher,
                  binding:reqBook.binding,
                  pages:reqBook.pages,
                  pubdate:reqBook.pubdate,
                  price:reqBook.price,
                  ebook_price:reqBook.ebook_price,
                  ebook_url:reqBook.ebook_url,
                  large_image:reqBook.large_image,
                  medium_image:reqBook.medium_image,
                  small_image:reqBook.small_image,
                  url:reqBook.url,
                  alt:reqBook.alt,
                  alt_title:reqBook.alt_title,
                  isbn10:reqBook.isbn10,
                  isbn13:reqBook.isbn13,
                  author_intro:reqBook.author_intro,
                  summary:reqBook.summary,
                  author:author,
                  translator:translator,
                  tags:tags, 
                  rating:{
                    average:reqBook.rating,
                    numRaters:reqBook.numRaters,
                  },
                  series:{
                    id:reqBook.series_id,
                    title:reqBook.series_title,
                  }

            });

            book.save(function (err, book) {
                if (err) {console.error(err);};
                res.redirect('/admin/entry');
            }); 
        };
    });
}; 

exports.deleteBook=function(req, res, next) {
    var b_id=req.body.id;
    Book.remove({id:b_id},function(err,book){
        if(err){console.log(err);};      
        res.end('delete successful!');
    })
}















