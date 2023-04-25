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
box.get("/box_page", (req, res) => {
  res.render("box/home_box");
});








module.exports=box;