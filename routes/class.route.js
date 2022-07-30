const express = require('express');
const router = express.Router();

const { getAll, getOne } = require("../controllers/class.controller");

// ROUTE 1: Fetch all classes using: GET "api/classes/getAll".
router.get("/", getAll);

// ROUTE 2: Fetch class by id using: GET "api/classes/id/:id".
router.get("/id/:id", getOne);

module.exports = router;