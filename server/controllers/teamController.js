const db = require('../config/db');

exports.getAllTeams = async (req, res) => {
    try {
        const [teams] = await db.query(`
            SELECT t.*, s.name AS sport_name, l.name AS league_name, u.first_name AS captain_name,
            (SELECT COUNT(*) FROM team_members tm WHERE tm.team_id=t.id AND tm.status='APPROVED') AS member_count
            FROM teams t 
            JOIN sports s ON s.id=t.sport_id 
            JOIN leagues l ON l.id=t.league_id 
            JOIN users u ON u.id=t.captain_id
        `);
        res.json(teams);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.joinTeam = async (req, res) => {
    try {
        const teamId = req.params.id;
        const userId = req.user.userID; // From auth middleware
        await db.query("INSERT INTO team_members (team_id, student_id, status) VALUES (?, ?, 'PENDING')", [teamId, userId]);
        res.status(201).json({ message: 'Request sent' });
    } catch (err) {
        res.status(500).json({ error: 'Already requested or error' });
    }
};