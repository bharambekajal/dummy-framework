
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const emailTemplates = require('../constants/emailTemplates.js');

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: "kajal.bharambe@ksolves.com",
    pass: process.env.APP_PASSWORD
  },
});

const sendLink = async (email,templateName, link) => {

  const template = emailTemplates[templateName];

  if (!template) {
    throw new Error(`Email template ${templateName} does not exist`);
  }
 const mailOptions = {
    from: "kajal.bharambe@ksolves.com",
    to: email,
    subject: template.subject,
    html: template.htmlContent(link),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', template.subject);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendLink };
