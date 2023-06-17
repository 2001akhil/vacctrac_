var express = require("express");
var API = express.Router();
var customer=require('./customer/view');

API.get('/login',(req,res)=>{
  res.render('')
})

API.get('/customer',(req,res)=>{
 customer.view().then((data)=>{}).catch(()=>{})
})


module.exports=API

// SELECT login.*,AWS01.date FROM login inner join AWS01 ON AWS01.empi_id=login.emp_id WHERE login.emp_id=1