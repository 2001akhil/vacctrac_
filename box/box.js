const db=require('../dbconnector/connection')
const promise=require('Promise')

module.exports={

      match:(sessionname)=>{
            return new promise((resolve, reject) => {
                  db.query("select * from matcher where boxname=?",sessionname,(err,result)=>{
                        if(err)
                        {
                              reject(err)
                        }
                        else{
                              if(result.length>0){
                              resolve({data:result[0].sensortable,status:"Dataset"})
                              }
                              else{
                                    resolve({data:"Is not to be fetch",status:"NO data"})
                              }
                        }
                  })

                  
            })
      },

      useridentifier:(sessioname)=>{
            return new promise((resolve, reject) => {
                  db.query("select* from ")
                  
            })
            
      }



      

      

}