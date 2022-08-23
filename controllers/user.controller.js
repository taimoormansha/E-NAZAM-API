const User = require("../models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = require("../config/firebaseConfig");
const { auth } = require("firebase");
const {
  createTestAccount,
  createTransport,
  getTestMessageUrl,
} = require("nodemailer");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const passwordResetLink = `http://localhost:3000/auth/resetpassword`;

const getForgetPasswordEmail = (token) => `
  <p>Lost your password?</p>
  <p>Don't worry use the link below to reset it.</p>
  <p>Press <b><a href="${passwordResetLink}?token=${token}" target="_blank">HERE</a></b> to proceed</p>`;

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
        url: `http://localhost:3000/auth/signup?email=${req.body.email}`,
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

  // TODO: HARDCODE SUPERADMIN DATA
  // TODO: CHECK IF EMAIL AND PASSWORD IS SUPER ADMIN
  const { email, password } = req.body;
  try {
    // Check if the user with same email exists already
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid details." });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Invalid details." });
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
    const users = await User.find({ role: "Admin" }).select("-password");
    res.send(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
};

const approveUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const isApproved = !req.body.isApproved;
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

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const oldUser = await User.findById(userId).select("name password");
    const { name, password } = req.body;
    const updatedUser = { name, password };
    if (!!password) {
      const salt = await bcrypt.genSalt(10);
      const securePass = await bcrypt.hash(password, salt);
      updatedUser["password"] = securePass;
    }

    for (let property in updatedUser) {
      if (!updatedUser[property]) {
        updatedUser[property] = oldUser[property];
      }
    }
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name: updatedUser.name,
          password: updatedUser.password,
        },
      },
      { new: true }
    );
    res.send({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
};

const forgotPassword = async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, JWT_SECRET);
    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      let testAccount = await createTestAccount();

      // create reusable transporter object using the default SMTP transport
      let transporter = createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Admin eNazam 👻" <admin@enazam.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Forgot Your Password?",
        text: `Password Reset Link ${passwordResetLink}?token=${token}`,
        html: getForgetPasswordEmail(token), // html body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

      res.json({
        success: true,
        msg: "Password Reset Mail Sent.",
      });
    }

    main().catch(console.error);
  } else {
    res.json({
      success: false,
      msg: "Invalid Credentials",
    });
  }
};

const resetPassword = async (req, res) => {
  // Get the user from the jwt token and add id to request object
  const token = req.query.token;
  if (!token) {
    return res.status(401).send({ error: "Invalid token." });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    const userId = data.user.id;
    const oldUser = await User.findById(userId).select("password");

    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword)
      res.send({ success: false, error: "Invalid Credentials." });

    if (!!password) {
      const salt = await bcrypt.genSalt(10);
      const securePass = await bcrypt.hash(password, salt);
      const user = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            password: securePass,
          },
        },
        { new: true }
      );
      res.send({ success: true });
    }

    res.send({ success: false });
  } catch (error) {
    res.status(401).send({ error: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const superAdminId = req.user.id;
    const user = await User.findById(superAdminId).select("-password");
    if (user.role === "Super-Admin") {
      const userId = req.params.id;
      const deletedUser = await User.findOneAndRemove({
        _id: userId,
        role: "Admin",
      });

      if (deletedUser) {
        res.json({ success: true, deletedUser: deletedUser._id });
      } else {
        res.json({ success: false, msg: "Unable to Delete." });
      }
    } else {
      res.status(403).send("Forbidden Access");
    }
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
  updateUser,
  forgotPassword,
  resetPassword,
  deleteUser,
};
