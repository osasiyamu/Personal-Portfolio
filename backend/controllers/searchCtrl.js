const { session, pool } = require('../config/dbConnection');

module.exports = function (app) {
    app.get('/userprofiles', async (req, res) => {
        const profileId = session.profileId;
        try {
            const client = await pool.connect();
            const result = await client.query(`SELECT * FROM profiles WHERE NOT profileid = ${profileId}`);
            const data = result.rows;
            client.release();
            res.status(200).json(data);
        } catch (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Get profile info for a user
    app.get('/myportfolio', async (req, res) => {
        const id = session.profileId;
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
    app.get('/myportfolio/about', async (req, res) => {
        const id = session.profileId;
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

    // Get user education history
    app.get('/myportfolio/education', async (req, res) => {
        const id = session.profileId;
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

    //Get Users Experience 
    app.get('/myportfolio/experience', async (req, res) => {
        const id = session.profileId;
        try {
            const client = await pool.connect();
            const result = await client.query(`SELECT * FROM experience WHERE profileId = ${id} ORDER BY startdate DESC`);
            const data = result.rows;
            client.release();
            res.status(200).json(data);
        } catch (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });          

    //Get Users License 
    app.get('/myportfolio/licenses', async (req, res) => {
        const id = session.profileId
        try {
            const client = await pool.connect();
            const result = await client.query(`SELECT * FROM licenses WHERE profileId = ${id} ORDER BY issuedate DESC`);
            const data = result.rows;
            client.release();
            res.status(200).json(data);
        } catch (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Get user project history
    app.get('/myportfolio/projects', async (req, res) => {
        const id = session.profileId;
        try {
            const client = await pool.connect();
            const result = await client.query(`SELECT * FROM projects WHERE profileId = ${id} ORDER BY startdate DESC`);
            const data = result.rows;
            client.release();
            res.status(200).json(data);
        } catch (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Get user's skills
    app.get('/myportfolio/skills', async (req, res) => {
        const id = session.profileId;
        try {
            const client = await pool.connect();
            const result = await client.query(`SELECT * FROM skills WHERE profileId = ${id} ORDER BY rank ASC`);
            const data = result.rows;
            client.release();
            res.status(200).json(data);
        } catch (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Get user's contacts
    app.get('/myportfolio/contact', async (req, res) => {
        const id = session.profileId;
        try {
            const client = await pool.connect();
            const result = await client.query(`SELECT * FROM contact WHERE profileId = ${id}`);
            const data = result.rows;
            client.release();
            res.status(200).json(data[0]);
        } catch (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Get user's web links
    app.get('/myportfolio/website', async (req, res) => {
        const id = session.profileId;
        try {
            const client = await pool.connect();
            const result = await client.query(`SELECT * FROM website WHERE profileId = ${id}`);
            const data = result.rows;
            client.release();
            res.status(200).json(data);
        } catch (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};