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
var router = express.Router();
var db=require('../dbconnector/connection')
const bcrypt=require('bcrypt');
const { create } = require('domain');
const { createDecipher } = require('crypto');
const fs=require('fs');
const { type } = require('os');
const { resourceLimits } = require('worker_threads');
var number=10;


router.post('/main',(req,res)=>{
  console.log(req.body)
  var sql=``
  res.status(200).send("HI")
})





module.exports=router;