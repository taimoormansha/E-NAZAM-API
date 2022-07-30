const router = require("express").Router();
const Darjaat = require("../models/Darjaat");

//CREATE Darjaat
router.post("/", async (req, res) => {
  const newDarjaat = new Darjaat(req.body);
  try {
    const savedDarjaat = await newDarjaat.save();
    res.status(200).json(savedDarjaat);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE Darjaat
router.put("/:id", async (req, res) => {      
      try {
        const updatedDarjaat = await Darjaat.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true } //Show updated Record on POSTMAN(API TEST Software) 
        );
        res.status(200).json(updatedDarjaat);
      } catch (err) {
        res.status(500).json(err);
      }   
});

//DELETE Darjaat
router.delete("/:id", async (req, res) => {

    const Darjaat = await Darjaat.findById(req.params.id);   
      try {
        await Darjaat.delete();
        res.status(200).json("Darjaat has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }   
 
});


//GET Darjaat
router.get("/:id", async (req, res) => {
  try {
    const darjaat = await Darjaat.findById(req.params.id);
    res.status(200).json(darjaat);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET All Darjaat + query
router.get("/", async (req, res) => {
    const query = req.query;
    try {
      const darjaat = await Darjaat.find(query);
      res.status(200).json(darjaat);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
