const db = require('../config/db');

// Get all teams
exports.getAllTeams = async (req, res) => {
    try {
        const userId = req.user ? req.user.userID : 0;

        const [teams] = await db.query(`
            SELECT 
                t.id, 
                t.name, 
                s.name AS sport_name, 
                l.name AS league_name, 
                COALESCE(u.first_name, 'Unknown') AS captain_name,
                (SELECT COUNT(*) FROM team_members tm WHERE tm.team_id = t.id AND tm.status = 'APPROVED') AS member_count,
                (SELECT status FROM team_members tm WHERE tm.team_id = t.id AND tm.student_id = ?) AS user_status,
                t.captain_id
            FROM teams t 
            LEFT JOIN sports s ON s.id = t.sport_id 
            LEFT JOIN leagues l ON l.id = t.league_id 
            LEFT JOIN users u ON u.id = t.captain_id
        `, [userId]);
        
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

        const [existing] = await db.query(
            'SELECT * FROM team_members WHERE team_id = ? AND student_id = ?', 
            [teamId, userId]
        );

        if (existing.length > 0) {
            return res.status(409).json({ error: 'You have already requested to join this team.' });
        }

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

// Get pending requests (for Captain Approval)
exports.getJoinRequests = async (req, res) => {
    try {
        const [requests] = await db.query(`
            SELECT tm.id, tm.status, tm.requested_at, t.name AS team_name,
                   u.first_name, u.last_name, u.email
            FROM team_members tm
            JOIN teams t ON t.id = tm.team_id
            JOIN users u ON u.id = tm.student_id
            WHERE tm.status = 'PENDING'
        `);
        res.json(requests);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error fetching requests' });
    }
};

// Approve or Reject a request
exports.updateJoinRequest = async (req, res) => {
    try {
        const { status } = req.body; 
        if (!['APPROVED', 'REJECTED'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        await db.query('UPDATE team_members SET status = ? WHERE id = ?', [status, req.params.id]);
        res.json({ message: `Request ${status.toLowerCase()}!` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error updating request' });
    }
};