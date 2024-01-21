const { Client } = require('pg');
const client = new Client({
    host: 'localhost',
    user: 'postgres',
    database: 'postgres_db',
    password: 'password',
    port: 5432,
});

client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database!');
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err);
});
