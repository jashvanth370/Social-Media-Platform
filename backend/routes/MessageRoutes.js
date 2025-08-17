const express = require('express');
const router = express.Router();
const Message = require('../models/Message')
const MessageController = require('../controllers/MessageController')

//create message
router.post('/', MessageController.createMessage)

//get message between two people
router.get('/:user1/:user2', MessageController.SendMessage )

// Mark message as read
router.patch('/:messageId/read', MessageController.ReadMessage);

//Get All Messages
router.get('/getAll', MessageController.GetAllMessages);

module.exports = router;