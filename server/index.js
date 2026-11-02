const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./config/db'); 

// Import Routes
const sportRoutes = require('./routes/sportRoutes');

app.use(express.json());

// Mount Routes
app.use('/api/sports', sportRoutes);

app.get('/', (req, res) => {
    res.send('Campus Sports Hub API is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});