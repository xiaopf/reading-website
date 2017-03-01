var mongoose=require('mongoose');
var BookSchema=require('../schema/book.js');
var Book=mongoose.model('Book',BookSchema);

module.exports=Book;


