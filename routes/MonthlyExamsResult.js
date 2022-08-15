const router = require("express").Router();
const Student = require("../models/Student");
const MonthlyResults = require("../models/MonthlyExamsResults");
const fetchuser = require("../middleware/fetchuser");

//CREATE MonthlyResults
router.post("/", fetchuser, async (req, res) => {

  const newMonthlyResults = new MonthlyResults(req.body);
  try {
    const savedMonthlyResults = await newMonthlyResults.save(); 
  res.status(200).json(savedMonthlyResults);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE MonthlyResults
router.put("/:id", fetchuser, async (req, res) => {      
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
router.delete("/:id", fetchuser, async (req, res) => {

    const tempMonthlyResults = await MonthlyResults.findById(req.params.id);   
      try {
        await tempMonthlyResults.delete();
        res.status(200).json("MonthlyResults has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }   
 
});

//GET MonthlyResults
router.get("/:id", fetchuser, async (req, res) => {
  try {
    const singleMonthlyResults = await MonthlyResults.findById(req.params.id);
    res.status(200).json(singleMonthlyResults);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET MonthlyResults by Student Id
router.get("/student/:id", fetchuser, async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.params.id });
    const result = await MonthlyResults.find({ rollNo: student.rollno });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

//GET All MonthlyResults
router.get("/", fetchuser, async (req, res) => {
    const query = req.query;
    try {
      const MonthlyResultsList = await MonthlyResults.find(query);
      res.status(200).json(MonthlyResultsList);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
