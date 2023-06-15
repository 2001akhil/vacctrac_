var express = require("express");
var API = express.Router();
var db = require("../dbconnector/connection");

API.get('/choice',(req,res)=>{
  res.render('customer/choice')
})

API.get('/details',(req,res)=>{
  res.render('customer/details')

})


API.get('/login',(req,res)=>{
  res.render('customer/login');

})

API.get('/loc',(req,res)=>{
  res.render('customer/loc')
})

module.exports=API

// SELECT login.*,AWS01.date FROM login inner join AWS01 ON AWS01.empi_id=login.emp_id WHERE login.emp_id=1