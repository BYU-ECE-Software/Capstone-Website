const connection = require('../db/connection');

function getUserById(id, callback) {
  connection.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
}




// given a user id, return a dictionary of their info
exports.findById = (id, callback) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users WHERE user_id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
        });
    });
};

// this too will be replaced once db is set up
exports.findAll = (callback) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
    
}