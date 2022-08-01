const User = require("../models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = require("../config/firebaseConfig");
const { auth } = require("firebase");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const getUserByEmail = async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.json({
        exists: true,
        role: user?.role,
        isApproved: user?.isApproved,
      });
    } else {
      // SEND EMAIL TO VERIFY
      var actionCodeSettings = {
        url: `http://localhost:3000/auth/signin?email=${req.body.email}`,
        // iOS: {
        //   bundleId: "com.example.ios",
        // },
        // android: {
        //   packageName: "com.example.android",
        //   installApp: true,
        //   minimumVersion: "12",
        // },
        handleCodeInApp: true,
      };

      auth()
        .sendSignInLinkToEmail(req.body.email, actionCodeSettings)
        .then(function () {
          res.json({
            exists: false,
            isEmailSent: true,
            msg: "Email Sent for Verification",
          });
        })
        .catch(function (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
        });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const createUser = async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if the user with same email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Duplicate email id." });
    }

    const salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
      isApproved: false,
    });

    const data = {
      user: {
        id: user.id,
      },
    };

    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const loginUser = async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    // Check if the user with same email exists already
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Please input correct details." });
    }

    const passwordCompare = bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Please input correct details." });
    }

    const data = {
      user: {
        id: user.id,
      },
    };
    const userWithoutPassword = await User.findById(user.id).select(
      "-password"
    );
    const authToken = jwt.sign(data, JWT_SECRET);
    return res.json({ user: userWithoutPassword, authToken });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal Server Error");
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'Admin'}).select("-password");
    res.send(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
};

const approveUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const isApproved = true;
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { isApproved } },
      { new: true }
    );
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
};

module.exports = {
  getUserByEmail,
  createUser,
  loginUser,
  getUserById,
  getAllUsers,
  approveUserById,
};