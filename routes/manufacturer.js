const { Console, table } = require('console');
const cons = require('consolidate');
const { resolveSoa } = require('dns');
var express = require('express');
const path=require('path');
const { response } = require('../app');
var router = express.Router();
var db=require('../dbconnector/connection')
const bcrypt=require('bcrypt');
const { create } = require('domain');
const { createDecipher } = require('crypto');
const fs=require('fs');
const { type } = require('os');
const { resourceLimits } = require('worker_threads');
const checkMail = require('../dbverify/manufacturer');
var number=10;
const manufac=require('../dbverify/manufac')

/* GET home page. */

// m1 start
const verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn)
  {
    next();
  
  }else(res.redirect('/'))
  
}
router.get('/signup',function(req,res){
 res.render('signup')
})
router.post('/signup',async(req,res)=>{
//var encryptedpassword=await bcrypt.hash(req.body.psw,number);error
// console.log(encryptedpassword)
// console.log(req.body.name)
const admin=[[req.body.name,req.body.email,req.body.pswd,req.body.dateofjoin,req.body.dob,req.body.emp_id,req.body.mob]]
console.log(admin)
var sql="INSERT INTO login (name,email,pass,dateofjoin,dob,emp_id,mob) VALUES ?";

db.query(sql,[admin],(err,result)=>{
  if(err)
  console.log(err)
  else{
  console.log(result[0])
  res.redirect('/')
  }
})
})
// router.get('/', function(req, res) {
  

//   if(req.session.loggedIn){
  
 
//     res.render('page')
//   }else{
//   res.render('manu_login')
//   }

// });
router.get('/', function(req, res) {
  try {
    if(req.session.loggedIn){
      res.render('page');
    } else {
      res.render('manu_login');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/login', async (req, res) => {
  console.log(req.body);
  var password = req.body.pasw;
  console.log(password + " from front end");
  var email = req.body.email;

  try {
    const data = await checkMail(email);
    console.log(data);
    if (data.status === "SUCCESS") {
      console.log("status recived");
      console.log(data.data.pass);
      if (password.length > 0) {
        if (password == data.data.pass) {
          req.session.loggedIn = true;
          req.session.data = data.data;
          let sessionData = req.session.data.name;
          if(data)
          {
          console.log(sessionData+"session data fetched")
          }
          else
          {
            console.log("Data is not to be fetched")
          }
          res.render("page", { sessionData: sessionData});
        } else {
          let pas_werr = "password error";
          res.redirect("/", { pas_werr });
          console.log("password error");
        }
      }
    } else {
      const iderror = "Email id error";
      res.redirect("/");
      console.log("email error",{iderror});
    }
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

router.get('/back',verifyLogin,(req,res)=>{
  let data=req.session.data.name
   res.render("page", { sessionData: data });

})

router.get('/page', verifyLogin,function(req, res) {
  
 let data=req.session.data;
 console.log(main)
  res.render('page', { title: 'Dashboard',data});
});
router.post('/page',(req,res)=>{})
router.get('/user',verifyLogin,function(req, res) {
  
  
  let name_user=req.session.data.name;
  let mob_user=req.session.data.mob;
  let dateof_join=req.session.data.dateofjoin


  res.render('user', {data:name_user,mobdata:mob_user,dtof:dateof_join});
  


});
router.post('/user',(req,res)=>{

})

router.get('/next',verifyLogin,function(req, res) {
  
  res.render('next', { title: 'Express' });
});
router.get('/slot', function(req, res) {
 let data=req.session.data;
//   var data={"data": {
//     "Vaccine Name": "'Covaxin'",
//     "Expiry Date": "'23-05-2024'",
//     "Manufacturing Date": "'12-05-2022'",
//     "Company Name": "'UltraShield'",
//     "Vaccine Id": "'abcd'"
// }}
  res.status(200).json(data)
  // res.render('slot', { title: 'Dashboard' });
});
router.post('/slot',(req,res)=>{
console.log(req.body)

})
router.get('/select', function(req, res) {
  
  res.render('select', { title: 'Express' });
});

router.get('/front',verifyLogin,function(req, res) {

let empname=req.session.data.name;
let empid=req.session.data.emp_id;
manufac.vaccine_fetch().then((data)=>{
  res.render("front", { Sessiondata: empname, data: empid,vaccine:data.data});
})
.catch((err)=>{
  console.log(err)
}) 
              
   })


  
   

router.post('/front',(req,res)=>{
  const box_details = [
    [
      req.body.name,
      req.body.boxid,
      req.body.empid,
      req.body.password,
      req.body.vaccine,
    ],
  ];

  manufac.data_replace(box_details[0][4]).then(() => {})
    .catch((err) => {
      console.log(err);
    });
  
  var sql =`INSERT INTO med (box_name,BOX_id,Emp_id,emp_n) VALUES ?`
  db.query(sql,[box_details],(err,result)=>{
  if(err)
  {
    console.log(err)
  }
  else
  {
    res.redirect('/vaccine_dt')
  }
  
  
})
  






});
 router.get("/history", verifyLogin, (req, res) => {
   res.render("history");
 });
router.get('/vaccine_dt',verifyLogin,(req,res)=>{
  
 let data=req.session.data;
 // console.log(data)
 var sql2="select * from vaccine_details"
 db.query(sql2,(err,result)=>{
  if(err){
    console.log(err);
  }
  else{
    var details=result;

    
 
 var sql1="select * from sen"
    db.query(sql1,(err,re)=>{
      if(err){
        console.log(err)
      }else{
        //console.log(result)
        if(re.length>0){
          console.log(re)
          res.render('vaccine',{re,data,details})
        }
      
      }

    })
     }
 })
//  var sql="select * from vaccine_details"
//  db.query(sql,function(err,result){
//   if(err){console.log(err); res.render('vaccine')}
//   else{
//     if(result.length>0){
//       console.log(result)
//       res.render('vaccine',{result,data})
//     }
//   }
//  })


 
  
  
})

router.post('/vaccine_dt',(req,res)=>{
  
})

/*<==========================POST METHOD FETCH FROM CV2 ======================================================================================>*/
router.post('/vaccine',(req,res)=>{
  let data=req.session.data;
  console.log(data)
//  console.log(req.body.data)
  var vaccine_data=req.body.data
  // console.log(vaccine_data);

  var d=vaccine_data
 // console.log(d)
 // console.log(typeof d)

 
var sql=`INSERT INTO vaccine_details (vaccinename,Expiry_d,Manufact_d,company_n,Vaccine_id) VALUES (${d["Vaccine Name"]},${d["Manufacturing Date"]},${d["Expiry Date"]},${d["Company Name"]},${d["Vaccine Id"]})`
console.log(sql)
db.query(sql,(err,result)=>{
  if(err){
    console.log(err)
  }
  else{
    console.log("INSERTED")
  }
})

/*<====================================POST METHOD END===============================================================================================>*/

//   var sql_view="select * from vaccine_details"
//  db.query(sql_view,(err,result)=>{
//     if(err){
//       console.log(err)

//     }
//     else
//     {
//       console.log(result)
//       res.render('vaccine',{results})
//     }

//   })


  
 
  
  
})
router.get('/logout',(req,res)=>{
   req.session.destroy()
    res.redirect('/')
})
router.get('/history',function(req,res){

})
 

/*<=============================M1 stop===========================================================>*/

//--------------------------------------------------------------------------------------------------------------------
// router.post('/main/:machineid',(req,res)=>{

//   let machineid=req.params.machineid
//   console.log(machineid)

// const table = 'sen';

// const id = 1;
// console.log(req.body)
// const name = req.body.temperature;
// const ir1=req.body.ir1;
// const ir2=req.body.ir2;
// // const sql = `UPDATE ${table} SET temperature = ? ir1 = ? ir2 = ?  WHERE id = ?`;

// // const sql = `UPDATE ${table} SET temperature = ?, ir1 = ?, ir2 = ?,machineid = ? WHERE id = ?`;

// // db.query(sql, [name, id,ir1,ir2], (err, result) => {
// //   if (err) {
// //     console.log("Error: ", err);
// //   } else {
// //     console.log("Updated successfully");
// //   }
// // });


  
//   res.status(200).send("HI")
// })
//--------------------------------------------------------------




module.exports = router;
