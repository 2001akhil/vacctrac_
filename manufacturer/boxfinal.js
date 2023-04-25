//author:Akhil
const promise=require('promise');
var db = require("../dbconnector/connection");

module.exports = {
  //using call back

  box: (boxname, data) => {
    console.log(data);

    return new Promise(async (resolve, reject) => {
      let sql = `INSERT INTO ${boxname}(vaccinename, expiry_d, manufac_d, company_n) VALUES ?`;

      await db.query(sql, [data], (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result.affectedRows > 0) {
            resolve({ data: result, message: "Data inserted" });
          } else {
            resolve({ data: "No data found", message: "error" });
          }
        }
      });
    });
  },

  // temprory_db:(dbname)=>{
  //       return new promise((resolve,reject)=>{
  //             let store=[[dbname,'inactive']]
  //             db.query=(`INSERT TABLE temp(name,status) VALUES ?`,[store],(err,result)=>{
  //                   if(err){
  //                         reject(console.log(err));
  //                   }
  //                   else{
  //                         if(result.length>0){
  //                               resolve({data:result,message:"Data inserted"})
  //                         }
  //                         else{
  //                               resolve({data:"no data",message:"no data found"})
  //                         }
  //                   }
  //             })
  //       })
  // }
};

