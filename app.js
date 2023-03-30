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



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



// var db=require('./dbconnector/connection');
var session=require('express-session');
const { hasSubscribers } = require('diagnostics_channel');
const { cursorTo } = require('readline');
var app = express();
/*========http reciving data from opencv========================*/
// app.use(bodyParser.json())
// app.post('/data', (req, res) => {
//   console.log(req.body.data);
//   var data=req.body.data;
//   const sql='INSERT INTO vaccine_details'
//   //  const sql = 'INSERT INTO vaccine_details (vaccinename,Expiry_d,Manufact_d,company_n) VALUES (?)';
  
//   // // console.log(values)
//   // db.query(sql,values,(err,result)=>{
//   //    if (err) throw err;
//   // console.log('Data inserted successfully');
//   // })
//   // res.send('Data received');
// });
/*===========endfetching data==========*/
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs',hbs.engine({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/',partialsDir:__dirname+'/views/partials'}));
// view end
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:"key",cookie:{maxAge:6000000*8000+6554},resave: false,saveUninitialized: true}))
app.use(cors())





// app.post('/main', function(req, res) {
//   // console.log('IR Value: ' + req.body.value);
//   // res.send('Received IR value: ' + req.body.value);
//    console.log(req.body)
//   res.status(200).send("Hi")
// });



app.use('/', indexRouter);
app.use('/users', usersRouter);



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