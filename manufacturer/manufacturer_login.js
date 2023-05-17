/*Author:akhil*/
var db = require("../dbconnector/connection");
const promise = require("Promise");

const checkMail = (emp_id) => {
  return new promise((resolve, reject) => {
    let sql = "select * from login where emp_id=?";
    db.query(sql, [emp_id], (err, result) => {
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

module.exports = checkMail;
