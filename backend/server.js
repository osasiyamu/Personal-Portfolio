const express = require('express');
const pool = require('./db'); // Adjust the path to your db.js file
const app = express();
const port = 3010; // Or any other available port

app.get('/users', async (req, res) => {
    try {
        const usersQuery = await pool.query('SELECT * FROM Users;');
        res.json(usersQuery.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error while fetching users');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});