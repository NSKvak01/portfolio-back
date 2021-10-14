const nodemailer = require('nodemailer');
const {google} = require ('googleapis')
const smtpTransport = require("nodemailer-smtp-transport")
CLIENT_ID="768475917780-o41rhhfi43gqodlbnfbabevdn6ptlia9.apps.googleusercontent.com"
CLIENT_SECRET="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"
REDIRECT_URI="https://developers.google.com/oauthplayground"
REFRESH_TOKEN="1//04MJYHe7zFEwfCgYIARAAGAQSNwF-L9IrCRXdZ7hAGe3G7vPtX2A6Vb7UUj6YLoCpuTFhwgMoju4Vc80WswzooL7WsE2SSMPPOso"

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