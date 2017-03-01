var User=require('../model/user.js');
var bcrypt=require('bcrypt');
var Book=require('../model/book.js');







exports.sign=function(req, res, next) {
    var user=req.session.user;
    if(user){
       res.redirect('/index'); 
    }else{
      res.render('sign', { 
        title: 'X Read',
        title2:'Reading ten thousand books is like traveling ten thousand miles.',
      });      
    }

}



exports.signin=function(req, res) {
    var pswd=req.body.password;
    User.find({name:req.body.name},function(err,user){
      if(err){console.log(err.stack)}
      
      if(user[0]){
        var hashPswd=user[0].password;
        bcrypt.compare(pswd,hashPswd,function(err,isMatch){
          if(err){console.log(err.stack)}
          if(isMatch){
            req.session.user=user;
            res.send('toIndex');
          }else{
            console.log('password is not right!');
           res.send('wrong')
          }
        })
      
      }else{
        console.log('user is not exsit!');
        res.send('not')
      }

    })
}


exports.verifyName=function(req, res, next) {

  console.log(req.body);

  User.find({name:req.body.name},function(err,user){
   if(err){console.log(err)};
   res.send(user);
  });

}
exports.verifyEmail=function(req, res, next) {

  console.log(req.body);

  User.find({email:req.body.email},function(err,user){
   if(err){console.log(err)};
   res.send(user);
  });

}




exports.signup=function(req, res) {
   User.find({name:req.body.name},function(err,user){
       if(err){
       	console.log(err)
       }
       if(user[0]){
       	console.log(user);
       }else{
       	    var user=new User(req.body);
    		    user.save(function (err, user) {
    			  if (err) {
    			  	return console.error(err)
    			  }else{
    			  	res.redirect('/');
    			  };
    			});
       }
   }) 
}




exports.logout=function(req, res, next) {
    console.log(req.session.user)
    delete req.session.user;
    res.redirect('/');    
}


exports.userList=function(req, res, next) {
    var _user=req.session.user;
    if(!_user){
        res.redirect('/');
    }else{
        User.find({},function(err,users){

            if(err){return console.log(err)}

            if(users[0]){
              res.render('userList', { 
                title: 'X Read',
                name:_user[0].name,
                src:_user[0].image,
                users:users,
              });      
            }

        })
    }
}

exports.deleteUser=function(req, res, next) {

    var _name=req.body.name;
    console.log(_name);

    var user=req.session.user;

    if(!user){
          res.redirect('/');
    }else{
      User.remove({name:_name},function(err,user){

          if(err){return console.log(err)}      
          res.end('delete successful!')
      })
    }
}



exports.user=function(req, res, next) {
    
    var _name=req.params.name;

    console.log('1',_name);

    var _user=req.session.user;
    console.log(_user);
    
    if(!_user){
          res.redirect('/');
    }else{

      User.findOne({name:_name},function(err,user){
       
          console.log(user);

          if(err){return console.log(err)}   

          res.render('user',{
              title: 'X Read',
              name:_user[0].name,
              src:_user[0].image,
              user:user,
          });
     
      })
    }
}


exports.updateUser=function(req, res, next) {

    // var _id=req.params.id;
    
    // var _user=req.session.user;
    // if(!_user){
    //       res.redirect('/');
    // }else{

    //   Book.findOne({id:_id},function(err,book){
       

    //       if(err){return console.log(err)}   

    //       res.render('entry',{
    //           title: 'X Read',
    //           name:_user[0].name,
    //           src:_user[0].image,
    //           book:book,
    //       });
     
    //   })
    // }
}