const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const {
  getUserByEmail,
  createUser,
  loginUser,
  getUserById,
  forgotPassword,
  resetPassword,
} = require("../controllers/user.controller");

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

// ROUTE 4: Get logged in user details: POST "auth/user". Login Required
router.get("/user", fetchuser, getUserById);

// ROUTE 5: Send Forgotton Password Mail: POST "auth/forgot-password". No Login Required
router.post(
  "/forgot-password",
  [body("email", "Enter a valid email. Email must include @ sign.").isEmail()],
  forgotPassword
);

// ROUTE 5: Reset Password by token: POST "auth/reset-password". No Login Required
router.post("/reset-password", resetPassword);

module.exports = router;