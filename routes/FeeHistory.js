const router = require("express").Router();
const Student = require("../models/Student");
const FeeHistory = require("../models/FeeHistory");

//CREATE FeeHistory
// router.post("/", async (req, res) => {

//   const newFeeHistory = new FeeHistory(req.body);
//   try {
//     const savedFeeHistory = await newFeeHistory.save();
//     res.status(200).json(savedFeeHistory);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Create Fee History
router.post("/", async (req, res) => {
  try {
    const fee = await FeeHistory.create(req.body);
    const savedFee = await fee.save();
    res.json(savedFee);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
});


//UPDATE FeeHistory
router.put("/:id", async (req, res) => {
  try {
    const updatedFeeHistory = await FeeHistory.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true } //Show updated Record on POSTMAN(API TEST Software)
    );
    res.status(200).json(updatedFeeHistory);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE FeeHistory
router.delete("/:id", async (req, res) => {
  const tempFeeHistory = await FeeHistory.findById(req.params.id);
  try {
    await tempFeeHistory.delete();
    res.status(200).json("FeeHistory has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET FeeHistory
router.get("/:id", async (req, res) => {
  try {
    const singleFeeHistory = await FeeHistory.findById(req.params.id);
    res.status(200).json(singleFeeHistory);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET FeeHistory by Student Id
router.get("/student/:id", async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.params.id });
    const feeHistory = await FeeHistory.find({ rollNo: student.rollno });
    res.json(feeHistory);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

//GET All FeeHistory + Query
router.get("/", async (req, res) => {
  const query = req.query;
  try {
    const FeeHistoryList = await FeeHistory.find(query);
    res.status(200).json(FeeHistoryList);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
