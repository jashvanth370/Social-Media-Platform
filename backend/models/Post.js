const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text:
    {
        type: String,
        required: true
    },
    createdAt:
    {
        type: Date,
        default: Date.now
    }
});

const postSchema = new mongoose.Schema({
    author:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    authorSnapshot: 
    {
    name: String,
    email: String,
    profilePic: String
    },
    content:
    {
        type: String,
        required: true
    },
    image:
    {
        type: String,
        default: ''
    },
    likes:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
    comments: [commentSchema]
}, { timestamps: true });


module.exports = mongoose.model('Post', postSchema);
