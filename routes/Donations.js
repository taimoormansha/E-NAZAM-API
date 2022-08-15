const router = require("express").Router();
const Donations = require("../models/Donations");
const fetchuser = require("../middleware/fetchuser");

//CREATE Donationsjaat
router.post("/", fetchuser, async (req, res) => {

  const newDonations = new Donations(req.body);
  try {
    const savedDonations = await newDonations.save(); 
  res.status(200).json(savedDonations);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE Donations
router.put("/:id", fetchuser, async (req, res) => {      
      try {
        const updatedDonations = await Donations.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true } //Show updated Record on POSTMAN(API TEST Software) 
        );
        res.status(200).json(updatedDonations);
      } catch (err) {
        res.status(500).json(err);
      }   
});

//DELETE Donations
router.delete("/:id", fetchuser, async (req, res) => {

    const donations = await Donations.findById(req.params.id);   
      try {
        await donations.delete();
        res.status(200).json("Donations has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }   
 
});

//GET Donations
router.get("/:id", fetchuser, async (req, res) => {
  try {
    const donations = await Donations.findById(req.params.id);
    res.status(200).json(donations);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET All Donations + query
router.get("/", fetchuser, async (req, res) => {
   const query = req.query;
    try {
      const donations = await Donations.find(query);
      res.status(200).json(donations);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
