const express = require('express');
const teamRoutes = require('./routes/teamRoutes');
const app = express();
require('dotenv').config();
const db = require('./config/db'); 

const sportRoutes = require('./routes/sportRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());

app.use('/api/sports', sportRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/teams', teamRoutes);

app.get('/', (req, res) => {
    res.send('Campus Sports Hub API is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});