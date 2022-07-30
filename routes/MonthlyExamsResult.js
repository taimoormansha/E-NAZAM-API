const router = require("express").Router();
const MonthlyResults = require("../models/MonthlyExamsResults");

//CREATE MonthlyResults
router.post("/", async (req, res) => {

  const newMonthlyResults = new MonthlyResults(req.body);
  try {
    const savedMonthlyResults = await newMonthlyResults.save(); 
  res.status(200).json(savedMonthlyResults);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE MonthlyResults
router.put("/:id", async (req, res) => {      
      try {
        const updatedMonthlyResults = await MonthlyResults.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true } //Show updated Record on POSTMAN(API TEST Software) 
        );
        res.status(200).json(updatedMonthlyResults);
      } catch (err) {
        res.status(500).json(err);
      }   
});

//DELETE MonthlyResults
router.delete("/:id", async (req, res) => {

    const tempMonthlyResults = await MonthlyResults.findById(req.params.id);   
      try {
        await tempMonthlyResults.delete();
        res.status(200).json("MonthlyResults has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }   
 
});

//GET MonthlyResults
router.get("/:id", async (req, res) => {
  try {
    const singleMonthlyResults = await MonthlyResults.findById(req.params.id);
    res.status(200).json(singleMonthlyResults);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET All MonthlyResults
router.get("/", async (req, res) => {
    const query = req.query;
    try {
      const MonthlyResultsList = await MonthlyResults.find(query);
      res.status(200).json(MonthlyResultsList);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
