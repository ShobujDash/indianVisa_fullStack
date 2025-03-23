const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String },
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
    },
    isAdmin: { type: Boolean, default: false },
    number: { type: String},
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model("User", DataSchema);

module.exports = UserModel;
