const { app, pool, port } = require('../config/dbConnection');

/* My Portfolio */
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

    // myPortfolioModel.getUserDescription(req.params.id)
    // .then(response => {
    //     res.status(200).send(response[0]);
    // })
    // .catch(error => {
    //     res.status(500).send(error);
    // })
});




