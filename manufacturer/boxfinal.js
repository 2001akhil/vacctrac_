//author:Akhil
const promise=require('Promise');
var db = require("../dbconnector/connection");

module.exports = {

  box: (boxname, data) => {
    console.log(data);

    return new promise(async (resolve, reject) => {
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
  sensordata:(boxname)=>{
   return new promise((resolve,reject)=>{
    let sql="select * from s"
   })

  }

 
};

