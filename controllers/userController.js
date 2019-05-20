var mongoose = require('mongoose');
var User = require('../models/modelUser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');
module.exports.findAll = function (req, res, next) {

    User.find({type:{$ne:["admin"]}}).exec(function (err, data) {
        res.json(data);
    });
}

module.exports.find = function (req, res, next) {
    User.findOne({email: req.body.email}).then(function (data) {
		
			//if (req.body.password == data.password) {
                //var token = jwt.sign({email: data.email}, 'teme');
                //res.json({status: true, user: data, token: token});
            //}
            if (bcrypt.compareSync(req.body.password, data.password)) {
               var token = jwt.sign({login: data.login}, 'teme');
               res.json({status: true, user: data, token: token});
            }
            else
                res.json({status:false});
        }).catch(function(err){
            res.json({status:false});
    })
}


module.exports.findById = function (req, res, next) {
    User.findOne({_id: req.body._id}).then(function (data) {
		
			//if (req.body.password == data.password) {
                //var token = jwt.sign({email: data.email}, 'teme');
                //res.json({status: true, user: data, token: token});
            //}
               var token = jwt.sign({login: data.login}, 'teme');
               res.json({status: true, user: data, token: token});
           
        }).catch(function(err){
            res.json({status:false});
    })
}

module.exports.findByEmail = function (req, res, next) {
    User.findOne({email: req.params.email}).then(function (data) {
		
			//if (req.body.password == data.password) {
                //var token = jwt.sign({email: data.email}, 'teme');
                //res.json({status: true, user: data, token: token});
            //}
             
               res.json({status: true, user: data});
           
        }).catch(function(err){
            res.json({status:false});
    })
}

module.exports.adminLogin = function (req, res, next) {
    User.findOne({email: req.body.email}).then(function (data) {
		
			//if (req.body.password == data.password) {
                //var token = jwt.sign({email: data.email}, 'teme');
                //res.json({status: true, user: data, token: token});
            //}
            if (bcrypt.compareSync(req.body.password, data.password) && data.type =="admin") {
               var token = jwt.sign({login: data.login}, 'teme');
               res.json({status: true, user: data, token: token});
            }
            else
                res.json({status:false});
        }).catch(function(err){
            res.json({status:false});
    })
}

module.exports.addUser = function (req, res, next) {
    var user = new User(req.body);
    user.password = bcrypt.hashSync(user.password);
	user.timetable = {"Monday": ["", "", "", "", "","", "", "", "" ], "Tuesday": [ "", "", "", "", "", "","", "", "" ],"Wednesday": [ "","","", "", "", "","", "",""],"Thursday": ["","","","","","","","",""],"Friday": ["","","","","","","","",""],"Saturday": [ "","", "","","","", "","",""],"Sunday": ["","","","","","","","", ""]};
    user.save(function (err, user) {
        if (err) {
            res.json({status:false});
        }
        else {
            res.json({status:true,user:user});
        }
    });
}

module.exports.editUser = function (req, res, next) {
    var query = {"email": req.body.email};
		if(req.body.password){
			req.body.password = bcrypt.hashSync(req.body.password);
		}
    User.findOneAndUpdate(query, req.body, {upsert: true, new: true}).exec(function (err,user) {
        if (err) {
            res.json({status:false});
        }
        else {
            res.json({status:true,user:user});
        }
    });

}

module.exports.editForgottenPassword = function (req, res, next) {
    var query = {"email": req.body.email,"password": req.body.password};
		if(req.body.newpassword){
			req.body.password = bcrypt.hashSync(req.body.newpassword);
		}
    User.findOneAndUpdate(query, req.body, {upsert: true, new: true}).exec(function (err,user) {
        if (err) {
            res.json({status:false});
        }
        else {
            res.json({status:true,user:user});
        }
    });

}

module.exports.editUserById = function (req, res, next) {
    var query = {"_id": req.body._id};

    User.findOneAndUpdate(query, req.body, {upsert: true, new: true}).exec(function (err,user) {
        if (err) {
            res.json({status:false});
        }
        else {
            res.json({status:true,user:user});
        }
    });

}

module.exports.deleteUser = function (req, res, next) {

    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) {
            res.json({status:false});
        }
        else {
            res.json({status:true,user:user});
        }
    });
}

module.exports.editPayments = function (req, res, next) {
    var query = {"email": req.body.email};

    User.findOneAndUpdate(query, req.body, {upsert: true, new: true}).exec(function (err,user) {
        if (err) {
            res.json({status:false});
        }
        else {
            res.json({status:true,user:user});
        }
    });

}



module.exports.remove = function (req, res, next) {
    User.remove(function () {

        res.json({success: "true"});
    })


}

module.exports.upload = function (req, res, next) {
    if(req.files){
		var file = req.files.file,
		filename = file.name;
		file.mv("./public/uploads/"+filename,function(err){
			if(err){
				res.json(err);
			}else {
				res.json({status:true})
			}
		});
	}else{
		res.json({test:'test'});
	}
}


module.exports.getUnreviewedUsers = function (req, res, next) {
    User.count({status: 0}).then(function (c) {
               res.json({status:true, count:c});
        }).catch(function(err){
            res.json({status:false});
    })
}

module.exports.count = function (req, res, next) {
    User.count({type:{$ne:["admin"]}}).then(function (c) {
               res.json({status:true, count:c});
        }).catch(function(err){
            res.json({status:false});
    })
}

module.exports.countByEmail = function (req, res, next) {
    User.count({email: req.params.email}).then(function (c) {
               res.json({status:true, count:c});
        }).catch(function(err){
            res.json({status:false});
    })
}