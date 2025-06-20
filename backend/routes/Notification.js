const express = require('express')
router = express.Router();
const Notification = require('../models/Notification');

router.post('/', async (req, res) => {
    try {
        const { receiverId, senderId,  type, postId } = req.body;
        const notification = new Notification({
            receiverId,
            senderId,
            type,
            postId: postId || null
        });

        const savedNotification = await notification.save();
        res.status(201).json(savedNotification);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching user data' });
    }
})

module.exports = router;
