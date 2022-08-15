const router = require("express").Router();
const Student = require("../models/Student");
const TerminalExamsResults = require("../models/TerminalExamsResults");
const fetchuser = require("../middleware/fetchuser");

//CREATE TerminalExamsResults
router.post("/", fetchuser, async (req, res) => {

  const newTerminalExamsResults = new TerminalExamsResults(req.body);
  try {
    const savedTerminalExamsResults = await newTerminalExamsResults.save(); 
  res.status(200).json(savedTerminalExamsResults);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE TerminalExamsResults
router.put("/:id", fetchuser, async (req, res) => {      
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
router.delete("/:id", fetchuser, async (req, res) => {

    const tempTerminalExamsResults = await TerminalExamsResults.findById(req.params.id);   
      try {
        await tempTerminalExamsResults.delete();
        res.status(200).json("TerminalExamsResults has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }   
 
});

//GET TerminalExamsResults
router.get("/:id", fetchuser, async (req, res) => {
  try {
    const singleTerminalExamsResults = await TerminalExamsResults.findById(req.params.id);
    res.status(200).json(singleTerminalExamsResults);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET MonthlyResults by Student Id
router.get("/student/:id", fetchuser, async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.params.id });
    const result = await TerminalExamsResults.find({ rollNo: student.rollno });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

//GET All TerminalExamsResults + Query
router.get("/", fetchuser, async (req, res) => {
  const query = req.query;
    try {
      const TerminalExamsResultsList = await TerminalExamsResults.find(query);
      res.status(200).json(TerminalExamsResultsList);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
