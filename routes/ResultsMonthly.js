const router = require("express").Router();
const ResultMonthly = require("../models/Result");
const fetchuser = require("../middleware/fetchuser");

//CREATE ResultMonthly
// router.post("/", fetchuser, async (req, res) => {

//   const newResultMonthly = new ResultMonthly(req.body);
//   try {
//     const savedResultMonthly = await newResultMonthly.save();
//     res.status(200).json(savedResultMonthly);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//Create 
router.post("/", fetchuser, async (req, res) => {
  try {
    const fee = await ResultMonthly.create(req.body);
    const savedFee = await fee.save();
    res.json(savedFee);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

//UPDATE ResultMonthly
router.put("/:id", fetchuser, async (req, res) => {
  try {
    const updatedResultMonthly = await ResultMonthly.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true } //Show updated Record on POSTMAN(API TEST Software)
    );
    res.status(200).json(updatedResultMonthly);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE ResultMonthly
router.delete("/:id", fetchuser, async (req, res) => {
  const tempResultMonthly = await ResultMonthly.findById(req.params.id);
  try {
    await tempResultMonthly.delete();
    res.status(200).json("ResultMonthly has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ResultMonthly
router.get("/:id", fetchuser, async (req, res) => {
  try {
    const singleResultMonthly = await ResultMonthly.findById(req.params.id);
    res.status(200).json(singleResultMonthly);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ResultMonthly by Student Id
// router.get("/student/:id", fetchuser, async (req, res) => {
//   try {
//     const student = await Student.findOne({ _id: req.params.id });
//     const ResultMonthly = await ResultMonthly.find({ rollNo: student.rollno });
//     res.json(ResultMonthly);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal Server Error.");
//   }
// });

//GET All ResultMonthly + Query
router.get("/", fetchuser, async (req, res) => {
  const query = req.query;
  try {
    const ResultMonthlyList = await ResultMonthly.find(query);
    res.status(200).json(ResultMonthlyList);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;