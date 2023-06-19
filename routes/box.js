const { Console, table } = require('console');
var express = require('express');
const { response } = require('../app');
var box = express.Router();
const login = require("../box/box_login");
var db = require("../dbconnector/connection");
const { route } = require('./manufacturer');
const boxes=require('../box/box')
const sensor_updates=require('../box/date_fetcherir')

const verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn){next();}
  else{res.render("box/updated/login");}
}


box.get('/login_box',(req,res)=>{
  res.render("box/updated/login");
 
})
box.post('/login_box',async(req, res) => {
  let name=req.body.name;
  let password=req.body.pasw;
try{
  const data= await login(name,password)
  if(data.status=="set"){
    console.log("data")
  req.session.loggedIn=true;
  req.session.data=data.data;
  let sname = req.session.data.name;
  res.render("box/updated/index",{data:sname})
  }
  else{
   res.render("box/updated/login");
  }
}
catch(err){
  res.redirect("/box/login_box");
  console.log(err)
}
});

box.get('/logout',(req,res)=>{
  req.session.destroy();
  res.render("box/updated/login");
})

box.get('/back',verifyLogin,(req,res)=>{
  let sname= req.session.data.name;
  console.log(sname)
   res.render("box/updated/index", {data:sname});
})



function home_handler(req, res) {
  boxes
    .vaccine_data(req.session.data.name)
    .then((data) => {
      console.log(data.tempreature);
      res.render("box/updated/home", { sum: data.data,sname:req.session.data.name,tempreature:data.temp });
    })
    .catch((err) => {
      console.log(err);
    });
}


box.get("/home", verifyLogin, home_handler);



function history(req, res) {
  sensor_updates
    .ir1(req.session.data.name)
    .then((data) => {
      res.render("box/updated/history", { datair1: data.data,datair2:data.datas});
    })
    .catch((err) => {
      console.error(err);
    });
}

box.get('/history',verifyLogin,history)

function user(req,res){
boxes
  .user()
  .then((data) => {
    console.log(data.data);
    res.render("box/updated/user");
  })
  .catch((err) => {
    console.log(err);
  });
}
box.get('/user',(req,res)=>{
  

})

box.get('/vaccinedetails',verifyLogin,(req,res)=>{
  boxes.vaccinedetails().then((data)=>{console.log(data.data);res.render("box/updated/vaccine",{vacciname:data.data.vaccinename,expirydate:data.data.expiry_d,manufac_d:data.data.manufac_d});}).catch((err)=>{console.error(err)})
})
// box.get('/vaccinedetails_edit',(req,res)=>{

// })


module.exports=box;