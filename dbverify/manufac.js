const { promises } = require("fs")
const { resolve } = require("path")
const promise=require('promise')
var db=require('../dbconnector/connection')

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
                             resolve({data:result,message:"Datafetched"})
                            
                             
                             
                        }
                        else{
                              resolve({data:"result not to be fetched",message:"fetchsome error"})
                              
                        }
                  }
            })
      })
      


  },
  data_replace:(fetch_front)=>{
      return new promise((resolve,reject)=>{

      })
  }

}