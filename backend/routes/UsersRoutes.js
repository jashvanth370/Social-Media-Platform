const User = require('../models/Users'); // Use capital "User" for models
const upload = require('../middleware/uploads')
const express = require('express');
const router = express.Router();
const { userVerification } = require('../middleware/authMiddleware');
const { GetAllUsers, UserGetById, UnFollowUser, FollowUser } = require('../controllers/UserController');
require('dotenv').config();


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


// // UPDATE user by ID
// router.put('/:id',async (req, res) => {
//   try {
//     const updates = req.body;
//     const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// FOLLOW user
router.put('/:id/follow', FollowUser);

// UNFOLLOW user
router.put('/:id/unfollow', userVerification, UnFollowUser);

router.get('/getAllUsers', userVerification, GetAllUsers);
router.get('/get/:id', userVerification, UserGetById);

module.exports = router;
