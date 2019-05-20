var mongoose = require('mongoose');
var Subject = require('../models/modelSubject');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');

module.exports.findAll = function (req, res, next) {

    Subject.find({}).exec(function (err, data) {
        res.json(data);
    });
}

module.exports.addSubject = function (req, res, next) {
    var subject = new Subject(req.body);
       subject.save(function (err, subject) {
        if (err) {
            res.json({status:false});
        }
        else {
            res.json({status:true,subject:subject});
        }
    });
}

module.exports.deleteSubject = function (req, res, next) {

    Subject.findByIdAndRemove(req.params.id, function (err, subject) {
        if (err) {
            res.json({status:false});
        }
        else {
            res.json({status:true,subject:subject});
        }
    });
}

module.exports.editSubject = function (req, res, next) {
    var query = {"_id": req.body._id};

    Subject.findOneAndUpdate(query, req.body, {upsert: true, new: true}).exec(function (err,subject) {
        if (err) {
            res.json({status:false});
        }
        else {
            res.json({status:true,subject:subject});
        }
    });

}