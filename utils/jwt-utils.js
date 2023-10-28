const jwt = require("jsonwebtoken");

const JWT_SIGN = process.env.JWT_SIGN; 

const generateToken = (email, username, role) => {
  const payload = {
    email,
    username,
    role,
  };
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, JWT_SIGN, options);
};

module.exports = generateToken