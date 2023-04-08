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


box.get('/',(req,res)=>{

  res.render('sign');
})

box.get('/box_page',(req,res)=>{
  res.render('box/page')
})





module.exports=box;