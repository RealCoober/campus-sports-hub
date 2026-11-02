const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const teamController = require('../controllers/teamController');
const auth = require('../middleware/authMiddleware');

// Soft auth: Attaches user to req if a valid token exists, but doesn't block guests
const softAuth = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (token) {
        try {
            req.user = jwt.verify(token, process.env.JWT_SECRET);
        } catch (e) {
            // Ignore invalid tokens for public routes
        }
    }
    next();
};

// Routes
router.get('/', softAuth, teamController.getAllTeams);
router.post('/:id/join', auth, teamController.joinTeam);

router.get('/join-requests/pending', auth, teamController.getJoinRequests);
router.patch('/join-requests/:id', auth, teamController.updateJoinRequest);

module.exports = router;