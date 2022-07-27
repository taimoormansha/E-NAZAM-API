const express = require('express');
const router = express.Router();

const { getAllExpenses } = require('../controllers/expense.controller.js');

// ROUTE 1: Fetch all expenses using: GET "api/expenses/fetchallexpenses".
router.get('/fetchAllExpenses', getAllExpenses);

module.exports = router;