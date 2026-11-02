const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const auth = require('../middleware/authMiddleware'); 

router.get('/', teamController.getAllTeams);
router.post('/:id/join', auth, teamController.joinTeam);

module.exports = router;