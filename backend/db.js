const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'personal_portfolio',
  password: 'Kareem1411',
  port: 5432, // Default PostgreSQL port
});

module.exports = pool;