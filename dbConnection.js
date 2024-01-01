const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'smu_admin',
  host: 'searchmeup-db-instance-id.chaw6w2mewyr.us-east-2.rds.amazonaws.com',
  database: 'searchmeup',
  password: 'Searchmeup_portfolio',
  port: 5432, // default PostgreSQL port
});

const createTableQuery = `
    CREATE TABLE account (
        Username VARCHAR(25) UNIQUE NOT NULL,
        Pword VARCHAR(16) NOT NULL
    );
`;

async function createTable() {
    try {
        const client = await pool.connect();
        await client.query(createTableQuery);
        console.log('Table created successfully!');
    } catch (error) {
        console.error('Error creating table:', error);
    } finally {
        pool.end(); // Close the connection pool
    }
}

createTable();
