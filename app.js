require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const sgMail = require("@sendgrid/mail");
const bodyParser = require("body-parser");
const path = require("path");

process.env.api;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();

const port = process.env.PORT || 8080;

// Serve only the static files form the dist directory
app.use(express.static(__dirname + "/dist/try"));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const transporter = nodemailer.createTransport(
  sgTransport({
    auth: {
      api_key: process.env.ApiKey
    }
  })
);

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/try/index.html"));
});

app.post("/send", function(req, res) {
  let name = req.body.contactFormName;
  let email = req.body.contactFormEmail;
  let subject = req.body.contactFormSubjects;
  let text = req.body.contactFormMessage;
  let copyToSender = req.body.contactFormCopy;

  if (name === "") {
    res.status(400);
    res.send({
      message: "Bad request"
    });
    return;
  }

  if (email === "") {
    res.status(400);
    res.send({
      message: "Bad request"
    });
    return;
  }

  if (subject === "") {
    res.status(400);
    res.send({
      message: "Bad request"
    });
    return;
  }

  if (text === "") {
    res.status(400);
    res.send({
      message: "Bad request"
    });
    return;
  }

  if (copyToSender) {
    mailOptions.to.push(senderEmail);
  }

  const from = name && email ? `${name} <${email}>` : `${name || email}`;
  const message = {
    from,
    to: process.env.email,
    subject: subject,
    text,
    replyTo: from
  };

  transporter.sendMail(message, (error, response) => {
    if (error) {
      console.log(error);
      res.end("error");
    } else {
      console.log("Message sent: ", response);
      res.end("sent");
    }
  });
  //   sgMail.send(message, (error, response) => {
  //     if (error) {
  //       console.log(error);
  //       res.end("error");
  //     } else {
  //       console.log("Message sent: ", response);
  //       res.end("sent");
  //     }
  //   });
});

app.listen(port, function() {
  console.log("Express started on port: ", port);
});
