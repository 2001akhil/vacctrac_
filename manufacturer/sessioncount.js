const db=require('../dbconnector/connection')
const{formattedDate, formattedTime}=require('../dateandtime');
const { resolve } = require('promise');

module.exports = {
  count: (sesssionname) => {
    console.log(sesssionname);
    return new Promise((resolve, reject) => {
      let data = [[sesssionname, "online", formattedDate, formattedTime]];
      console.log(data);
      db.query(
        "INSERT INTO sessioncount (name,status,date,time) VALUES ?",
        [data],
        (err, result) => {
          if (err) {
            reject(console.log(err));
          } else {
            if (result.affectedRows > 0) {
              resolve({ data: result, message: "inserted" });
            } else {
              reject({ data: "NO inserted", message: "ERROR" });
            }
          }
        }
      );
    });
  },
  update_status:(statusname)=>{
      return new Promise((resolve,reject)=>{
            let status=[[]]
     db.query("UPDATE sessioncount SET status = ? WHERE name = (SELECT MAX(name) FROM sessioncount WHERE name = ?)")
     //pending

      })
  }
};