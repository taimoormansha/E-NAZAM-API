const Teacher = require("../models/teacher.model");

const getAll = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
};

const getOne = async (req, res) => {
  try {
    const teacher = await Teacher.find({'_id' : req.params.id});
    res.json(teacher);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
};
module.exports = { getAll, getOne };
