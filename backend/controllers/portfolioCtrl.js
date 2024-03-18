const { pool } = require('../config/dbConnection');

module.exports = function (app) {
    // Get profile info for a user
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

    // Get about info for a user
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

    // Update about info for a user
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

    // Get user education history
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

    // Add to a user's education history 
    app.post('/myportfolio/education/add', async (req, res) => {
        const profile_id = req.body.profile_id;
        const institution = req.body.institution;
        const degree = req.body.degree;
        const fieldofstudy = req.body.fieldofstudy;
        const start_date = req.body.start_date;
        const end_date = req.body.end_date;

        var query = `INSERT INTO education (profileid, institution, degree, fieldofstudy, startdate, enddate) VALUES ('${profile_id}', '${institution}', '${degree}', '${fieldofstudy}', '${start_date}', '${end_date}')`;

        if (end_date == "Invalid Date") {
            query = `INSERT INTO education (profileid, institution, degree, fieldofstudy, startdate, enddate) VALUES ('${profile_id}', '${institution}', '${degree}', '${fieldofstudy}', '${start_date}', '')`
        }

        try {
            const client = await pool.connect();
            await client.query();
            client.release();
            res.status(200);
        } catch (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Update a user's education history
    app.post('/myportfolio/education/:id', async (req, res) => {
        const id = req.params.id;
        const institution = req.body.institution;
        const degree = req.body.degree;
        const fieldofstudy = req.body.fieldofstudy;
        const start_date = req.body.start_date;
        var end_date = req.body.end_date;

        var query = `UPDATE education SET institution = '${institution}', degree = '${degree}', fieldofstudy = '${fieldofstudy}', startdate = '${start_date}', enddate = '${end_date}' WHERE educationid = ${id}`;

        if (end_date == "Invalid Date") {
            query = `UPDATE education SET institution = '${institution}', degree = '${degree}', fieldofstudy = '${fieldofstudy}', startdate = '${start_date}', enddate = NULL WHERE educationid = ${id}`;
        }

        try {
            const client = await pool.connect();
            await client.query(query);
            client.release();
            res.status(200);
        } catch (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Delete from a user's education history
    app.delete('/myportfolio/education/:id', async (req, res) => {
        const id = req.params.id;

        try {
            const client = await pool.connect();
            await client.query(`DELETE FROM education WHERE educationid = ${id}`);
            client.release();
            res.status(200);
        } catch (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};
