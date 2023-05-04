const promise = require("promise");
var db = require("../dbconnector/connection");
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
      let sql = `INSERT INTO sensordata (ir1,ir2,tempreature,name) VALUES ?`;
      await db.query(sql, [sensor_data], (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result.affectedRows > 0) {
            resolve({ data: result, message: "inserted" });
          } else {
            resolve({ data: err, message: "error" });
          }
        }
      });
    });
  },
  tableadder: (missionname) => {
    return new promise((resolve, reject) => {
      const data = [["sensordata", missionname]];
      db.query("INSERT INTO matcher (sensortable, boxname) VALUES ?",[data],(err, result) => {
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
};