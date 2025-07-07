const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploads');

const { GetAllPosts, GetPostsByUser, DeletePost, CommentPost, likePost, createPost } = require('../controllers/PostController');
require('dotenv').config();


router.post('/createPost', upload.single('PostImage'), createPost);
router.put('/:id/like', likePost);
router.post('/:id/comment', CommentPost);
router.delete('/:id/delete', DeletePost);
router.get('/getAllPosts', GetAllPosts);
router.get('/profile/:id', GetPostsByUser);

module.exports = router;