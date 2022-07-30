const router = require("express").Router();
const StudentContacts = require("../models/StudentContacts");

//CREATE StudentContacts
router.post("/", async (req, res) => {

  const newStudentContacts = new StudentContacts(req.body);
  try {
    const savedStudentContacts = await newStudentContacts.save(); 
  res.status(200).json(savedStudentContacts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE StudentContacts
router.put("/:id", async (req, res) => {      
      try {
        const updatedStudentContacts = await StudentContacts.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true } //Show updated Record on POSTMAN(API TEST Software) 
        );
        res.status(200).json(updatedStudentContacts);
      } catch (err) {
        res.status(500).json(err);
      }   
});

//DELETE StudentContacts
router.delete("/:id", async (req, res) => {

    const tempStudentContacts = await StudentContacts.findById(req.params.id);   
      try {
        await tempStudentContacts.delete();
        res.status(200).json("StudentContacts has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }   
 
});

//GET StudentContacts
router.get("/:id", async (req, res) => {
  try {
    const singleStudentContacts = await StudentContacts.findById(req.params.id);
    res.status(200).json(singleStudentContacts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET All StudentContacts + Query
router.get("/", async (req, res) => {
  const query = req.query;
    try {
      const StudentContactsList = await StudentContacts.find(query);
      res.status(200).json(StudentContactsList);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
