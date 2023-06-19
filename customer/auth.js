
var db = require("../dbconnector/connection");
const authentication = (phone) => {
  return new promise((resolve, reject) => {
    db.query(`select * from customer where ph=${phone}`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        if (result.length > 0) {
          resolve({ Data: result[0], status: "SUCCESS" });
        } else {
          resolve({ Data: null, status: "ERROR" });
        }
      }
    });
  });
};

module.exports = authentication;