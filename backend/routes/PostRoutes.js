const Post = require('../models/POst');
const User = require('../models/Users');
const express = require('express');
const router = express.Router();
const varifyToken = require('../middleware/authMiddleware')
const multer = require('multer');
const upload = multer({ dest: 'uploads' });
const jwt = require('jsonwebtoken');
const { GetAllPosts, GetPostsByUser, DeletePost, CommentPost } = require('../controllers/PostController');
require('dotenv').config();



// Create Post
router.post('/create/:id', upload.single('PostImage'), async (req, res) => {
    try {
        const { content } = req.body;
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!content) {
            return res.status(400).json({ message: "Content field is required" });
        }

        const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

        const newPost = new Post({
            author: user._id,
            authorSnapshot: {
                name: user.name,
                email: user.email,
                profilePic: user.profilePic
            },
            content,
            image: imagePath, // store uploaded file path
        });

        const savedPost = await newPost.save();
        user.post.push(savedPost._id);
        await user.save();

        const populatedPost = await Post.findById(savedPost._id).populate('author', 'name email profilePic');

        res.status(201).json({ message: "Post created", post: populatedPost });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create post' });
    }
});

//Like a post
router.put('/:id/like', async (req, res) => {
    try {
        const userId = req.body.userId;
        const post = await Post.findById(req.params.id);

        if (!post.likes.includes(userId)) {
            post.likes.push(userId);
            await post.save();
            return res.status(200).json({ message: 'Post liked', post: post });
        } else {
            post.likes.pull(userId);
            await post.save();
            return res.status(200).json({ message: 'Post unliked', post: post });
        }
    } catch (error) {
        res.status(500).json()
    }
});

router.post('/:id/comment',CommentPost);
router.delete('/:id/delete',DeletePost);
router.get('/getAllPosts',GetAllPosts);
router.get('/profile/:id',GetPostsByUser);
 
module.exports = router;