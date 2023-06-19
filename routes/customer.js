var express = require("express");
var API = express.Router();
var customer=require('../customer/view');
var authentication=require('../customer/auth');
var session=require('express-session');

API.get('/login',async(req,res)=>{
 const ph=req.body.phone;
try{
  const auth = await authentication(ph);
  if(auth.status=="SUCCESS"){
    res.render('./');



  }
  else{
    res.render('')
  }


}
catch(err){
console.log(err);
res.render('')
}
})

API.get('/customer',(req,res)=>{
 customer.view().then((data)=>{}).catch(()=>{})
})


module.exports=API

// SELECT login.*,AWS01.date FROM login inner join AWS01 ON AWS01.empi_id=login.emp_id WHERE login.emp_id=1