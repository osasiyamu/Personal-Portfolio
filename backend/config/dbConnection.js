const { Pool } = require('pg');
const config = require('./config.json');

const express = require('express');
const expressSession = require('express-session');
var genuuid = require('uuid');
const cors = require('cors');
const app = express();
const port = config.server_port;

const path = require('path');
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
const sessionConfig = {
    name: 'SessionCookie',
    genid: function(req) {
        return genuuid.v4() // use UUIDs for session IDs
    },
    secret: config.session_secret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, maxAge: 300000}
};
const session = expressSession(sessionConfig);

app.use(cors({
    origin: `http://localhost:${config.web_port}`,
    credentials: true
}));
app.use(express.json());
app.use(session);

/* DB CRUD Operations */
app.get('/api/setup', async (req, res) => {
    try {
        let filename = path.join(process.cwd, '../../src/assets/sql/setup.sql')
        const sql_data = fs.readFileSync(filename, 'utf-8')
        await pool.query(sql_data);
        res.status(200).send({ message: "Successfully setup database." })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});

app.get('/api/teardown', async (req, res) => {
    try {
        let filename = path.join(process.cwd, '../../src/assets/sql/tearDown.sql')
        const sql_data = fs.readFileSync(filename, 'utf-8')
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

module.exports = { app, session, pool, port };
