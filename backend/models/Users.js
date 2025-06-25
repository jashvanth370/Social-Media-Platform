const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        required: false,
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
    post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
}, { timestamps: true });

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
})

module.exports = mongoose.model('User', userSchema);