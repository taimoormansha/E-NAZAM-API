const router = require("express").Router();
const Student = require("../models/Student");
const fetchuser = require("../middleware/fetchuser");

//CREATE Student
router.post("/", fetchuser, async (req, res) => {

  const newStudent = new Student(req.body);
  try {
    const savedStudent = await newStudent.save(); 
  res.status(200).json(savedStudent);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE Student
router.put("/:id", fetchuser, async (req, res) => {      
      try {
        const updatedStudent = await Student.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true } //Show updated Record on POSTMAN(API TEST Software) 
        );
        res.status(200).json(updatedStudent);
      } catch (err) {
        res.status(500).json(err);
      }   
});

//DELETE Student
router.delete("/:id", fetchuser, async (req, res) => {

    const tempStudent = await Student.findById(req.params.id);   
      try {
        await tempStudent.delete();
        res.status(200).json("Student has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }   
 
});

//GET Student
router.get("/:id", fetchuser, async (req, res) => {
  try {
    const singleStudent = await Student.findById(req.params.id);
    res.status(200).json(singleStudent);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET All Student + Query
router.get("/", fetchuser, async (req, res) => {
  const query = req.query;
    try {
      const StudentList = await Student.find(query);
      res.status(200).json(StudentList);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
