const db = require('../config/db');

// Get all sports
exports.getAllSports = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM sports');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error fetching sports' });
    }
};