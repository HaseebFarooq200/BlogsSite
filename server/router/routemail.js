const nodemailer = require('nodemailer');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'haseebfarooq200@gmail.com', // Your email address
    pass: 'thgevdwvprumjktv', // Your email password
  },
});

// Send email using the configured transporter
transporter.sendMail({
  from: 'haseebfarooq200@gmail.com', // Sender's email address
  to: 'rmustafa.hafeez@gmail.com', // Recipient's email address
  subject: 'Test Email',
  text: 'This is a test email sent using Nodemailer!',
}, (error, info) => {
  if (error) {
    console.error(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
