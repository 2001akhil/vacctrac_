//const mongoose=require("mongoose");
var db = require("../dbconnector/connection");
module.exports = {
  view: () => {
    return new promise((resolve, reject) => {
      db.query(`SELECT * FROM table_name`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result.length > 0) {
            resolve({});
          } else {
            reject({});
          }
        }
      });
    });
  },
};
