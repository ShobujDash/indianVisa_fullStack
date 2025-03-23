const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const cookieToken = require("../utils/cookieToken");
const UserModel = require("../models/UserModel");

// API to register user
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password ,number} = req.body;

    if (!name || !password || !email) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // validatin email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "enter a valid email" });
    }

    // validating strong password
    if (password.length < 6) {
      return res.json({ success: false, message: "enter a strong password" });
    }

    // isExist user
    const isExistUser = await UserModel.findOne({ email });

    if (isExistUser) {
      return res
        .status(400)
        .json({ success: false, message: "User has already exist" });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      number,
      password: hashedPassword,
    };

    const newUser = new UserModel(userData);
    const user = await newUser.save();

    cookieToken(user, res);
  } catch (error) {
    next(error);
  }
};

// API for user login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user?.password);
    if (isMatch) {
      cookieToken(user, res);
    } else {
      res.status(400).json({ success: false, message: "invalid credentials" });
    }
  } catch (error) {
    next(error);
  }
};


// User Profile Details
const UserProfileDetails = async (req, res) => {
  try {
    const userId = req.headers.id;

    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// API for user logout
const logoutUser = (req, res) => {
  try {
    // Clear the cookie named 'token'
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while logging out",
    });
  }
};


// Controller for creating a new user
const createUser = async (req, res) => {
  const { name, email, number } = req.body; // Extract name, email, and number from request body

  try {
    // Check if the user with the same email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User with this email already exists.",
        });
    }

    // Create a new user instance
    const newUser = new UserModel({
      name,
      email,
      number,
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with success message and the created user
    res.status(201).json({success:true, message: "User created successfully.", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error creating user.",
        error: error.message,
      });
  }
};


//  API get user by id
const getuserById = async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the route parameter

    // Find the user by ID in the database
    const user = await UserModel.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Return the user data in the response
    res.status(200).json({
      success: true,
      user, // You can choose to send a subset of the user's data if needed
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching user",
    });
  }
};

// Get All Users For Admin
const getAllUsers = async (req, res, next) => {
  try {
    // Fetch all users from the database
    const users = await UserModel.find().select("-password");

    // If no users are found
    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Users found" });
    }

    // Respond with the list of categories
    res.status(200).json({ success: true, users });
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};

// Update User accnout
const updateUserAccount = async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the route parameter
    const updateData = req.body;

    const user = await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    res
      .status(200)
      .json({success:true, message: "User account updated successfully.", user });
  } catch (error) {
    res
      .status(500)
      .json({success:false, message: "Error updating user account.", error: error.message });
  }
};

// Delete User Account


const deleteUserAccount = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await UserModel.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." }); // Correct feedback if user doesn't exist
    }

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user account.", error: error.message });
  }
};


module.exports = {
  loginUser,
  registerUser,
  UserProfileDetails,
  logoutUser,
  getAllUsers,
  deleteUserAccount,
  updateUserAccount,
  getuserById,
  createUser,
};
