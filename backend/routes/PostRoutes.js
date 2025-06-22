const Post = require('../models/POst');
const User = require('../models/Users');
const express = require('express');
const router = express.Router();
const varifyToken = require('../middleware/authMiddleware')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // or configure diskStorage for custom names/paths


//Create Post
// Create Post
router.post('/create/:id', upload.single('image'), async (req, res) => {
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

        const imagePath = req.file ? req.file.path : null;

        const newPost = new Post({
            author: user._id,
            content,
            image: imagePath, // store uploaded file path
        });

        const savedPost = await newPost.save();
        user.post.push(savedPost._id);
        await user.save();

        const populatedPost = await Post.findById(savedPost._id).populate('author', 'name email');

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
            return res.status(200).json({ message: 'Post liked' , post: post });
        } else {
            post.likes.pull(userId);
            await post.save();
            return res.status(200).json({ message: 'Post unliked' ,post: post });
        }
    } catch (error) {
        res.status(500).json()
    }
});

//Delete Post
router.delete('/:id/delete', varifyToken, async (req, res) => {
    try {
        const post = Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post Not Found" });
        }
        if (post.author.toString() !== req.body.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        await post.deleteOne();
        res.status(200).json({ message: "Post Deleted" });
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
});

//GEt posts by users
router.get('/profile/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        const posts = await Post.find({author: user._id}).populate('author');
        if (posts.length == 0) {
            res.status(404).json({ message: "This user do not posts" })
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//get all posts
router.get('/getAllPosts',async(req,res)=>{
    try{
        const posts = await Post.find()
        .populate('author', 'name email')
        .populate('comments.userId', 'name profilePic')
        .sort({ createdAt: -1 });
        res.status(200).json(posts);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;