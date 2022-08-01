const express = require("express");
const { getAllUsers, approveUserById } = require("../controllers/user.controller");
// const fetchuser = require("../middleware/fetchuser");

const router = express.Router();

// ROUTE 1: Fetch all users using: GET "user/all". Login required
router.get("/all", getAllUsers);

// ROUTE 2: Update an existing user details: POST "user/approve/id". Login Required
router.post("/approve/id/:id", approveUserById);

module.exports = router;
