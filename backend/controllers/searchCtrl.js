const { pool } = require('../config/dbConnection');

module.exports = function (app) {
    app.get('/userprofiles', async (req, res) => {
        try {
            const client = await pool.connect();
            const result = await client.query(`SELECT * FROM profiles`);
            const data = result.rows;
            client.release();
            res.status(200).json(data);
        } catch (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};