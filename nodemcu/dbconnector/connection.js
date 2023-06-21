var mysql = require("mysql");

var connetion = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "vacctrac",
});
connetion.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database_connected");
  }
});
module.exports = connetion;
