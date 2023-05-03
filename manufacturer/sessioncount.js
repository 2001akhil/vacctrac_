const db=require('../dbconnector/connection')
const{formattedDate, formattedTime}=require('../dateandtime');
const promise=require('Promise')
// const { sessionData } = require("../routes/index");


module.exports = {
  count: (sessionData) => {
      console.log(sessionData)
    
    return new promise(async(resolve, reject) => {
      let data = [[sessionData, "online", formattedDate, formattedTime]];
      console.log(data);
     await db.query("INSERT INTO sessioncount (name,status,date,time) VALUES ?",[data],(err, result) => {
            if (err) {reject(console.log(err));} 
            else { console.log(result); if (result.affectedRows > 0) 
                 { resolve({ data: result, message: "inserted" });
            } else {
              resolve({ data: "NO inserted", message: "ERROR" });
            }
          }
        }
      );
    });

  },
  count_entries:(sessionname)=>{
      return new promise((resolve, reject) => {
            db.query("SELECT COUNT(*) AS total_entries FROM sessioncount where name=?",[sessionname],(err,result)=>{
                  if(err){console.log(err)
                      }else{ //console.log(result)
                   if(result.length>0){resolve({data:result[0].total_entries,message:'data here',status:"SET"});}
                  else{resolve({result:"nodata",message:"error",status:"NOTSET"});}
                      }
            });
            
      })

  },
 

};