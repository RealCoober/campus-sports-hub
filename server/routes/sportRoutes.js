const express = require('express');
const router = express.Router();
const sportController = require('../controllers/sportController');

// GET /api/sports
router.get('/', sportController.getAllSports);

module.exports = router;