const express = require("express")
const router = express.Router()
const dotenv = require('dotenv');
const transporter = require('./controller/emailController');
dotenv.config();


router.post('/send', (req, res) => {
    try {
        console.log(req.body)
      const mailOptions = {
        from: process.env.email,
        to: "nkvak@fordham.edu", // list of receivers
        html: `
        <h1 style="font-size:36px; color:rgb(91, 91, 249);">${req.body.name}, wants to connect with you!</h1>
          <div style="border:1px solid rgb(91, 91, 249); width:500px; border-radius:8px; padding:30px;">
            <h2 style="color:black;">Message: ${req.body.message}</h2>
            <h2 style="color:black;">Reply to: ${req.body.email}</h2>
        `
      };
  
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err)
          res.status(500).json({
            success: false,
            message: err
          });
        } else {
          res.json({
            success: true,
            message: 'Message successfully sent'
          });
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong. Try again later'
      });
    }
  });
  
  module.exports = router