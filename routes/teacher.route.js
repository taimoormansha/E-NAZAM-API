const express = require("express");
const router = express.Router();
// const fetchuser = require("../middleware/fetchuser");
const { getAll, getOne } = require("../controllers/teacher.controller");

// ROUTE 1: Fetch all teachers using: GET "api/teachers/getAll".
router.get("/", getAll);

// ROUTE 2: Fetch teacher by id using: GET "api/teachers/id/:id".
router.get("/id/:id", getOne);

module.exports = router;
