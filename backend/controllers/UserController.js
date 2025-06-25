const { userVerification } = require('../middleware/authMiddleware');
const User = require('../models/Users');

// GET user by ID (from token)
module.exports.UserGetById = async (req, res) => {
  try {
    const userId = req.user?.userId || req.user._id;

    if (!userId) {
      return res.status(400).json({ error: 'User ID not found in request' });
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Error in UserGetById:', err);
    res.status(500).json({ error: 'Error fetching user data' });
  }
};


// //Profile pic
// router.post('/profile-pic',upload.single('profilePic'), async (req, res) => {
//   try {
//     const userId = req.body.userId; // Replace with req.user.id if using auth middleware
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     user.profilePic = `/uploads/profile_pics/${req.file.filename}`;
//     await user.save();

//     res.json({ message: 'Profile picture updated', profilePic: user.profilePic });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// });

// //get all users
module.exports.GetAllUsers = async(req,res)=>{
  try{
    const users = await User.find();
    res.status(200).json(users);
  }catch (err) {
    res.status(500).json({ error: 'Error fetching users data' });
  }
}

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

// // FOLLOW user
// router.put('/:id/follow',async (req, res) => {
//   try {
//     const targetUser = await User.findById(req.params.id);
//     const currentUser = await User.findById(req.body.currentUserId);

//     if (!targetUser || !currentUser) return res.status(404).json({ message: 'User not found' });

//     if (targetUser.followers.includes(req.body.currentUserId)) {
//       return res.status(400).json({ message: 'You already follow this user' });
//     }

//     targetUser.followers.push(req.body.currentUserId);
//     currentUser.following.push(req.params.id);

//     await targetUser.save();
//     await currentUser.save();

//     res.status(200).json({ message: 'User followed successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // UNFOLLOW user
// router.put('/:id/unfollow',async (req, res) => {
//   try {
//     const targetUser = await User.findById(req.params.id);
//     const currentUser = await User.findById(req.body.currentUserId);

//     if (!targetUser || !currentUser) return res.status(404).json({ message: 'User not found' });

//     if (!targetUser.followers.includes(req.body.currentUserId)) {
//       return res.status(400).json({ message: 'You do not follow this user' });
//     }

//     targetUser.followers.pull(req.body.currentUserId);
//     currentUser.following.pull(req.params.id);

//     await targetUser.save();
//     await currentUser.save();

//     res.status(200).json({ message: 'User unfollowed successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;
