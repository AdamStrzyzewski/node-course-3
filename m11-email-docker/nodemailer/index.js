const nodemailer = require("nodemailer");

require("dotenv").config();

const auth = {
  // SEND_GRID_USERNAME === apikey
  user: process.env.SEND_GRID_USERNAME,
  pass: process.env.SEND_GRID_PASSWORD,
};

const client = nodemailer.createTransport({ service: "SendGrid", auth });

const emailOptions = {
  from: "adamstrzyzewski9001@gmail.com",
  to: "adamstrzyzewski9001@gmail.com",
  subject: "Nodemailer test",
  text: "Cześć, Testujemy wysyłkę",
};

client
  .sendMail(emailOptions)
  .then((info) => {
    console.log(info);
  })
  .catch((err) => {
    console.log(err);
  });

// node index.js
