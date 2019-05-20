var mongoose = require('mongoose');
var TimeTable = require('../models/modelTimetable');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');

module.exports.find = function (req, res, next) {

    TimeTable.findOne({}).exec(function (err, data) {
        res.json(data);
    });
	
}

module.exports.saveTimeTable = function (req, res, next) {

    TimeTable.findOneAndUpdate({}, req.body, {upsert: true, new: true}).exec(function (err,timetable) {
        if (err) {
            res.json({status:false});
        }
        else {
            res.json({status:true,timetable:timetable});
        }
    });

}