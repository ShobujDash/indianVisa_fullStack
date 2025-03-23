const jwt = require("jsonwebtoken");
const { DecodeToken } = require("../helpers/decodeToken");

module.exports = (req, res, next) => {
  // console.log("Cookies:", req.cookies); // Cookies ডিবাগ করুন
  const token = req.cookies["token"]; // টোকেন বের করুন


  if (!token) {
    // console.log("Token not found in cookies");
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized", token });
  }

  try {
    const decoded = DecodeToken(token);
    req.headers.id = decoded.userId;
    req.headers.isAdmin = decoded.isAdmin;
    next();
  } catch (error) {
    console.error("Token decoding failed:", error);
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};
