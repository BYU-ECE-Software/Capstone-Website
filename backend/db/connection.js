// Set upt the database connection
const mysql = require('mysql2');
const dbConfig = require('../db/config');

const connection = mysql.createConnection(dbConfig);

connection.connect();
module.exports = connection;