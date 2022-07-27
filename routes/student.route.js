const express = require("express");
const router = express.Router();
// const fetchuser = require("../middleware/fetchuser");
const { getAllStudents, validationAddStudent } = require("../controllers/student.controller");

// ROUTE 1: Fetch all students using: GET "api/students/fetchallstudents".
router.get("/fetchallstudents", getAllStudents);

// ROUTE 2: Add a new student using: POST "api/students/addstudent". Login required
// router.post("/addstudent", fetchuser, validationAddStudent, addStudent);

// ROUTE 3: Update an existing student using: POST "api/students/updatestudent". Login required
// router.put("/updatestudent/:id", fetchuser, updateStudent);

module.exports = router;
