const express = require('express');
const router = express.Router();

const { getAllClasses } = require('../controllers/class.controller.js');

// ROUTE 1: Fetch all classes using: GET "api/classes/fetchallclasses".
router.get('/fetchAllClasses', getAllClasses);

module.exports = router;