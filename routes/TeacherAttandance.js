const router = require("express").Router();
const TeacherAttendance = require("../models/TeacherAttendance");
const fetchuser = require("../middleware/fetchuser");

//CREATE TeacherAttendance
router.post("/", fetchuser, async (req, res) => {

  const newTeacherAttendance = new TeacherAttendance(req.body);
  try {
    const savedTeacherAttendance = await newTeacherAttendance.save(); 
  res.status(200).json(savedTeacherAttendance);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE TeacherAttendance
router.put("/:id", fetchuser, async (req, res) => {      
      try {
        const updatedTeacherAttendance = await TeacherAttendance.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true } //Show updated Record on POSTMAN(API TEST Software) 
        );
        res.status(200).json(updatedTeacherAttendance);
      } catch (err) {
        res.status(500).json(err);
      }   
});

//DELETE TeacherAttendance
router.delete("/:id", fetchuser, async (req, res) => {

    const tempTeacherAttendance = await TeacherAttendance.findById(req.params.id);   
      try {
        await tempTeacherAttendance.delete();
        res.status(200).json("TeacherAttendance has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }   
 
});

//GET TeacherAttendance
router.get("/:id", fetchuser, async (req, res) => {
  try {
    const singleTeacherAttendance = await TeacherAttendance.findById(req.params.id);
    res.status(200).json(singleTeacherAttendance);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET All TeacherAttendance + Query
router.get("/", fetchuser, async (req, res) => {
  const query = req.query;
    try {
      const TeacherAttendanceList = await TeacherAttendance.find(query);
      res.status(200).json(TeacherAttendanceList);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
