var express = require('express');
var router = express.Router();
router.get('/login_cor',function(req,res){
      res.render('m2/cust_login')
})

router.get('/cor_home',function(req,res){
      res.render('customer_homepage')
})
router.get('/loc',function(req,res){
      res.render('location_available')
})
router.get('/vacc_deatails',function(req,res){
      res.render('vacc_details')
})


module.exports=router