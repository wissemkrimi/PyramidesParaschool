var mongoose = require('mongoose');
var New = require('../models/modelNew');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');

module.exports.findAll = function (req, res, next) {

    New.find({}).exec(function (err, data) {
        res.json(data);
    });
}

module.exports.addNews = function (req, res, next) {
    var news = new New(req.body);
       news.save(function (err, news) {
        if (err) {
            res.json({status:false});
        }
        else {
            res.json({status:true,news:news});
        }
    });
}

module.exports.deleteNews = function (req, res, next) {

    New.findByIdAndRemove(req.params.id, function (err, news) {
        if (err) {
            res.json({status:false});
        }
        else {
            res.json({status:true,news:news});
        }
    });
}

module.exports.editNews = function (req, res, next) {
    var query = {"_id": req.body._id};

    New.findOneAndUpdate(query, req.body, {upsert: true, new: true}).exec(function (err,news) {
        if (err) {
            res.json({status:false});
        }
        else {
            res.json({status:true,news:news});
        }
    });

}