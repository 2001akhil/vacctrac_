// var mysql= require('mysql');
// var connection =mysql.createConnection({
//     host : 'vacctrac.c8mgoa42axag.ap-south-1.rds.amazonaws.com',
//     user: 'admin',
//     password: 'vactrac2023',
//     port:3306,
//     database: 'vacctrac'
// });
// connection.connect(function(err){
//     if(err){
//         console.error('error in connection:err');//+err.stack
//         console.log(err)
//         return;
//     }
//     console.log("connected to DB");
// });
// module.exports=connection;


var mysql=require('mysql');


var connetion = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "vacctrac",
});
connetion.connect((err)=>{
     if(err){
        console.log(err);
     }
     else{
        console.log("Database_connected");
     }
})
module.exports=connetion;