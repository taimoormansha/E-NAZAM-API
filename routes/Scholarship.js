const router = require("express").Router();
const Scholarship = require("../models/Scholarship");

//CREATE Scholarship
router.post("/", async (req, res) => {

  const newScholarship = new Scholarship(req.body);
  try {
    const savedScholarship = await newScholarship.save(); 
  res.status(200).json(savedScholarship);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE Scholarship
router.put("/:id", async (req, res) => {      
      try {
        const updatedScholarship = await Scholarship.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true } //Show updated Record on POSTMAN(API TEST Software) 
        );
        res.status(200).json(updatedScholarship);
      } catch (err) {
        res.status(500).json(err);
      }   
});

//DELETE Scholarship
router.delete("/:id", async (req, res) => {

    const tempScholarship = await Scholarship.findById(req.params.id);   
      try {
        await tempScholarship.delete();
        res.status(200).json("Scholarship has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }   
 
});

//GET Scholarship
router.get("/:id", async (req, res) => {
  try {
    const singleScholarship = await Scholarship.findById(req.params.id);
    res.status(200).json(singleScholarship);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET All Scholarship + Query
router.get("/", async (req, res) => {
  const query = req.query;
    try {
      const ScholarshipList = await Scholarship.find(query);
      res.status(200).json(ScholarshipList);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
