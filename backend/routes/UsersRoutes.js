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

module.exports = router;
