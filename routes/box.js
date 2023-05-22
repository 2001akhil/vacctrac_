const { Console, table } = require('console');
var express = require('express');
const { response } = require('../app');
var box = express.Router();
const login = require("../box/box_login");
var db = require("../dbconnector/connection");
const { route } = require('./manufacturer');
const boxes=require('../box/box')

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
    .match(req.session.data.name)
    .then((resolve) => {
      console.log(resolve);
      boxes
        .useridentifier(resolve.data)
        .then((data) => {
          console.log(data.data.tempreature);
          console.log(data.sum)
          res.render("box/updated/home", {
            boxid: req.session.data.boxid,
            temp: data.data.tempreature,
            sum: data.sum, 
          });
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
  }
box.get("/home", verifyLogin, home_handler);

function history(req,res){


}
box.get('/history',(req,res)=>{
  res.render('box/updated/history')
})

box.get('/user',(req,res)=>{
   res.render("box/updated/user");

})



module.exports=box;