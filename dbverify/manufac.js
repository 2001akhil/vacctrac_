const { promises } = require("fs")
const { resolve } = require("path")
const promise=require('promise')
var db=require('../dbconnector/connection');
const { Namespace } = require("socket.io");
var array=[];//temporary hold the inactive status from the different session

/*Author:akhil*/
module.exports={
      details:(session)=>{
            return new promise(async(resolve,reject)=>{
        let sql="select name from login where name=?"
        db.query(sql,session,(err,result)=>{
            if(err){
                  reject(err);
            }else{
                  if(result.length>0){
                        resolve({data:result[0].name,message:"Data fetched"})
                  }
                  else{
                        resolve({data:"no data",message:"NO data"})
                  }
                  
            }


        })
            })
      },
  
  vaccine_fetch:()=>{
      return new promise(async(resolve,reject)=>{
            let sql = `select * from machine_name where flag="inactive"`
            await db.query(sql,(err,result)=>{
                  if(err)
                  {
                        reject(console.log(err))
                  }
                  else{
                        if(result.length>0)
                        {
                             resolve({data:result[0].name,message:"Datafetched"})
                            
                             
                             
                        }
                        else{
                              resolve({data:"result not to be fetched",message:"fetch some error"})
                              
                        }
                  }
            })
      })
      


  },
  data_replace:(fetch_front)=>{
      return new promise(async(resolve,reject)=>{
            let sql="select * from machine_name where name= ?"
            await db.query(sql,[fetch_front],(err,result)=>{
                  if(err){
                        reject(console.log(err));
                  }
                  else{
                        resolve({
                              //pending


                        })
                  }

            })
   

            
            

      })
  },
  data_update:()=>{
      return new promise((resolve,reject)=>{
            db.query(`update login set name=? where email=?`,[name,email],(err,result)=>{
                  if(err){
                        reject(console.log(err))
                  }
                  else{
                        if (result.length > 0){
                          resolve({ data: result, message: "Data accessed" });
                  }
                  else{
                        resolve({data:"NO data",message:"fetch some error"})
                  }
            }

            })
      })
  },
 savechanges:(changes)=>{
      db.query("update login set name=? where name=? and email=? and phone=?",[changes],(err,result)=>{
            return new promise((resolve,reject)=>{
                  if(err){
                        reject(err);
                  }
                  else{
                        if(result.length>0)
                        {
                              resolve({data:result,message:"datafetched"});
                        }
                        else{
                              resolve({data:"no data",message:"datacan't be fetched"})
                        }
                  }
            })
      })

 }

}