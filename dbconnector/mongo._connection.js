const mongoose = require("mongoose");

//database_name:vacctrac

const url= "mongodb://localhost/vacctrac";


mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:");
  });

  module.exports=mongoose;