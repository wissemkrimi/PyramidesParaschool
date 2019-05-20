var mongoose = require('mongoose');
var Payment = require('../models/modelPayment');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');

module.exports.findAll = function (req, res, next) {

    Payment.find({}).exec(function (err, data) {
        res.json(data);
    });
}

module.exports.addPayment = function (req, res, next) {
    var payment = new Payment(req.body);
       payment.save(function (err, payment) {
        if (err) {
            res.json({status:false});
        }
        else {
            res.json({status:true,payment:payment});
        }
    });
}

module.exports.editPaymentById = function (req, res, next) {
    var query = {"_id": req.body._id};

    Payment.findOneAndUpdate(query, req.body, {upsert: true, new: true}).exec(function (err,payment) {
        if (err) {
            res.json({status:false});
        }
        else {
            res.json({status:true,payment:payment});
        }
    });

}

module.exports.getUnreviewedPayments = function (req, res, next) {
    Payment.count({status: 0}).then(function (c) {
               res.json({status:true, count:c});
        }).catch(function(err){
            res.json({status:false});
    })
}