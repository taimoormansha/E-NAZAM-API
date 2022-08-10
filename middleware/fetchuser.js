const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
  // Get the user from the jwt token and add id to request object
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ error: "Invalid token." });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Invalid token." });
  }
};

module.exports = fetchuser;
