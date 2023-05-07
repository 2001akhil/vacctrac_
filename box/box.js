const session = require('express-session')
const db=require('../dbconnector/connection')
const promise=require('Promise')

module.exports={

      match:(sessionname)=>{
            return new promise((resolve, reject) => {
                  db.query(`select * from matcher where boxname='${sessionname}'`,(err,result)=>{
                        if(err)
                        {
                              reject(err)
                        }
                        else{
                              if(result.length>0){
                              resolve({data:result[0].sensortable,status:"Dataset"})
                              }
                              else{
                                    resolve({data:"Is not to be fetch",status:"NO data"})
                              }
                        }
                  })

                  
            })
      },

      
useridentifier: (sessioname) => {
  console.log(sessioname);
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM ${sessioname} ORDER BY id DESC LIMIT 1`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        if (result.length > 0) {
          db.query(
            `SELECT (ir1+ir2) AS sum_value FROM ${sessioname} ORDER BY id DESC LIMIT 1`,
            (err, sumResult) => {
              if (err) {
                console.log(err);
              } else {
                let sum = sumResult[0].sum_value;
                resolve({
                  data: result[0],
                  sum: sum,
                  status: "Datafetched",
                });
              }
            }
          );
        } else {
          resolve({ data: "Not to be fetched", status: "errorinfetch" });
        }
      }
    });
  });
},







      

      

}