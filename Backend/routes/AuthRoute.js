const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  UserProfileDetails,
  deleteUserAccount,
  updateUserAccount,
  updateUser,
  getAllUsers,
  getuserById,
  createUser,
} = require("../controllers/AuthController");
const AuthVerification = require("../middlewares/AuthVerification");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);

userRouter.get("/profile", AuthVerification, UserProfileDetails);
userRouter.get("/", getAllUsers);

userRouter.get("/:id", getuserById);

// Delete User
userRouter.delete("/delete/:id", deleteUserAccount);

// Create User
userRouter.post("/create-user", createUser);

// Update User
userRouter.put("/update/:id", updateUserAccount);

module.exports = userRouter;
