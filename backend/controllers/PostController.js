const upload = require('../middleware/uploads');
const Post = require('../models/POst');
const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const Notification = require('../models/Notification');

//get all posts
module.exports.GetAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'name email')
            .populate('comments.userId', 'name profilePic')
            .sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//GEt posts by users
module.exports.GetPostsByUser = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        const posts = await Post.find({ author: user._id }).populate('author', 'name profilePic');
        res.status(200).json(posts); // ✅ Always return 200
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//Delete Post
module.exports.DeletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

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
}

// Add comment to a post
module.exports.CommentPost = async (req, res) => {
    try {
        const { text } = req.body;
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id || decoded._id;
        const user = await Users.findById(userId);

        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const newComment = {
            userId,
            authorSnapshot: {
                name: user.name,
                email: user.email,
                profilePic: user.profilePic
            },
            text,
            createdAt: new Date()
        };

        post.comments.push(newComment);
        await post.save();

        // Create notification for post author (if not commenting on own post)
        if (post.author.toString() !== userId) {
            await Notification.create({
                receiverId: post.author,
                senderId: userId,
                type: 'comment',
                postId: post._id,
                message: `${user.name} commented on your post`,
                url: `/post/${post._id}`
            });
        }

        res.status(200).json({ message: "Comment added", post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports.likePost = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id || decoded._id;

        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        let action = '';
        if (!post.likes.includes(userId)) {
            post.likes.push(userId);
            await post.save();
            action = 'liked';
            // Create notification for post author (if not liking own post)
            if (post.author.toString() !== userId) {
                const user = await Users.findById(userId);
                await Notification.create({
                    receiverId: post.author,
                    senderId: userId,
                    type: 'like',
                    postId: post._id,
                    message: `${user.name} liked your post`,
                    url: `/post/${post._id}`
                });
            }
            return res.status(200).json({ message: 'Post liked', post: post });
        } else {
            post.likes.pull(userId);
            await post.save();
            action = 'unliked';
            return res.status(200).json({ message: 'Post unliked', post: post });
        }
    } catch (error) {
        console.error('Like post error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.createPost = async (req, res) => {
    try {
        const { content } = req.body;

        // Get user from JWT token
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id || decoded._id;
        const user = await Users.findById(userId);

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
        console.error('Create post error:', err);
        res.status(500).json({ message: 'Failed to create post' });
    }
}

