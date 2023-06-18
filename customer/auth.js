//otp end point missing
const db=require('./dbconnection/connector')
const otp=(sessionid,phone)=>{
      return new promise((resolve,reject)=>{
            db(`select * from customer where ph=${phone}`,(err,result)=>{
                  
            })


      })
}