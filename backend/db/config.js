// Read in the information needed to connect to the database from the db.properties file.
const PropertiesReader = require('properties-reader');
const path = require('path');

const propertiesPath = path.join(__dirname, 'db.properties');
const properties = PropertiesReader(propertiesPath);


const dbConfig = {
    host: properties.get('db.host'),
    port: properties.get('db.port'),
    database: properties.get('db.database'),
    user: properties.get('db.user'),
    password: properties.get('db.password'),
};

module.exports = dbConfig;