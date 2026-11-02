const db = require('../config/db');

exports.getAllSlots = async (req, res) => {
    try {
        const [slots] = await db.query(`
            SELECT ts.id, f.name AS facility_name, f.location, ts.start_time, ts.end_time, ts.is_reserved
            FROM time_slots ts
            JOIN facilities f ON f.id = ts.facility_id
        `);
        res.json(slots);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error fetching slots' });
    }
};

exports.reserveSlot = async (req, res) => {
    try {
        // In a real app, this inserts into the reservations table. 
        // For Phase 1 demo, we'll just mark the slot as reserved.
        await db.query('UPDATE time_slots SET is_reserved = TRUE WHERE id = ?', [req.params.id]);
        res.json({ message: 'Facility reserved successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error reserving slot' });
    }
};