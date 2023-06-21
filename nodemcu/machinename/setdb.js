const promise = require("promise");
var db = require("../dbconnector/connection");
const { formattedDate, formattedTime } = require("../dateandtime");
const e = require("express");
module.exports = {
  add_machineid: (machinename) => {
    return new promise(async (resolve, reject) => {
      const response = [[machinename, "inactive"]];
      let sql = `INSERT INTO machine_name (name,flag) VALUES ?`;
      await db.query(sql, [response], (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result.affectedRows > 0) {
            resolve({ data: result, message: "inserted" });
          } else {
            resolve({ data: err, message: "error in insertion" });
          }
        }
      });
    });
  },
  sensordata: (sensor_data) => {
    return new promise(async (resolve, reject) => {
      let sql = `INSERT INTO sensordata (ir1,date_ir1,ir2,date_ir2,tempreature,name) VALUES ?`;
      await db.query(sql, [sensor_data], (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result.affectedRows > 0) {
            // console.log("ok")
            resolve({ data: result, message: "inserted" });
          } else {
            resolve({ data: null, message: "error" });
          }
        }
      });
    });
  },
  tableadder: (missionname) => {
    return new promise((resolve, reject) => {
      const data = [["sensordata", missionname]];
      db.query(
        "INSERT INTO matcher (sensortable, boxname) VALUES ?",
        [data],
        (err, result) => {
          if (err) {
            reject(err);
            // console.log(err)
          } else {
            resolve(result);
          }
        }
      );
    });
  },

  // vaccine_taken: (data) => {
  //   return new promise((resolve, reject) => {
  //     console.log(data);
  //     db.query(
  //       `INSERT INTO vaccine_history(DATE_IR1,DATE_IR2) VALUES ?`,
  //       [data],
  //       (err, result) => {
  //         if (err) {
  //           console.error(err);
  //           reject(err);
  //         } else {
  //           if (result.affectedRows > 0) {
  //             resolve({ data: "set" });
  //           } else {
  //             resolve({ status: "No rows affected" });
  //           }
  //         }
  //       }
  //     );
  //   });
  // },
  IR1: (sensor_data, machineid) => {
    return new Promise((resolve, reject) => {
      if (sensor_data === "1") {
        var data = [[sensor_data, machineid, formattedDate, "true"]];
        db.query(
          `INSERT IGNORE INTO ir1value(ir, name, date, flag) VALUES ?`,
          [data],
          (err, result) => {
            if (err) {
              reject(err);
            } else if (result.affectedRows > 0) {
              resolve("SUCCESS");
            } else {
              resolve("Entry already exists");
            }
          }
        );
      } else {
        db.query(
          `SELECT * FROM ir1value WHERE flag = 'true'`,
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              if (result.length > 0 && result[0].flag !== "false") {
                if (sensor_data === "0") {
                  var data = [sensor_data, formattedDate, "false"];
                  db.query(
                    `UPDATE IGNORE ir1value SET ir = ?, date = ?, flag = ? WHERE name = 'AWS01'`,
                    data,
                    (error, result) => {
                      if (error) {
                        reject(error);
                      } else {
                        resolve(result);
                      }
                    }
                  );
                } else {
                  resolve("OK!");
                }
              } else {
                resolve();
              }
            }
          }
        );
      }
    }).catch((error) => {
      console.error("Unhandled promise rejection:", error);
      throw error;
    });
  },

  IR2: (sensor_data, machineid) => {
    return new Promise((resolve, reject) => {
      if (sensor_data === "1") {
        var data = [[sensor_data, machineid, formattedDate, "true"]];
        db.query(
          `INSERT IGNORE INTO ir2value(ir, name, date, flag) VALUES ?`,
          [data],
          (err, result) => {
            if (err) {
              reject(err);
            } else if (result.affectedRows > 0) {
              resolve("SUCCESS");
            } else {
              resolve("Entry already exists");
            }
          }
        );
      } else {
        db.query(
          `SELECT * FROM ir2value WHERE flag = 'true'`,
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              if (result.length > 0 && result[0].flag !== "false") {
                if (sensor_data === "0") {
                  var data = [sensor_data, formattedDate, "false"];
                  db.query(
                    `UPDATE IGNORE ir2value SET ir = ?, date = ?, flag = ? WHERE name = 'AWS01'`,
                    data,
                    (error, result) => {
                      if (error) {
                        reject(error);
                      } else {
                        resolve(result);
                      }
                    }
                  );
                } else {
                  resolve("OK!");
                }
              } else {
                resolve();
              }
            }
          }
        );
      }
    }).catch((error) => {
      console.error("Unhandled promise rejection:", error);
      throw error;
    });
  },
};
