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
    console.log(tablename)
    return new promise((resolve, reject) => {
      db.query(`select id,tempreature,ir1,ir2 from ${tablename}ORDER BY id DESC LIMIT 1`,(err, result) => {
          if (err) {
            reject(err);
            console.log(err);
          } else {
            if (result.length > 0) {
              resolve({ data: result[0], message: "Data fetched" });
            } else {
              resolve({
                data: "Not to be fetched",
                message: "Datahad some err",
              });
            }
          }
        }
      );
    });
  },
};

