var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bodyParser = require('body-parser');
 
var app = express();
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/crud", { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
let installation =  require('./tools/installation');
installation()
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var api = require('./routes/api');


const session = require('express-session');
const passport = require('passport');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  saveUninitialized:true,
  secret: "1!2@3$qQwWeE1qaz2wsx3edc4rfv",
  resave:true,
  cookie:{
    maxAge:600000
  }
}));

app.use(passport.initialize());
app.use(passport.session())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', api);
app.use('/admin', adminRouter);


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
