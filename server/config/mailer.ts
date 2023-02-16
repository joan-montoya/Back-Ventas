import JSONTransport from "nodemailer/lib/json-transport";

var nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'joan.montoya.1c@gmail.com', // generated ethereal user
      pass: 'xyhjpsulieliqpbu', // generated ethereal password
    },
  });

  transporter.verify().then(() => {
    console.log('Ready for send emails')
  })
  