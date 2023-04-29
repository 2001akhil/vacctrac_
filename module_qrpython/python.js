// author:Akhil
const { resolve } = require("promise");
const { PythonShell } = require("python-shell");
const file={
      scriptPath:__dirname

};

function readQRCode(){
      return new Promise((resolve,reject)=>{
            PythonShell.run('module_qrpython/qr.py',file,(err,result)=>{
                  if(err){
                        console.log(err)
                        reject(err);
                        
                  }
                  else{
                        resolve(result)
                  }
            })
      })

      //calling function pending
}