const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");

const { getAll, getOne } = require("../controllers/class.controller");

// ROUTE 1: Fetch all classes using: GET "api/classes/getAll".
router.get("/", fetchuser, getAll);

// ROUTE 2: Fetch class by id using: GET "api/classes/id/:id".
router.get("/id/:id", fetchuser, getOne);

module.exports = router;