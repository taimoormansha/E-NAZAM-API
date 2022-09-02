const express = require("express");
const {
  getAllUsers,
  approveUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const fetchuser = require("../middleware/fetchuser");

const router = express.Router();

// ROUTE 1: Fetch all users using: GET "user/all". Login required
router.get("/all", fetchuser, getAllUsers);

// ROUTE 2: Update an existing user details: POST "user/approve/id". Login Required
router.post("/approve/id/:id", fetchuser, approveUserById);

// ROUTE 3: Update an existing user details: POST "user/id". Login Required
router.post("/:id", fetchuser, updateUser);

// ROUTE 3: Update an existing user details: POST "user/id/:id". Login Required
router.delete("/id/:id", fetchuser, deleteUser);

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> c7ade9ee77876b15c93b62ccebdd1ea360b6e392
