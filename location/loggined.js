const gls = require("google-location-sharing");
const google_location=()=>{
gls.googleEmail = "";
gls.googlePassword = "";

gls.getLocations().then((result) => {console.log(result);}).catch((err) => {console.log(`There was an error! ${err}`);});}

module.exports=google_location;
