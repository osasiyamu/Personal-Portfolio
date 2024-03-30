const { session, pool } = require('../config/dbConnection');

function getProfileIdFromSession() {
    return session.profileId;
}

module.exports = function (app) {
    // Get profile info for a user
    app.get('/myportfolio', async (req, res) => {
        const id = getProfileIdFromSession();
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
        const id = getProfileIdFromSession();
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
    app.post('/myportfolio/about', async (req, res) => {
        const id = getProfileIdFromSession();
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
    app.get('/myportfolio/education', async (req, res) => {
        const id = getProfileIdFromSession();
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
        const profile_id = getProfileIdFromSession();
        const institution = req.body.institution;
        const degree = req.body.degree;
        const fieldofstudy = req.body.fieldofstudy;
        const start_date = req.body.start_date;
        const end_date = req.body.end_date;

        var query = `INSERT INTO education (profileid, institution, degree, fieldofstudy, startdate, enddate) VALUES ('${profile_id}', '${institution}', '${degree}', '${fieldofstudy}', '${start_date}', '${end_date}')`;

        if (("" + end_date) == "undefined") {
            query = `INSERT INTO education (profileid, institution, degree, fieldofstudy, startdate) VALUES ('${profile_id}', '${institution}', '${degree}', '${fieldofstudy}', '${start_date}')`
        }

        try {
            const client = await pool.connect();
            await client.query(query);
            client.release();
            res.status(201);
        } catch (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Update a user's education history
    app.post('/myportfolio/education', async (req, res) => {
        const educationId = req.body.education_id;
        const institution = req.body.institution;
        const degree = req.body.degree;
        const fieldofstudy = req.body.fieldofstudy;
        const start_date = req.body.start_date;
        var end_date = req.body.end_date;

        var query = `UPDATE education SET institution = '${institution}', degree = '${degree}', fieldofstudy = '${fieldofstudy}', startdate = '${start_date}', enddate = '${end_date}' WHERE educationid = ${educationId}`;

        if (end_date == "Invalid Date") {
            query = `UPDATE education SET institution = '${institution}', degree = '${degree}', fieldofstudy = '${fieldofstudy}', startdate = '${start_date}', enddate = NULL WHERE educationid = ${educationId}`;
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
    app.delete('/myportfolio/education', async (req, res) => {
        const educationId = req.body.education_id;

        try {
            const client = await pool.connect();
            await client.query(`DELETE FROM education WHERE educationid = ${educationId}`);
            client.release();
            res.status(200);
        } catch (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    //Get Users Experience 
    app.get('/myportfolio/experience', async (req, res) => {
        const id = getProfileIdFromSession();
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

    //Add an Experience for User
    app.post('/myportfolio/experience/add', async (req, res) => {
        const profile_id = getProfileIdFromSession();
        const companyName = req.body.companyName;
        const positionTitle = req.body.positionTitle;
        const description = req.body.description;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
       
        var query = `INSERT INTO experience (profileid, company, position, startdate, enddate, details) VALUES ('${profile_id}', '${companyName}', '${positionTitle}', '${startDate}', '${endDate}', '${description}')`;

        if (("" + endDate) == "undefined") {
            query = `INSERT INTO experience (profileid, company, position, startdate, details) VALUES ('${profile_id}', '${companyName}', '${positionTitle}', '${startDate}', '${description}')`
        }

        try {
            const client = await pool.connect();
            await client.query(query);
            client.release();
            res.status(201);
        } catch (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    //Update Users Experience
    app.post('/myportfolio/experience', async (req, res) => {
        const id = req.body.experience_id;
        const companyName = req.body.companyName;
        const positionTitle = req.body.positionTitle;
        const description = req.body.description;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;

        var query = `UPDATE experience SET company = '${companyName}', position = '${positionTitle}', startdate = '${startDate}', enddate = '${endDate}, details = '${description}' WHERE licenseid = ${id}`;

        if (endDate == "Invalid Date") {
            query = `UPDATE experience SET company = '${companyName}', position = '${positionTitle}', startdate = '${startDate}', details = '${description}', enddate = NULL WHERE experienceid = ${id}`;
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

    //Delete Users Experience
    app.delete('/myportfolio/experience', async (req, res) => {
        const id = req.body.experience_id;

        try {
            const client = await pool.connect();
            await client.query(`DELETE FROM licenses WHERE experienceid = ${id}`);
            client.release();
            res.status(200);
        } catch (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    //Get Users License 
    app.get('/myportfolio/licenses', async (req, res) => {
        const id = getProfileIdFromSession()
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

    //Add a License for User
    app.post('/myportfolio/licenses/add', async (req, res) => {
        const profile_id = getProfileIdFromSession();
        const licenseName = req.body.licenseName;
        const awardingInsitution = req.body.awardingInsitution;
        const awardDate = req.body.awardDate;
        const expirationDate = req.body.expirationDate;
       
        var query = `INSERT INTO licenses (profileid, licensename, issuedby, issuedate, expirydate) VALUES ('${profile_id}', '${licenseName}', '${awardingInsitution}', '${awardDate}', '${expirationDate}')`;

        if (("" + expirationDate) == "undefined") {
            query = `INSERT INTO licenses (profileid, licensename, issuedby, issuedate) VALUES ('${profile_id}', '${licenseName}', '${awardingInsitution}', '${awardDate}')`
        }

        try {
            const client = await pool.connect();
            await client.query(query);
            client.release();
            res.status(201);
        } catch (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Update Users License
    app.post('/myportfolio/licenses', async (req, res) => {
        const id = req.body.licenseId;
        const licenseName = req.body.licenseName;
        const awardingInsitution = req.body.awardingInsitution;
        const awardDate = req.body.awardDate;
        const expirationDate = req.body.expirationDate;

        var query = `UPDATE licenses SET licenseName = '${licenseName}', issuedby = '${awardingInsitution}', issuedate = '${awardDate}', expiryDate = '${expirationDate}' WHERE licenseid = ${id}`;

        if (expirationDate == "Invalid Date") {
            query = `UPDATE licenses SET licenseName = '${licenseName}', issuedby = '${awardingInsitution}', issuedate = '${awardDate}', expiryDate = NULL WHERE licenseid = ${id}`;
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

    // Delete Users License
    app.delete('/myportfolio/licenses', async (req, res) => {
        const id = req.body.licenseId;

        try {
            const client = await pool.connect();
            await client.query(`DELETE FROM licenses WHERE licenseid = ${id}`);
            client.release();
            res.status(200);
        } catch (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Get user project history
    app.get('/myportfolio/projects', async (req, res) => {
        const id = getProfileIdFromSession();
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

    // Add to a user's project history 
    app.post('/myportfolio/projects/add', async (req, res) => {
        const profile_id = getProfileIdFromSession();
        const project_name = req.body.project_name;
        const details = req.body.details;
        const start_date = req.body.start_date;
        const end_date = req.body.end_date;
        const project_url = req.body.project_url;

        var query = `INSERT INTO projects (profileid, projectname, details, startdate, enddate, projecturl) VALUES ('${profile_id}', '${project_name}', '${details}', '${start_date}', '${end_date}', '${project_url}')`;

        if (("" + end_date) == "undefined") {
            query = `INSERT INTO projects (profileid, projectname, details, startdate, projecturl) VALUES ('${profile_id}', '${project_name}', '${details}', '${start_date}', '${project_url}')`;
        }

        try {
            const client = await pool.connect();
            await client.query(query);
            client.release();
            res.status(201);
        } catch (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Update a user's project history
    app.post('/myportfolio/projects', async (req, res) => {
        const id = req.body.project_id;
        const project_name = req.body.project_name;
        const details = req.body.details;
        const start_date = req.body.start_date;
        const end_date = req.body.end_date;
        const project_url = req.body.project_url;

        var query = `UPDATE education SET projectname = '${project_name}', details = '${details}', startdate = '${start_date}', enddate = '${end_date}', projecturl = '${project_url}' WHERE projectid = ${id}`;

        if (end_date == "Invalid Date") {
            query = `UPDATE education SET projectname = '${project_name}', details = '${details}', startdate = '${start_date}', enddate = NULL, projecturl = '${project_url}' WHERE projectid = ${id}`;
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

    // Delete from a user's project history
    app.delete('/myportfolio/projects', async (req, res) => {
        const id = req.body.project_id;

        try {
            const client = await pool.connect();
            await client.query(`DELETE FROM projects WHERE projectid = ${id}`);
            client.release();
            res.status(200);
        } catch (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Get user's skills
    app.get('/myportfolio/skills', async (req, res) => {
        const id = getProfileIdFromSession();
        try {
            const client = await pool.connect();
            const result = await client.query(`SELECT * FROM skills WHERE profileId = ${id}`);
            const data = result.rows;
            client.release();
            res.status(200).json(data);
        } catch (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Update user's skills
    app.post('/myportfolio/skills', async (req, res) => {
        const id = req.body.skill_id;
        const skill_name = req.body.skill_name;
        const proficiency_level = req.body.proficiency_level;

        var query = `UPDATE skills SET skillname = '${skill_name}', proficiencylevel = '${proficiency_level}' WHERE skillid = ${id}`;

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

    // Get user's contacts
    app.get('/myportfolio/contact', async (req, res) => {
        const id = getProfileIdFromSession();
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

    // Update user's contacts
    app.post('/myportfolio/contact', async (req, res) => {
        const id = getProfileIdFromSession();
        const email = req.body.email;
        const countrycode = req.body.countrycode;
        const phonenumber = req.body.phonenumber;
        const extension = req.body.extension;

        var query = `UPDATE contact SET email = '${email}', countrycode = '${countrycode}', phonenumber = '${phonenumber}', extension = '${extension}' WHERE profileid = ${id}`;

        if (("" + extension) == "undefined") {
            query = `UPDATE contact SET email = '${email}', countrycode = '${countrycode}', phonenumber = '${phonenumber}', extension = NULL WHERE profileid = ${id}`;
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

    // Get user's web links
    app.get('/myportfolio/website', async (req, res) => {
        const id = getProfileIdFromSession();
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

    // Update user's web links
    app.post('/myportfolio/website', async (req, res) => {
        const id = req.body.website_id;
        const description = req.body.description;
        const url = req.body.url;

        var query = `UPDATE website SET description = '${description}', url = '${url}' WHERE websiteid = ${id}`;

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
};
