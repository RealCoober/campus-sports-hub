const db = require('../config/db');

// Get all teams
exports.getAllTeams = async (req, res) => {
    try {
        const [teams] = await db.query(`
            SELECT 
                t.id, 
                t.name, 
                s.name AS sport_name, 
                l.name AS league_name, 
                COALESCE(u.first_name, 'Unknown') AS captain_name,
                (SELECT COUNT(*) FROM team_members tm WHERE tm.team_id = t.id AND tm.status = 'APPROVED') AS member_count
            FROM teams t 
            LEFT JOIN sports s ON s.id = t.sport_id 
            LEFT JOIN leagues l ON l.id = t.league_id 
            LEFT JOIN users u ON u.id = t.captain_id
        `);
        res.json(teams);
    } catch (err) {
        console.error("Error fetching teams:", err);
        res.status(500).json({ error: 'Server error fetching teams' });
    }
};

// Request to join a team
exports.joinTeam = async (req, res) => {
    try {
        const teamId = req.params.id;
        const userId = req.user.userID; 

        // Check if they already requested
        const [existing] = await db.query(
            'SELECT * FROM team_members WHERE team_id = ? AND student_id = ?', 
            [teamId, userId]
        );

        if (existing.length > 0) {
            return res.status(409).json({ error: 'You have already requested to join this team.' });
        }

        // Insert the pending request
        await db.query(
            "INSERT INTO team_members (team_id, student_id, status) VALUES (?, ?, 'PENDING')", 
            [teamId, userId]
        );

        res.status(201).json({ message: 'Join request sent successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error joining team' });
    }
};