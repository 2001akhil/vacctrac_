var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs=require('express-handlebars');
//const mongoose=require("mongoose"); 
var db=require('./dbconnector/connection')
const bodyParser = require('body-parser');
const cors=require("cors")
var hbs=require('express-handlebars');
var indexRouter = require("./routes/manufacturer");
var usersRouter = require('./routes/box');
var customer=require('./routes/customer')



// var db=require('./dbconnector/connection');
var session=require('express-session');
const { hasSubscribers } = require('diagnostics_channel');
const { cursorTo } = require('readline');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// app.engine('hbs',hbs.engine({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/',partialsDir:__dirname+'/views/partials'}));
// view end
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:"key",cookie:{ maxAge: 3 * 24 * 60 * 60 * 1000},resave: false,saveUninitialized: true}))
app.use(express.static("public"));

app.use(cors());

app.use('/', indexRouter);
app.use('/box', usersRouter);
app.use('/customer',customer);

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