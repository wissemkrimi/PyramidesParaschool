var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaymentSchema = new Schema({
	name : String,
	email: String,
	level: Number,
    date: String,
	status: Number,
	type: String,
	comment: String,
	subjects: [String],
	attachment: String
},{collection : "payments"});



module.exports = mongoose.model('Payment', PaymentSchema);
