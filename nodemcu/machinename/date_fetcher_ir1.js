const db = require("../dbconnector/connection");
const Promise = require("promise");
module.exports={
 ir1:() => {
 return new Promise((resolve,reject)=>{
 db.query(`SELECT * FROM ir1value where flag="true"`,(err,result)=>{
 if(result[0].flag==="true"){
  if(err){
    reject(err);
  }
  else
  if(result.length>0){
    console.log(result[0]);
    resolve({ir:result[0].ir,date:result[0].date})

  }
  else{
    reject();
  }
  
 }else
 if(result[0].flag!=="true"){
   console.log(result[0]);
  resolve({ir:result[0].ir,data:result[0].date});
   
 }
 else{
  reject();
 }
 })



 })
},
}

