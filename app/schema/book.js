var mongoose=require('mongoose');
var moment=require('moment');
var Schema=mongoose.Schema;

var BookSchema=new Schema({

	id:String,

	title:String,
	origin_title:String,
	subtitle:String,

	publisher:String,
	binding:String,
	pages:String,
	pubdate:String,
	price:String,
	ebook_price:String,
	ebook_url:String,
	large_image:String,
	medium_image:String,
	small_image:String,
	url:String,
	alt:String,
	alt_title:String,
	isbn10:String,
	isbn13:String,
	author_intro:String,
	summary:String,

	author:Array,
	translator:Array,
	tags:Array,	

	rating:{
		average:String,
		numRaters:String,
	},
	
	series:{
		id:String,
		title:String,
	},


	createdAt:Date,
	updatedAt:Date
});


BookSchema.pre('save update',function(next){
	
	var currentDate=moment();
	this.updatedAt=currentDate;
	if(!this.createdAt){
		this.createdAt=currentDate;
	};
	next();
});

module.exports=BookSchema;




