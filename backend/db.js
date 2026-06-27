const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Gearhub',
    password: '565656',
    port: 5432,
});

module.exports = pool;