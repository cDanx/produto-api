const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'user123',
    password: 'password123',
    host: 'db',
    database: 'db123',
    port: 5432
});

module.exports = pool;