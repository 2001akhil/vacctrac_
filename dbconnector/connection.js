var mysql= require('mysql');
var connection =mysql.createConnection({
    host : 'vacctrac.c8mgoa42axag.ap-south-1.rds.amazonaws.com',
    user: 'admin',
    password: 'vactrac2023',
    port:3306,
    database: 'vacctrac'
});
connection.connect(function(err){
    if(err){
        console.error('error in connection');//+err.stack
        return;
    }
    console.log("connected to DB");
});
module.exports=connection;