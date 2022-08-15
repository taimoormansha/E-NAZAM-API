const router = require("express").Router();
const Teacher = require("../models/Teacher");
const fetchuser = require("../middleware/fetchuser");

//CREATE Teacher
router.post("/", fetchuser, async (req, res) => {

  const newTeacher = new Teacher(req.body);
  try {
    const savedTeacher = await newTeacher.save(); 
  res.status(200).json(savedTeacher);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE Teacher
router.put("/:id", fetchuser, async (req, res) => {      
      try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true } //Show updated Record on POSTMAN(API TEST Software) 
        );
        res.status(200).json(updatedTeacher);
      } catch (err) {
        res.status(500).json(err);
      }   
});

//DELETE Teacher
router.delete("/:id", fetchuser, async (req, res) => {

    const tempTeacher = await Teacher.findById(req.params.id);   
      try {
        await tempTeacher.delete();
        res.status(200).json("Record has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }   
 
});

//GET Teacher
router.get("/:id", fetchuser, async (req, res) => {
  try {
    const singleTeacher = await Teacher.findById(req.params.id);
    res.status(200).json(singleTeacher);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET All Teacher + Query
router.get("/", fetchuser, async (req, res) => {
  const query = req.query;
    try {
      const TeacherList = await Teacher.find(query);
      res.status(200).json(TeacherList);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
