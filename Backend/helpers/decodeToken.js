const jwt = require("jsonwebtoken");
exports.DecodeToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECREAT);
  } catch (error) {
    return null;
  }
};
