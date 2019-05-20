var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TimeTableSchema = new Schema({
	Monday: [String],
    Tuesday: [String],
	Wednesday: [String],
	Thursday: [String],
	Friday: [String],
	Saturday: [String],
	Sunday: [String],
	last_modified : Number
},{collection : "timetable"});



module.exports = mongoose.model('TimeTable', TimeTableSchema);
