const router = require("express").Router();
const Shoba = require("../models/Shobajaat");

//CREATE Shobajaat
router.post("/", async (req, res) => {

  const newShoba = new Shoba(req.body);
  try {
    const savedShobajaat = await newShoba.save(); 
  res.status(200).json(savedShobajaat);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE Shoba
router.put("/:id", async (req, res) => {      
      try {
        const updatedShoba = await Shoba.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true } //Show updated Record on POSTMAN(API TEST Software) 
        );
        res.status(200).json(updatedShoba);
      } catch (err) {
        res.status(500).json(err);
      }   
});

//DELETE Shoba
router.delete("/:id", async (req, res) => {

    const shoba = await Shoba.findById(req.params.id);   
      try {
        await shoba.delete();
        res.status(200).json("Shobajaat has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }   
 
});

//GET Shoba
router.get("/:id", async (req, res) => {
  try {
    const shoba = await Shoba.findById(req.params.id);
    res.status(200).json(shoba);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET All Shobajaat + Query
router.get("/", async (req, res) => {
  const query = req.query;
    try {
      const shoba = await Shoba.find(query);
      res.status(200).json(shoba);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
