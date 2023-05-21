/*Author:akhil*/
const promise = require("Promise");
var db = require("../dbconnector/connection");

module.exports = {
  box: (boxname, data) => {
    console.log(data);
    return new promise(async (resolve, reject) => {
      let sql = `INSERT INTO ${boxname}( vaccinename,expiry_d,manufac_d,vaccine_id,empi_id,current_temp,unit,date) VALUES ?`;
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
  table_finder: (table) => {
    console.log(table);
    return new promise((resolve, reject) => {
      db.query(
        "select * from matcher where boxname=?",
        table,
        (err, result) => {
          if (err) {
            reject(err);
            console.log(err);
          } else {
            if (result.length > 0) {
              resolve({ data: result[0].sensortable, message: "Datafetched" });
            } else {
              resolve({ result: "error", message: "NO Datafound" });
            }
          }
        }
      );
    });
  },
detect_table: (tablename) => {
  console.log(tablename);
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM ${tablename} ORDER BY id DESC LIMIT 1`, (err, results) => {
      if (err) {
        reject(err);
        console.log(err);
      } else {
        if (results.length > 0) {
          db.query(
            `SELECT (ir1 + ir2 + ir3 + ir4) AS sum_value FROM ${tablename} ORDER BY id DESC LIMIT 1`,
            (err, sumResult) => {
              if (err) {
                console.log(err);
              } else {
                let sum = sumResult[0].sum_value;
                resolve({
                  data: results[0],
                  vaccine_count: sum,
                  message: "Data fetched",
                });
              }
            }
          );
        } else {
          resolve({
            data: "Not to be fetched",
            message: "Data had some error",
          });
        }
      }
    });
  });
},




}