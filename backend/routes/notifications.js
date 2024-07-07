const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
const Notification = require('../models/Notification');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Send Email Notification
const sendEmailNotification = async (email, message) => {
  const msg = {
    to: email,
    from: 'test@example.com',
    subject: 'Notification',
    text: message,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error('Error sending email', error);
  }
};

router.post('/', async (req, res) => {
  const { type, message, recipientEmail } = req.body;

  try {
    const notification = new Notification({ type, message, recipientEmail });
    await notification.save();

    const io = req.app.get('socketio');
    io.emit('newNotification', notification);

    await sendEmailNotification(recipientEmail, message);

    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Error creating notification' });
  }
});

router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching notifications' });
  }
});

module.exports = router;
