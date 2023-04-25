
const nodemailer = require("nodemailer");


function emailer(email) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "",
      pass: "",
    },
  });

  
  const message = {
    from: "yourgmailaccount@gmail.com",
    to: email,
    subject: "Authentication SuccessFull!!",
    text: "HI,",
  };

 
  transporter.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = emailer;
