const router = require("express").Router();
const MaddarasaInfo = require("../models/MaddarasaInfo");
const fetchuser = require("../middleware/fetchuser");

//CREATE MaddarasaInfo
router.post("/", fetchuser, async (req, res) => {

  const newMaddarasaInfo = new MaddarasaInfo(req.body);
  try {
    const savedMaddarasaInfo = await newMaddarasaInfo.save(); 
  res.status(200).json(savedMaddarasaInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE MaddarasaInfo
router.put("/:id", fetchuser, async (req, res) => {      
      try {
        const updatedMaddarasaInfo = await MaddarasaInfo.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true } //Show updated Record on POSTMAN(API TEST Software) 
        );
        res.status(200).json(updatedMaddarasaInfo);
      } catch (err) {
        res.status(500).json(err);
      }   
});

//DELETE MaddarasaInfo
router.delete("/:id", fetchuser, async (req, res) => {

    const tempMaddarasaInfo = await MaddarasaInfo.findById(req.params.id);   
      try {
        await tempMaddarasaInfo.delete();
        res.status(200).json("MaddarasaInfo has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }   
 
});

//GET MaddarasaInfo
router.get("/:id", fetchuser, async (req, res) => {
  try {
    const singleMaddarasaInfo = await MaddarasaInfo.findById(req.params.id);
    res.status(200).json(singleMaddarasaInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET All MaddarasaInfo + Query
router.get("/", fetchuser, async (req, res) => {
    const query = req.query;
    try {
      const MaddarasaInfoList = await MaddarasaInfo.find(query);
      res.status(200).json(MaddarasaInfoList);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
