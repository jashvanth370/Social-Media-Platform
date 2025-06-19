const Post = require('../models/POst');
const express = require('express');
const router = express.Router();
const varifyToken=require('../middleware/authMiddleware')

//Create Post
router.post('/create',varifyToken,async(req,res)=>{
    try{
        const {content  , image} = req.body;

        if(!content){
            return res.status(400).json({message: "Content feild required"})
        }
        const newPost = Post({
            auther: req.user.userId,
            content,
            image: image || 'Image hjdfhdshj'
        });

        const savedPost = await newPost.save();

        res.status(201).json(savedPost, {message: "post created"})

    }catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create post' });
  }
})

module.exports = router;