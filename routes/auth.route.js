const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  getUserByEmail,
  createUser,
  loginUser,
  getUserById,
} = require("../controllers/user.controller");
// const fetchuser = require("../middleware/fetchuser");

// ROUTE 1: Return boolean value about user existence using: POST "auth/user". No Login Required
router.post(
  "/user",
  [body("email", "Enter a valid email. Email must include @ sign.").isEmail()],
  getUserByEmail
);

// ROUTE 2: Create a user using: POST "auth/signup". No Login Required
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

// ROUTE 3: Authenticate a user using: POST "auth/login". No Login Required
router.post(
  "/signin",
  [
    body("email", "Enter a valid email. Email must include @ sign.").isEmail(),
    body("password", "Password cannot be blank.").exists(),
  ],
  loginUser
);

// ROUTE 4: Get logged in user details: POST "auth/getuser". Login Required
router.post("/getuser", getUserById);

module.exports = router;
