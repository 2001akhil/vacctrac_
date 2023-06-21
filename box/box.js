const session = require('express-session')
const db=require('../dbconnector/connection')
const promise=require('Promise');
const { compareSync } = require('bcrypt');

module.exports = {
  match: (sessionname) => {
    return new promise((resolve, reject) => {
      db.query(
        `select * from matcher where boxname='${sessionname}'`,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            if (result.length > 0) {
              resolve({ data: result[0].sensortable, status: "Dataset" });
            } else {
              resolve({ data: "Is not to be fetch", status: "NO data" });
            }
          }
        }
      );
    });
  },

  useridentifier: (sessioname) => {
    console.log(sessioname);
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM ${sessioname} ORDER BY id DESC LIMIT 1`,
        (err, result) => {
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
        }
      );
    });
  },

  vaccine_data: (sensorvalue) => {
    console.log(sensorvalue);
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT ir1value.ir, ir2value.ir, (ir1value.ir + ir2value.ir) AS sumoftwo
       FROM ir1value
       INNER JOIN ir2value ON ir1value.name = ir2value.name
       WHERE ir1value.name = ? AND ir2value.name = ?`,
        [sensorvalue, sensorvalue], // Use placeholders to prevent SQL injection
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            if (result.length > 0) {
              db.query(
                `SELECT tempreature FROM sensordata ORDER BY id DESC LIMIT 1`,
                (err, dataResult) => {
                  if (err) {
                    reject(err);
                  } else {
                    const sumoftwo = result[0].sumoftwo;
                    const temp = dataResult[0].tempreature;
                    console.log(temp);
                    console.log(sumoftwo);
                    resolve({ data: sumoftwo, temp: temp });
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

  

  box: (id) => {
    return new promise((resolve, reject) => {
      db.query(``);
      if (err) {
        reject(console.log(err));
      } else {
        if (result.length > 0) {
          resolve({ data: result, status: "Success" });
        } else {
          resolve({ data: null, status: "ERROR" });
        }
      }
    });
  },
  view_vaccine_taken: () => {
    return new promise((resolve, reject) => {
      db.query(
        `SELECT * FROM vaccine_history ORDER BY id DESC LIMIT 1`,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            if (result.length > 0) {
              resolve({ data: result[0] });
            } else {
              reject({});
            }
          }
        }
      );
    });
  },

  vaccinedetails: () => {
    return new promise((resolve, reject) => {
      db.query(`SELECT * FROM login where name="Vacctrac"`, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          if (result.length > 0) {
            console.log(result[0])
            resolve({ data: result[0].name,datas:result[0].email,datass:result[0].dob });
          } else {
            reject({ data: "null" });
          }
        }
      });
    });
  },
};