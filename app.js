var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var upload = require('express-fileupload');
var port = 3000;
var app = express();
app.use(cors());
app.use(upload());
//db
mongoose.connect('mongodb://root:azerty8@ds361085.mlab.com:61085/pyramidesparaschool',{ useNewUrlParser: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//not found page
//app.all('*', function(req, res) {
  //res.redirect("http://www.google.com");
//});



app.use('/', indexRouter);
app.use('/api', apiRouter);




app.use('/student',function(req,res){
    res.sendFile(path.join(__dirname, 'public/student/dist/index.html'));
});
app.use('/headmaster',function(req,res){
    res.sendFile(path.join(__dirname, 'public/headmaster/dist/index.html'));
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
