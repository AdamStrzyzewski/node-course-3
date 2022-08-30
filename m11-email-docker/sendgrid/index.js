const sgMail = require("@sendgrid/mail");

require("dotenv").config();

sgMail.setApiKey(process.env.SEND_GRID_PASSWORD);

const msg = {
  to: ["adamstrzyzewski9001@gmail.com"],
  // replyTo = support@yourcompany.com
  replyTo: "adamstrzyzewski9001+replyTo@gmail.com",
  // from = noreply@youcompany.com
  from: "adamstrzyzewski9001@gmail.com",
  cc: "adamstrzyzewski9001+cc@gmail.com",
  bcc: "adamstrzyzewski9001+bcc@gmail.com",
  subject: "Sending with SendGrid",
  text: "https://google.com - link do google",
  html: "<b><a href='https://google.com'>Link do google</a></b>",
  // ejs, hogan, mustache
};

// waszemail+alias@dostawca.domena

// adamstrzyzewski9001@gmail.com
// adam.strzyzewski.9001@gmail.com
// a.d.a.m.s.t.r.z.y.z.e.w.s.k.i.9001@gmail.com

sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent");
  })
  .catch((err) => {
    console.log(error);
  });
