const { promises } = require("fs")
const { resolve } = require("path")
const promise=require('promise')
var db=require('../dbconnector/connection')
var array=[];//temporary hold the inactive status from the different session

/*Author:akhil*/
module.exports={
  
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
  }

}