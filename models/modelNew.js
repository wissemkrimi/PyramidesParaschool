var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NewSchema = new Schema({
	title: String,
    content: String,
	date: Number,
},{collection : "news"});



module.exports = mongoose.model('New', NewSchema);
