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
        lowercase: true,
        unique: true
    },
    password:
    {
        type: String,
        required: true
    },
    profilePic: {
        type: String, 
        required: true,
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
    }],
    post:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);