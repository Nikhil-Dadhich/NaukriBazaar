import {User} from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getDataUri from '../utils/datauri.js';
import cloudinary from '../utils/cloudinary.js';

export const register = async (req, res) => {
  try {
    const { fullname, email, password, phoneNumber, role } = req.body;
    if (!fullname || !email || !password || !phoneNumber || !role) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Upload profile photo only if file exists
    let profilePhotoUrl = null;
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      profilePhotoUrl = cloudResponse.secure_url;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
      profile: {
        profilePhoto: profilePhotoUrl // null if no file uploaded
      }
    });

    return res.status(201).json({
      success: true,
      message: 'User registered successfully'
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};


export const login = async (req, res) => {
  try {
    const {email, password, role} = req.body;
    
    if(!email || !password || !role){
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }
    
    let user = await User.findOne({email});
    
    if(!user){
      return res.status(400).json({
        success: false,
        message: 'Email does not exist'
      });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if(!isPasswordValid){
      return res.status(400).json({
        success: false,
        message: 'Incorrect password'
      });
    }
    if(role !== user.role){
      return res.status(400).json({
        success: false,
        message: 'Role does not match'
      });
    }
    const tokenData = {
      id: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: '1d'});
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    }
    return res.status(200).cookie("token",token,{
      maxAge:1*24*60*60*1000,
      httpOnly: true,
      sameSite: "None",
      secure: true, // Set to true if using HTTPS
    })
    .json({
      message: `Welcome back ${user.fullname}`,
      user,
      success: true,
    })
  } catch (error) {
    console.log(error);
  }
}

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", {maxAge: 0})
    .json({
      success: true,
      message: 'Logged out successfully'
    }); 
  } catch (error) {
    console.log(error);
  }
}


export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file; // may be undefined

    let cloudResponse;
    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "auto",
        type: "upload",
      });
    }

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",").map((skill) => skill.trim());
    }

    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update fields if provided
    if (fullname != null) user.fullname = fullname;
    if (email != null) user.email = email;
    if (phoneNumber != null) user.phoneNumber = phoneNumber;
    if (bio != null) user.profile.bio = bio;
    if (skillsArray != null) user.profile.skills = skillsArray;

    // Update resume only if file was uploaded
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    const responseUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: responseUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


export const updateProfilePhoto = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ success: false, message: "No file uploaded" });

    const userId = req.id; // assuming middleware adds req.id
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    user.profile.profilePhoto = cloudResponse.secure_url;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile photo updated successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};