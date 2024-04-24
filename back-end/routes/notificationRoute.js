const Notification = require('../models/notificationModel');
const express = require('express');
const router = express.Router();

// post a new notification

router.post('/', async (req, res) => {
    const newNotification = {
        content: req.body.content,
        userId: req.body.userId
    }
    try {
        const notification = await Notification.create(newNotification);
        return res.status(201).json({ 
            count: notification.length,
            data: notification });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


// get notifications for a specific user
router.get('/', async (req, res) => {
    const userId = req.user.userId;
    try {
        const notifications = await Notification.find({ userId: userId });
        return res.status(200).json({
            count: notifications.length,
            data: notifications,
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;

