//const mongoose=require("mongoose");
var db = require("../dbconnector/connection");
module.exports = {
 view: (sensorvalue) => {
    console.log(sensorvalue);
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT ir1value.ir, ir2value.ir, (ir1value.ir + ir2value.ir) AS sumoftwo
       FROM ir1value
       INNER JOIN ir2value ON ir1value.name = ir2value.name
       WHERE ir1value.name = "AWS01" AND ir2value.name = "AWS01"`,
        [sensorvalue, sensorvalue], // Use placeholders to prevent SQL injection
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            if (result.length > 0) {
              db.query(
                `SELECT * FROM aws01`,
                (err, dataResult) => {
                  if (err) {
                    reject(err);
                  } else {
                    const sumoftwo = result[0].sumoftwo;
                    const vacciname = dataResult[0].vaccinename;
                    const expiry_d = dataResult[0].expiry_d;
                    const manufac_d=dataResult[0].manufac_d;
                    
                     console.log(vacciname)
                    // console.log(results);
                    console.log(sumoftwo);
                    resolve({
                      data: sumoftwo,
                      vaccine: vacciname,
                      exp: expiry_d,
                      manu: manufac_d,
                    });
                  }
                }
              );
            } else {
              resolve(0); // Return 0 if no result found
            }
          }
        }
      );
    });
  },
};
