const router = require("express").Router();
const Expendetures = require("../models/Expendetures");

//CREATE Expendetures
router.post("/", async (req, res) => {

  const newExpendetures = new Expendetures(req.body);
  try {
    const savedExpendetures = await newExpendetures.save(); 
  res.status(200).json(savedExpendetures);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE Expendetures
router.put("/:id", async (req, res) => {      
      try {
        const updatedExpendetures = await Expendetures.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true } //Show updated Record on POSTMAN(API TEST Software) 
        );
        res.status(200).json(updatedExpendetures);
      } catch (err) {
        res.status(500).json(err);
      }   
});

//DELETE Expendetures
router.delete("/:id", async (req, res) => {

    const expendetures = await Expendetures.findById(req.params.id);   
      try {
        await expendetures.delete();
        res.status(200).json("Expendetures has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }   
 
});

//GET Expendetures
router.get("/:id", async (req, res) => {
  try {
    const expendetures = await Expendetures.findById(req.params.id);
    res.status(200).json(expendetures);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET All Expendetures + Query
router.get("/", async (req, res) => {
   const query = req.query;
    try {
      const expendetures = await Expendetures.find(query);
      res.status(200).json(expendetures);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
