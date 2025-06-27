const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');

router.post('/', progressController.saveProgress);   // Save or update progress
router.get('/', progressController.getProgress);     // Get progress of student

module.exports = router;
