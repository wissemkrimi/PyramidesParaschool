var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubjectSchema = new Schema({
	name: {type:String,unique:true},
    price: Number,
	description: String,
},{collection : "subjects"});
module.exports = mongoose.model('Subject', SubjectSchema);
