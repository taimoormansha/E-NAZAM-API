const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  getUserByEmail,
  createUser,
  loginUser,
  getUser,
} = require("../controllers/user.controller");
// const fetchuser = require("../middleware/fetchuser");

// ROUTE 0: Return true or false respectively if user exists or not
router.post(
  "/user",
  [body("email", "Enter a valid email. Email must include @ sign.").isEmail()],
  getUserByEmail
);

// ROUTE 1: Create a user using: POST "api/auth/signup". No Login Required
router.post(
  "/signup",
  [
    body("name", "Enter a valid Name with more than 3 characters.").isLength({
      min: 3,
    }),
    body("email", "Enter a valid email. Email must include @ sign.").isEmail(),
    body("password", "Password must be atlease 8 characters.").isLength({
      min: 8,
    }),
  ],
  createUser
);

// ROUTE 2: Authenticate a user using: POST "api/auth/login". No Login Required
router.post(
  "/signin",
  [
    body("email", "Enter a valid email. Email must include @ sign.").isEmail(),
    body("password", "Password cannot be blank.").exists(),
  ],
  loginUser
);

// ROUTE 3: Get logged in user details: POST "api/auth/getuser". Login Required
router.post("/getuser", getUser);

module.exports = router;
