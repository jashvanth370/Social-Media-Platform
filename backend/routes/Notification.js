const express = require('express')
const router = express.Router();
const NotificationController = require('../controllers/NotificationController');

// Create a notification
router.post('/', NotificationController.createNotification);

// Get all notifications for a user (sorted, unread first)
router.get('/:userId', NotificationController.getNotificationsByUser);

// Mark a notification as read
router.patch('/:id/read', NotificationController.markAsRead);

module.exports = router;
