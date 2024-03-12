const { pool } = require('../config/dbConnection');

module.exports = function (app) {
    app.get('/myportfolio/:id', async (req, res) => {
        const id = req.params.id;
        try {
            const client = await pool.connect();
            const result = await client.query(`SELECT * FROM profiles WHERE profileId = ${id}`);
            const data = result.rows;
            client.release();
            res.status(200).json(data[0]);
        } catch (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.get('/myportfolio/about/:id', async (req, res) => {
        const id = req.params.id;
        try {
            const client = await pool.connect();
            const result = await client.query(`SELECT about FROM about WHERE profileId = ${id}`);
            const data = result.rows;
            client.release();
            res.status(200).json(data[0]);
        } catch (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.post('/myportfolio/about/:id', async (req, res) => {
        const id = req.params.id;
        const text = req.body.text;
        try {
            const client = await pool.connect();
            const result = await client.query(`UPDATE about SET about = '${text}' WHERE profileId = ${id}`);
            const data = result.rows;
            client.release();
            res.status(200).json(data[0]);
        } catch (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.get('/myportfolio/education/:id', async (req, res) => {
        const id = req.params.id;
        try {
            const client = await pool.connect();
            const result = await client.query(`SELECT * FROM education WHERE profileId = ${id} ORDER BY startdate DESC`);
            const data = result.rows;
            client.release();
            res.status(200).json(data);
        } catch (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.post('/myportfolio/education/:id', async (req, res) => {
        const id = req.params.id;
        const institution = req.body.institution;
        const degree = req.body.degree;
        const fieldofstudy = req.body.fieldofstudy;
        const start_date = req.body.start_date;
        const end_date = req.body.end_date;

        try {
            const client = await pool.connect();
            await client.query(`UPDATE education SET institution = '${institution}', degree = '${degree}', fieldofstudy = '${fieldofstudy}', startdate = '${start_date}', enddate = '${end_date}' WHERE educationid = ${id}`);
            client.release();
            res.status(200);
        } catch (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};
