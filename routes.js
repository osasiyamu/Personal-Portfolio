const express = require('express');
const app = express();
const port = 5000;

app.get('/api/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM your_table_name');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
