const express = require('express');
const { Pool } = require('pg');
const app = express();
const fs = require('fs');
const port = 5555;

// const myPortfolioModel = require('./http_models/myPortfolioModel');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'postgres_db',
    password: 'password',
    port: 5432,
});

app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

/* ROUTES */

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

/*  Testing DB */
app.get('/api/printusers', async (req, res) => {
    try {
        let data = await pool.query("SELECT * from users;");
        res.status(200).send(data.rows)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});

app.get('/api/printprofiles', async (req, res) => {
    try {
        let data = await pool.query("SELECT * from profiles;");
        res.status(200).send(data.rows)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});

/* DB CRUD Operations */
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
