
var express = require('express');
var router = express.Router();
var db=require('../dbconnector/connection')
const checkMail = require("../manufacturer/manufacturer_login");
const sessionname=require("../manufacturer/sessioncount")
const manufac = require("../manufacturer/manufac");
const manufac_final = require("../manufacturer/boxfinal");//final stage
const session = require('express-session');
const { captureRejectionSymbol } = require('nodemailer/lib/xoauth2');
const { compareSync } = require('bcrypt');
const { formattedDate, formattedTime } = require("../dateandtime");



/* GET home page. */

// m1 start
//====middleware
const verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn)
  {
    
    next();
  
  }else(res.redirect('/'))
  
}
//,



//===============================

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
          // module.exports = { sessionData: sessionData };
           sessionname.count(sessionData).then((data)=>{console.log(data); }).catch((err)=>console.log(err))
          sessionname.count_entries(sessionData).then((data)=>{console.log(data.data);res.render("page", { sessionData: sessionData,data:data.data });}).catch((err)=>{console.log(err)})
                 
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



router.get('/page', verifyLogin,function(req, res) {
  
 let data=req.session.data;
  res.render('page', { title: 'Dashboard',data});
});
router.post('/page',(req,res)=>{})
router.get('/user',verifyLogin,function(req, res) {
  
  
  let name_user=req.session.data.name;
  let mob_user=req.session.data.mob;
  let dateof_join=req.session.data.dateofjoin
  let email_user=req.session.data.email;
  let emp=req.session.data.emp_id;


  res.render("user", {
    data: name_user,
    mobdata: mob_user,
    dtof: dateof_join,
    data_email: email_user,
    empi:emp
 });
  


});

router.post('/user',(req,res)=>{
  
})

// //============passing null to the db
// router.post("/user", (req, res) => {
//   // res.render("user");

//     let session = req.session.data.emp_id;
//     let data_user = [
//       [req.body.mob, req.body.email]
//     ];
//     try{
//     manufac.data_update(data_user,session).then((data) => {console.log(data);res.redirect("/user");}).catch((err) => {console.log(err);});
//     }
//     catch(err){
//       console.error(err);
//       res.redirect('/user')

//     }20
// });


router.get('/front',verifyLogin,function(req, res) {
  try{
let empname=req.session.data.name;
let empid=req.session.data.emp_id;
manufac.vaccine_fetch().then((data)=>{res.render("front", { Sessiondata: empname, data: empid,vaccine:data.data});}).catch((err)=>{console.log(err)})
  }catch(err){
    res.render('front')
  } 
})


router.post("/front", verifyLogin, async (req, res) => {

  const sessionData = req.session.data.name;
  console.log(sessionData)
  const box_details = [
    [
      req.body.box,
      req.body.boxid,
      req.body.empid,
      req.body.password,
      sessionData,
    ],
  ]; 
  manufac.createDb(req.body.box).then((data) => {console.log(data);}).catch((err) => {console.log(err);});
  await manufac.front(box_details).then((response) => {console.log(response.message);req.session.box_name = req.body.box;}).catch((err) => {console.log(err);res.redirect("/front");});
  await manufac_final.table_finder(req.body.box).then((response)=>{console.log(response); res.redirect("/vaccine");}).catch((err)=>(console.log(err)))
});



router.get('/vaccine_edit',(req,res)=>{
  res.render("vaccine")
})

router.get("/vaccine",verifyLogin,async(req, res) => {
   
   const box_name = req.session.box_name;
   try{await manufac_final.table_finder(box_name).then((data) => {console.log(data.data);manufac_final.detect_table(data.data).then((data)=>{console.log(data.data.tempreature),res.render("vaccine",{datatemp:data.data.tempreature,datair1:data.data.ir1,datair2:data.data.ir2});}).catch((err)=>{console.log(err)});}).catch((err)=>{console.log(err)})}
   catch(err){console.log(err)}
});
router.post('/vaccine',async(req,res)=>{
  const empi_id = req.session.data.emp_id;
  const box_name = req.session.box_name;
  console.log(box_name);
let data=[[req.body.name,req.body.id1,req.body.dob,req.body.dobb,empi_id,req.body.temp,formattedDate]];
await manufac_final.box(box_name,data).then((data)=>{console.log(data.message);res.redirect('/back')}).catch((err)=>{console.log(err);res.redirect('/vaccine')})


})

router.get("/history_edit", (req, res) => {

      res.render("history");
   
});


 router.get("/history", verifyLogin,(req, res) => {
  
   manufac.history_tb(req.session.data.emp_id).then((data)=>{console.log(data.data);res.render('history')}).catch((err)=>{console.log(err)})

 });



//============================================================================
router.get("/back", verifyLogin, (req, res) => {
 
  let data = req.session.data.name;
  res.render("page", { sessionData: data });
});

router.get('/logout',(req,res)=>{
  req.session.destroy(); 
  res.redirect("/");
  
  // try{
  //   let sessionname = req.session.data.name;
  //  console.log(sessionname);
  //   sessionname.update_status(sessionname).then((data)=>{console.log(data);}).catch((err)=>{console.log(err)})
  // }
  // catch(err)
  // {
  //   req.session.destroy()
  //  res.redirect("/");
  // }
    
})
//==
//error

//
// router.get('/next',function(req, res) {
  
//   res.render('next', { title: 'Express' });
// });
// // router.get('/slot', function(req, res) {
// //  let data=req.session.data;
// // //   var data={"data": {
// // //     "Vaccine Name": "'Covaxin'",
// // //     "Expiry Date": "'23-05-2024'",
// // //     "Manufacturing Date": "'12-05-2022'",
// // //     "Company Name": "'UltraShield'",
// // //     "Vaccine Id": "'abcd'"
// // // }}
// //   res.status(200).json(data)
// //   // res.render('slot', { title: 'Dashboard' });
// // });
//=======================================================================




module.exports = router;
