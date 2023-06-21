var express = require('express');
var logger = require('morgan');
var db = require("./dbconnector/connection");
const gmapjson=require('./data/map.json')//take from data folder it contain location logitude latitude coresponding location name
var app = express();
const helper=require('./machinename/setdb')
const bodyParser = require("body-parser");
const cors=require('cors')
const { formattedDate, formattedTime } = require("./dateandtime");
const vaccine_taken = require("./machinename/date_fetcher_ir1");
const vaccine_taken2 = require("./machinename/date_fetcher_ir2");



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
   console.log(req.body)
  //===============================================================================================================================
  const ir1 = {
    data: req.body.IR1,
    date: formattedDate,
  };

  // console.log(req.body)

  const ir2 = {
    data: req.body.IR2,
    date: formattedDate,
  };
  //================================================================================================================================================

  // const ir1_taken = req.body.IR1 === "0" ? formattedDate : "IN";
  // const ir2_taken = req.body.IR2 === "0" ? formattedDate : "IN";
  // console.log(ir1_taken);
  // vaccine_taken(ir1_taken)
  // console.log(ir2_taken);
  // vaccine_taken2(ir2_taken);

  // const datas = [[ir1_taken, ir2_taken]];
  // helper.vaccine_taken(datas);

  //---update here

  const datair = [[req.body.IR1, req.body.IR2]];

 
helper.IR1(req.body.IR1,req.params.machineid)
helper.IR2(req.body.IR2,req.params.machineid)
// helper.IR1_update(req.body.IR1)

  //======================================================================================
  helper.add_machineid(req.params.machineid);
  helper.tableadder(req.params.machineid);
  //======================================================================================

  //==========================================================================
  const data = [
    [
      ir1.data,
      ir1.date,
      ir2.data,
      ir2.date,
      req.body.temperature,
      req.params.machineid,
    ],
  ];
  helper.sensordata(data).catch((err) => {
    console.log(err);
  });
  //===========================================================================
  res.status(200).send("HI");
});

//=============================================================================================================================================
/*SELECT id,ir1,ir2, tempreature FROM sensordata ORDER BY id DESC LIMIT 1;
url="https://us1.locationiq.com/v1/reverse.php?key=pk.ee7c67c4eab31bab07fd3c03347268da&lat=9.729303&lon=76.724205&format=json"*/

module.exports = app;
