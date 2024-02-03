const express = require('express');
const { Pool } = require('pg');
const app = express();
const fs = require('fs');
const port = 5555;

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'postgres_db',
    password: 'password',
    port: 5432,
});

/* routes */
app.get('/api/printusers', async (req, res) => {
    try {
        let data = await pool.query("SELECT * from users;");
        res.status(200).send(data.rows)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});

app.get('/api/setup', async (req, res) => {
    try {
        const sql_data = fs.readFileSync('./src/assets/sql/setup.sql', 'utf-8')
        await pool.query(sql_data);
        res.status(200).send({ message: "Successfully setup database." })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});

app.get('/api/teardown', async (req, res) => {
    try {
        const sql_data = fs.readFileSync('./src/assets/sql/tearDown.sql', 'utf-8')
        await pool.query(sql_data);
        res.status(200).send({ message: "Successfully tore down database." })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});

app.listen(port, () => console.log(`Server has started on port: ${port}`))
