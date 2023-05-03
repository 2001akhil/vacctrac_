const db=require('../dbconnector/connection')
const promise = require("Promise");

const login=(name,password)=>{
      // console.log(name)
  
      return new promise(async(resolve,reject)=>{
           await db.query("select * from boxdetails where name=? and password=?",[name,password],(err,result)=>{
                  if(err)
                  {
                        reject(err)
                  }
                  else{
                        console.log(result)
                        if(result.length>0){
                        resolve({datas:result[0],status:"set"})
                        }
                        else{
                              resolve({datas:"NO Data",status:"NO Data"})
                        }
                  }

                  

            })

      })


}

module.exports=login