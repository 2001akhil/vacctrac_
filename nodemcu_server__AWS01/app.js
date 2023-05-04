var express = require('express');
var logger = require('morgan');
var db = require("./dbconnector/connection");
const gmapjson=require('./data/map.json')//take from data folder it contain location logitude latitude coresponding location name
var app = express();
const helper=require('./machinename/setdb')
const bodyParser = require("body-parser");
const cors=require('cors')



//use is a middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

app.get("/", (req, res) => {
      
  db.query("select * from sensordata",(err,rs)=>{
    if(err)
    throw err
    
    console.log(res)
  })
});

//==================================================================================================================================================
app.post("/main/:machineid",(req, res) => {
  
  // console.log(req.body.IR1);
  // console.log(req.body.IR2)
  // console.log(req.body.temperature)
  // console.log(req.params.machineid)
 
 
//====================================================================================== 
 helper.add_machineid(req.params.machineid)
 helper.tableadder(req.params.machineid)
 //======================================================================================

  //==========================================================================
    const data = [
      [req.body.IR1, req.body.IR2, req.body.temperature, req.params.machineid],
    ];
  helper.sensordata(data)
  //===========================================================================
     res.status(200).send("HI");
  
});

//=============================================================================================================================================
/*SELECT id,ir1,ir2, tempreature FROM sensordata ORDER BY id DESC LIMIT 1;
url="https://us1.locationiq.com/v1/reverse.php?key=pk.ee7c67c4eab31bab07fd3c03347268da&lat=9.729303&lon=76.724205&format=json"*/

module.exports = app;
