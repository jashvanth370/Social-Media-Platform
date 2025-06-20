const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    messageText: {
        type:String,
        required: true
    },
    read:{
        type:Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Message', MessageSchema);