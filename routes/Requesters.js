const router = require("express").Router();
const Requesters = require("../models/Requesters");

//CREATE Requesters
router.post("/", async (req, res) => {

  const newRequesters = new Requesters(req.body);
  try {
    const savedRequesters = await newRequesters.save(); 
  res.status(200).json(savedRequesters);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE Requesters
router.put("/:id", async (req, res) => {      
      try {
        const updatedRequesters = await Requesters.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true } //To Show updated Record on POSTMAN(API TEST Software) 
        );
        res.status(200).json(updatedRequesters);
      } catch (err) {
        res.status(500).json(err);
      }   
});

//DELETE Requesters
router.delete("/:id", async (req, res) => {

    const requesters = await Requesters.findById(req.params.id);   
      try {
        await requesters.delete();
        res.status(200).json("Request has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }   
 
});

//GET Request by ID
router.get("/:id", async (req, res) => {
  try {
    const requesters = await Requesters.findById(req.params.id);
    res.status(200).json(requesters);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET All Requests + Query
router.get("/", async (req, res) => {
  const query = req.query;
    try {
      const requesters = await Requesters.find(query);
      res.status(200).json(requesters);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
