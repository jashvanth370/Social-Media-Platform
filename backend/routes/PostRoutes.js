const Post = require('../models/POst');
const User = require('../models/Users');
const express = require('express');
const router = express.Router();
const varifyToken = require('../middleware/authMiddleware')
const multer = require('multer');
const upload = multer({ dest: 'uploads' });
const jwt = require('jsonwebtoken');
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

// router.put('/:id/comment',async (req,res) =>{
//     try{
//         const { content } = req.body;
//         const userId = req.params.id;
//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         if (!content) {
//             return res.status(400).json({ message: "Content field is required" });
//         }

//     } catch (error) {
//         res.status(500).json()
//     }
// });

// Add comment to a post
router.post('/:id/comment', async (req, res) => {
    try {
        const { text } = req.body;
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId || decoded._id;

        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const newComment = {
            userId,
            text,
            createdAt: new Date()
        };

        post.comments.push(newComment);
        await post.save();

        res.status(200).json({ message: "Comment added", post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


//Delete Post
router.delete('/:id/delete', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id); // ✅ Await here

        if (!post) {
            return res.status(404).json({ message: "Post Not Found" });
        }

        if (post.author.toString() !== req.body.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await post.deleteOne();
        res.status(200).json({ message: "Post Deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//GEt posts by users
router.get('/profile/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        const posts = await Post.find({ author: user._id }).populate('author', 'name profilePic');
        res.status(200).json(posts); // ✅ Always return 200
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//get all posts
router.get('/getAllPosts', async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'name email')
            .populate('comments.userId', 'name profilePic')
            .sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;