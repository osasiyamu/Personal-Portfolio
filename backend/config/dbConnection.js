const { Pool } = require('pg');
const config = require('./config.json');
const express = require('express');
const app = express();
const fs = require('fs');

const pool = new Pool({
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password,
    port: config.db_port,
    ssl: {
        require: true,
        rejectUnauthorized: false,
    }
});

const port = config.server_port;

app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', `http://localhost:${config.web_port}`);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

/* DB CRUD Operations */
app.get('/api/setup', async (req, res) => {
    try {
        const sql_data = fs.readFileSync('../../src/assets/sql/setup.sql', 'utf-8')
        await pool.query(sql_data);
        res.status(200).send({ message: "Successfully setup database." })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});

app.get('/api/teardown', async (req, res) => {
    try {
        const sql_data = fs.readFileSync('../../src/assets/sql/tearDown.sql', 'utf-8')
        await pool.query(sql_data);
        res.status(200).send({ message: "Successfully tore down database." })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});

/*  Testing DB */
app.post('/api/testdatainsert', async (req, res) => {
    try {
        await pool.query("INSERT INTO users (username, passwordhash, email) VALUES ('johndoe', 'password', 'johndoe@gmail.com');");
        await pool.query("INSERT INTO users (username, passwordhash, email) VALUES ('janedoe', 'password2', 'janedoe@gmail.com');");

        await pool.query("INSERT INTO profiles (userid, firstname, lastname, occupation) VALUES (1, 'John', 'Doe', 'Doctor');");
        await pool.query("INSERT INTO profiles (userid, firstname, lastname, occupation) VALUES (2, 'Jane', 'Doe', 'Engineer');");

        await pool.query("INSERT INTO about (profileid, about) VALUES (1, 'A dummy user for testing');");
        await pool.query("INSERT INTO about (profileid, about) VALUES (2, 'Another dummy user for testing');");

        res.status(200).send({ message: "Successfully added test data to database." })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});

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

module.exports = { app, pool, port };
