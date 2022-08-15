const router = require("express").Router();
const Expendetures = require("../models/Expendetures");
const fetchuser = require("../middleware/fetchuser");

//CREATE Expendetures
router.post("/", fetchuser, async (req, res) => {

  const newExpendetures = new Expendetures(req.body);
  try {
    const savedExpendetures = await newExpendetures.save(); 
  res.status(200).json(savedExpendetures);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE Expendetures
router.put("/:id", fetchuser, async (req, res) => {      
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
router.delete("/:id", fetchuser, async (req, res) => {

    const expendetures = await Expendetures.findById(req.params.id);   
      try {
        await expendetures.delete();
        res.status(200).json("Expendetures has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }   
 
});

//GET Expendetures
router.get("/:id", fetchuser, async (req, res) => {
  try {
    const expendetures = await Expendetures.findById(req.params.id);
    res.status(200).json(expendetures);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET All Expendetures + Query
router.get("/", fetchuser, async (req, res) => {
   const query = req.query;
    try {
      const expendetures = await Expendetures.find(query);
      res.status(200).json(expendetures);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
