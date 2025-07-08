const Notification = require('../models/Notification');

// Create a notification
exports.createNotification = async (req, res) => {
    try {
        const { receiverId, senderId, type, postId, message, url } = req.body;
        const notification = new Notification({
            receiverId,
            senderId,
            type,
            postId: postId || null,
            message: message || '',
            url: url || ''
        });
        const savedNotification = await notification.save();
        res.status(201).json(savedNotification);
    } catch (err) {
        res.status(500).json({ error: 'Error creating notification' });
    }
};

// Get all notifications for a user (sorted, unread first)
exports.getNotificationsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const notifications = await Notification.find({ receiverId: userId })
            .sort({ isRead: 1, createdAt: -1 });
        res.status(200).json(notifications);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching notifications' });
    }
};

// Mark a notification as read
exports.markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Error updating notification' });
    }
}; 