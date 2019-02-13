'use strict';
const mysql = require('mysql');
const db = mysql.createConnection({
    host: process.env.dbhost || 'localhost',
    user: process.env.dbuser || 'root',
    password: process.env.dbpwd || 'sasa',
    database: process.env.dbname || 'jbs'
});
db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('Connected to DB');
});

global.db = db;

module.exports = db