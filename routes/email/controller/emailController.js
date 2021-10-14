const nodemailer = require('nodemailer');
const {google} = require ('googleapis')
const smtpTransport = require("nodemailer-smtp-transport")
CLIENT_ID="829746985396-6qli7aulm1l1grlflov3h783t5kjbhla.apps.googleusercontent.com"
CLIENT_SECRET="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"
REDIRECT_URI="https://developers.google.com/oauthplayground"
REFRESH_TOKEN="1//04bs8aS4ttWPqCgYIARAAGAQSNwF-L9IrjJ3r25x24pg5u08wkpl4k_PwqaTRhrF4StRds_sjI7p0tP12a5V-2LA70G4ow6J5K1w"
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})
const accessToken = oAuth2Client.getAccessToken()

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  service:"gmail",
  auth: {
    type: 'OAuth2',
    user: process.env.email,
    clientId: CLIENT_ID,
    clientSecret:CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: accessToken
    }
  });
// var transporter = nodemailer.createTransport(smtpTransport({
//   service:"gmail",
//   auth: {
//     user: process.env.email,
//     pass:process.env.password
//     }
//   }));


module.exports = transporter;