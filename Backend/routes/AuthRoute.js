const express = require("express");
const {
  registerUser,
  loginUser,
  google,
  logoutUser,
  UserProfileDetails,
  deleteUserAccount,
  updateUserAccount,
  updateUser,
  getAllUsers,
} = require("../controllers/AuthController");
const AuthVerification = require("../middlewares/AuthVerification");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/google", google);
userRouter.post("/logout", logoutUser);

userRouter.get("/profile", AuthVerification, UserProfileDetails);
userRouter.get("/users", AuthVerification, getAllUsers);

// Delete User
userRouter.delete("/delete-account", AuthVerification, deleteUserAccount);

// Update User
userRouter.put("/user/:id", AuthVerification, updateUserAccount);

module.exports = userRouter;
