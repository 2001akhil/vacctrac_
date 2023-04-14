
var db = require("../dbconnector/connection");

const checkMail = (email) => {
  return new Promise((resolve, reject) => {
    let sql = "select * from login where email = ?";
    db.query(sql, [email], (err, result) => {
      console.log(result[0]);
      if (err) {
        reject(err);
      } else {
        if (result.length > 0) {
          resolve({
            status: "SUCCESS",
            data: result[0],
            message: "Data fetched",
          });
        } else {
          resolve({ status: "ERROR", data: null, message: "No data" });
        }
      }
    });
  });
};

module.exports=checkMail;