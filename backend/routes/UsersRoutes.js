const User = require('../models/Users'); // Use capital "User" for models
const upload = require('../middleware/uploads')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/authMiddleware');
require('dotenv').config();

//Register Route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, profilePic, bio } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: passwordHash,
      profilePic,
      bio,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      {
        userId: savedUser._id,
        email: savedUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    const { password: _, ...userData } = savedUser.toObject();

    res.status(201).json({
      token,
      user: userData,
      message: 'User registered successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

//Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    const { password: _, ...userData } = user.toObject();

    res.status(200).json({
      token,
      user: userData,
      message: 'Login successful',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

//get user 
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching user data' });
  }
});

//Profile pic
router.post('/profile-pic', upload.single('profilePic'), async (req, res) => {
  try {
    const userId = req.body.userId; // Replace with req.user.id if using auth middleware
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.profilePic = `/uploads/profile_pics/${req.file.filename}`;
    await user.save();

    res.json({ message: 'Profile picture updated', profilePic: user.profilePic });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

//get all users
router.get('/getAll',verifyToken,async(req,res)=>{
  try{
    const users = await User.find();
    res.status(200).json(users);
  }catch (err) {
    res.status(500).json({ error: 'Error fetching users data' });
  }
});

// GET user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE user by ID
router.put('/:id', async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// FOLLOW user
router.put('/:id/follow', async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.currentUserId);

    if (!targetUser || !currentUser) return res.status(404).json({ message: 'User not found' });

    if (targetUser.followers.includes(req.body.currentUserId)) {
      return res.status(400).json({ message: 'You already follow this user' });
    }

    targetUser.followers.push(req.body.currentUserId);
    currentUser.following.push(req.params.id);

    await targetUser.save();
    await currentUser.save();

    res.status(200).json({ message: 'User followed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UNFOLLOW user
router.put('/:id/unfollow', async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.currentUserId);

    if (!targetUser || !currentUser) return res.status(404).json({ message: 'User not found' });

    if (!targetUser.followers.includes(req.body.currentUserId)) {
      return res.status(400).json({ message: 'You do not follow this user' });
    }

    targetUser.followers.pull(req.body.currentUserId);
    currentUser.following.pull(req.params.id);

    await targetUser.save();
    await currentUser.save();

    res.status(200).json({ message: 'User unfollowed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
