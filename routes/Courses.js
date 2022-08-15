const router = require("express").Router();
const Courses = require("../models/Courses");
const fetchuser = require("../middleware/fetchuser");

//CREATE Course
router.post("/", fetchuser, async (req, res) => {

  const newCourses = new Courses(req.body);
  try {
    const savedCourses = await newCourses.save(); 
  res.status(200).json(savedCourses);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE Courses
router.put("/:id", fetchuser, async (req, res) => {      
      try {
        const updatedCourses = await Courses.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true } //Show updated Record on POSTMAN(API TEST Software) 
        );
        res.status(200).json(updatedCourses);
      } catch (err) {
        res.status(500).json(err);
      }   
});

//DELETE Courses
router.delete("/:id", fetchuser, async (req, res) => {

    const tempCourses = await Courses.findById(req.params.id);   
      try {
        await tempCourses.delete();
        res.status(200).json("Course has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }   
 
});

//GET Courses
router.get("/:id", fetchuser, async (req, res) => {
  try {
    const singleCourses = await Courses.findById(req.params.id);
    res.status(200).json(singleCourses);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET All Courses + Query
router.get("/", fetchuser, async (req, res) => {
   const query = req.query;
    try {
      const CoursesList = await Courses.find(query );
      res.status(200).json(CoursesList);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
