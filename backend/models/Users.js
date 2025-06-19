const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email:
    {
        type: String,
        required: true,
        lowercase: true
    },
    password:
    {
        type: String,
        required: true
    },
    profilePic: {
        type: String, // store image URL or file path
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);