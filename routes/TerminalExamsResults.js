const router = require("express").Router();
const TerminalExamsResults = require("../models/TerminalExamsResults");

//CREATE TerminalExamsResults
router.post("/", async (req, res) => {

  const newTerminalExamsResults = new TerminalExamsResults(req.body);
  try {
    const savedTerminalExamsResults = await newTerminalExamsResults.save(); 
  res.status(200).json(savedTerminalExamsResults);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE TerminalExamsResults
router.put("/:id", async (req, res) => {      
      try {
        const updatedTerminalExamsResults = await TerminalExamsResults.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true } //Show updated Record on POSTMAN(API TEST Software) 
        );
        res.status(200).json(updatedTerminalExamsResults);
      } catch (err) {
        res.status(500).json(err);
      }   
});

//DELETE TerminalExamsResults
router.delete("/:id", async (req, res) => {

    const tempTerminalExamsResults = await TerminalExamsResults.findById(req.params.id);   
      try {
        await tempTerminalExamsResults.delete();
        res.status(200).json("TerminalExamsResults has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }   
 
});

//GET TerminalExamsResults
router.get("/:id", async (req, res) => {
  try {
    const singleTerminalExamsResults = await TerminalExamsResults.findById(req.params.id);
    res.status(200).json(singleTerminalExamsResults);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET All TerminalExamsResults + Query
router.get("/", async (req, res) => {
  const query = req.query;
    try {
      const TerminalExamsResultsList = await TerminalExamsResults.find(query);
      res.status(200).json(TerminalExamsResultsList);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
