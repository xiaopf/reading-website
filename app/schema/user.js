var mongoose=require('mongoose');
var bcrypt=require('bcrypt');
var moment=require('moment');
var SALT_WORK_FACTOR=10;



var Schema=mongoose.Schema;

var UserSchema=new Schema({
	name:{
		type:String,
		unique:true
	},
	image:{
		type:String,
		default:'',
	},
	
	sex:String,

	autograph:{
		type:String,
		default:'',
	},

	password:String,

	email:{
		type:String,
		unique:true
	},

	admin:{
		type:Boolean,
		default:false
	},

	createdAt:Date,
	updatedAt:Date
});

UserSchema.pre('save',function(next){
	var user=this;
	var currentDate=moment();
	this.updatedAt=currentDate;
	if(!this.createdAt){
		this.createdAt=currentDate;
	};
    
    bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
    	if(err){return next(err);};
		bcrypt.hash(user.password,salt,function(err,hash){
			if(err){return next(err)};
			user.password=hash;
			next();
		})	
    })
});

// UserSchema.method.comparePassword(pswd,cb){

//     bcrypt.compare(pswd,this.password,function(err,isMatch){
//         if(err){return cb(err)}
//         if(isMatch){
//             cb(null,isMatch);
//         }
//     })

// }


module.exports=UserSchema;




