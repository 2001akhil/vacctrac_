var express = require("express");
var API = express.Router();
var customer=require('../customer/view');
var authentication=require('../customer/auth');
var session=require('express-session');
var boxcount=require('../box/box')

API.get('/login',async(req,res)=>{
 const ph=req.body.phone;
try{
  const auth = await authentication(ph);
  if(auth.status=="SUCCESS"){
    res.render('/');

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

API.get('/page',async(req,res)=>{
 
await customer.view().then((data)=>{console.log(data.data);res.render("new pages/new", {
  data: data.data,
  vaccine: data.vaccine,
  exp: data.exp,
  manu: data.manu
});})
});

module.exports=API

