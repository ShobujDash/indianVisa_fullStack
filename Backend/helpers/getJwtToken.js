const jwt = require("jsonwebtoken");

const getJwtToken = (userId, email) => {
  return jwt.sign({ userId: userId, email: email }, process.env.JWT_SECREAT, {
    expiresIn: "30d",
  });
};

module.exports = getJwtToken;
