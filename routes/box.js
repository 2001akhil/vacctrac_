const { Console, table } = require('console');
const cons = require('consolidate');
const { resolveSoa } = require('dns');
var express = require('express');
const path=require('path');
const { response } = require('../app');
// const { Console, table } = require('console');
// const cons = require('consolidate');
// const { resolveSoa } = require('dns');
var express = require('express');
// const path=require('path');
// const { response } = require('../app');
var box = express.Router();
var db=require('../dbconnector/connection')
const bcrypt=require('bcrypt');
const { create } = require('domain');
const { createDecipher } = require('crypto');
const fs=require('fs');
const { type } = require('os');
const { resourceLimits } = require('worker_threads');
var number=10;
//==========================================================
//session
let verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn)
  {
    next();
  }
  else{
    res.redirect('/')
  }
}
//=========================================================

box.get('/',(req,res)=>{

  res.render('box/login');
})
box.post('/login',async(req,res)=>{
  let box_id=req.body.email
  let box_pass=req.body.pasw
  let box_data=await boxid(box_id)
  try{
    if (box_data.status == "SUCCESS") {
      if(box_pass.length>0)
      {
        if(box_pass==box_data.data.pass)
        {
          req.session.loggedIn=true;
          req.session.data=box_data.data;
          
           res.redirect('/page')

        }
        else
        {
          console.log("Password error");
          res.redirect('/')
        }
        
      }

    }
    else{
      console.log("Box id is not matching")
    }
    
    

  }
  catch(err)
  {
    console.err(err);
    res.redirect('/')
  }

})
// box.get("/box_page", (req, res) => {
//   res.render("box/home_box");
// });
// box.post('/data',(req,res)=>{
//   const{name,email}=req.body;
//    console.log(`${name}`)
//    console.log(`${email}`) 
//    // process the data here
//    res.send({ message: "Data received successfully." });
 
   
// })


// box.get('/canvas',(req,res)=>{
//   const data = { message: "Hello world" };
//   res.send(data);  
// })

// box.get('/home',(req,res)=>{
//   res.render('box/updated/home')
// })

box.get("/home", (req, res) => {
  
});






module.exports=box;