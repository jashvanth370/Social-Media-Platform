const express = require('express');
const router = express.Router();
const Message = require('../models/Message')

//create message
router.post('/', async (req, res) => {
    try {
        const { senderId, receiverId, messageText } = req.body;
        const message = new Message({ senderId, receiverId, messageText });
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
})

//get message between two people
router.get('/:user1/:user2', async (req, res) => {
    const { user1, user2 } = req.params;
    try {
        const messages = await Message.find({
            $or: [
                { senderId: user1, receiverId: user2 },
                { senderId: user2, receiverId: user1 }
            ]
        }).sort({ createdAt: 1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
})

// Mark message as read
router.patch('/:messageId/read', async (req, res) => {
  try {
    const updated = await Message.findByIdAndUpdate(
      req.params.messageId,
      { read: true },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;