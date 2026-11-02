const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        // 1. Check if user exists
        const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // 2. Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // 3. Insert into DB (Using the column names from your group's init.sql)
        const [result] = await db.query(
            'INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES (?, ?, ?, ?, ?)',
            [email, passwordHash, firstName, lastName, 'STUDENT']
        );

        // 4. Generate token immediately so they are logged in after registering
        const token = jwt.sign(
            { userID: result.insertId, role: 'STUDENT' },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({ 
            message: 'User registered successfully', 
            token,
            user: { id: result.insertId, email, firstName, lastName, role: 'STUDENT' }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during registration' });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find user
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = users[0];

        // 2. Check password
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // 3. Generate JWT
        const token = jwt.sign(
            { userID: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ 
            message: 'Login successful', 
            token, 
            user: { id: user.id, email: user.email, firstName: user.first_name, role: user.role } 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error during login' });
    }
};