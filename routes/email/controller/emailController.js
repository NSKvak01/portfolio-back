const nodemailer = require('nodemailer');
const {google} = require ('googleapis')
const smtpTransport = require("nodemailer-smtp-transport")
CLIENT_ID="1006631961454-66m5c0tj9k8mla0jpqoa2jctsqrb54kv.apps.googleusercontent.com"
CLIENT_SECRET="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"
REDIRECT_URI="https://developers.google.com/oauthplayground"
REFRESH_TOKEN="1//044kN3NAJg7BiCgYIARAAGAQSNwF-L9IrZQMBz93JOWSadPbMGdNSAbx91Dl7bllnduDNcqfHIkixErEWONSRqXR6axog0h-qaFk"

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