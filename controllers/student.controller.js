const Student = require("../models/student.model");
// const { body, validationResult } = require("express-validator");

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
};

const validationAddStudent = [];
// const validationAddStudent = [
//   body("name", "Enter a valid name").isLength({ min: 5 }),
//   body(
//     "fatherOccupation",
//     "Enter a valid occupation with atleast 10 characters."
//   ).isLength({ min: 10 }),
// ];

module.exports = { getAllStudents, validationAddStudent };
