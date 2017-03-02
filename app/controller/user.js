var User=require('../model/user.js');
var bcrypt=require('bcrypt');
var Book=require('../model/book.js');
var fs=require('fs');
var path=require('path');

exports.loggedIn=function(req,res,next){
    var s_user=req.session.user;
    if(!s_user){
      res.redirect('/');
    }else{
      next();
    }
}

exports.adminR=function(req,res,next){
    var s_user=req.session.user;

    if(s_user.admin=='user'){
       res.redirect('/');
    }else{
       next();
    }
}





exports.sign=function(req, res, next) {
    var s_user=req.session.user;
    if(s_user){
        res.redirect('/index'); 
    }else{
        res.render('sign', { 
          title: 'X Read',
          title2:'Reading ten thousand books is like traveling ten thousand miles.',
        });      
    };
};

exports.user=function(req, res, next) {
    
    var p_name=req.params.name;

    User.findOne({name:p_name},function(err,user){
        if(err){console.log(err);};   
        res.render('user',{
            title: 'X Read',
            name:user.name,
            src:user.image,
            admin:user.admin,
            user:user,
        });
    });
};

exports.userList=function(req, res, next) {
    var s_user=req.session.user;
    User.find({},function(err,users){
        if(err){console.log(err);};
        User.findOne({_id:s_user._id},function(err,user){
              if(err){console.log(err);};
              if(users[0]){
                  res.render('userList', { 
                    title: 'X Read',
                    name:user.name,
                    src:user.image,
                    admin:user.admin,
                    users:users,
                  });      
              }else{
                res.end("no user is exsit!");
              };
        });
    });
};




exports.verifyName=function(req, res, next) {
    var b_name=req.body.name;
    User.find({name:b_name},function(err,user){
       if(err){console.log(err);};
       res.send(user);
    });
};

exports.verifyEmail=function(req, res, next) {
    var b_email=req.body.email;
    User.find({email:b_email},function(err,user){
       if(err){console.log(err);};
       res.send(user);
    });
};




exports.signup=function(req, res) {
   var b_name=req.body.name;
   User.find({name:b_name},function(err,user){
       if(err){console.log(err);};

       if(user[0]){
       	    res.end('name is already taken!');
       }else{
       	    var user=new User(req.body);
    		    user.save(function (err, user) {
        			  if (err) {console.error(err);};
        			  res.redirect('/');
    			  });
       };
   }); 
};

exports.signin=function(req, res) {

    var b_password=req.body.password;
    var b_name    =req.body.name;

    User.findOne({name:b_name },function(err,user){
        if(err){console.log(err);};
        if(user){
            var hashPassword=user.password;
            bcrypt.compare(b_password,hashPassword,function(err,isMatch){
                if(err){console.log(err);};
                if(isMatch){
                    req.session.user=user;
                    res.send('toIndex');
                }else{
                    res.send('wrong')
                };
            });
        }else{
          res.send('not');
        };
    });
};

exports.logout=function(req, res, next) {
    delete req.session.user;
    res.redirect('/');    
};





exports.deleteUser=function(req, res, next) {
    var b_name=req.body.name;
    User.remove({name:b_name},function(err,user){
        if(err){console.log(err);};      
        res.end('delete successful!');
    });
};





exports.updateUser=function(req, res, next) {
    var s_user=req.session.user;
    var b_user=req.body;

    User.findById(b_user._id,function(err,user){
        if(err){console.log(err);};

        for(let key in b_user){
            user[key]=b_user[key];
        };
        user.updatedAt=Date();

        var _id=user._id;
        delete user._id;

        User.update({_id:_id},user,function(err){
            if(err){console.log(err);};
            res.redirect('/user/'+user.name);
        });
    });   
};




exports.updateImage=function(req, res, next) {
    
    var upImg    =req.files.updateImage;

    var filePath =upImg.path;
    var oriName  =upImg.originalFilename;
    var type     =upImg.type.split('/')[1];
    var sfile    =req.body._id1+req.body.timeNow +'.'+"png";
    var newPath  =path.join(__dirname,'../../','/public/images/upload/'+sfile);

    fs.readFile(filePath,function(err,data){

        if(err){console.log(err);};

        fs.writeFile(newPath,data,function(err){
            if(err){console.log(err);};
            res.end();
        });

        User.findById(req.body._id1,function(err,user){

            user.image='/images/upload/'+sfile;
            user.updatedAt=Date();

            var _id=user._id;
            delete user._id;

            User.update({_id:_id},user,function(err){
                if(err){console.log(err);};
            });
        });
    });
};
