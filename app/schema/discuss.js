var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var DiscussSchema=new Schema({

	book_id:{
		type:Schema.Types.ObjectId,
		ref:'Book'
	},
	reply_from_id:{
		type:Schema.Types.ObjectId,
		ref:'User'
	},
	reply_to_id:{
		type:Schema.Types.ObjectId,
		ref:'User'
	},

    reply_content:String,

	like_count:{
		type:Number,
		default:0,
	},

	unlike_count:{
		type:Number,
		default:0,
	},


	// like_id_list:Array,

	createdAt:Date,

});


DiscussSchema.pre('save',function(next){
	
	this.createdAt=Date();
	next();
});

module.exports=DiscussSchema;




