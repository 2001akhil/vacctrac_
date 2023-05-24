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

  sensor_history: () => {
    return new promise((resolve, reject) => {
      db.query(
        `SELECT * FROM sensordata WHERE ir1 = 0 or ir2=0 ORDER BY id DESC LIMIT 1`,
        (err, result) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            // console.log(result[0])
            if (result.length > 0) {
              console.log(result[0].date_ir1);
              resolve({ data: result[0].date_ir1 });
            } else {
              resolve({ data: null, status: "Data_not_fetched" });
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

  vaccinedetails:()=>{
    return new promise((resolve,reject)=>{
      db.query(`select * from aws01`,(err,result)=>{
        if(err){
          console.log(err);
        }
        else{
          if(result.length>0){
            resolve({data:result[0]})
          }
          else{
            reject({data:"null"})
          }
        }
      })
    })

  }
};