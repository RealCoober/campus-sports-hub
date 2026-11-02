const express = require('express');
const router = express.Router();
const facilityController = require('../controllers/facilityController');
const auth = require('../middleware/authMiddleware');

router.get('/', facilityController.getAllSlots);
router.post('/:id/reserve', auth, facilityController.reserveSlot);

module.exports = router;