const db = require('../config/db');

exports.getAllSports = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, name, description, icon FROM sports');
        res.json(rows);
    } catch (error) {
        console.error("Database error in getAllSports:", error);
        res.status(500).json({ error: 'Server error fetching sports' });
    }
};