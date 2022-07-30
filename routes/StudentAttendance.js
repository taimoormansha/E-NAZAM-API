const router = require("express").Router();
const StudentAttendance = require("../models/StudentAttendance");

//CREATE StudentAttendance
router.post("/", async (req, res) => {

  const newStudentAttendance = new StudentAttendance(req.body);
  try {
    const savedStudentAttendance = await newStudentAttendance.save(); 
  res.status(200).json(savedStudentAttendance);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE StudentAttendance
router.put("/:id", async (req, res) => {      
      try {
        const updatedStudentAttendance = await StudentAttendance.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true } //Show updated Record on POSTMAN(API TEST Software) 
        );
        res.status(200).json(updatedStudentAttendance);
      } catch (err) {
        res.status(500).json(err);
      }   
});

//DELETE StudentAttendance
router.delete("/:id", async (req, res) => {

    const tempStudentAttendance = await StudentAttendance.findById(req.params.id);   
      try {
        await tempStudentAttendance.delete();
        res.status(200).json("StudentAttendance has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }   
 
});

//GET StudentAttendance
router.get("/:id", async (req, res) => {
  try {
    const singleStudentAttendance = await StudentAttendance.findById(req.params.id);
    res.status(200).json(singleStudentAttendance);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET All StudentAttendance + Query
router.get("/", async (req, res) => {
  const query = req.query;
    try {
      const StudentAttendanceList = await StudentAttendance.find(query);
      res.status(200).json(StudentAttendanceList);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
