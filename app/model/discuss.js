var mongoose=require('mongoose');
var DiscussSchema=require('../schema/discuss.js');
var Discuss=mongoose.model('Discuss',DiscussSchema);

module.exports=Discuss;


