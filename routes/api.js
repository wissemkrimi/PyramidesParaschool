var express = require('express');
var router = express.Router();



var userController = require('../controllers/userController');
var subjectController = require('../controllers/subjectController');
var newController = require('../controllers/newController');
var timeTableController = require('../controllers/timetableController');
var paymentController = require('../controllers/paymentController');
var emailController = require('../controllers/emailController');

/* GET users */
router.get('/users',userController.findAll);
/* Login */
router.post('/users/login',userController.find);
router.post('/users/find',userController.findById);
router.post('/users/adminlogin',userController.adminLogin);
router.get('/users/findbyemail/:email',userController.findByEmail);
router.get('/users/countByEmail/:email',userController.countByEmail);
/* Register */
router.post('/users/register',userController.addUser);
/* Edit */
router.put('/users/edit',userController.editUser);
router.put('/users/update',userController.editUserById);
router.put('/users/editForgottenPassword',userController.editForgottenPassword);
router.delete('/users/delete/:id',userController.deleteUser);


router.get('/users/unreviewedUsers/',userController.getUnreviewedUsers);
router.get('/users/count/',userController.count);

router.put('/users/editpayments',userController.editPayments);

router.get('/subjects',subjectController.findAll);
router.post('/subjects/add',subjectController.addSubject);
router.put('/subjects/edit',subjectController.editSubject);
router.delete('/subjects/delete/:id',subjectController.deleteSubject);

router.get('/news',newController.findAll);
router.post('/news/add',newController.addNews);
router.delete('/news/delete/:id',newController.deleteNews);
router.put('/news/edit',newController.editNews);

router.get('/timetable',timeTableController.find);
router.put('/timetable/save',timeTableController.saveTimeTable);

router.post('/upload',userController.upload);


router.get('/payments',paymentController.findAll);
router.post('/payments/add',paymentController.addPayment);
router.put('/payments/update',paymentController.editPaymentById);
router.get('/payments/unreviewedPayments/',paymentController.getUnreviewedPayments);

router.post('/email/send',emailController.send);

module.exports = router;
