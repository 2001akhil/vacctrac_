/*Author:akhil*/
const { promises } = require("fs");
const { resolve } = require("path");
const promise = require("promise");
var db = require("../dbconnector/connection");
const { Namespace } = require("socket.io");

var array = []; //temporary hold the inactive status from the different session

module.exports = {
  vaccine_fetch: () => {
    return new promise(async (resolve, reject) => {
      let sql = `select * from machine_name where flag="inactive" and status="on"`;
      await db.query(sql, (err, result) => {
        if (err) {
          reject(console.log(err));
        } else {
          if (result.length > 0) {
            resolve({ data: result[0].name, message: "Datafetched" });
          } else {
            resolve({
              data: "result not to be fetched",
              message: "fetch some error",
            });
          }
        }
      });
    });
  },
  data_replace: (fetch_front) => {
    return new promise(async (resolve, reject) => {
      let sql = "select * from machine_name where name= ?";
      await db.query(sql, [fetch_front], (err, result) => {
        if (err) {
          reject(console.log(err));
        } else {
          resolve({
            //pending
          });
        }
      });
    });
  },
  data_update: (changes,empid) => {
    console.log(changes)
    return new Promise(async (resolve, reject) => {
      await db.query(
        `UPDATE login SET name=?, email=?, mob=? WHERE emp_id=${empid}`,
        [changes.name, changes.email, changes.mob, changes.empid],
        (err, result) => {
          if (err) {
            reject(console.log(err));
          } else {
            if (result.affectedRows > 0) {
              resolve({ data: result, message: "Data updated" });
            } else {
              resolve({ data: "NO data", message: "Error updating data" });
            }
          }
        }
      );
    });
    
  },
  

  front:(data)=>{
    //console.log(data)
    return new promise(async(resolve,reject)=>{
    
       await db.query(
         `INSERT INTO boxdetails(name,boxid,empid,password,manufac_name) VALUES ?`,
         [data],
         (err, result) => {
           if (err) {
             reject(err);
           } else {
             if (result.affectedRows > 0) {
               resolve({ data: result, message: "Inserted" });
             } else {
               resolve({ data: "no data", message: "not be inserted" });
             }
           }
         }
       );
    })

  },
 createDb:(dbname) => {
  console.log(dbname)
  return new promise(async(resolve, reject) => {
    let dbs = `CREATE TABLE ${dbname} (
      vaccinename VARCHAR(225),
      expiry_d VARCHAR(255),
      manufac_d VARCHAR(255),
      company_n VARCHAR(255),
      vaccine_id VARCHAR(255)
    )`;
    
    await db.query(dbs, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve({ data: result, message: "Table created"});
       async function updatedata() {
         let sql = `UPDATE machine_name SET flag="Active"  WHERE name=?`;
         try {
           const result = await db.query(sql,dbname);
           console.log("Status Active");
           module.exports={result}
         } catch (err) {
           console.log(err);
         }
       }
       updatedata();


      }
    });
  });
},

  
};
