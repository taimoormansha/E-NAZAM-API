const express = require("express");
const router = express.Router();
// const fetchuser = require("../middleware/fetchuser");
const {
    getAll,
    getOne,
    getFeeHistory
} = require("../controllers/student.controller");

// ROUTE 1: Fetch all students using: GET "api/students/".
router.get("/", getAll);

// ROUTE 2: Fetch student by id using: GET "api/students/id/:id".
router.get("/id/:id", getOne);

// ROUTE 3: Get student fee history using: POST "api/students/feehistory".
router.get("/feehistory/:id", getFeeHistory);


// router.post("/addstudent", fetchuser, validationAddStudent, addStudent);

// ROUTE 3: Update an existing student using: POST "api/students/updatestudent". Login required
// router.put("/updatestudent/:id", fetchuser, updateStudent);

module.exports = router;
