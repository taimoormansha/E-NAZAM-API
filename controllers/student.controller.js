const Student = require("../models/student.model");
const FeeHistory = require("../models/studentFeeHistory.model");
// const { body, validationResult } = require("express-validator");

const getAll = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
};

const getOne = async (req, res) => {
  try {
    const student = await Student.find({'_id' : req.params.id});
    res.json(student);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
};

const getFeeHistory = async (req, res) => {
  try {
    const feeHistory = await FeeHistory.find({'studentID' : req.params.id});
    res.json(feeHistory);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
};

module.exports = { getAll, getOne, getFeeHistory };
