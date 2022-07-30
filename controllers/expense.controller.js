const Expense = require("../models/Expendetues.model");

const getAll = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
};

const getOne = async (req, res) => {
  try {
    const expense = await Expense.find({'_id' : req.params.id});
    res.json(expense);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
};

module.exports = { getAll, getOne };
