const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");

const { getAll, getOne } = require("../controllers/expense.controller");

// ROUTE 1: Fetch all expenses using: GET "api/expenses/getAll".
router.get("/", fetchuser, getAll);

// ROUTE 2: Fetch expense by id using: GET "api/expenses/id/:id".
router.get("/id/:id", fetchuser, getOne);


module.exports = router;