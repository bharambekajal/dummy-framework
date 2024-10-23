const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

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

const sendLink = async (email, link) => {
  const mailOptions = {
    from: "kajal.bharambe@ksolves.com",
    to: email,
    subject: 'reset Link',
    html: `<p>Click <a href="${link}" target="_blank" rel="noopener noreferrer">
              here
            </a> to complete your registration.</p>`,
    
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully with link:', link);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendLink };

