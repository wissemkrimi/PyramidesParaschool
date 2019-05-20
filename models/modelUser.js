var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {type:String,unique:true},
    password: String,
	name: String,
    number: Number,
	level: String,
	file: String,
	message: String,
	type: String,
	status: Number,
	timetable : {
		Monday: [String],
		Tuesday: [String],
		Wednesday: [String],
		Thursday: [String],
		Friday: [String],
		Saturday: [String],
		Sunday: [String],
		last_modified : Number
	},
	payments : [{
		subject: String,
		date: Number
	}]
},{collection : "users"});
module.exports = mongoose.model('User', UserSchema);
