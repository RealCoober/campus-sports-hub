const db = require('../config/db');

exports.getAllGames = async (req, res) => {
    try {
        const [games] = await db.query(`
            SELECT g.id, g.scheduled_date, g.status, 
                   h.name AS home_team, a.name AS away_team,
                   g.home_score, g.away_score
            FROM games g
            JOIN teams h ON h.id = g.home_team_id
            JOIN teams a ON a.id = g.away_team_id
            ORDER BY g.scheduled_date ASC
        `);
        res.json(games);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error fetching games' });
    }
};