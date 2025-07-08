const mongoose = require('mongoose')

const NotificationSchema = mongoose.Schema({
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['like', 'comment', 'follow'],
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default: null
    },
    message: {
        type: String,
        default: ''
    },
    url: {
        type: String,
        default: ''
    },
    isRead: {
        type: Boolean,
        default: false,
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Notification', NotificationSchema);