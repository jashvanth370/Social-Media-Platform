const { userVerification } = require('../middleware/authMiddleware');
const User = require('../models/Users')
const {createSecretToken} = require('../utils/SecretToken')
const bcrypt = require('bcrypt')


//signup user 
module.exports.SingUp = async (req,res,next)=>{
    try {
    const { email, password, name, bio } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    const profilePicPath = req.file ? `/uploads/${req.file.filename}` : '';

    const user = await User.create({ 
        email, 
        password: passwordHash, 
        name, 
        profilePic: profilePicPath,
        bio 
      });

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({ message: "User signed in successfully", success: true, user });
    next();

  } catch (error) {
    console.error(error);
  }
}

//login user
module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.json({message:'Incorrect email' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.json({message:'Incorrect password' }) 
    }
     const token = createSecretToken(user._id);
     res.cookie("token", token, {
       withCredentials: true,
       httpOnly: false,
     });
     res.status(201).json({ message: "User logged in successfully", success: true ,user , token});
     next()
  } catch (error) {
    console.error(error);
  }
}

