const express = require("express");
const router = express.Router();
// const fetchuser = require("../middleware/fetchuser");
const { getAllTeachers } = require("../controllers/teacher.controller");

// ROUTE 1: Fetch all teachers using: GET "api/teachers/fetchallteachers".
router.get("/fetchallteachers", getAllTeachers);

module.exports = router;
