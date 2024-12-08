const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Use CORS middleware
app.use(cors());
app.use(express.json());

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Replace with your email
    pass: 'your-email-password',  // Replace with your email password or app password
  },
});

app.post('/send-permission-email', (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ success: false, message: 'Username and email are required' });
  }

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'mmbkmcgamming2014@gmail.com', // Email for permission
    subject: 'New Account Request for Animation Premium 2.0',
    text: `A new account request has been made:\n\nUsername: ${username}\nEmail: ${email}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, message: 'Failed to send email' });
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
